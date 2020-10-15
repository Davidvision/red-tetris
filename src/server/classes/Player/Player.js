const Piece = require("../Piece/Piece");
const Board = require("../Board/Board");
const { emitBoard } = require("../../middleware/socketEmitter");

class Player {
  constructor(game, socketInfo, name = "") {
    this.game = game;
    this.board = new Board();
    this.score = 0;
    this.name = name.length > 3 ? name : this.id;
    this.nextPieceIndex = 0;
    this.pieces = [];
    for (let i = 0; i < 4; i++) {
      this.createNextPiece();
    }
    this.keyPressed = "";
    this.keyPressedInterval = null;
    this.socketInfo = socketInfo;
  }

  createNextPiece() {
    const pieceType = this.game.getNextPiece(this.nextPieceIndex);
    this.nextPieceIndex++;
    this.pieces.push(new Piece(pieceType));
  }

  deleteFirstPiece() {
    this.pieces.shift();
    this.createNextPiece();
  }

  updateOnInput(key, isDown) {
    if (isDown) {
      this.keyPressed = key;
      this.keyAction();
      this.keyPressedInterval = setInterval(() => {
        this.keyAction();
      }, 200);
    } else {
      this.keyPressed = "";
      clearInterval(this.keyPressedInterval);
    }
  }

  keyAction() {
    let nextPiece = false;
    const currentPiece = this.pieces[0];
    switch (this.keyPressed) {
      case "ArrowRight":
        this.board.moveRight(currentPiece, 1);
        break;
      case "ArrowLeft":
        this.board.moveLeft(currentPiece, -1);
        break;
      case "ArrowDown":
        nextPiece = this.board.moveDown(currentPiece);
        break;
      case "ArrowUp":
        nextPiece = this.board.rotate(currentPiece);
        break;
      case "Space":
        // nextPiece = true;
        this.board.pieceToBottom(currentPiece);
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
    // console.log("emitBoard");
    const data = this.board.serialize(this.pieces[0]);
    emitBoard(this.socketInfo, data);
  }
}

// methods:
// update

module.exports = Player;
