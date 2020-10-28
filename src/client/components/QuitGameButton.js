import React from "react";
import { changePage, pages } from "../utils/router";

export default ({ callBack }) => (
  <button
    className="btn quit-game-btn"
    onClick={() => {
      callBack;
      changePage(pages[0].title, pages[0].path);
    }}
  >
    Quit game
  </button>
);
