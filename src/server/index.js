const express = require("express");
const bodyParser = require("body-parser");

const { port, host } = require("../../params").server;
const app = express();

app.use(bodyParser.json({ limit: "200mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

let server = app.listen(port, host, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = server;
