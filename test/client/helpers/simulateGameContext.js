import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider as GameProvider } from "../../../src/client/context/GameContext";
import { Context as GameContext } from "../../../src/client/context/GameContext";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppGameProvider = ({ children }) => (
  <GameProvider>{children}</GameProvider>
);

export const TestAppGameProviderWithThreeRooms = ({ children }) => (
  <TestAppGameProvider>
    <ThreeRoomsSetterComp>{children}</ThreeRoomsSetterComp>
  </TestAppGameProvider>
);

const ThreeRoomsSetterComp = ({ children }) => {
  const { setAvailableRooms } = useContext(GameContext);
  useEffect(() => {
    setAvailableRooms([
      {
        name: "axelS",
        nb: 3,
        players: ["axelRump", "hugo", "player3"],
        isPrivate: false
      },
      {
        name: "hugoS",
        nb: 4,
        players: ["yoloboy", "67-mitraille", "sadboy34", "lol"],
        isPrivate: false
      },
      {
        name: "milano",
        nb: 2,
        players: ["hugmit", "robinginss"],
        isPrivate: false
      },
      { name: "67Gangs", nb: 1, players: ["play1"], isPrivate: true }
    ]);
  }, []);
  return <>{children}</>;
};
