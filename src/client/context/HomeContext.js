import createDataContext from "./createDataContext";

const homeReducer = (state, action) => {
  switch (action.type) {
    case "set_available_rooms":
      return { ...state, availableRooms: action.payload };
    case "set_username":
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};

const setUserName = dispatch => newUserName =>
  dispatch({ type: "set_username", payload: newUserName });

const setAvailableRooms = dispatch => newAvailableRooms => {
  dispatch({ type: "set_available_rooms", payload: newAvailableRooms });
};

export const { Provider, Context } = createDataContext(
  homeReducer,
  {
    setAvailableRooms,
    setUserName
  },
  {
    userName: "",
    availableRooms: []
  }
);
