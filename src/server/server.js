const Game = require("./classes/Game/Game");
const socketListener = require("./middleware/socketListener");

const initReqHandler = (server, params, cb) => {
  const { host, port } = params.server;
  const handler = (req, res) => {};

  server.on("request", handler);

  server.listen(port, host, () => {
    console.log(`Server is up on port ${port}`);
    cb();
  });
};

const startServer = (params, initGames = {}) => {
  const promise = new Promise((resolve, reject) => {
    const clientsIds = {};
    const games = initGames;
    const server = require("http").createServer();
    initReqHandler(server, params, () => {
      const io = require("socket.io")(server);
      const stop = cb => {
        io.close();
        server.close();
        console.log(`Server stopped.`);
        cb();
      };
      socketListener(io, clientsIds, games);
      resolve({ stop, io });
    });
  });
  return promise;
  // return { server, io };
};

const killServer = ({ server, io }) => {
  io.close();
  server.close();
};

module.exports = { startServer, killServer };
