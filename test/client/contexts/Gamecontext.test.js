import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TestAppGameProvider } from "../helpers/simulateGameContext";
import { Context as GameContext } from "../../../src/client/context/GameContext";
import {
  boardWithOnePiece,
  sampleOpponentBoardActionObj,
  sampleOpponentScoreActionObj,
  sampleMessages1,
  sampleMessages2,
  sampleGameScores,
  sampleNextPieces,
  sampleLobbyInfo
} from "../helpers/simulateGameContextValues";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("GameContext action functions", () => {
  let contextValues;

  const TestAppGameProviderWrapper = ({ children }) => (
    <TestAppGameProvider>{children}</TestAppGameProvider>
  );

  test("setBoard sets expected board", () => {
    const BoardSetterComp = () => {
      const { setBoard, state } = useContext(GameContext);
      contextValues = state;
      useEffect(() => {
        setBoard(boardWithOnePiece);
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppGameProviderWrapper>
        <BoardSetterComp />
      </TestAppGameProviderWrapper>
    );

    mount(<Wrapper />);
    expect(contextValues.board).toEqual(boardWithOnePiece);
  });

  test("setOpponentBoard and setOpponentScore sets expected opponents object", () => {
    const OpponentSetterComp = () => {
      const { setOpponentBoard, setOpponentScore, state } = useContext(
        GameContext
      );
      contextValues = state;
      useEffect(() => {
        setOpponentBoard(sampleOpponentBoardActionObj);
        setOpponentScore(sampleOpponentScoreActionObj);
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppGameProviderWrapper>
        <OpponentSetterComp />
      </TestAppGameProviderWrapper>
    );

    mount(<Wrapper />);
    expect(contextValues.opponents).toEqual({
      hugo: { board: boardWithOnePiece, score: 1000 }
    });
  });

  test("setOpponentScore sets expected score", () => {
    const testScore = 1000;
    const ScoreSetterComp = () => {
      const { setScore, state } = useContext(GameContext);
      contextValues = state;
      useEffect(() => {
        setScore(testScore);
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppGameProviderWrapper>
        <ScoreSetterComp />
      </TestAppGameProviderWrapper>
    );

    mount(<Wrapper />);
    expect(contextValues.score).toBe(testScore);
  });

  test("setMessage called 2 times concats messages", () => {
    const MessageSetterComp = () => {
      const { setMessage, state } = useContext(GameContext);
      contextValues = state;
      useEffect(() => {
        setMessage(sampleMessages1);
        setMessage(sampleMessages2);
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppGameProviderWrapper>
        <MessageSetterComp />
      </TestAppGameProviderWrapper>
    );

    mount(<Wrapper />);
    expect(contextValues.messages).toEqual([sampleMessages1, sampleMessages2]);
  });

  test("setGameScores sets expected gameScore object", () => {
    const GameScoresSetterComp = () => {
      const { setGameScores, state } = useContext(GameContext);
      contextValues = state;
      useEffect(() => {
        setGameScores(sampleGameScores);
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppGameProviderWrapper>
        <GameScoresSetterComp />
      </TestAppGameProviderWrapper>
    );

    mount(<Wrapper />);
    expect(contextValues.gameScores).toEqual(sampleGameScores);
  });

  test("setNextPieces sets expected nextPieces array", () => {
    const NextPiecesSetterComp = () => {
      const { setNextPieces, state } = useContext(GameContext);
      contextValues = state;
      useEffect(() => {
        setNextPieces(sampleNextPieces);
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppGameProviderWrapper>
        <NextPiecesSetterComp />
      </TestAppGameProviderWrapper>
    );

    mount(<Wrapper />);
    expect(contextValues.nextPieces).toEqual(sampleNextPieces);
  });

  test("setIsPlaying sets isPlaying to true", () => {
    const IsPlayingSetterComp = () => {
      const { setIsPlaying, state } = useContext(GameContext);
      contextValues = state;
      useEffect(() => {
        setIsPlaying(true);
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppGameProviderWrapper>
        <IsPlayingSetterComp />
      </TestAppGameProviderWrapper>
    );

    mount(<Wrapper />);
    expect(contextValues.isPlaying).toBe(true);
  });

  test("setLobbyInfo sets expected lobbyInfoObj", () => {
    const LobbyInfoSetterComp = () => {
      const { setLobbyInfo, state } = useContext(GameContext);
      contextValues = state;
      useEffect(() => {
        setLobbyInfo(sampleLobbyInfo);
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppGameProviderWrapper>
        <LobbyInfoSetterComp />
      </TestAppGameProviderWrapper>
    );

    mount(<Wrapper />);
    expect(contextValues.players).toEqual(sampleLobbyInfo.players);
  });

  test("resetState", () => {
    let initStateValues;
    const StateReseterComp = () => {
      const { resetGameContext, state } = useContext(GameContext);
      contextValues = state;
      useEffect(() => {
        initStateValues = state;
        resetGameContext();
      }, []);
      return null;
    };
    const Wrapper = () => (
      <TestAppGameProviderWrapper>
        <StateReseterComp />
      </TestAppGameProviderWrapper>
    );

    mount(<Wrapper />);
    expect(contextValues).toEqual(initStateValues);
  });
});
