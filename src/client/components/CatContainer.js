import React, { memo } from "react";

export default memo(({ children, customStyle = {} }) => (
  <div className="game__cat-container" style={customStyle}>
    {children}
  </div>
));
