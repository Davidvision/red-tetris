const params = require("../../params");
const express = require("express");

const { port, host } = params.server;
const app = express();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(port, host, () => {
  console.log(`Server is up on port ${port}`);
});
