import Game from "../../../src/client/pages/Game";
import React, { useEffect, useContext } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Context as GameContext } from "../../../src/client/context/GameContext";
import { TestAppGameProvider } from "../helpers/simulateGameContext";
import { TestAppSocketProvider } from "../helpers/simulateSocketContext";
import { TestAppHomeProvider } from "../helpers/simulateHomeContext";
import { describe, expect, test, jest } from "@jest/globals";
import {
  sampleLobbyInfo,
  sampleLobbyInfo2,
  sampleOpponentBoardActionObj,
  sampleOpponentScoreActionObj,
  sampleNextPieces,
  sampleGameScores
} from "../helpers/simulateGameContextValues";
import * as sockets from "../../../src/client/middleware/sockets";

Enzyme.configure({ adapter: new Adapter() });

describe("<Game />", () => {
  const LobbyInfoSetterComp = ({ children }) => {
    const { setLobbyInfo } = useContext(GameContext);
    useEffect(() => {
      setLobbyInfo(sampleLobbyInfo);
    }, []);
    return <>{children}</>;
  };

  const Wrapper = ({ SubWrapper = ({ children }) => <>{children}</> }) => (
    <TestAppHomeProvider>
      <TestAppSocketProvider>
        <TestAppGameProvider>
          <SubWrapper>
            <Game />
          </SubWrapper>
        </TestAppGameProvider>
      </TestAppSocketProvider>
    </TestAppHomeProvider>
  );

  let wrapper;

  beforeEach(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/",
        hash: "#yoloboys[voltery]"
      }
    });
  });

  test("setting lobby info sets isLoading to false ans displays .game-container div", () => {
    wrapper = mount(<Wrapper SubWrapper={LobbyInfoSetterComp} />);
    expect(wrapper.find(".game-container").length).toBe(1);
  });

  test("setting opponent boards displays <OpponentPreview/> component", () => {
    const OpponentSetterComp = ({ children }) => {
      const { setOpponentBoard, setOpponentScore } = useContext(GameContext);
      useEffect(() => {
        setOpponentBoard(sampleOpponentBoardActionObj);
        setOpponentScore(sampleOpponentScoreActionObj);
      }, []);
      return <LobbyInfoSetterComp>{children}</LobbyInfoSetterComp>;
    };
    wrapper = mount(<Wrapper SubWrapper={OpponentSetterComp} />);
    expect(wrapper.find(".game__opponent-container").length).toBe(1);
  });

  test("setting nextPieces array displays 3 .pieces-preview__piece-container divs", () => {
    const NextPiecesSetterComp = ({ children }) => {
      const { setNextPieces } = useContext(GameContext);
      useEffect(() => {
        setNextPieces(sampleNextPieces);
      }, []);
      return <LobbyInfoSetterComp>{children}</LobbyInfoSetterComp>;
    };
    wrapper = mount(<Wrapper SubWrapper={NextPiecesSetterComp} />);
    expect(wrapper.find(".pieces-preview__piece-container").length).toBe(3);
  });

  test("setting gameScores displays .game-lobby__scores-container table", () => {
    const LobbyInfoNotLeaderSetterComp = ({ children }) => {
      const { setLobbyInfo } = useContext(GameContext);
      useEffect(() => {
        setLobbyInfo(sampleLobbyInfo2);
      }, []);
      return <>{children}</>;
    };
    const GameScoresSetterComp = ({ children }) => {
      const { setGameScores } = useContext(GameContext);
      useEffect(() => {
        setGameScores(sampleGameScores);
      }, []);
      return (
        <LobbyInfoNotLeaderSetterComp>{children}</LobbyInfoNotLeaderSetterComp>
      );
    };
    wrapper = mount(<Wrapper SubWrapper={GameScoresSetterComp} />);
    expect(wrapper.find(".game-lobby__scores-container").length).toBe(1);
  });

  test("clicking start game button as game leader fires startGame function", () => {
    const startGameSpy = jest.spyOn(sockets, "startGame");
    wrapper = mount(<Wrapper SubWrapper={LobbyInfoSetterComp} />);
    console.log(
      wrapper
        .find("button")
        .at(1)
        .text()
    );
    wrapper
      .find("button")
      .at(0)
      .simulate("click");
    expect(startGameSpy).toHaveBeenCalledTimes(1);
  });
});
