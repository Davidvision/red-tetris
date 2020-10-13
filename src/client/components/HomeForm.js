import React, { useState, useContext } from "react";
import { changePage, pages } from "../utils/router";
import { Context as GameContext } from "../context/GameContext";

export default () => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [joinRoom, setJoinRoom] = useState(false);

  const {
    state: { availableRooms }
  } = useContext(GameContext);

  const handleSubmit = e => {
    e.preventDefault();
    let tmpErrorObj = {};
    if (!isNameValid(name)) {
      tmpErrorObj.name = playerNameErrorStr;
    }
    if (joinRoom && !Object.keys(selectedRoom).length) {
      tmpErrorObj.selectedRoom = selectedRoomErrorStr;
    }
    if (!joinRoom) {
      if (!isNameValid(roomName)) {
        tmpErrorObj.roomName = roomNameErrorStr;
      }
      if (availableRooms.findIndex(({ name }) => name === roomName) > -1) {
        tmpErrorObj.notAvailableRoomName = notAvailableRoomNameStr;
      }
    }
    if (Object.keys(tmpErrorObj).length) {
      setErrorObj(tmpErrorObj);
      return;
    }
    setErrorObj({});
    changePage(pages[1].title, "", `/#${roomName}[${name}]`);
  };

  const handleSelectRoom = room => {
    if (room.nb > 3) return;
    setSelectedRoom(room);
  };

  return (
    <form className="home-form-container" onSubmit={handleSubmit}>
      <label>Username: </label>
      <input
        type="text"
        value={name}
        name="username"
        onChange={e => setName(e.target.value)}
      ></input>
      <br />
      {errorObj.name && <p className="home-form__error">{errorObj.name}</p>}
      <div>
        <button
          type="button"
          style={{ color: !joinRoom ? "red" : "" }}
          onClick={() => setJoinRoom(false)}
        >
          Create Room
        </button>
        <button
          type="button"
          style={{ color: joinRoom ? "red" : "" }}
          onClick={() => setJoinRoom(true)}
        >
          Join room
        </button>
      </div>
      {!joinRoom && (
        <>
          <label>Room name: </label>
          <input
            name="room-name"
            type="text"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
          ></input>
          {errorObj.roomName && (
            <p className="home-form__error">{errorObj.roomName}</p>
          )}
          {errorObj.notAvailableRoomName && (
            <p className="home-form__error">{errorObj.notAvailableRoomName}</p>
          )}
        </>
      )}
      {joinRoom && (
        <RoomSelect
          rooms={availableRooms}
          selectedRoom={selectedRoom}
          handleClick={handleSelectRoom}
        />
      )}
      {errorObj.selectedRoom && (
        <p className="home-form__error">{errorObj.selectedRoom}</p>
      )}
      <br />
      <button type="submit">{joinRoom ? "Join" : "Create"}</button>
    </form>
  );
};

const RoomSelect = ({ rooms, handleClick, selectedRoom }) => (
  <>
    <p>Available rooms:</p>
    <ul className="room-select-container">
      {rooms.length > 0 &&
        rooms.map(room => (
          <li
            key={room.id}
            className={`room-select__option${
              selectedRoom.id === room.id
                ? " room-select__option--selected"
                : ""
            }`}
            onClick={() => handleClick(room)}
          >
            {`${room.name} (${room.nb} player${room.nb > 1 ? "s" : ""})`}
          </li>
        ))}
    </ul>
  </>
);

const playerNameErrorStr =
  'Your name must contain at least 3 and at most 15 alphanumeric, "-" or "_" characters.';

const roomNameErrorStr =
  'The room name must contain at least 3 and at most 15 alphanumeric, "-" or "_" characters.';

const selectedRoomErrorStr = "Please select a valid room to join";

const notAvailableRoomNameStr = "This room name is already in use";

const isNameValid = name =>
  !(
    name.length < 3 ||
    name.length > 15 ||
    name.match(/^[a-z0-9-_]+$/i) === null
  );
