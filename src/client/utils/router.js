import React from "react";
import Game from "../containers/Game";
import Home from "../containers/Home";

export const changePage = (title, path, hash) => {
  if (window.location.pathname !== path || window.location.hash !== hash) {
    window.history.pushState({}, title, path + hash);
    window.dispatchEvent(new Event("popstate"));
  }
};

export const pages = [
  {
    regex: /^\/{1}$/gm,
    path: "/",
    component: <Home />,
    title: "Red Tetris"
  },
  {
    regex: /^\/\#[a-zA-Z0-9]{3,15}\[[a-zA-Z0-9]{3,15}\]$/gm,
    component: <Game />,
    title: "Red Tetris - Game"
  }
];
