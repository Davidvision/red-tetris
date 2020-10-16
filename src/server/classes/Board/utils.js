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

const isColliding = (p, grid) =>
  piecesData[p.type][p.rotation].some((l, i) =>
    l.some((c, j) => c !== 0 && p.y + i >= 0 && grid[p.y + i][p.x + j] !== 0)
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

module.exports = {
  noRightOverflow,
  noLeftOverflow,
  noDownOverflow,
  isColliding,
  isOutLateral,
  isOutUp
};
