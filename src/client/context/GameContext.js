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
          ...state.opponents,
          [action.payload.opponentName]: action.payload.opponentBoard
        }
      };
    case "set_score":
      return { ...state, score: action.payload };
    case "set_next_pieces":
      return { ...state, nextPieces: action.payload };
    case "set_playing_players":
      return { ...state, playingPlayers: action.payload };
    case "reset_state":
      return initValues;
    case "set_lobby_info":
      return {
        ...state,
        players: action.payload.players,
        nbPlaying: action.payload.nbPlayers,
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

const setPlayingPlayers = dispatch => newPlayingPlayers =>
  dispatch({ type: "set_playing_players", payload: newPlayingPlayers });

const resetGameContext = dispatch => () => dispatch("reset_state");

export const { Provider, Context } = createDataContext(
  gameReducer,
  {
    setBoard,
    setScore,
    setNextPieces,
    setLobbyInfo,
    setPlayingPlayers,
    resetGameContext,
    setOpponent
  },
  {
    isLoading: true,
    playingPlayers: 0,
    userName: "",
    isRunning: false,
    players: [],
    board: initBoard,
    opponents: {},
    score: 0,
    nextPieces: [0, 0, 0]
  }
);
