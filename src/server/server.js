const Game = require("./classes/Game/Game");
const socketsController = require("./controllers/sockets");

const clientsIds = {}; //clientId: gameId ?
const games = {};

let game = new Game("axelsRoom");
game.addPlayer("axel");
game.addPlayer("hugo");
games["axelsRoom"] = game;
game = new Game("privRoom", true);
game.addPlayer("jeanmich");
games["privRoom"] = game;
game = new Game("jeanmichRoom");
game.addPlayer("jeanmich");
games["jeanmichRoom"] = game;

const initReqHandler = async (server, params, cb) => {
  const { host, port } = params.server;
  const handler = (req, res) => {};

  server.on("request", handler);

  await server.listen(port, host, () => {
    console.log(`Server is up on port ${port}`);
  });
};

const startServer = async params => {
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
