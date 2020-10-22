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
const { startTestServer } = require("./utils/server");
const socketIOClient = require("socket.io-client");
// const { cbrt } = require("core-js/fn/number");
const params = { server: { port: 3004, host: "0.0.0.0" } };
const { startServer, killServer } = require("../../src/server/server");

describe("server", () => {
  let server;
  let socketClient;
  let socketObject;

  beforeAll(function(done) {
    startTestServer(params, initServ => {
      server = initServ;
      server.io.on("connection", socket => {
        console.log("CONNECTION FRER");
        socketObject = socket;
      });
      const { host, port } = params.server;
      socketClient = socketIOClient(`http://${host}:${port}`);
      socketClient.on("connect", () => {
        console.log("CONNECTION CLIENT");
        done();
      });
      console.log(server);
    });
  });

  afterAll(done => {
    if (socketClient.connected) {
      socketClient.disconnect();
    }
    server.stop(done);
  });

  //   beforeEach(done => {

  //   });

  //   afterEach(done => {
  //     console.log("afterEach ", socketClient.connected);
  //     done();
  //   });

  test("server created", () => {
    expect(1).toEqual(1);
  });
});
