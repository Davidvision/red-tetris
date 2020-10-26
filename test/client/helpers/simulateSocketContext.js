import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SocketContextProvider } from "../../../src/client/context/SocketContext";
import useListenSocket from "../../../src/client/hooks/useListenSockets";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppSocketProvider = ({ children }) => (
  <SocketContextProvider>{children}</SocketContextProvider>
);

export const TestAppSocketProviderWithSocketClient = ({ children }) => {
  return (
    <TestAppSocketProvider>
      <SocketListenerSetterComp>{children}</SocketListenerSetterComp>
    </TestAppSocketProvider>
  );
};

const SocketListenerSetterComp = ({ children }) => {
  useListenSocket();
  return <>{children}</>;
};
