import React from "react";
import { changePage, pages } from "../utils/router";

export default ({ callBack }) => (
  <button
    onClick={() => {
      callBack;
      changePage(pages[0].title, pages[0].path);
    }}
  >
    quit game
  </button>
);
