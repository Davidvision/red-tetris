import { useEffect, useContext } from "react";
import socketIOClient from "socket.io-client";
import { Context as SocketContext } from "../context/SocketContext";
import { Context as GameContext } from "../context/GameContext";
import { Context as HomeContext } from "../context/HomeContext";
import { server } from "../../../params";
import { changePage, pages } from "../utils/router";

const { port, host } = server;
const ENDPOINT =
  process.env.NODE_ENV === "production" ? "" : `http://${host}:${port}/`;

export default () => {
  const { setSocketIOClient } = useContext(SocketContext);
  const { setAvailableRooms } = useContext(HomeContext);
  const { setNbPlaying, setLobbyInfo, resetGameContext } = useContext(
    GameContext
  );

  useEffect(() => {
    const socketClient = socketIOClient(ENDPOINT);
    setSocketIOClient(socketClient);

    socketClient.on("availableRooms", availableRooms =>
      setAvailableRooms(availableRooms)
    );

    socketClient.on("redirectToHome", () => {
      resetGameContext();
      changePage(pages[0].title, pages[0].path);
    });

    socketClient.on("lobbyInfo", data => setLobbyInfo(data));

    socketClient.on("setNbPlaying", nbPlaying => setNbPlaying(nbPlaying));

    return () => socketClient.disconnect();
  }, []);
};
