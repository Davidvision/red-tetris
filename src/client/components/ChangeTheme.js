import React from "react";

const themesNumber = 3;

export default () => {
  const handleClick = () => {
    const rootDiv = document.getElementById("tetris"); //bonus
    const { className } = rootDiv;
    const currentThemeNumber = parseInt(className.replace("theme-", ""));
    const newThemeNumber =
      currentThemeNumber === themesNumber ? 1 : currentThemeNumber + 1;
    rootDiv.className = `theme-${newThemeNumber}`;
  };

  return (
    <button className="btn btn-outline change-theme" onClick={handleClick}>
      Change Theme
    </button>
  );
};
