import React, { memo, useContext, useState } from "react";
import { Context as GameContext } from "../context/GameContext";
import Board from "../components/Board";
import { startGame } from "../middleware/sockets";
import useInitGame from "../hooks/useInitGame";
import PlayerBoard from "../components/PlayerBoard";
import BoardPixel from "../components/BoardPixel";
import Lobby from "../containers/Lobby";
import QuitGameBtn from "../components/QuitGameButton";
import Chat from "../components/Chat";
import CatContainer from "../components/CatContainer";
import { pieces as piecesData } from "../../data/pieces.json";

export default () => {
  const {
    resetGameContext,
    state: { isLoading, opponents, isPlaying, score, nextPieces }
  } = useContext(GameContext);

  useInitGame(isPlaying);

  if (isLoading) return null;

  return (
    <div className="game-container">
      <CatContainer>
        <OpponentsPreview opponents={opponents} />
        <Chat />
      </CatContainer>
      <PlayerBoard />
      <CatContainer>
        <PiecesPreview pieces={nextPieces} />
        <p>{`score: ${score}`}</p>
        <QuitGameBtn callBack={resetGameContext} />
      </CatContainer>
      {!isPlaying && <Lobby />}
    </div>
  );
};

const OpponentsPreview = memo(({ opponents }) => (
  <div className="game__opponents-container">
    {Object.keys(opponents).map((opponentName, index) => (
      <OpponentPreview
        key={index}
        name={opponentName}
        score={opponents[opponentName].score}
        board={opponents[opponentName].board}
      />
    ))}
  </div>
));

const OpponentPreview = memo(({ score, board, name }) => (
  <div className="game__opponent-container">
    <p>{name}</p>
    <p>{`score : ${score}`}</p>
    <Board board={board} colors={false} />
  </div>
));

const PiecesPreview = memo(({ pieces }) => (
  <div className="pieces-preview__container">
    {pieces.map((pieceType, index) => (
      <div
        key={index}
        className={`pieces-preview__piece-container${
          pieceType === 0 || pieceType === 3
            ? ` pieces-preview__piece-container--${pieceType}`
            : ""
        }`}
      >
        {piecesData[pieceType][0].map((y, yi) =>
          y.map((x, xi) => <BoardPixel color={x} key={xi} />)
        )}
      </div>
    ))}
  </div>
));
