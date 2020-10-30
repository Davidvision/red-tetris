const { pieces: piecesData } = require("../../../data/pieces.json");

const noRightOverflow = (p, grid) =>
  piecesData[p.type][p.rotation].every((l, i) =>
    l.every((c, j) => {
      if (c === 0 || p.y + i < 0) {
        return true;
      }
      return p.x + j + 1 < 10 && grid[p.y + i][p.x + j + 1] === 0;
    })
  );

const noLeftOverflow = (p, grid) =>
  piecesData[p.type][p.rotation].every((l, i) =>
    l.every((c, j) => {
      if (c === 0 || p.y + i < 0) {
        return true;
      }
      return p.x + j - 1 >= 0 && grid[p.y + i][p.x + j - 1] === 0;
    })
  );

const noDownOverflow = (p, grid) =>
  piecesData[p.type][p.rotation].every((l, i) =>
    l.every((c, j) => {
      if (c === 0) {
        return true;
      }
      return (
        p.y + i + 1 < 20 &&
        (p.y + i + 1 < 0 || grid[p.y + i + 1][p.x + j] === 0)
      );
    })
  );

const noDownOverflowShadow = (piece, x, y, grid) =>
  piece.every((l, i) =>
    l.every((c, j) => {
      if (c === 0) {
        return true;
      }
      return y + i + 1 < 20 && (y + i + 1 < 0 || grid[y + i + 1][x + j] === 0);
    })
  );

const isColliding = (x, y, type, rotation, grid) =>
  piecesData[type][rotation].some((l, i) =>
    l.some(
      (c, j) =>
        (c !== 0 && y + i >= 0 && y + i < 20 && grid[y + i][x + j] !== 0) ||
        (c !== 0 && y + i >= 20)
    )
  );

const isOutLateral = p => {
  let result = 0;
  piecesData[p.type][p.rotation].every((l, i) =>
    l.every((c, j) => {
      if (c !== 0) {
        if (p.x + j < 0) {
          result = 1;
          return false;
        }
        if (p.x + j >= 10) {
          result = -1;
          return false;
        }
      }
      return true;
    })
  );
  return result;
};

const isOutUp = p =>
  piecesData[p.type][p.rotation].some((l, i) =>
    l.some((c, j) => c !== 0 && p.y + i < 0)
  );

const addPieceToGrid = (piece, x, y, grid, shadow = 0) => {
  piece.map((l, i) =>
    l.map((c, j) => {
      if (c > 0 && i + y >= 0) {
        grid[i + y][j + x] = c + shadow;
      }
    })
  );
};

const shadowPiece = (x, y, type, rotation, piece, grid) => {
  while (
    noDownOverflowShadow(piece, x, y, grid) &&
    !isColliding(x, y, type, rotation, grid)
  ) {
    y++;
  }
  addPieceToGrid(piece, x, y, grid, 8);
};

module.exports = {
  noRightOverflow,
  noLeftOverflow,
  noDownOverflow,
  isColliding,
  isOutLateral,
  isOutUp,
  addPieceToGrid,
  shadowPiece
};
