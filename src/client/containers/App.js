import { hot } from "react-hot-loader";
import React from "react";
import { Provider as GameProvider } from "../context/GameContext";
import { SocketContextProvider } from "../context/SocketContext";
import { Provider as HomeProvider } from "../context/HomeContext";
import Website from "./Website";
process.env.NODE_ENV === "production"
  ? require("../../../public/assets/styles/main.css")
  : require("../sass/main.scss");

const App = () => (
  <HomeProvider>
    <GameProvider>
      <SocketContextProvider>
        <Website />
      </SocketContextProvider>
    </GameProvider>
  </HomeProvider>
);

export default hot(module)(App);
