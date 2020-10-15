const { pieces: piecesData } = require("../../../data/pieces.json");
const {
  noRightOverflow,
  noLeftOverflow,
  noDownOverflow,
  isColliding,
  isOutOfBoard
} = require("./utils");

class Board {
  constructor() {
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
        if (c > 0) {
          gridWithPiece[i + p.y][j + p.x] = c;
        }
      })
    );
    return gridWithPiece;
  }

  movePiece(p, dir) {
    // if
    // -piece dans le board
    // ->si touche les cotes on fait rien
    // ->si touche le sol -> collide
    //
    p.translate(dir);
    return false;
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
      piecesData[p.type][p.rotation].forEach((l, i) =>
        l.forEach((c, j) => {
          if (c !== 0) {
            this.grid[p.y + i][p.x + j] = c;
          }
        })
      );
      return true;
    }
  }

  rotate(p) {
    p.rotate();
    // let leftOverflow = true,
    //   rightOverflow = true,
    //   downOverflow = true,
    //   i = 0;
    // while (rightOverflow && leftOverflow && downOverflow) {
    //   leftOverflow = !noLeftOverflow(p, this.grid);
    //   rightOverflow = !noRightOverflow(p, this.grid);
    //   downOverflow = !noDownOverflow(p, this.grid);
    //   i++;
    //   // if (leftOverflow && rightOverflow) {
    //   if (downOverflow) {
    //     p.translate(0, -1);
    //     console.log(i, "UP1");
    //   } else if (leftOverflow) {
    //     p.translate(1, 0);
    //     console.log(i, "RIGHT");
    //   } else if (rightOverflow) {
    //     p.translate(-1, 0);
    //     console.log(i, "LEFT");
    //     // } else if (downOverflow) {
    //     //   p.translate(0, -1);
    //     //   console.log(i, "UP2");
    //   }
    // }
    let lateralOf = isOutOfBoard(p, this.grid);
    while (lateralOf !== 0) {
      p.translate(lateralOf, 0);
      lateralOf = isOutOfBoard(p, this.grid);
    }
    while (isColliding(p, this.grid)) {
      p.translate(0, -1);
    }
  }

  pieceToBottom() {
    console.log("PieceToBottom");
  }
}

module.exports = Board;
