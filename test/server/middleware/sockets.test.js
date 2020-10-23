require("regenerator-runtime/runtime");
const {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const { startTestServer } = require("../utils/server");
const socketIOClient = require("socket.io-client");
const params = { server: { port: 3004, host: "0.0.0.0" } };

describe("sockets", () => {
  jest.setTimeout(30000);
  let server;
  let socketClient;
  let socketObject;
  const { host, port } = params.server;

  beforeAll(function (done) {
    startTestServer(params, (initServ) => {
      server = initServ;
      server.io.on("connection", (socket) => {
        socketObject = socket;
      });
      socketClient = socketIOClient(`http://${host}:${port}`);
      socketClient.on("connect", () => {
        done();
      });
    });
  });

  afterAll((done) => {
    if (socketClient.connected) {
      socketClient.disconnect();
    }
    server.stop(done);
  });

  test("Start game - Handle keys", (done) => {
    const data = { playerName: "axel", roomName: "La Meinau" };
    socketClient.emit("connectToGame", data);
    socketClient.on("lobbyInfo", () => {
      socketClient.emit("startGame");
      socketClient.on("isPlaying", (data) => {
        socketClient.emit("keyDown", "ArrowLeft");
        // console.log("TE!");
        socketClient.on("boardUpdate", (data) => {
          // console.log("TEST!", data);
          if (
            data[0][0] != 0 ||
            data[1][0] != 0 ||
            data[2][0] != 0 ||
            data[3][0] != 0
          ) {
            socketClient.emit("keyUp", "ArrowLeft");
            // console.log("DATA LEFT", data[0], data[1], data[2], data[3]);
            socketClient.emit("keyDown", "ArrowRight");
          }
          if (
            data[0][9] != 0 ||
            data[1][9] != 0 ||
            data[2][9] != 0 ||
            data[3][9] != 0
          ) {
            // console.log("DATA Right", data[0], data[1], data[2], data[3]);
            socketClient.emit("quitGame");
            done();
          }
        });
      });
    });
  });
  test("Connect to game and quit Game", (done) => {
    const socketClient2 = socketIOClient(`http://${host}:${port}`);
    socketClient2.on("connect", () => {
      const socketClient3 = socketIOClient(`http://${host}:${port}`);
      socketClient3.on("connect", () => {
        const socketClient4 = socketIOClient(`http://${host}:${port}`);
        socketClient4.on("connect", () => {
          const socketClient5 = socketIOClient(`http://${host}:${port}`);
          socketClient5.on("connect", () => {
            const data = { playerName: "axel", roomName: "Axel Room" };
            const data2 = { playerName: "axel2", roomName: "Axel Room" };
            const data3 = { playerName: "axel3", roomName: "Axel Room" };
            const data4 = { playerName: "axel4", roomName: "Axel Room" };
            const data5 = { playerName: "axel5", roomName: "Axel Room" };
            socketClient.emit("connectToGame", data);
            socketClient2.emit("connectToGame", data2);
            socketClient3.emit("connectToGame", data3);
            socketClient4.emit("connectToGame", data4);
            socketClient5.emit("connectToGame", data5);
            socketClient.on("lobbyInfo", (data) => {
              if (data.nbPlayers === 4) {
                expect(
                  data.players.findIndex((p) => p.name === "axel")
                ).toBeGreaterThan(-1);
                socketClient.emit("quitGame");
                socketClient.on("availableRooms", (data) => {
                  if (data[0] && data[0].nb == 3) {
                    socketClient2.disconnect();
                    socketClient3.disconnect();
                    socketClient4.disconnect();
                    socketClient5.disconnect();
                    done();
                  }
                });
              }
            });
          });
        });
      });
    });
  });
  test("Create private game", (done) => {
    const socketClient2 = socketIOClient(`http://${host}:${port}`);
    socketClient2.on("connect", () => {
      const data = { playerName: "axel", roomName: "Alpha Room" };
      const data2 = { playerName: "axel2", roomName: "Alpha Room" };
      socketClient.emit("createPrivateGame", data);
      socketClient2.emit("connectToGame", data2);
      socketClient.on("availableRooms", (data) => {
        socketClient2.emit("connectToGame", data2);
        socketClient2.on("redirectToHome", () => {
          socketClient2.disconnect();
          socketClient.emit("quitGame");

          done();
        });
      });
    });
  });
  test("Create private game", (done) => {
    const socketClient2 = socketIOClient(`http://${host}:${port}`);
    socketClient2.on("connect", () => {
      const data = { playerName: "axel", roomName: "Lambda Room" };
      const data2 = { playerName: "axel2", roomName: "Lambda Room" };
      socketClient.emit("connectToGame", data);
      socketClient.on("lobbyInfo", (data) => {
        socketClient2.emit("createPrivateGame", data2);
        socketClient2.on("redirectToHome", () => {
          socketClient2.disconnect();
          socketClient.emit("quitGame");

          done();
        });
      });
    });
  });
  test("Create private game - name exists", (done) => {
    const socketClient2 = socketIOClient(`http://${host}:${port}`);
    socketClient2.on("connect", () => {
      const data = { playerName: "axel", roomName: "Beta Room" };
      const data2 = { playerName: "axel2", roomName: "Beta Room" };
      socketClient.emit("connectToGame", data);
      socketClient.on("lobbyInfo", (data) => {
        socketClient2.emit("createPrivateGame", data2);
        socketClient2.on("redirectToHome", () => {
          socketClient2.disconnect();
          socketClient.emit("quitGame");
          done();
        });
      });
    });
  });
  test("Create game - Start game", (done) => {
    const data = { playerName: "axel", roomName: "Start Room" };
    socketClient.emit("connectToGame", data);
    socketClient.on("lobbyInfo", () => {
      socketClient.emit("startGame");
      socketClient.on("isPlaying", (data) => {
        expect(data).toEqual(true);
        socketClient.emit("quitGame");
        socketClient.on("redirectToHome", () => {
          done();
        });
      });
    });
  });
  test("Start Game - not leader", (done) => {
    const socketClient2 = socketIOClient(`http://${host}:${port}`);
    socketClient2.on("connect", () => {
      const data = { playerName: "axel", roomName: "Theta Room" };
      const data2 = { playerName: "axel2", roomName: "Theta Room" };
      socketClient.emit("connectToGame", data);
      socketClient.on("lobbyInfo", (data) => {
        socketClient2.emit("startGame");
        socketClient2.emit("connectToGame", data2);
        socketClient2.on("lobbyInfo", (data) => {
          if (data.nbPlayers == 1) {
            socketClient.emit("quitGame");
            socketClient2.disconnect();
            done();
          }
        });
      });
    });
  });
  test("Chat", (done) => {
    const data = { playerName: "axel", roomName: "Chat Room" };
    socketClient.emit("connectToGame", data);
    socketClient.on("lobbyInfo", (data) => {
      socketClient.emit("chatMessage", "axel", "coucou la room");
    });
    socketClient.on("chatMessage", (data) => {
      console.log(data);
      expect(data.sender).toEqual("axel");
      done();
    });
  });
});
