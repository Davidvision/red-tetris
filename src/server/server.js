const Game = require("./classes/Game/Game");
const socketListener = require("./middleware/socketListener");

const initReqHandler = async (server, params, cb) => {
  const { host, port } = params.server;
  const handler = (req, res) => {};

  server.on("request", handler);

  await server.listen(port, host, () => {
    console.log(`Server is up on port ${port}`);
  });
};

const startServer = async (params, initGames = {}) => {
  const clientsIds = {};
  const games = initGames;
  const server = require("http").createServer();
  await initReqHandler(server, params);
  const io = require("socket.io")(server);
  socketListener(io, clientsIds, games);
  return { server, io };
};

const killServer = ({ server, io }) => {
  io.close();
  server.close();
};

module.exports = { startServer, killServer };
