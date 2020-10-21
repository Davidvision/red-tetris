import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { keyDown, keyUp } from "../middleware/sockets";

const allowedKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];

export default isPlaying => {
  const { socketIOClient } = useContext(SocketContext);

  useEffect(() => {
    let isListenerSet = false;
    let keyPressed = "";
    const handleKeyDown = e => {
      if (
        document.activeElement.id !== "chatInput" &&
        allowedKeys.findIndex(allowedKey => allowedKey === e.key) > -1
      ) {
        keyDown(socketIOClient, e.key);
      }
    };
    const handleKeyUp = e => {
      if (
        document.activeElement.id !== "chatInput" &&
        allowedKeys.findIndex(allowedKey => allowedKey === e.key) > -1
      ) {
        keyUp(socketIOClient, e.key);
      }
    };
    if (isPlaying) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      isListenerSet = true;
    }
    return () => {
      if (isListenerSet) {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
        isListenerSet = false;
      }
    };
  }, [isPlaying]);
};
