export const connectToGame = (socketIOClient, roomName, playerName) =>
  socketIOClient.emit("connectToGame", { roomName, playerName });

export const createPrivateGame = (socketIOClient, roomName) =>
  socketIOClient.emit("createPrivateGame", { roomName });

export const quitGame = socketIOClient => socketIOClient.emit("quitGame");

export const startGame = socketIOClient => socketIOClient.emit("startGame");
