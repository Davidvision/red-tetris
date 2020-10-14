const { emitAvailableRooms } = require("../middleware/socketEmitter");
const {
  handleConnectToGame,
  handleCreatePrivateGame,
  handleDisconnect,
  handleQuitGame,
  handleStartGame
} = require("../controllers/sockets");

module.exports = (io, clientsIds, games) => {
  io.on("connection", socket => {
    console.log(`client ${socket.id} is connected`);

    const ioContext = { io, socket, clientsIds, games };

    clientsIds[socket.id] = {};
    emitAvailableRooms(socket, games);

    socket.on("disconnect", () => handleDisconnect(ioContext));

    socket.on("connectToGame", data => handleConnectToGame(ioContext, data));

    socket.on("createPrivateGame", data =>
      handleCreatePrivateGame(ioContext, data)
    );

    socket.on("quitGame", () => handleQuitGame(ioContext));

    socket.on("startGame", () => handleStartGame(ioContext));
  });
};
