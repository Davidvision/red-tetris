import React, { useState } from "react";

export default () => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");

  const onNameSubmit = () => {
    if (name.length < 2 && name.length > 15) return;
  };
  const onRoomNameSubmit = () => {
    if (name.length < 2 && name.length > 15 && roomName.length !== 10) return;
  };

  return (
    <>
      <label>Username: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <br />
      <button onClick={onNameSubmit}>Join Room</button>
      <br />
      <label>Room: </label>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      ></input>
      <br />
      <button onClick={onRoomNameSubmit}>New Room</button>
    </>
  );
};
