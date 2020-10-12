const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const { compileFunction } = require("vm");
// const socketsMiddleware = require("middleware/sockets.js");
const { port, host } = require("../../params").server;
const Game = require("./classes/Game/Game");
const { emitAvailableRooms } = require("./middleware/sockets");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json({ limit: "200mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

const clientsIds = {}; //clientId: gameId ?
const games = {};
// let game = new Game("qwertyuiop", "axelsRoom");
// game.addPlayer("axel");
// game.addPlayer("hugo");
// games["qwertyuiop"] = game;
// game = new Game("qwertyuiop", "axelsRoom");
// game.addPlayer("axel");
// game.addPlayer("hugo");
// games["qwertyuio1"] = game;
// game = new Game("qwertyuiop", "axelsRoom");
// game.addPlayer("axel");
// game.addPlayer("hugo");
// games["qwertyuio2"] = game;
// game = new Game("qwertyuiop", "axelsRoom");
// game.addPlayer("axel");
// game.addPlayer("hugo");
// games["qwertyuio3"] = game;
// game = new Game("qwertyuiop", "axelsRoom");
// game.addPlayer("axel");
// game.addPlayer("hugo");
// games["qwertyuio4"] = game;
// game = new Game("qwertyuiol", "privRoom", true);
// game.addPlayer("jeanmich");
// games["asdfghjkl6"] = game;
// game = new Game("asdfghjkl", "jeanmichRoom");
// game.addPlayer("jeanmich");
// games["asdfghjkl6"] = game;

io.on("connection", socket => {
  console.log(`client ${socket.id} is connected`);
  clientsIds[socket.id] = {};
  emitAvailableRooms(socket, games);

  socket.on("disconnect", () => {
    if (clientsIds[socket.id]) {
      delete clientsIds[socket.id];
    }
    console.log(`Client ${socket.id} disconnected`);
  });
});

server.listen(port, host, () => {
  console.log(`Server is up on port ${port}`);
});
