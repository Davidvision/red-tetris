import React, { useState } from "react";

export default () => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorRoomName, setErrorRoomName] = useState(false);

  const onNameSubmit = () => {
    console.log(isPlayerNameValid(name));
    if (!isPlayerNameValid(name)) {
      setErrorName(true);
      return;
    }
    setErrorName(false);
  };

  const onNameAndRoomNameSubmit = () => {
    console.log(isRoomNameValid(roomName));
    if (!isPlayerNameValid(name)) {
      setErrorName(true);
      return;
    }
    setErrorName(false);
    if (!isRoomNameValid(roomName)) {
      setErrorRoomName(true);
      return;
    }
    setErrorRoomName(false);
  };

  return (
    <div className="home-form-container">
      <label>Username: </label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      ></input>
      <br />
      {errorName && (
        <p>
          Your name must contain at least 3 and at most 15 alphanumeric, "-" or
          "_" characters.
        </p>
      )}
      <button type="submit" onClick={onNameSubmit}>
        New Room
      </button>
      <label>Room: </label>
      <input
        type="text"
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
      ></input>
      {errorRoomName && <p>Invalid room name</p>}
      <br />
      <button type="submit" onClick={onNameAndRoomNameSubmit}>
        Join room
      </button>
    </div>
  );
};

const isPlayerNameValid = name =>
  !(
    name.length < 3 ||
    name.length > 15 ||
    name.match(/^[a-z0-9-_]+$/i) === null
  );

const isRoomNameValid = roomName =>
  !(roomName.length !== 10 || roomName.match(/^[a-z0-9]+$/i) === null);
