const {
  emitAvailableRooms,
  emitRedirectToHome,
  emitAvailableRoomsToAll,
} = require("../middleware/sockets");
const Game = require("../classes/Game/Game");

module.exports = (io, clientsIds, games) => {
  io.on("connection", (socket) => {
    console.log(`client ${socket.id} is connected`);
    clientsIds[socket.id] = {};
    emitAvailableRooms(socket, games);

    socket.on("disconnect", () => {
      delete clientsIds[socket.id];
      console.log(`Client ${socket.id} disconnected`);
    });

    socket.on("connectToGame", ({ roomName, playerName }) => {
      console.log(
        `Client ${socket.id}: name: ${playerName} asks to join ${roomName} room`
      );
      const roomExists = Object.keys(games).some((n) => n === roomName);
      if (roomExists) {
        const game = games[roomName];
        if (
          game.players.length > 3 ||
          game.players.findIndex(({ name }) => playerName == name) > -1 ||
          (game.isPrivate && game.players.length > 0)
        ) {
          emitRedirectToHome(socket);
        } else {
          game.addPlayer(playerName);
          emitAvailableRoomsToAll(io, games);
        }
      } else {
        games[roomName] = new Game(roomName);
        games[roomName].addPlayer(playerName);
        emitAvailableRoomsToAll(io, games);
      }
    });

    socket.on("createPrivateGame", ({ roomName }) => {
      console.log(`Client ${socket.id}: private '${roomName}' room created`);
      const roomExists = Object.keys(games).some((n) => n === roomName);
      if (roomExists) {
        emitRedirectToHome(socket);
      } else {
        games[roomName] = new Game(roomName, true);
        emitAvailableRoomsToAll(io, games);
      }
    });
  });
};
