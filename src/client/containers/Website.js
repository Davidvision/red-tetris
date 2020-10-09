import React from "react";
import useRouter from "../hooks/useRouter";
import Game from "../containers/Game";
import Home from "../containers/Home";
import Link from "../components/Link";
import useListenSockets from "../hooks/useListenSockets";

export default () => {
  useListenSockets();
  const [currentPage] = useRouter(pages);

  return <>{currentPage}</>;
};

// <Link path="/" hash="#abcdEf45gE[hugo]" title="room">
//   <p>/room</p>
// </Link>
// <Link path="/lol" title="lol">
//   <p>/lol</p>
// </Link>
// <Link path="/" title="/">
//   <p>/</p>
// </Link>

const pages = [
  {
    regex: /^\/{1}$/gm,
    path: "/",
    component: <Home />,
    title: "Red Tetris"
  },
  {
    regex: /^\/\#[a-zA-Z0-9]{10}\[[a-zA-Z0-9]{3,15}\]$/gm,
    component: <Game />,
    title: "Red Tetris - Game"
  }
];
