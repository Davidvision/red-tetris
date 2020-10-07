const mongoose = require("mongoose");
const connectString =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : "mongodb://127.0.0.1:27017/red-tetris-db";

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
