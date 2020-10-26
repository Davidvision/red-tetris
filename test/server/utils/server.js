const { startServer, killServer } = require("../../../src/server/server");

const startTestServer = (params, cb) => {
  startServer(params)
    .then(srv => {
      cb(srv);
    })
    .catch(err => cb(err));
};

module.exports = { startTestServer };
