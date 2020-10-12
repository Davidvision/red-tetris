const cryptoRandomString = require("crypto-random-string");
const Piece = require("../Piece/Piece");
const Board = require("../Board/Board");

class Player {
  constructor(game, name = "") {
    this.game = game;
    this.board = new Board();
    this.score = 0;
    this.id = cryptoRandomString({ length: 5 });
    this.name = name.length > 3 ? name : this.id;
    this.nextPieceIndex = 0;
    this.pieces = [];
    for (let i = 0; i < 4; i++) {
      this.createNextPiece();
    }
  }

  createNextPiece() {
    const pieceType = this.game.getNextPiece(this.nextPieceIndex);
    this.nextPieceIndex++;
    this.pieces.push(new Piece(pieceType));
  }
}

// methods:
// update
// updateOnInput

module.exports = Player;
