import React, { useState, useContext } from "react";
import { changePage, pages } from "../utils/router";
import { Context as HomeContext } from "../context/HomeContext";
import { SocketContext } from "../context/SocketContext";
import { createPrivateGame } from "../middleware/sockets";

export default () => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [joinRoom, setJoinRoom] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const {
    state: { availableRooms, userName },
    setUserName
  } = useContext(HomeContext);
  const { socketIOClient } = useContext(SocketContext);

  const handleSubmit = e => {
    e.preventDefault();
    let tmpErrorObj = {};
    if (!isNameValid(userName)) {
      tmpErrorObj.name = playerNameErrorStr;
    }
    if (joinRoom) {
      if (!Object.keys(selectedRoom).length) {
        tmpErrorObj.selectedRoom = selectedRoomErrorStr;
      } else if (
        selectedRoom.players.findIndex(playerName => playerName === userName) >
        -1
      ) {
        tmpErrorObj.name = playerNameAlreadyTakenInRoomStr;
      }
    } else {
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
    if (!joinRoom && isPrivate) {
      console.log("WESHHHH");
      createPrivateGame(socketIOClient, roomName, userName);
    }
    changePage(
      pages[1].title,
      "",
      `/#${joinRoom ? selectedRoom.name : roomName}[${userName}]`
    );
  };

  const handleSelectRoom = room => {
    if (room.nb > 3 || room.isPrivate) return;
    setSelectedRoom(room);
  };

  return (
    <form className="home-form-container" onSubmit={handleSubmit}>
      <label>Username: </label>
      <input
        type="text"
        value={userName}
        name="username"
        onChange={e => setUserName(e.target.value)}
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
          <div>
            <label>Play solo: </label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={e => setIsPrivate(e.target.checked)}
            />
          </div>
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
            key={room.name}
            className={`room-select__option${
              selectedRoom.name === room.name
                ? " room-select__option--selected"
                : ""
            }`}
            onClick={() => handleClick(room)}
          >
            {getSelectRoomStr(room)}
          </li>
        ))}
    </ul>
  </>
);

const getSelectRoomStr = ({ name, nb, isPrivate }) =>
  (name += isPrivate ? ` (private)` : ` (${nb} player${nb > 1 ? "s" : ""})`);

const playerNameErrorStr =
  'Your name must contain at least 3 and at most 15 alphanumeric, "-" or "_" characters.';

const roomNameErrorStr =
  'The room name must contain at least 3 and at most 15 alphanumeric, "-" or "_" characters.';

const selectedRoomErrorStr = "Please select a valid room to join";

const notAvailableRoomNameStr = "This room name is already in use";

const playerNameAlreadyTakenInRoomStr =
  "This player name is already taken in this room";

const isNameValid = name =>
  !(
    name.length < 3 ||
    name.length > 15 ||
    name.match(/^[a-z0-9-_]+$/i) === null
  );
