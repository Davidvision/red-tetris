const Game = require("./classes/Game/Game");
const socketsController = require("./controllers/sockets");

const clientsIds = {};

const initReqHandler = async (server, params, cb) => {
  const { host, port } = params.server;
  const handler = (req, res) => {};

  server.on("request", handler);

  await server.listen(port, host, () => {
    console.log(`Server is up on port ${port}`);
  });
};

const startServer = async (params, initGames = {}) => {
  const games = initGames;
  const server = require("http").createServer();
  await initReqHandler(server, params);
  const io = require("socket.io")(server);
  socketsController(io, clientsIds, games);
  return { server, io };
};

const killServer = ({ server, io }) => {
  io.close();
  server.close();
};

module.exports = { startServer, killServer };
