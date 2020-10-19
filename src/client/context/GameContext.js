import createDataContext from "./createDataContext";

const initBoard = Array(20).fill(Array(10).fill(0));

const gameReducer = (state, action) => {
  switch (action.type) {
    case "set_board":
      return { ...state, board: action.payload };
    case "set_opponent":
      return {
        ...state,
        opponents: {
          ...opponents,
          [action.payload.opponentName]: action.payload.opponentBoard
        }
      };
    case "set_score":
      return { ...state, score: action.payload };
    case "set_next_pieces":
      return { ...state, nextPieces: action.payload };
    case "set_nb_playing":
      return { ...state, nbPlaying: action.payload };
    case "reset_state":
      return initValues;
    case "set_lobby_info":
      return {
        ...state,
        players: action.payload.players,
        nbPlaying: action.payload.nbPlaying,
        isLoading: false
      };
    default:
      return state;
  }
};

const setBoard = dispatch => newBoard =>
  dispatch({ type: "set_board", payload: newBoard });

const setOpponent = dispatch => newOpponent =>
  dispatch({ type: "set_opponent", payload: newOpponent });

const setScore = dispatch => newScore =>
  dispatch({ type: "set_score", payload: newScore });

const setNextPieces = dispatch => newNextPieces =>
  dispatch({ type: "set_next_pieces", payload: newNextPieces });

const setLobbyInfo = dispatch => newLobbyInfo =>
  dispatch({ type: "set_lobby_info", payload: newLobbyInfo });

const setNbPlaying = dispatch => newNbPlaying =>
  dispatch({ type: "set_nb_playing", payload: newNbPlaying });

const resetGameContext = dispatch => () => dispatch("reset_state");

export const { Provider, Context } = createDataContext(
  gameReducer,
  {
    setBoard,
    setScore,
    setNextPieces,
    setLobbyInfo,
    setNbPlaying,
    resetGameContext,
    setOpponent
  },
  {
    isLoading: true,
    nbPlaying: 0,
    userName: "",
    isRunning: false,
    players: [],
    board: initBoard,
    opponents: {},
    score: 0,
    nextPieces: [0, 0, 0]
  }
);
