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
      { id: "qwertyuiop", name: "axelS", nb: 3 },
      { id: "asdfghjklq", name: "hugoS", nb: 4 },
      { id: "zxcvbnmawe", name: "milano", nb: 2 },
      { id: "qwertyui67", name: "67Gangs", nb: 1 }
    ]);
  }, []);
  return <>{children}</>;
};
