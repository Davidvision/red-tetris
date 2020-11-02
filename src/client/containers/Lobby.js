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
    state: { players, resetGameContext, gameScores, isRunning }
  } = useContext(GameContext);
  const { socketIOClient } = useContext(SocketContext);

  const isLeader = players.length && players[0].name === userName;

  return (
    <div className="game-lobby">
      <div className="game-lobby-container">
        <div className="game-lobby__players-container">
          <p style={{ marginBottom: "10px" }}>{`Player${
            players.length > 1 ? "s" : ""
          }:`}</p>
          {players.map(player => (
            <p key={player.name}>{player.name}</p>
          ))}
        </div>
        {players.length > 1 && <Chat label={false} />}
        {gameScores && <GameScores gameScores={gameScores} />}
        <div className="game-lobby__btn-container">
          {isLeader && (
            <button
              className="btn game-lobby__start-btn"
              onClick={() => startGame(socketIOClient)}
            >
              Start game
            </button>
          )}
          {isRunning && (
            <p style={{ margin: "0 10px 10px 10px" }}>
              Game is currently played
            </p>
          )}
          {!isRunning && !isLeader && (
            <p style={{ margin: "0 10px 10px 10px" }}>
              Wait for the leader to start the game
            </p>
          )}
          <QuitGameBtn callBack={resetGameContext} />
        </div>
      </div>
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
