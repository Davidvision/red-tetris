import createDataContext from "./createDataContext";

const socketReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const setBoard = dispatch => newBoard => {
  dispatch({ type: "set_board", payload: newBoard });
};

export const { Provider, Context } = createDataContext(
  socketReducer,
  {
    setBoard
  },
  {}
);
