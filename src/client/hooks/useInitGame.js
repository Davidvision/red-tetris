import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { connectToGame, quitGame } from "../middleware/sockets";
import { Context as HomeContext } from "../context/HomeContext";
import useKeyboard from "./useKeyboard";

export default isPlaying => {
  const { socketIOClient } = useContext(SocketContext);
  const { setUserName } = useContext(HomeContext);

  useKeyboard(isPlaying);

  useEffect(() => {
    let regex = /^\/\#([a-zA-Z0-9]{3,15})\[([a-zA-Z0-9]{3,15})\]$/gm;
    const gamePath = window.location.pathname + window.location.hash;
    const [_, roomName, name] = regex.exec(gamePath);
    setUserName(name);
    connectToGame(socketIOClient, roomName, name);
    return () => quitGame(socketIOClient);
  }, []);
};
