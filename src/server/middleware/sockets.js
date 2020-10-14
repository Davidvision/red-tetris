const emitAvailableRooms = (socket, games) => {
  const availableRooms = Object.keys(games).map((k) => {
    const { name, players, isPrivate } = games[k];
    const playersNames = players.map((p) => p.name);
    return { name, nb: players.length, players: playersNames, isPrivate };
  });
  socket.emit("availableRooms", availableRooms);
};

const emitRedirectToHome = (socket) => {
  socket.emit("redirectToHome");
};

const emitAvailableRoomsToAll = (io, games) => {
  const availableRooms = Object.keys(games).map((k) => {
    const { name, players, isPrivate } = games[k];
    const playersNames = players.map((p) => p.name);
    return { name, nb: players.length, players: playersNames, isPrivate };
  });
  io.emit("availableRooms", availableRooms);
};

module.exports = {
  emitAvailableRooms,
  emitRedirectToHome,
  emitAvailableRoomsToAll,
};
