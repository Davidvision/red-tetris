import React, { memo, useContext, useEffect, useState } from "react";
import { Context as GameContext } from "../context/GameContext";
import Board from "../components/Board";
import useInitGame from "../hooks/useInitGame";
import PlayerBoard from "../components/PlayerBoard";
import Lobby from "../containers/Lobby";
import PiecesPreview from "../components/PiecesPreview";
import Logo from "../assets/img/logo.png";
import QuitGameBtn from "../components/QuitGameButton";
import Chat from "../components/Chat";
import CatContainer from "../components/CatContainer";

export default () => {
  const [nbOpponents, setNbOpponents] = useState(0);
  const {
    resetGameContext,
    state: { isLoading, opponents, isPlaying, score, nextPieces }
  } = useContext(GameContext);

  useInitGame(isPlaying);

  useEffect(() => {
    setNbOpponents(Object.keys(opponents).length);
  }, [opponents]);

  if (isLoading) return null;

  return (
    <div className="game-container">
      <CatContainer customStyle={{ padding: "8vh 0" }}>
        {nbOpponents > 0 && (
          <OpponentsPreview opponents={opponents} nbOpponents={nbOpponents} />
        )}
        <Chat />
      </CatContainer>
      <CatContainer
        customStyle={{ justifyContent: "center", position: "relative" }}
      >
        <img className="game__logo" src={Logo} />
        <PlayerBoard />
      </CatContainer>
      <CatContainer customStyle={{ padding: "10vh 0" }}>
        <PiecesPreview pieces={nextPieces} />
        <Score score={score} />
        <QuitGameBtn callBack={resetGameContext} />
      </CatContainer>
      {!isPlaying && <Lobby />}
    </div>
  );
};

const OpponentsPreview = memo(({ opponents, nbOpponents }) => (
  <div className="game__opponents">
    <p className="game__label">{`Your opponent${
      nbOpponents > 1 ? "s" : ""
    }:`}</p>
    <div
      className="game__opponents-container"
      style={{ height: opponentsContainerHeight[nbOpponents] }}
    >
      {Object.keys(opponents).map((opponentName, index) => (
        <OpponentPreview
          nbOpponents={nbOpponents}
          key={index}
          name={opponentName}
          score={opponents[opponentName].score}
          board={opponents[opponentName].board}
        />
      ))}
    </div>
  </div>
));

const OpponentPreview = memo(({ score, board, name, nbOpponents }) => (
  <div className="game__opponent-container">
    <p>{name}</p>
    <Board
      customDims={opponentsDims[nbOpponents]}
      board={board}
      colors={false}
    />
    <p>{`Score : ${score}`}</p>
  </div>
));

const Score = memo(({ score }) => (
  <div className="game__score-container">
    <p className="game__label">Your score:</p>
    <p className="game__score">{score}</p>
  </div>
));

const opponentsDims = {
  1: { width: "12.5vh", height: "25vh" },
  2: { width: "10vh", height: "20vh" },
  3: { width: "8vh", height: "16vh" }
};

const opponentsContainerHeight = {
  1: "31vh",
  2: "55vh",
  3: "55vh"
};
