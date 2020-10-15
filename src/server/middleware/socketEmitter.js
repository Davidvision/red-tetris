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
  const nbPlaying = game.nbPlaying;
  io.in(roomName).emit("lobbyInfo", { players, nbPlaying });
};

const emitNbPlaying = (io, roomName, nbPlaying) => {
  io.in(roomName).emit("setNbPlaying", nbPlaying);
};

const emitBoard = ({ socket }, board) => {
  socket.emit("boardUpdate", board);
};

module.exports = {
  emitAvailableRooms,
  emitRedirectToHome,
  emitAvailableRoomsToAll,
  emitLobbyInfoToRoom,
  emitNbPlaying,
  emitBoard
};
