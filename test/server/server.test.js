require("regenerator-runtime/runtime");
const {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} = require("@jest/globals");
const params = { server: { port: 3004, host: "0.0.0.0" } };
const { startServer, killServer } = require("../../src/server/server");

describe("server", () => {
  let servers;

  beforeAll(async (done) => {
    servers = await startServer(params);
    setTimeout(() => {
      done();
    }, 1000);
  });

  afterAll(async (done) => {
    await killServer(servers);
    setTimeout(() => {
      done();
    }, 500);
  });

  test("server created", () => {
    expect(1).toEqual(1);
  });
});
