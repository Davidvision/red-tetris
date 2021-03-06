const { pieces: piecesData } = require("../../../data/pieces.json");
const { grids: initialGrids } = require("../../../data/grids.json");
const {
  noRightOverflow,
  noLeftOverflow,
  noDownOverflow,
  isColliding,
  isOutLateral,
  isOutUp,
  addPieceToGrid,
  shadowPiece
} = require("./utils");
const Piece = require("../Piece/Piece");

class Board {
  constructor(player, gridType = 0) {
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
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.gridType = gridType;
  }

  serialize(p) {
    if (p === undefined) {
      return this.grid;
    }
    const piece = piecesData[p.type][p.rotation];
    const gridCopy = this.grid.map(l => l.map(c => c));
    shadowPiece(p.x, p.y, p.type, p.rotation, piece, gridCopy);
    addPieceToGrid(piece, p.x, p.y, gridCopy);
    return gridCopy;
  }

  moveRight(p) {
    if (p === undefined) {
      return;
    }
    if (noRightOverflow(p, this.grid)) {
      p.translate(1, 0);
    }
  }

  moveLeft(p) {
    if (p === undefined) {
      return;
    }
    if (noLeftOverflow(p, this.grid)) {
      p.translate(-1, 0);
    }
  }

  moveDown(p) {
    if (p === undefined) {
      return;
    }
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
      this.player.manageBrokenLines(linesToDelete.length);
    }
  }

  rotate(p) {
    if (p === undefined) {
      return;
    }
    p.rotate();
    let lateralOf = isOutLateral(p);
    while (lateralOf !== 0) {
      p.translate(lateralOf, 0);
      lateralOf = isOutLateral(p);
    }
    let isCol = isColliding(p.x, p.y, p.type, p.rotation, this.grid);
    while (isCol) {
      p.translate(0, -1);
      isCol = isColliding(p.x, p.y, p.type, p.rotation, this.grid);
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
    if (p === undefined) {
      return;
    }
    while (!this.moveDown(p)) {}
  }

  checkNewPiece(p) {
    let isCol = isColliding(p.x, p.y, p.type, p.rotation, this.grid);
    if (isCol) {
      p.translate(0, -1);
      if (isColliding(p.x, p.y, p.type, p.rotation, this.grid)) {
        p.translate(0, -1);
        this.player.pieces = [];
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
      if (p !== undefined) {
        p.translate(0, -1);
      }
    }
    if (gameOver) {
      this.player.gameOver();
    }
  }

  copyInitialGrid() {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 10; j++) {
        this.grid[i][j] = initialGrids[this.gridType][i][j];
      }
    }
  }
}

module.exports = Board;
