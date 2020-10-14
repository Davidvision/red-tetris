import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider as HomeProvider } from "../../../src/client/context/HomeContext";
import { Context as HomeContext } from "../../../src/client/context/HomeContext";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppHomeProvider = ({ children }) => (
  <HomeProvider>{children}</HomeProvider>
);

export const TestAppHomeProviderWithThreeRooms = ({ children }) => (
  <TestAppHomeProvider>
    <ThreeRoomsSetterComp>{children}</ThreeRoomsSetterComp>
  </TestAppHomeProvider>
);

const ThreeRoomsSetterComp = ({ children }) => {
  const { setAvailableRooms } = useContext(HomeContext);
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
