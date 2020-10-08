import { hot } from "react-hot-loader";
import React, { useEffect } from "react";
import { Router, Switch, Route, useParams, Redirect } from "react-router-dom";
import Game from "./Game";
import Link from "../components/Link";
import useRouter from "../hooks/useRouter";
// process.env.NODE_ENV === "production"
//   ? require("../sass/main.css")
//   : require("../sass/main.scss");

const App = () => {
  const [currentPage] = useRouter();
  console.log(currentPage);
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

export default hot(module)(App);
