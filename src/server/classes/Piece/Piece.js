const { specs } = require("../../../data/pieces.json");

class Piece {
  constructor(type) {
    this.x = 3;
    this.y = specs[type].initialOffset;
    this.type = type;
    this.rotation = 0;
  }

  translate(x, y) {
    this.x += x;
    this.y += y;
  }

  rotate() {
    this.rotation = (this.rotation + 1) % 4;
  }
}

module.exports = Piece;
