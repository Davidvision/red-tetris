import createDataContext from "./createDataContext";

const socketReducer = (state, action) => {
  switch (action.type) {
    case "set_socket_io_client":
      return { ...state, socketIOClient: action.payload };
    default:
      return state;
  }
};
const setSocketIOClient = dispatch => socketIOClient => {
  dispatch({ type: "set_socket_io_client", payload: socketIOClient });
};

export const { Provider, Context } = createDataContext(
  socketReducer,
  {
    setSocketIOClient
  },
  {
    socketIOClient: null
  }
);
