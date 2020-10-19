import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Context as GameContext } from "../context/GameContext";
import { Context as HomeContext } from "../context/HomeContext";
import { server } from "../../../params";
import { changePage, pages } from "../utils/router";

export default () => {
  const { socketIOClient } = useContext(SocketContext);
  const { setAvailableRooms } = useContext(HomeContext);
  const { setNbPlaying, setLobbyInfo, resetGameContext, setBoard } = useContext(
    GameContext
  );
  useEffect(() => {
    socketIOClient.on("availableRooms", availableRooms =>
      setAvailableRooms(availableRooms)
    );

    socketIOClient.on("redirectToHome", () => {
      resetGameContext();
      changePage(pages[0].title, pages[0].path);
    });

    socketIOClient.on("lobbyInfo", data => setLobbyInfo(data));

    socketIOClient.on("setNbPlaying", nbPlaying => setNbPlaying(nbPlaying));

    socketIOClient.on("boardUpdate", board => setBoard(board));

    socketIOClient.on("opponentBoard", opponentInfo =>
      setOpponent(opponentInfo)
    );

    return () => socketClient.disconnect();
  }, []);
};
