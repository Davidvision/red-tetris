import React, { memo } from "react";

export default memo(({ children, customStyle = {}, cClass = "" }) => (
  <div className={`game__cat-container ${cClass}`} style={customStyle}>
    {children}
  </div>
));
