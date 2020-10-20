import React, { useContext } from "react";
import { Context as GameContext } from "../context/GameContext";
import CatContainer from "./CatContainer";
import Board from "./Board";

export default () => {
  const {
    state: { board }
  } = useContext(GameContext);

  return (
    <CatContainer>
      <Board board={board} />
    </CatContainer>
  );
};
