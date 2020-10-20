import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider as GameProvider } from "../../../src/client/context/GameContext";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppGameProvider = ({ children }) => (
  <GameProvider>{children}</GameProvider>
);
