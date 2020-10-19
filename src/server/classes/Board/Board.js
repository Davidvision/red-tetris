const { pieces: piecesData } = require("../../../data/pieces.json");
const {
  noRightOverflow,
  noLeftOverflow,
  noDownOverflow,
  isColliding,
  isOutLateral,
  isOutUp
} = require("./utils");

class Board {
  constructor(player) {
    this.player = player;
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 7, 7, 0, 0, 0, 0, 0],
      [2, 3, 3, 5, 7, 7, 0, 0, 0, 0],
      [2, 2, 2, 5, 5, 4, 4, 0, 6, 0],
      [1, 1, 1, 1, 5, 4, 4, 6, 6, 6]
    ];
    // this.grid = Array(20).fill(Array(10).fill(0));
  }

  serialize(p) {
    const piece = piecesData[p.type][p.rotation];
    const gridWithPiece = this.grid.map(l => l.map(c => c));
    piece.map((l, i) =>
      l.map((c, j) => {
        if (c > 0 && i + p.y >= 0) {
          gridWithPiece[i + p.y][j + p.x] = c;
        }
      })
    );
    return gridWithPiece;
  }

  moveRight(p) {
    if (noRightOverflow(p, this.grid)) {
      p.translate(1, 0);
    }
  }

  moveLeft(p) {
    if (noLeftOverflow(p, this.grid)) {
      p.translate(-1, 0);
    }
  }

  moveDown(p) {
    if (noDownOverflow(p, this.grid)) {
      p.translate(0, 1);
      return false;
    } else {
      this.addPieceToBoard(p);
      return true;
    }
  }

  addPieceToBoard(p) {
    let gameOver = false;
    piecesData[p.type][p.rotation].forEach((l, i) =>
      l.forEach((c, j) => {
        if (c !== 0) {
          if (p.y + i >= 0) {
            this.grid[p.y + i][p.x + j] = c;
          } else {
            gameOver = true;
          }
        }
      })
    );
    if (gameOver) {
      this.player.gameOver();
    }
    this.checkLines();
    this.player.broadcastBoardToOpponents(this.grid);
  }

  checkLines() {
    let linesToDelete = [];
    this.grid.forEach((l, i) => {
      if (l.every(c => c > 0 && c < 8)) {
        linesToDelete.push(i);
      }
    });
    if (linesToDelete.length > 0) {
      linesToDelete.forEach(i => {
        this.grid.splice(i, 1);
        this.grid.unshift(Array(10).fill(0));
      });
      if (linesToDelete.length - 1 > 0) {
        this.player.sendPenalty(linesToDelete.length - 1);
      }
    }
  }

  rotate(p) {
    p.rotate();
    let lateralOf = isOutLateral(p);
    while (lateralOf !== 0) {
      p.translate(lateralOf, 0);
      lateralOf = isOutLateral(p);
    }
    let isCol = isColliding(p, this.grid);
    while (isCol) {
      p.translate(0, -1);
      isCol = isColliding(p, this.grid);
    }
    let upperOf = isOutUp(p);
    while (upperOf) {
      if (noDownOverflow(p, this.grid)) {
        this.moveDown(p);
        upperOf = isOutUp(p);
      } else {
        this.addPieceToBoard(p);
        upperOf = false;
      }
    }
  }

  pieceToBottom(p) {
    while (!this.moveDown(p)) {}
  }

  checkNewPiece(p) {
    let isCol = isColliding(p, this.grid);
    if (isCol) {
      p.translate(0, -1);
      if (isColliding(p, this.grid)) {
        this.player.gameOver();
      }
    }
  }

  addBottomLines(nbLines, p) {
    let gameOver = false;
    for (let i = 0; i < nbLines; i++) {
      gameOver = this.grid[0].some(c => c > 0);
      this.grid.shift();
      this.grid.push(Array(10).fill(8));
      p.translate(0, -1);
    }
    if (gameOver) {
      this.player.gameOver();
    }
  }
}

module.exports = Board;
