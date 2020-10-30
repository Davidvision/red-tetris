import createDataContext from "./createDataContext";

const homeReducer = (state, action) => {
  switch (action.type) {
    case "set_available_rooms":
      return { ...state, availableRooms: action.payload };
    case "set_username":
      return { ...state, userName: action.payload };
    case "set_is_mobile":
      return { ...state, isMobile: action.payload };
    case "set_window_height":
      return { ...state, winHeight: action.payload };
    default:
      return state;
  }
};

const setUserName = dispatch => newUserName =>
  dispatch({ type: "set_username", payload: newUserName });

const setAvailableRooms = dispatch => newAvailableRooms => {
  dispatch({ type: "set_available_rooms", payload: newAvailableRooms });
};

const setIsMobile = dispatch => isMobile => {
  dispatch({ type: "set_is_mobile", payload: isMobile });
};

const setWinHeight = dispatch => newWinHeight => {
  dispatch({ type: "set_window_height", payload: newWinHeight });
};

export const { Provider, Context } = createDataContext(
  homeReducer,
  {
    setAvailableRooms,
    setUserName,
    setIsMobile,
    setWinHeight
  },
  {
    userName: "",
    availableRooms: [],
    isMobile: window.innerWidth <= 800 ? true : false,
    winHeight: window.innerHeight
  }
);
