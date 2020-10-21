const Piece = require("../Piece/Piece");
const Board = require("../Board/Board");
const {
  emitBoard,
  emitGameOver,
  emitIsPlaying,
  broadcastBoardToOpponents,
  emitScore,
  emitNextPieces,
  emitMessageToRoom
} = require("../../middleware/socketEmitter");
const keysActions = ["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown", " "];
const keysActionsLength = 5;
const scorePerNbLines = [50, 150, 350, 1000];

class Player {
  constructor(game, socketInfo, name = "") {
    this.game = game;
    this.board = new Board(this);
    this.name = name;
    this.socketInfo = socketInfo;
    this.initValues();
  }

  update() {
    const clock = this.game.clock;
    if (clock > this.actions.moveDown.next) {
      this.keyAction("moveDown");
      this.actions.moveDown.next += this.actions.moveDown.interval;
    }
    for (let i = 0; i < keysActionsLength; i++) {
      if (
        this.actions[keysActions[i]].next > 0 &&
        this.actions[keysActions[i]].next < clock
      ) {
        this.keyAction(keysActions[i]);
        this.actions[keysActions[i]].next += this.actions[
          keysActions[i]
        ].interval;
      }
    }
  }

  createNextPiece() {
    if (this.isPlaying === false) {
      return;
    }
    const pieceType = this.game.getNextPiece(this.nextPieceIndex);
    this.nextPieceIndex++;
    this.pieces.push(new Piece(pieceType));
    this.emitNextPieces();
    this.board.checkNewPiece(this.pieces[0]);
  }

  emitNextPieces() {
    if (this.pieces.length < 4) {
      return;
    }
    const [, ...nextPieces] = this.pieces;
    const nextPiecesBoards = nextPieces.map(p => p.type);
    emitNextPieces(this.socketInfo.socket, nextPiecesBoards);
  }

  deleteFirstPiece() {
    this.pieces.shift();
    this.createNextPiece();
  }

  updateOnInput(key, isDown) {
    if (isDown && !this.keysPressed[key]) {
      this.keysPressed[key] = true;
      this.keyAction(key);
      this.actions[key].next =
        this.game.clock + this.actions[key].interval * 2.5;
    } else if (!isDown && this.keysPressed[key]) {
      this.actions[key].next = -1;
      this.keysPressed[key] = false;
    }
  }

  keyAction(key) {
    let nextPiece = false;
    const currentPiece = this.pieces[0];
    switch (key) {
      case "ArrowRight":
        this.board.moveRight(currentPiece, 1);
        break;
      case "ArrowLeft":
        this.board.moveLeft(currentPiece, -1);
        break;
      case "moveDown":
      case "ArrowDown":
        nextPiece = this.board.moveDown(currentPiece);
        break;
      case "ArrowUp":
        nextPiece = this.board.rotate(currentPiece);
        break;
      case " ":
        this.actions[" "].next = -1;
        this.board.pieceToBottom(currentPiece);
        nextPiece = true;
        break;
      default:
        break;
    }
    if (nextPiece) {
      this.deleteFirstPiece();
    }

    this.emitBoard();
  }

  emitBoard() {
    if (this.isPlaying === false) {
      return;
    }
    const data = this.board.serialize(this.pieces[0]);
    emitBoard(this.socketInfo.socket, data);
  }

  broadcastBoardToOpponents(grid) {
    broadcastBoardToOpponents(
      this.socketInfo.socket,
      this.socketInfo.roomName,
      this.name,
      grid
    );
  }

  emitFirstBoard() {
    this.board.copyInitialGrid();
    for (let i = 0; i < 4; i++) {
      this.createNextPiece();
    }
    this.emitBoard();
    this.broadcastBoardToOpponents(this.board.grid);
    emitScore(
      this.socketInfo.socket,
      this.socketInfo.roomName,
      this.name,
      this.score
    );
    emitIsPlaying(this.socketInfo.socket, true);
  }

  gameOver() {
    if (this.isPlaying === false) {
      return;
    }
    this.game.scores[this.game.nbGames][this.name] = this.score;
    this.game.playersHistory[this.name] += this.score;
    emitMessageToRoom(
      this.socketInfo.io,
      this.game.name,
      this.name,
      "GAME OVER!"
    );
    this.emitBoard();
    emitGameOver(this.socketInfo.socket, this.socketInfo.roomName, this.name);
    emitIsPlaying(this.socketInfo.socket, false);
    this.isPlaying = false;
  }

  manageBrokenLines(nbLines) {
    this.brokenLines += nbLines;
    this.score += scorePerNbLines[nbLines] * (this.level + 1);
    emitScore(
      this.socketInfo.socket,
      this.socketInfo.roomName,
      this.name,
      this.score
    );
    this.level = Math.floor(this.brokenLines / 20);
    if (this.level > 0) {
      this.actions.moveDown.interval = 1000 * Math.pow(0.9, this.level);
    }
    if (nbLines - 1 > 0) {
      this.sendPenalty(nbLines - 1);
    }
  }

  sendPenalty(nbLines) {
    let nbVictims = 0;
    this.game.players.forEach(p => {
      if (p.name !== this.name && p.isPlaying) {
        nbVictims++;
        p.getPenalty(nbLines);
      }
    });
    if (nbVictims > 0) {
      emitMessageToRoom(
        this.socketInfo.io,
        this.game.name,
        this.name,
        `sent ${nbLines} malus to the opponents`
      );
    }
  }

  getPenalty(nbLines) {
    this.board.addBottomLines(nbLines, this.pieces[0]);
    this.emitBoard();
  }

  initValues() {
    this.brokenLines = 0;
    this.level = 0;
    this.score = 0;
    this.pieces = [];
    this.nextPieceIndex = 0;
    this.keysPressed = {
      ArrowRight: false,
      ArrowUp: false,
      ArrowLeft: false,
      ArrowDown: false,
      " ": false
    };
    this.actions = {
      moveDown: { next: 1000, interval: 1000 },
      ArrowRight: { next: -1, interval: 100 },
      ArrowLeft: { next: -1, interval: 80 },
      ArrowDown: { next: -1, interval: 80 },
      ArrowUp: { next: -1, interval: 250 },
      " ": { next: -1, interval: 10000 }
    };
  }
}

module.exports = Player;
