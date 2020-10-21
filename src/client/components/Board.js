import React, { memo } from "react";
import BoardPixel from "./BoardPixel";

export default memo(({ board, colors = true, opponent = false }) => (
  <div className="game__board-background">
    <div className="game__board">
      {board.map((y, yi) =>
        y.map((x, xi) => <BoardPixel color={colors ? x : x ? 1 : 0} key={xi} />)
      )}
    </div>
  </div>
));
