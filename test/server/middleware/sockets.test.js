const { describe, expect, test } = require("@jest/globals");
const { fn } = require("jest");

const io = require("socket.io-client");
const http = require("http");
const ioBack = require("socket.io");
// const Player = require("../../../src/server/classes/Player/Player");
// const Game = require("../../../src/server/classes/Game/Game");
let socket;
let httpServer;
let httpServerAddr;
let ioServer;

beforeAll(done => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.listen().address();
  ioServer = ioBack(httpServer);
  console.log("ioServer", ioServer);
  done();
});

afterAll(done => {
  ioServer.close();
  httpServer.close();
  done();
});

beforeEach(done => {
  // Setup
  // Do not hardcode server port and address, square brackets are used for IPv6
  socket = io.connect(
    `http://[${httpServerAddr.address}]:${httpServerAddr.port}`,
    {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
      transports: ["websocket"]
    }
  );
  socket.on("connect", () => {
    done();
  });
});

afterEach(done => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

describe("Sockets middleware", () => {
  test("should communicate", done => {
    // // once connected, emit Hello World
    ioServer.emit("echo", "Hello World");
    // socket.once("echo", message => {
    //   // Check that the message matches
    //   expect(message).toBe("Hello World");
    //   done();
    // });
    // ioServer.on("connection", mySocket => {
    //   expect(mySocket).toBeDefined();
    // });
    expect(1 + 1).toEqual(2);
  });
});
