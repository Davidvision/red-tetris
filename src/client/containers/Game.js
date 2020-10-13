import React, { memo, useContext, useEffect } from "react";
import BoardPixel from "../components/BoardPixel";
import { Context as GameContext } from "../context/GameContext";
import { Context as SocketContext } from "../context/SocketContext";
import { connectToGame } from "../middleware/sockets";

export default () => {
  const {
    state: { board }
  } = useContext(GameContext);
  const {
    state: { socketIOClient }
  } = useContext(SocketContext);

  useEffect(() => {
    if (socketIOClient !== null) {
      let regex = /^\/\#([a-zA-Z0-9]{3,15})\[([a-zA-Z0-9]{3,15})\]$/gm;
      const gamePath = window.location.pathname + window.location.hash;
      const [_, roomName, name] = regex.exec(gamePath);
      connectToGame(socketIOClient, roomName, name);
    }
  }, [socketIOClient]);

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
