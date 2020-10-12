import React from "react";
import changePage from "../utils/changePage";

export default ({ path, hash = "", title, children }) => (
  <div onClick={() => changePage(title, path, hash)}>{children}</div>
);
