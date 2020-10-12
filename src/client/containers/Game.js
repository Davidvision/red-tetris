import React, { memo, useContext } from "react";
import BoardPixel from "../components/BoardPixel";
import { Context as GameContext } from "../context/GameContext";

export default () => {
  const {
    state: { board }
  } = useContext(GameContext);

  return <Board board={board} />;
};

const Board = memo(({ board }) => (
  <div className="game__board-background">
    <div className="game__board">
      {board.map((y, yi) =>
        y.map((x, xi) => <BoardPixel color={x} key={xi} />)
      )}
    </div>
  </div>
));
