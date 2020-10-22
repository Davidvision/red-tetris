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
// const { cbrt } = require("core-js/fn/number");
const params = { server: { port: 3004, host: "0.0.0.0" } };
const { startServer, killServer } = require("../../src/server/server");

describe("server", () => {
  let server;

  beforeAll(function(done) {
    startTestServer(params, initServ => {
      server = initServ;
      console.log("IN BEFORE", server);
      done();
    });
  });

  afterAll(done => {
    server.stop(done);
    // await killServer(serverzzz);
    // setTimeout(() => {
    //   done();
    // }, 500);
  });

  test("server created", () => {
    expect(1).toEqual(1);
  });
});
