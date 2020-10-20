import React from "react";
import { changePage, pages } from "../utils/router";

export default () => (
  <button onClick={() => changePage(pages[0].title, pages[0].path)}>
    quit game
  </button>
);
