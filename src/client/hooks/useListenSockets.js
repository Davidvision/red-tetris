import { useEffect } from "react";
import io from "socket.io-client";
import { server } from "../../../params";

const { port, host } = server;
const ENDPOINT =
  process.env.NODE_ENV === "production" ? "" : `http://${host}:${port}/`;

export default () => {
  useEffect(() => {
    const socket = io(ENDPOINT);
  }, []);
};
