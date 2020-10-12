import React, { memo } from "react";

export default memo(({ color = 0 }) => (
  <div
    className={`board-pixel--${color}${color ? " board-pixel__piece" : ""}`}
  />
));
