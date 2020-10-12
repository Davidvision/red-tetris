const emitAvailableRooms = (socket, games) => {
  const availableRooms = Object.keys(games)
    .filter(k => !games[k].isPrivate)
    .map(k => {
      const { name, id, players } = games[k];
      return { name, id, nb: players.length };
    });
  socket.emit("availableRooms", availableRooms);
};

module.exports = { emitAvailableRooms };
