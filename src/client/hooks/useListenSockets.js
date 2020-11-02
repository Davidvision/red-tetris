import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Context as GameContext } from "../context/GameContext";
import { Context as HomeContext } from "../context/HomeContext";
import { server } from "../../../params";
import { changePage, pages } from "../utils/router";

export default () => {
  const { socketIOClient } = useContext(SocketContext);
  const { setAvailableRooms } = useContext(HomeContext);
  const {
    setLobbyInfo,
    resetGameContext,
    setBoard,
    setIsPlaying,
    setOpponentScore,
    setOpponentBoard,
    deleteOpponent,
    setScore,
    setNextPieces,
    setMessage,
    setGameScores,
  } = useContext(GameContext);
  useEffect(() => {
    socketIOClient.on("availableRooms", (availableRooms) =>
      setAvailableRooms(availableRooms)
    );

    socketIOClient.on("redirectToHome", () => {
      resetGameContext();
      changePage(pages[0].title, pages[0].path);
    });

    socketIOClient.on("lobbyInfo", (data) => setLobbyInfo(data));

    socketIOClient.on("playingPlayers", (playingPlayers) =>
      setPlayingPlayers(playingPlayers)
    );

    socketIOClient.on("boardUpdate", (board) => setBoard(board));

    socketIOClient.on("score", (newScore) => setScore(newScore));

    socketIOClient.on("opponentBoard", (newOpponentBoard) =>
      setOpponentBoard(newOpponentBoard)
    );

    socketIOClient.on("opponentScore", (newOpponentScore) =>
      setOpponentScore(newOpponentScore)
    );

    socketIOClient.on("opponentLeft", (formerOpponentName) =>
      deleteOpponent(formerOpponentName)
    );

    socketIOClient.on("isPlaying", (newIsPlaying) =>
      setIsPlaying(newIsPlaying)
    );

    socketIOClient.on("nextPieces", (newNextPieces) =>
      setNextPieces(newNextPieces)
    );

    socketIOClient.on("chatMessage", (newMessage) => setMessage(newMessage));

    socketIOClient.on("gameScores", (newGameScores) =>
      setGameScores(newGameScores)
    );

    return () => socketClient.disconnect();
  }, []);
};
