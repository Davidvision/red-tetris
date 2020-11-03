import React, { useState } from "react";

export default ({ page }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  return (
    <>
      <button
        onMouseEnter={() => setIsDisplayed(true)}
        onMouseLeave={() => setIsDisplayed(false)}
        className="btn btn-outline hint__btn noSelect"
      >
        ?
      </button>
      {isDisplayed && (
        <div className="hint-container">
          {page === "home" ? (
            <>
              <p>Enter your username</p>
              <p>Either join or create a room</p>
              <p>A room can contain a maximum of 4 players</p>
              <p>This room can be private or not (so nobody can join you)</p>
              <p>Hit Create-Join button to get to the game</p>
            </>
          ) : (
            <>
              <p>↓ → ←: move</p>
              <p>↑: rotation</p>
              <p>space: move piece to bottom</p>
              <p>
                If a player breaks more than one line, he will send penalty to
                his opponents.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};
