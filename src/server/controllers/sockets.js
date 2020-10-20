const {
  emitRedirectToHome,
  emitAvailableRoomsToAll,
  emitLobbyInfoToRoom
  // emitPlayingPlayers
} = require("../middleware/socketEmitter");
const Game = require("../classes/Game/Game");

const handleQuitGame = ({ io, clientsIds, games, socket }) => {
  const { playerName, roomName } = clientsIds[socket.id];
  if (games[roomName]) {
    games[roomName].removePlayer(playerName);
    if (games[roomName].players.length === 0) {
      delete games[roomName];
    } else {
      emitLobbyInfoToRoom(io, roomName, playerName, games[roomName]);
    }
  }
  clientsIds[socket.id] = {};
  emitRedirectToHome(socket);
  emitAvailableRoomsToAll(io, games);
};

const handleDisconnect = ({ socket, clientsIds, games, io }) => {
  const { playerName, roomName } = clientsIds[socket.id];
  if (playerName && roomName) {
    handleQuitGame({ io, clientsIds, games, socket });
  }
  delete clientsIds[socket.id];
  console.log(`client ${socket.id} is disconnected`);
};

const handleConnectToGame = (
  { io, socket, clientsIds, games },
  { roomName, playerName }
) => {
  console.log(
    `Client ${socket.id}: name: ${playerName} asks to join ${roomName} room`
  );
  const roomExists = Object.keys(games).some(n => n === roomName);
  if (roomExists) {
    const game = games[roomName];
    if (
      game.players.length > 3 ||
      game.players.findIndex(({ name }) => playerName == name) > -1 ||
      (game.isPrivate && game.players.length > 0)
    ) {
      emitRedirectToHome(socket);
    } else {
      addPlayer(io, socket, clientsIds, games, playerName, roomName);
    }
  } else {
    games[roomName] = new Game(roomName);
    addPlayer(io, socket, clientsIds, games, playerName, roomName);
  }
};

const addPlayer = (io, socket, clientsIds, games, playerName, roomName) => {
  const game = games[roomName];
  const player = game.addPlayer(playerName, { io, socket, roomName });
  socket.join(roomName);
  clientsIds[socket.id] = { playerName, roomName, player };
  emitLobbyInfoToRoom(io, roomName, playerName, game);
  emitAvailableRoomsToAll(io, games);
};

const handleCreatePrivateGame = ({ io, socket, games }, { roomName }) => {
  console.log(`Client ${socket.id}: private '${roomName}' room created`);
  const roomExists = Object.keys(games).some(n => n === roomName);
  if (roomExists) {
    emitRedirectToHome(socket);
  } else {
    games[roomName] = new Game(roomName, true);
    emitAvailableRoomsToAll(io, games);
  }
};

const handleStartGame = ({ io, socket, games, clientsIds }) => {
  const { playerName, roomName } = clientsIds[socket.id];
  const game = games[roomName];
  if (
    !game ||
    !game.players ||
    game.players.length === 0 ||
    playerName !== game.players[0].name ||
    game.players.filter(p => p.isPlaying).length > 0
  ) {
    return;
  }
  game.startGame();

  // emitPlayingPlayers(io, roomName, game.playingPlayers);
};

const handleKeyDown = ({ socket, clientsIds }, key) => {
  const { player } = clientsIds[socket.id];
  if (player) {
    player.updateOnInput(key, true);
  } else {
    emitRedirectToHome(socket);
  }
};
const handleKeyUp = ({ socket, clientsIds }, key) => {
  const { player } = clientsIds[socket.id];
  if (player) {
    player.updateOnInput(key, false);
  } else {
    emitRedirectToHome(socket);
  }
};

module.exports = {
  handleConnectToGame,
  handleCreatePrivateGame,
  handleDisconnect,
  handleQuitGame,
  handleStartGame,
  handleKeyDown,
  handleKeyUp
};
