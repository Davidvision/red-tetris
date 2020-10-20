const Piece = require("../Piece/Piece");
const Board = require("../Board/Board");
const {
  emitBoard,
  broadcastBoardToOpponents,
} = require("../../middleware/socketEmitter");
const { grids: initialGrids } = require("../../../data/grids.json");
const keysActions = ["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown", " "];
const keysActionsLength = 5;

class Player {
  constructor(game, socketInfo, name = "") {
    this.game = game;
    this.board = new Board(this);
    this.score = 0;
    this.isPlaying = false;
    this.name = name.length > 3 ? name : this.id;
    this.nextPieceIndex = 0;
    this.pieces = [];
    for (let i = 0; i < 4; i++) {
      this.createNextPiece();
    }
    this.socketInfo = socketInfo;
    this.keysPressed = {
      ArrowRight: false,
      ArrowUp: false,
      ArrowLeft: false,
      ArrowDown: false,
      " ": false,
    };
    this.actions = {
      moveDown: { next: 1000, interval: 1000 },
      ArrowRight: { next: -1, interval: 100 },
      ArrowLeft: { next: -1, interval: 80 },
      ArrowDown: { next: -1, interval: 80 },
      ArrowUp: { next: -1, interval: 250 },
      " ": { next: -1, interval: 10000 },
    };
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
    const pieceType = this.game.getNextPiece(this.nextPieceIndex);
    this.nextPieceIndex++;
    this.pieces.push(new Piece(pieceType));
    this.board.checkNewPiece(this.pieces[0]);
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
    this.emitBoard();
    this.broadcastBoardToOpponents(this.board.grid);
  }

  gameOver() {
    this.emitBoard(initialGrids[0]);
    this.isPlaying = false;
    this.game.removePlayingPlayer(this.name);
    console.log("GAME OVER", this.name);
  }

  sendPenalty(nbLines) {
    console.log("sendPenalty", this.name, nbLines);
    this.game.players.forEach((p) => {
      if (p.name !== this.name) {
        p.getPenalty(nbLines);
      }
    });
  }

  getPenalty(nbLines) {
    this.board.addBottomLines(nbLines, this.pieces[0]);
    this.emitBoard();
  }
}

module.exports = Player;
