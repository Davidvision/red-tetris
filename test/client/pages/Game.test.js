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
  sampleNextPieces2,
  sampleNextPieces3,
  sampleGameScores
} from "../helpers/simulateGameContextValues";
import * as sockets from "../../../src/client/middleware/sockets";
import { Context as HomeContext } from "../../../src/client/context/HomeContext";
import ChangeTheme from "../../../src/client/components/ChangeTheme";

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

  test("setting nextPieces array displays 3 .pieces-preview__piece-container divs of type 0, 1 and 2", () => {
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

  test("setting nextPieces array displays 3 .pieces-preview__piece-container divs of type 3, 4 and 5", () => {
    const NextPiecesSetterComp = ({ children }) => {
      const { setNextPieces } = useContext(GameContext);
      useEffect(() => {
        setNextPieces(sampleNextPieces2);
      }, []);
      return <LobbyInfoSetterComp>{children}</LobbyInfoSetterComp>;
    };
    wrapper = mount(<Wrapper SubWrapper={NextPiecesSetterComp} />);
    expect(wrapper.find(".pieces-preview__piece-container").length).toBe(3);
  });

  test("setting nextPieces array displays 3 .pieces-preview__piece-container divs of type 6", () => {
    const NextPiecesSetterComp = ({ children }) => {
      const { setNextPieces } = useContext(GameContext);
      useEffect(() => {
        setNextPieces(sampleNextPieces3);
      }, []);
      return <LobbyInfoSetterComp>{children}</LobbyInfoSetterComp>;
    };
    wrapper = mount(<Wrapper SubWrapper={NextPiecesSetterComp} />);
    expect(wrapper.find(".pieces-preview__piece-container").length).toBe(1);
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
    wrapper
      .find(".game-lobby__start-btn")
      .at(0)
      .simulate("click");
    expect(startGameSpy).toHaveBeenCalledTimes(1);
  });
});

describe("<Game /> mobile layout", () => {
  const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event("resize"));
  };

  const LobbyInfoSetterAndWindowResizerComp = ({ children }) => {
    const { setLobbyInfo } = useContext(GameContext);
    const {
      state: { isMobile },
      setIsMobile
    } = useContext(HomeContext);

    useEffect(() => {
      setLobbyInfo(sampleLobbyInfo);
      setIsMobile(true);
    }, []);
    if (!isMobile) return null;
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

  let wrapper, keyDownSpy, keyUpSpy;

  beforeEach(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/",
        hash: "#yoloboys[voltery]"
      }
    });
    resizeWindow(375, 667);
    keyDownSpy = jest.spyOn(sockets, "keyDown");
    keyUpSpy = jest.spyOn(sockets, "keyUp");
  });

  afterEach(() => {
    keyDownSpy.mockClear();
    keyUpSpy.mockClear();
  });

  test(".menu-icon is present and clickable when mobile mode", () => {
    wrapper = mount(
      <Wrapper SubWrapper={LobbyInfoSetterAndWindowResizerComp} />
    );

    wrapper
      .find(".mobile-menu__icon")
      .at(0)
      .simulate("click");
    expect(wrapper.find(".mobile-menu__icon").length).toBe(1);
  });

  test("touching mobile-controls__left fires keyDown and keyUp functions with ArrowLeft arg", () => {
    wrapper = mount(
      <Wrapper SubWrapper={LobbyInfoSetterAndWindowResizerComp} />
    );
    const arrowLeftElem = wrapper.find(".mobile-controls__left").at(0);

    arrowLeftElem.simulate("touchStart");
    arrowLeftElem.simulate("touchEnd");
    expect(keyDownSpy.mock.calls[0][1]).toBe("ArrowLeft");
    expect(keyUpSpy.mock.calls[0][1]).toBe("ArrowLeft");
  });

  test("touching mobile-controls__middle__1 first child fires keyDown and keyUp functions with ArrowUp arg", () => {
    wrapper = mount(
      <Wrapper SubWrapper={LobbyInfoSetterAndWindowResizerComp} />
    );
    const arrowUpElem = wrapper
      .find(".mobile-controls__middle__1")
      .at(0)
      .children()
      .at(0);
    arrowUpElem.simulate("touchStart");
    arrowUpElem.simulate("touchEnd");
    expect(keyDownSpy.mock.calls[0][1]).toBe("ArrowUp");
    expect(keyUpSpy.mock.calls[0][1]).toBe("ArrowUp");
  });

  test("touching mobile-controls__middle__1 second child fires keyDown and keyUp functions with ArrowDown arg", () => {
    wrapper = mount(
      <Wrapper SubWrapper={LobbyInfoSetterAndWindowResizerComp} />
    );
    const arrowDownElem = wrapper
      .find(".mobile-controls__middle__1")
      .at(0)
      .children()
      .at(1);
    arrowDownElem.simulate("touchStart");
    arrowDownElem.simulate("touchEnd");
    expect(keyDownSpy.mock.calls[0][1]).toBe("ArrowDown");
    expect(keyUpSpy.mock.calls[0][1]).toBe("ArrowDown");
  });

  test('touching mobile-controls__middle second child fires keyDown and keyUp functions with " " arg', () => {
    wrapper = mount(
      <Wrapper SubWrapper={LobbyInfoSetterAndWindowResizerComp} />
    );
    const spaceElem = wrapper
      .find(".mobile-controls__middle")
      .at(0)
      .children()
      .at(1);
    spaceElem.simulate("touchStart");
    spaceElem.simulate("touchEnd");
    expect(keyDownSpy.mock.calls[0][1]).toBe(" ");
    expect(keyUpSpy.mock.calls[0][1]).toBe(" ");
  });

  test("touching mobile-controls__right fires keyDown and keyUp functions with ArrowRight arg", () => {
    wrapper = mount(
      <Wrapper SubWrapper={LobbyInfoSetterAndWindowResizerComp} />
    );
    const arrowRightElem = wrapper.find(".mobile-controls__right").at(0);

    arrowRightElem.simulate("touchStart");
    arrowRightElem.simulate("touchEnd");
    expect(keyDownSpy.mock.calls[0][1]).toBe("ArrowRight");
    expect(keyUpSpy.mock.calls[0][1]).toBe("ArrowRight");
  });
});

describe("<ChangeTheme />", () => {
  let wrapper;
  const Wrapper = () => (
    <div id="tetris" className="theme-1">
      <ChangeTheme />
    </div>
  );

  beforeAll(() => {
    const div = document.createElement("div");
    div.setAttribute("id", "container");
    document.body.appendChild(div);
  });

  afterAll(() => {
    const div = document.getElementById("container");
    if (div) {
      document.body.removeChild(div);
    }
  });

  beforeEach(() => {
    wrapper = mount(<Wrapper />, {
      attachTo: document.getElementById("container")
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("clicking 3 times changes div className back to theme-0", () => {
    const changeThemeButton = wrapper.find(".change-theme").at(0);
    changeThemeButton.simulate("click");
    changeThemeButton.simulate("click");
    changeThemeButton.simulate("click");
    expect(wrapper.find(".theme-1").length).toBe(1);
  });
});
