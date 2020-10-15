const { pieces: piecesData } = require("../../../data/pieces.json");

const noRightOverflow = (p, grid) =>
  piecesData[p.type][p.rotation].every((l, i) =>
    l.every((c, j) => {
      if (c === 0) {
        return true;
      }
      return p.x + j + 1 < 10 && grid[p.y + i][p.x + j + 1] === 0;
    })
  );

const noLeftOverflow = (p, grid) =>
  piecesData[p.type][p.rotation].every((l, i) =>
    l.every((c, j) => {
      if (c === 0) {
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
      return p.y + i + 1 < 20 && grid[p.y + i + 1][p.x + j] === 0;
    })
  );

const isColliding = (p, grid) =>
  piecesData[p.type][p.rotation].every((l, i) =>
    l.every((c, j) => {
      if (c === 0) {
        return true;
      }
      return p.y + i < 20 && grid[p.y + i][p.x + j] === 0;
    })
  );

const isOutOfBoard = (p, grid) => {
  piecesData[p.type][p.rotation].forEach((l, i) =>
    l.forEach((c, j) => {
      if (c !== 0) {
        if (p.x + j < 0) {
          return 1;
        }
        if (p.x + j > 10) {
          return -1;
        }
      }
    })
  );
  return 0;
};

module.exports = {
  noRightOverflow,
  noLeftOverflow,
  noDownOverflow,
  isColliding,
  isOutOfBoard
};
