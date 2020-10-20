import React, { memo, useContext, useEffect, useState } from "react";
import { Context as GameContext } from "../context/GameContext";
import { Context as HomeContext } from "../context/HomeContext";
import Board from "../components/Board";
import { startGame } from "../middleware/sockets";
import useInitGame from "../hooks/useInitGame";
import PlayerBoard from "../components/PlayerBoard";
import Lobby from "./Lobby";
import QuitGameBtn from "../components/QuitGameButton";
import CatContainer from "../components/CatContainer";

export default () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    state: { playingPlayers, isLoading, opponents }
  } = useContext(GameContext);
  const {
    state: { userName }
  } = useContext(HomeContext);

  useEffect(() => {
    console.log(playingPlayers);
    if (
      playingPlayers.length > 0 &&
      playingPlayers.findIndex(name => name === userName) > -1
    ) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [playingPlayers]);

  useInitGame(isPlaying);

  if (isLoading) return null;

  return (
    <div className="game-container">
      <CatContainer>
        <OpponentsPreview opponents={opponents} />
      </CatContainer>
      <PlayerBoard />
      <CatContainer>
        <QuitGameBtn />
      </CatContainer>
      {!isPlaying && <Lobby />}
    </div>
  );
};

const OpponentsPreview = memo(({ opponents }) =>
  Object.keys(opponents).map(opponentName => (
    <div key={opponentName} className="game__opponent-container">
      <p>{opponentName}</p>
      <Board board={opponents[opponentName]} colors={false} />
    </div>
  ))
);
