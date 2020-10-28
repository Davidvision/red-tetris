const fs = require("fs");
const socketListener = require("./middleware/socketListener");

const initReqHandler = (server, params, cb) => {
  const { host, port } = params.server;
  const handler = (req, res) => {
    const file =
      req.url === "/bundle.js"
        ? "/../../public/bundle.js"
        : "/../../public/index.html";
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err);
        res.writeHead(500);
        return res.end("Error loading index.html");
      }
      res.writeHead(200);
      res.end(data);
    });
  };

  server.on("request", handler);

  server.listen(port, host, () => {
    console.log(`Server is up on port ${port}`);
    cb();
  });
};

const startServer = (params, initGames = {}) => {
  const promise = new Promise((resolve, reject) => {
    const clientsIds = {};
    const games = initGames;
    const server = require("http").createServer();
    initReqHandler(server, params, () => {
      const io = require("socket.io")(server);
      const stop = cb => {
        io.close();
        server.close();
        console.log(`Server stopped.`);
        cb();
      };
      socketListener(io, clientsIds, games);
      resolve({ stop, io });
    });
  });
  return promise;
};

const killServer = ({ server, io }) => {
  io.close();
  server.close();
};

module.exports = { startServer, killServer };
