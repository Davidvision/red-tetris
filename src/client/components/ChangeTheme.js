import React, { useRef } from "react";

const themesNumber = 3;

export default () => {
  const btnRef = useRef(null);

  const handleClick = () => {
    const rootDiv = document.getElementById("tetris");
    const { className } = rootDiv;
    const currentThemeNumber = parseInt(className.replace("theme-", ""));
    const newThemeNumber =
      currentThemeNumber === themesNumber ? 1 : currentThemeNumber + 1;
    rootDiv.className = `theme-${newThemeNumber}`;
    btnRef.current.blur();
  };

  return (
    <button
      className="btn btn-outline change-theme"
      onClick={handleClick}
      ref={btnRef}
    >
      Change Theme
    </button>
  );
};
