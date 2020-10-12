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

describe("server", () => {
  let servers;
  let socketClient;
  let socketObject;
  beforeAll(async done => {
    servers = await startServer(params);
    setTimeout(() => {
      done();
    }, 500);
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
    }, 50);
  });

  afterEach(async done => {
    if (socketClient.connected) {
      socketClient.disconnect();
    }
    setTimeout(() => {
      done();
    }, 50);
  });

  test("emitAvailableRooms without games should send empty array", () => {
    emitAvailableRooms(socketObject, []);
    socketClient.on("availableRooms", data => {
      expect(data.length).toEqual(0);
    });
  });
  test("emitAvailableRooms with two games should send array of games infos with length 2", () => {
    let games = [];
    let game = new Game("qwertyuiop", "axelsRoom");
    game.addPlayer("axel");
    game.addPlayer("hugo");
    games["qwertyuiop"] = game;
    game = new Game("qwertyuiol", "privRoom", true);
    game.addPlayer("jeanmich");
    games["asdfghjkl6"] = game;
    game = new Game("asdfghjkl", "jeanmichRoom");
    game.addPlayer("jeanmich");
    games["asdfghjkl6"] = game;
    emitAvailableRooms(socketObject, games);
    socketClient.on("availableRooms", data => {
      expect(data.length).toEqual(2);
    });
  });
  test("disconnect client", () => {
    socketClient.disconnect();
    expect(socketClient.connected).toEqual(false);
  });
});
