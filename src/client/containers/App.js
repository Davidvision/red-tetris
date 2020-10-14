import { hot } from "react-hot-loader";
import React from "react";
import { Provider as GameProvider } from "../context/GameContext";
import { Provider as SocketProvider } from "../context/SocketContext";
import { Provider as HomeProvider } from "../context/HomeContext";
import Website from "./Website";
process.env.NODE_ENV === "production"
  ? require("../sass/main.css")
  : require("../sass/main.scss");

const App = () => (
  <HomeProvider>
    <GameProvider>
      <SocketProvider>
        <Website />
      </SocketProvider>
    </GameProvider>
  </HomeProvider>
);

export default hot(module)(App);
