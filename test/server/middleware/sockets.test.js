require("regenerator-runtime/runtime");
const {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach
} = require("@jest/globals");
const params = { server: { port: 3004, host: "0.0.0.0" } };
const Game = require("../../../src/server/classes/Game/Game");
const { startServer, killServer } = require("../../../src/server/server");
const socketIOClient = require("socket.io-client");
const {
  emitAvailableRooms
} = require("../../../src/server/middleware/sockets");
const {
  connectToGame,
  createPrivateGame
} = require("../../../src/client/middleware/sockets.js");
const { startTestServer } = require("../utils/server");

describe("server", () => {
  let servers;
  let socketClient;
  let socketObject;
  beforeAll(async done => {
    let games = [];
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
    servers = await startServer(params, games);
    setTimeout(() => {
      done();
    }, 1000);
  });
  afterAll(async done => {
    await killServer(servers);
    setTimeout(() => {
      done();
    }, 500);
  });

  beforeEach(async done => {
    const { host, port } = params.server;
    socketClient = socketIOClient(`http://${host}:${port}`);
    servers.io.on("connection", socket => {
      socketObject = socket;
    });
    setTimeout(() => {
      done();
    }, 200);
  });

  afterEach(async done => {
    setTimeout(() => {
      if (socketClient.connected) {
        socketClient.disconnect();
      }
      done();
    }, 400);
  });

  test("emitAvailableRooms should send array of games", () => {
    socketClient.on("availableRooms", data => {
      expect(data.length).toEqual(3);
    });
  });
  test("emitAvailableRooms with two games should send array of games infos with length 3", () => {
    let games = [];
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
    emitAvailableRooms(socketObject, games);
    socketClient.on("availableRooms", data => {
      console.log("WEEEEESH");
      expect(data.length).toEqual(3);
    });
  });
  test("disconnect client", () => {
    socketClient.disconnect();
    expect(socketClient.connected).toEqual(false);
  });

  test("connectToGame - join existing game", () => {
    socketClient.emit("connectToGame", {
      roomName: "axelsRoom",
      playerName: "patrick"
    });
    socketClient.on("availableRooms", data => {
      expect(data[0].players.length).toEqual(3);
    });
  });
  test("connectToGame - new game", () => {
    socketClient.emit("connectToGame", {
      roomName: "newRoom",
      playerName: "patrick"
    });
    socketClient.on("availableRooms", data => {
      expect(data.length).toEqual(4);
    });
  });
  test("connectToGame - private and already used", () => {
    connectToGame(socketClient, "privRoom", "patrick");
    socketClient.on("redirectToHome", () => {
      expect(1).toEqual(1);
    });
  });
  test("createPrivateGame - new game", () => {
    createPrivateGame(socketClient, "newPrivRoom");
    socketClient.on("availableRooms", data => {
      expect(data.length).toEqual(5);
    });
  });
  test("createPrivateGame - existing game", () => {
    socketClient.emit("createPrivateGame", {
      roomName: "privRoom"
    });
    socketClient.on("redirectToHome", () => {
      expect(1).toEqual(1);
    });
  });
});
