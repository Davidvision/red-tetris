import React, { memo, useContext, useEffect, useState } from "react";
import { Context as GameContext } from "../context/GameContext";
import { Context as HomeContext } from "../context/HomeContext";
import ChangeTheme from "../components/ChangeTheme";
import Board from "../components/Board";
import useInitGame from "../hooks/useInitGame";
import PlayerBoard from "../components/PlayerBoard";
import Lobby from "../containers/Lobby";
import PiecesPreview from "../components/PiecesPreview";
import Logo from "../assets/images/logo.png";
import QuitGameBtn from "../components/QuitGameButton";
import Chat from "../components/Chat";
import CatContainer from "../components/CatContainer";
import MobileControls from "../components/MobileControls";

export default () => {
  const {
    state: { isLoading, isPlaying }
  } = useContext(GameContext);
  const {
    state: { isMobile }
  } = useContext(HomeContext);

  useInitGame(isPlaying);

  if (isLoading) return null;

  return isMobile ? <MobileGameLayout /> : <DesktopGameLayout />;
};

const DesktopGameLayout = () => {
  const {
    resetGameContext,
    state: { opponents, score, nextPieces, players, isPlaying }
  } = useContext(GameContext);

  return (
    <div className="game-container">
      <ChangeTheme />
      <CatContainer cClass="game__left">
        {players.length > 1 && (
          <>
            <OpponentsPreview
              opponents={opponents}
              nbOpponents={players.length}
            />
            <Chat />
          </>
        )}
      </CatContainer>
      <CatContainer cClass="game__middle">
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

const MobileGameLayout = () => {
  const {
    state: { score, nextPieces, isPlaying }
  } = useContext(GameContext);
  const {
    state: { winHeight }
  } = useContext(HomeContext);

  return (
    <div className="game-container" style={{ height: winHeight }}>
      <MobileMenu />
      <CatContainer
        cClass="game__left"
        customStyle={{ height: winHeight * 0.2 }}
      >
        <PiecesPreview pieces={nextPieces} />
        <Score score={score} />
      </CatContainer>
      <CatContainer
        cClass="game__middle"
        customStyle={{ height: winHeight * 0.6 }}
      >
        <img className="game__logo" src={Logo} />
        <PlayerBoard />
      </CatContainer>
      <CatContainer customStyle={{ height: winHeight * 0.2 }}>
        <MobileControls />
      </CatContainer>
      {!isPlaying && <Lobby />}
    </div>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const {
    resetGameContext,
    state: { isPlaying }
  } = useContext(GameContext);

  useEffect(() => {
    if (open && !isPlaying) {
      setOpen(false);
    }
  }, [isPlaying]);

  return (
    <>
      <div
        className={`mobile-menu__icon ${open ? "mobile-menu__cross" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div
        className={`mobile-menu-container ${
          open ? "mobile-menu-container--open" : ""
        }`}
      >
        <ChangeTheme />
        <QuitGameBtn callBack={resetGameContext} />
      </div>
    </>
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
    <p>{`Score : ${score === undefined ? 0 : score}`}</p>
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
