import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { keyDown, keyUp } from "../middleware/sockets";

const allowedKeys = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Space"
];

export default isPlaying => {
  const { socketIOClient } = useContext(SocketContext);

  useEffect(() => {
    let isListenerSet = false;
    let keyPressed = "";
    const handleKeyDown = e => {
      if (
        keyPressed === "" &&
        allowedKeys.findIndex(allowedKey => allowedKey === e.key) > -1
      ) {
        keyPressed = e.key;
        keyDown(socketIOClient, keyPressed);
      }
    };
    const handleKeyUp = e => {
      if (keyPressed === e.key) {
        keyUp(socketIOClient, keyPressed);
        keyPressed = "";
      }
    };
    if (isPlaying) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      isListenerSet = true;
    }
    return () => {
      if (isListenerSet) {
        console.log("UNMOUNT");
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
        isListenerSet = false;
      }
    };
  }, [isPlaying]);
};
