import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Context as HomeContext } from "../context/HomeContext";
import { Context as GameContext } from "../context/GameContext";
import { sendChatMessage } from "../middleware/sockets";

export default ({ label = true }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const scrollRef = useRef(null);
  const { socketIOClient } = useContext(SocketContext);
  const {
    state: { messages }
  } = useContext(GameContext);
  const {
    state: { userName }
  } = useContext(HomeContext);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = e => {
    e.preventDefault();
    if (currentMessage === "") return;
    sendChatMessage(socketIOClient, userName, currentMessage);
    setCurrentMessage("");
  };

  return (
    <div className="game__chat-container">
      {label && <p className="game__label">Chat !</p>}
      <ChatMessages
        messages={messages}
        scrollRef={scrollRef}
        userName={userName}
      />
      <form onSubmit={handleSubmit}>
        <div className="game__chat__send-container">
          <input
            autoComplete="off"
            id="chatInput"
            name="message"
            type="text"
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
          ></input>
          <button className="btn game__chat__submit" type="submit">
            send
          </button>
        </div>
      </form>
    </div>
  );
};

const ChatMessages = memo(({ messages, scrollRef, userName }) => (
  <ul className="room-select-container noSelect" ref={scrollRef}>
    {messages.map(({ sender, message }, index) => (
      <li className="game__chat-message" key={index}>{`${
        sender === userName ? "You" : sender
      }: ${message}`}</li>
    ))}
  </ul>
));
