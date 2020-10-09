import { hot } from "react-hot-loader";
import React, { useEffect } from "react";
import Game from "../containers/Game";
import Home from "../containers/Home";
import Link from "../components/Link";
import useRouter from "../hooks/useRouter";
// process.env.NODE_ENV === "production"
//   ? require("../sass/main.css")
//   : require("../sass/main.scss");

const App = () => {
  const [currentPage] = useRouter(pages);
  return (
    <>
      <Link path="/" hash="#abcdEf45gE[hugo]" title="room">
        <p>/room</p>
      </Link>
      <Link path="/lol" title="lol">
        <p>/lol</p>
      </Link>
      <Link path="/" title="/">
        <p>/</p>
      </Link>
      {currentPage}
    </>
  );
};

const pages = [
  {
    regex: /^\/{1}$/gm,
    path: "/",
    component: <Home />,
    title: "Red Tetris",
  },
  {
    regex: /^\/\#[a-zA-Z0-9]{10}\[[a-zA-Z0-9]{3,15}\]$/gm,
    component: <Game />,
    title: "Red Tetris - Game",
  },
];

export default hot(module)(App);
