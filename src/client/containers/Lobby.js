import React, { useContext } from "react";
import { Context as GameContext } from "../context/GameContext";
import { SocketContext } from "../context/SocketContext";
import { Context as HomeContext } from "../context/HomeContext";
import QuitGameBtn from "../components/QuitGameButton";
import { startGame } from "../middleware/sockets";
import Chat from "../components/Chat";

export default () => {
  const {
    state: { userName }
  } = useContext(HomeContext);
  const {
    state: { players, resetGameContext, gameScores }
  } = useContext(GameContext);
  const { socketIOClient } = useContext(SocketContext);

  const isLeader = players.length && players[0].name === userName;

  console.log(isLeader);

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
      <Chat />
      {gameScores && <GameScores gameScores={gameScores} />}
      <QuitGameBtn callBack={resetGameContext} />
    </div>
  );
};

const GameScores = ({ gameScores: { playersHistory, scores } }) => (
  <table className="game-lobby__scores-container">
    <thead>
      <tr>
        <th></th>
        {Object.keys(playersHistory).map((name, index) => (
          <th key={index}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Object.keys(scores).map((gameNb, index) => (
        <tr key={index}>
          <th>{`Game ${gameNb} `}</th>
          {Object.keys(playersHistory).map((name, index) => (
            <td key={index}>
              {scores[gameNb][name] !== undefined ? scores[gameNb][name] : "/"}
            </td>
          ))}
        </tr>
      ))}
      <tr>
        <th>Total</th>
        {Object.keys(playersHistory).map((name, index) => (
          <th key={index}>{playersHistory[name]}</th>
        ))}
      </tr>
    </tbody>
  </table>
);
