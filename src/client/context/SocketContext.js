import React, { createContext } from "react";
import { server } from "../../../params";
import socketIOClient from "socket.io-client";

const { port, host } = server;
const ENDPOINT =
  process.env.NODE_ENV === "production" ? "" : `http://${host}:${port}/`;

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => (
  <SocketContext.Provider
    value={{
      socketIOClient: socketIOClient(ENDPOINT)
    }}
  >
    {children}
  </SocketContext.Provider>
);
