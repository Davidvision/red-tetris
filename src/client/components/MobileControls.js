import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Context as HomeContext } from "../context/HomeContext";
import { keyDown, keyUp } from "../middleware/sockets";

export default () => {
  const { socketIOClient } = useContext(SocketContext);
  const {
    state: { winHeight }
  } = useContext(HomeContext);

  const handleTouchStart = key => keyDown(socketIOClient, key);

  const handleTouchEnd = key => keyUp(socketIOClient, key);

  return (
    <div
      className="mobile-controls-container"
      style={{ height: winHeight * 0.2 }}
    >
      <div
        style={{ height: winHeight * 0.2 }}
        className="noSelect mobile-controls__left mobile-controls__control"
        onTouchStart={() => handleTouchStart("ArrowLeft")}
        onTouchEnd={() => handleTouchEnd("ArrowLeft")}
      >
        <p className="noSelect game__label">Left</p>
      </div>
      <div
        className="mobile-controls__middle"
        style={{ height: winHeight * 0.2 }}
      >
        <div
          className="mobile-controls__middle__1"
          style={{ height: winHeight * 0.1 }}
        >
          <div
            className="noSelect mobile-controls__control"
            onTouchStart={() => handleTouchStart("ArrowUp")}
            onTouchEnd={() => handleTouchEnd("ArrowUp")}
          >
            <p className="noSelect game__label">Rotate</p>
          </div>
          <div
            className="noSelect mobile-controls__control"
            onTouchStart={() => handleTouchStart("ArrowDown")}
            onTouchEnd={() => handleTouchEnd("ArrowDown")}
          >
            <p className="noSelect game__label">Down</p>
          </div>
        </div>
        <div
          style={{ height: winHeight * 0.1 }}
          className="noSelect mobile-controls__control"
          onTouchStart={() => handleTouchStart(" ")}
          onTouchEnd={() => handleTouchEnd(" ")}
        >
          <p className="noSelect game__label">To bottom</p>
        </div>
      </div>
      <div
        style={{ height: winHeight * 0.2 }}
        className="noSelect mobile-controls__right mobile-controls__control"
        onTouchStart={() => handleTouchStart("ArrowRight")}
        onTouchEnd={() => handleTouchEnd("ArrowRight")}
      >
        <p className="noSelect game__label">Right</p>
      </div>
    </div>
  );
};
