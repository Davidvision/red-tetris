import React, { useContext } from "react";
import { Context as GameContext } from "../context/GameContext";
import { SocketContext } from "../context/SocketContext";
import { Context as HomeContext } from "../context/HomeContext";
import QuitGameBtn from "../components/QuitGameButton";
import { startGame } from "../middleware/sockets";

export default () => {
  const {
    state: { userName }
  } = useContext(HomeContext);
  const {
    state: { players }
  } = useContext(GameContext);
  const { socketIOClient } = useContext(SocketContext);

  const isLeader = players.length && players[0].name === userName;

  return (
    <div className="game-lobby">
      {isLeader && (
        <button onClick={() => startGame(socketIOClient)}>start game</button>
      )}
      {!isLeader && <p>wait for the leader to start the game</p>}
      <p>players :</p>
      <ul className="room-select-container">
        {players.map(player => (
          <li key={player.name}>{player.name}</li>
        ))}
      </ul>
      <QuitGameBtn />
    </div>
  );
};
