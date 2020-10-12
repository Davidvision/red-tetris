const { emitAvailableRooms } = require("./middleware/sockets");

const clientsIds = {}; //clientId: gameId ?
const games = {};

const initReqHandler = async (server, params, cb) => {
  const { host, port } = params.server;
  const handler = (req, res) => {};

  server.on("request", handler);

  await server.listen(port, host, () => {
    console.log(`Server is up on port ${port}`);
  });
};

const handleSockets = io => {
  io.on("connection", socket => {
    console.log(`client ${socket.id} is connected`);
    clientsIds[socket.id] = {};
    emitAvailableRooms(socket, games);

    socket.on("disconnect", () => {
      delete clientsIds[socket.id];
      console.log(`Client ${socket.id} disconnected`);
    });
  });
};

const startServer = async params => {
  const server = require("http").createServer();
  await initReqHandler(server, params);
  const io = require("socket.io")(server);
  handleSockets(io);
  return { server, io };
};

const killServer = ({ server, io }) => {
  io.close();
  server.close();
};

module.exports = { startServer, killServer };
