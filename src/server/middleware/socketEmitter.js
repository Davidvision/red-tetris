const emitAvailableRooms = (socket, games) => {
  const availableRooms = Object.keys(games).map(k => {
    const { name, players, isPrivate } = games[k];
    const playersNames = players.map(p => p.name);
    return { name, nb: players.length, players: playersNames, isPrivate };
  });
  socket.emit("availableRooms", availableRooms);
};

const emitRedirectToHome = socket => {
  socket.emit("redirectToHome");
};

const emitAvailableRoomsToAll = (io, games) => {
  const availableRooms = Object.keys(games).map(k => {
    const { name, players, isPrivate } = games[k];
    const playersNames = players.map(p => p.name);
    return { name, nb: players.length, players: playersNames, isPrivate };
  });
  io.emit("availableRooms", availableRooms);
};

const emitLobbyInfoToRoom = (io, roomName, playerName, game) => {
  const players = game.players.map(p => {
    return { name: p.name, score: p.score };
  });
  const nbPlayers = game.players.length;
  io.in(roomName).emit("lobbyInfo", { players, nbPlayers });
};

const emitPlayingPlayers = (io, roomName, playingPlayers) => {
  const players = playingPlayers.map(p => p.name);
  io.to(roomName).emit("playingPlayers", players);
};

const emitBoard = (socket, board) => {
  socket.emit("boardUpdate", board);
};

const broadcastBoardToOpponents = (
  socket,
  roomName,
  opponentName,
  opponentBoard
) => {
  socket
    .to(roomName)
    .emit("opponentBoard", { opponentName, value: opponentBoard });
};

const emitGameOver = (socket, roomName, playerName) => {
  socket.emit("gameOver");
  socket.to(roomName).emit("opponentGameOver", playerName);
};

const emitIsPlaying = (socket, value) => {
  socket.emit("isPlaying", value);
};

const emitScore = (socket, roomName, playerName, score) => {
  socket.emit("score", score);
  socket
    .to(roomName)
    .emit("opponentScore", { opponentName: playerName, value: score });
};

const emitNextPieces = (socket, nextPieces) => {
  socket.emit("nextPieces", nextPieces);
};

const emitMessageToRoom = (io, roomName, sender, message) => {
  io.to(roomName).emit("chatMessage", { sender, message });
};

const emitGameScores = (io, roomName, scores, playersHistory) => {
  io.to(roomName).emit("gameScores", { scores, playersHistory });
};

module.exports = {
  emitAvailableRooms,
  emitRedirectToHome,
  emitAvailableRoomsToAll,
  emitLobbyInfoToRoom,
  emitBoard,
  broadcastBoardToOpponents,
  emitGameOver,
  emitPlayingPlayers,
  emitIsPlaying,
  emitScore,
  emitNextPieces,
  emitMessageToRoom,
  emitGameScores
};
