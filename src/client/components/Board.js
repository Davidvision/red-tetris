import React, { memo } from "react";
import BoardPixel from "./BoardPixel";

export default memo(({ board, colors = true, customDims = {} }) => (
  <div className="game__board-background" style={{ ...customDims }}>
    <div className="game__board">
      {board.map((y, yi) =>
        y.map((x, xi) => (
          <BoardPixel color={colors ? x : x ? "000" : 0} key={xi} />
        ))
      )}
    </div>
  </div>
));
