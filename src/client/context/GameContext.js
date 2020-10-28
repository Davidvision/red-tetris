import createDataContext from "./createDataContext";

const testInit = [
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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 2, 1, 1, 1, 0, 0, 0, 0, 0]
];

const initBoard = Array(20).fill(Array(10).fill(0));
const initValues = {
  isLoading: true,
  playingPlayers: 0,
  userName: "",
  isRunning: false,
  players: [],
  board: initBoard,
  opponents: {},
  score: 0,
  nextPieces: [],
  isPlaying: false,
  messages: [],
  gameScores: null
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "set_board":
      return { ...state, board: action.payload };
    case "set_opponent":
      return {
        ...state,
        opponents: {
          ...state.opponents,
          [action.payload.opponentName]: {
            ...state.opponents[action.payload.opponentName],
            [action.payload.key]: action.payload.value
          }
        }
      };
    case "set_score":
      return { ...state, score: action.payload };
    case "set_message":
      return { ...state, messages: [...state.messages, action.payload] };
    case "set_game_scores":
      return { ...state, gameScores: action.payload };
    case "set_next_pieces":
      return { ...state, nextPieces: action.payload };
    case "set_is_playing":
      return { ...state, isPlaying: action.payload };
    case "set_lobby_info":
      return {
        ...state,
        players: action.payload.players,
        isLoading: false
      };
    case "reset_state":
      return initValues;
    default:
      return state;
  }
};

const setBoard = dispatch => newBoard =>
  dispatch({ type: "set_board", payload: newBoard });

const setOpponentBoard = dispatch => newOpponentBoard => {
  dispatch({
    type: "set_opponent",
    payload: { ...newOpponentBoard, key: "board" }
  });
};

const setOpponentScore = dispatch => newOpponentScore =>
  dispatch({
    type: "set_opponent",
    payload: { ...newOpponentScore, key: "score" }
  });

const setScore = dispatch => newScore =>
  dispatch({ type: "set_score", payload: newScore });

const setNextPieces = dispatch => newNextPieces =>
  dispatch({ type: "set_next_pieces", payload: newNextPieces });

const setLobbyInfo = dispatch => newLobbyInfo =>
  dispatch({ type: "set_lobby_info", payload: newLobbyInfo });

const setIsPlaying = dispatch => newIsPlaying =>
  dispatch({ type: "set_is_playing", payload: newIsPlaying });

const setMessage = dispatch => newMessage =>
  dispatch({ type: "set_message", payload: newMessage });

const setGameScores = dispatch => newGameScores =>
  dispatch({ type: "set_game_scores", payload: newGameScores });

const resetGameContext = dispatch => () => dispatch({ type: "reset_state" });

export const { Provider, Context } = createDataContext(
  gameReducer,
  {
    setBoard,
    setScore,
    setNextPieces,
    setLobbyInfo,
    resetGameContext,
    setOpponentBoard,
    setIsPlaying,
    setOpponentScore,
    setMessage,
    setGameScores
  },
  initValues
);
