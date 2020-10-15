import { hot } from "react-hot-loader";
import React from "react";
import { Provider as GameProvider } from "../context/GameContext";
// import { Provider as SocketProvider } from "../context/SocketContext";
import { SocketContextProvider } from "../context/SocketContext";
import { Provider as HomeProvider } from "../context/HomeContext";
import Website from "./Website";
process.env.NODE_ENV === "production"
  ? require("../sass/main.css")
  : require("../sass/main.scss");

const App = () => (
  <HomeProvider>
    <GameProvider>
      <SocketContextProvider>
        {/* <SocketProvider> */}
        <Website />
      </SocketContextProvider>
      {/* </SocketProvider> */}
    </GameProvider>
  </HomeProvider>
);

export default hot(module)(App);
