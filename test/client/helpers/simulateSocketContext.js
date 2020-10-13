import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider as SocketProvider } from "../../../src/client/context/SocketContext";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppSocketProvider = ({ children }) => (
  <SocketProvider>{children}</SocketProvider>
);
