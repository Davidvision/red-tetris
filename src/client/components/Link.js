import React from "react";
import { changePage } from "../utils/router";

export default ({ path, hash = "", title, children }) => (
  <div onClick={() => changePage(title, path, hash)}>{children}</div>
);
