import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import { threeRoomsMockup } from "../helpers/simulateRoomsData";
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
    setAvailableRooms(threeRoomsMockup);
  }, []);
  return <>{children}</>;
};
