const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const { compileFunction } = require("vm");
// const socketsMiddleware = require("middleware/sockets.js");
const { port, host } = require("../../params").server;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json({ limit: "200mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

const clientsIds = {};

io.on("connection", socket => {
  console.log(`client ${socket.id} is connected`);
  clientsIds[socket.id] = {};

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
