import React from "react";

export default ({ path, hash = "", title, children }) => {
  const handleClick = () => {
    if (window.location.pathname !== path || window.location.hash !== hash) {
      window.history.pushState({}, title, path + hash);
      window.dispatchEvent(new Event("popstate"));
    }
  };
  return <div onClick={handleClick}>{children}</div>;
};
