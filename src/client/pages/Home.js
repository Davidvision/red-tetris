import React, { useState, useContext, useEffect } from "react";
import { changePage, pages } from "../utils/router";
import { Context as HomeContext } from "../context/HomeContext";
import { SocketContext } from "../context/SocketContext";
import Logo from "../assets/img/logo.png";
import { createPrivateGame } from "../middleware/sockets";
import { use } from "chai";

export default () => {
  const [roomName, setRoomName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [errorSubmit, setErrorSubmit] = useState({});
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
      setErrorSubmit(true);
      setErrorObj(tmpErrorObj);
      return;
    }
    setErrorObj({});
    if (!joinRoom && isPrivate) {
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
    setErrorSubmit(false);
    setSelectedRoom(room);
  };

  useEffect(() => {
    setErrorSubmit(false);
  }, [userName, roomName, joinRoom, selectedRoom]);

  useEffect(() => {
    setErrorObj({});
  }, [joinRoom]);

  const unsetErrorObjKey = key => {
    setErrorObj({ ...errorObj, [key]: undefined });
  };

  return (
    <div className="home-container">
      <img className="home__logo" src={Logo} />
      <form className="home-form-container" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          style={{ marginBottom: "30px" }}
          type="text"
          value={userName}
          name="username"
          spellCheck="false"
          onChange={e => {
            unsetErrorObjKey("name");
            setUserName(e.target.value);
          }}
        ></input>
        <div className="switch-mode-container">
          <button
            style={{
              borderTopLeftRadius: "2px",
              borderBottomLeftRadius: "2px"
            }}
            className={`btn switch-mode__button${
              !joinRoom ? " switch-mode__button--selected" : ""
            }`}
            type="button"
            onClick={() => setJoinRoom(false)}
          >
            Create Room
          </button>
          <button
            style={{
              borderTopRightRadius: "2px",
              borderBottomRightRadius: "2px"
            }}
            className={`btn switch-mode__button${
              joinRoom ? " switch-mode__button--selected" : ""
            }`}
            type="button"
            onClick={() => setJoinRoom(true)}
          >
            Join room
          </button>
        </div>
        {!joinRoom && (
          <>
            <label>Room name</label>
            <input
              style={{ marginBottom: "10px" }}
              name="room-name"
              type="text"
              value={roomName}
              spellCheck="false"
              onChange={e => {
                unsetErrorObjKey("roomName");
                setRoomName(e.target.value);
              }}
            ></input>
            <div>
              <label className="checkbox noSelect">
                Play solo
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={e => setIsPrivate(e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>
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
        <br />
        <button
          className={`btn home-form__submit ${
            errorSubmit ? " btn-disabled home-form__submit--error" : ""
          }`}
          type="submit"
        >
          {errorSubmit ? "!" : joinRoom ? "Join" : "Create"}
        </button>
        <div className="home-form__error-relative">
          <div className="home-form__error-container">
            {Object.keys(errorObj).map(errorKey => (
              <p key={errorKey} className="home-form__error">
                {errorObj[errorKey]}
              </p>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

const RoomSelect = ({ rooms, handleClick, selectedRoom }) => (
  <>
    <p>Available rooms</p>
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
  "Username must contain between 3 and 15 alphanumeric and scores symbols.";

const roomNameErrorStr =
  "Room name must contain between 3 and 15 alphanumeric and scores symbols.";

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
