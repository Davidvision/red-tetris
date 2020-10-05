import { hot } from "react-hot-loader";
import React from "react";
// process.env.NODE_ENV === "production"
//   ? require("../sass/main.css")
//   : require("../sass/main.scss");

const App = () => {
  return <h1>Hello World</h1>;
};

export default hot(module)(App);
