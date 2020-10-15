import React, { memo, useContext, useEffect } from "react";
import BoardPixel from "../components/BoardPixel";
import { Context as GameContext } from "../context/GameContext";
import { SocketContext } from "../context/SocketContext";
import { changePage, pages } from "../utils/router";
import { Context as HomeContext } from "../context/HomeContext";
import { connectToGame, quitGame, startGame } from "../middleware/sockets";
import useKeyboard from "../hooks/useKeyboard";

export default () => {
  const {
    state: { nbPlaying, board, isLoading, players }
  } = useContext(GameContext);
  const { socketIOClient } = useContext(SocketContext);
  const {
    setUserName,
    state: { userName }
  } = useContext(HomeContext);
  const isPlaying =
    nbPlaying > 0 && players.findIndex(p => p.name === userName) < nbPlaying;

  useKeyboard(isPlaying);

  useEffect(() => {
    let regex = /^\/\#([a-zA-Z0-9]{3,15})\[([a-zA-Z0-9]{3,15})\]$/gm;
    const gamePath = window.location.pathname + window.location.hash;
    const [_, roomName, name] = regex.exec(gamePath);
    setUserName(name);
    connectToGame(socketIOClient, roomName, name);
    return () => quitGame(socketIOClient);
  }, []);

  if (isLoading) return null;

  return (
    <div>
      <button onClick={() => changePage(pages[0].title, pages[0].path)}>
        quit game
      </button>
      <div className="game-container">
        {!isPlaying && <Lobby />}
        <Board board={board} />
      </div>
    </div>
  );
};

const Lobby = () => {
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
    </div>
  );
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
