const fs = require("fs");
const socketListener = require("./middleware/socketListener");

const csp =
  "base-uri 'self'; connect-src 'self' ws: *.haaskr.com haaskr.com www.google-analytics.com; img-src 'self' data: ; style-src 'self' 'unsafe-inline'; object-src 'none'; font-src 'self' data: ;";

const initReqHandler = (server, params, cb) => {
  const { host, port } = params.server;
  const handler = (req, res) => {
    const isAsset =
      req.url.split("/").findIndex(path => path === "assets") === 1 ||
      req.url === "/favicon.ico";
    let file = "/../../public";
    if (isAsset) {
      file += req.url;
    } else {
      file += req.url === "/bundle.js" ? "/bundle.js" : "/index.html";
    }
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500);
        return res.end("Error transferring file");
      }
      res.setHeader("content-security-policy", csp);
      res.setHeader(
        "strict-transport-security",
        "max-age=63072000; includeSubdomains; preload"
      );
      // res.setHeader("x-content-type-options", "nosniff");
      res.setHeader("x-frame-options", "DENY");
      res.setHeader("x-xss-protection", "1; mode=block");
      res.setHeader("referrer-policy", "origin");
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
