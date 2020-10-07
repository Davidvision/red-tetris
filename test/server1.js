// import chai from "chai";
// import { startServer, configureStore } from "./helpers/server";
// import rootReducer from "../src/client/reducers";
// import { ping } from "../src/client/actions/server";
// import io from "socket.io-client";
// import params from "../params";

// const chai = require("chai");
// const { startServer, configureStore } = require("./helpers/server");
// const rootReducer = require("../src/client/reducers");
// const { ping } = require("../src/client/actions/server");
// const io = require("socket.io-client");
// const params = require("../params");

// chai.should();

// describe("Fake server test", function() {
//   let tetrisServer;
//   before(cb =>
//     startServer(params.server, function(err, server) {
//       tetrisServer = server;
//       cb();
//     })
//   );

//   after(function(done) {
//     tetrisServer.stop(done);
//   });

//   it("should pong", function(done) {
//     const initialState = {};
//     const socket = io(params.server.url);
//     const store = configureStore(rootReducer, socket, initialState, {
//       pong: () => done()
//     });
//     store.dispatch(ping());
//   });
// });
