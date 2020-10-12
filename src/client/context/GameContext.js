import createDataContext from "./createDataContext";

// const initBoard = Array(20).fill(Array(10).fill(0));

const initBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 0, 7, 7, 0, 0, 0, 0, 0],
  [2, 3, 3, 5, 7, 7, 0, 0, 0, 0],
  [2, 2, 2, 5, 5, 4, 4, 0, 6, 0],
  [1, 1, 1, 1, 5, 4, 4, 6, 6, 6]
];

const gameReducer = (state, action) => {
  switch (action.type) {
    case "set_board":
      return { ...state, board: action.payload };
    case "set_opponents":
      return { ...state, opponentBoard: action.payload };
    case "set_board":
      return { ...state, board: action.payload };
    case "set_score":
      return { ...state, score: action.payload };
    case "set_next_pieces":
      return { ...state, nextPieces: action.payload };
    default:
      return state;
  }
};

const setBoard = dispatch => newBoard => {
  dispatch({ type: "set_board", payload: newBoard });
};

const setOpponents = dispatch => newOpponents => {
  dispatch({ type: "set_opponents", payload: newOpponents });
};

const setScore = dispatch => newScore => {
  dispatch({ type: "set_score", payload: newScore });
};

const setNextPieces = dispatch => newNextPieces => {
  dispatch({ type: "set_next_pieces", payload: newNextPieces });
};

export const { Provider, Context } = createDataContext(
  gameReducer,
  {
    setBoard,
    setOpponents,
    setScore,
    setNextPieces
  },
  {
    board: initBoard,
    opponents: [],
    score: 0,
    nextPieces: [0, 0, 0]
  }
);
