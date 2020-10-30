import React, { useContext } from "react";
import { Context as GameContext } from "../context/GameContext";
import { Context as HomeContext } from "../context/HomeContext";
import CatContainer from "./CatContainer";
import Board from "./Board";

export default () => {
  const {
    state: { board }
  } = useContext(GameContext);
  const {
    state: { isMobile, winHeight }
  } = useContext(HomeContext);

  return (
    <CatContainer>
      <Board
        board={board}
        customDims={
          isMobile ? { height: winHeight * 0.6, width: winHeight * 0.3 } : {}
        }
      />
    </CatContainer>
  );
};
