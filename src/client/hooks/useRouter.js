import React, { useEffect, useState } from "react";
import Game from "../containers/Game";
import Home from "../containers/Home";

const components = [
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

const parseAndWriteUrl = (path) => {
  const matchedIndex = components.findIndex(
    ({ regex }) => path.match(regex) !== null
  );
  if (matchedIndex < 0) {
    const { title, path } = components[0];
    window.history.pushState({}, title, path);
    return 0;
  }
  return matchedIndex;
};

export default () => {
  const [componentIndex, setComponentIndex] = useState(() =>
    parseAndWriteUrl(window.location.pathname + window.location.hash)
  );

  useEffect(() => {
    window.addEventListener("popstate", () => {
      const componentIndex = parseAndWriteUrl(
        window.location.pathname + window.location.hash
      );
      setComponentIndex(componentIndex);
    });
    return () => {
      window.removeEventListener("popstate", () => {});
    };
  }, []);

  return [components[componentIndex].component];
};
