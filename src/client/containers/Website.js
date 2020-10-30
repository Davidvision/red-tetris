import React, { useContext } from "react";
import useRouter from "../hooks/useRouter";
import { Context as HomeContext } from "../context/HomeContext";
import { pages } from "../utils/router";
import useListenSockets from "../hooks/useListenSockets";
import useKeyboard from "../hooks/useKeyboard";
import useViewMode from "../hooks/useViewMode";

export default () => {
  useListenSockets();
  useKeyboard();
  useViewMode();
  const [currentPage] = useRouter(pages);
  const {
    state: { isMobile, winHeight }
  } = useContext(HomeContext);

  return (
    <div className="main" style={isMobile ? { minHeight: winHeight } : {}}>
      {currentPage}
    </div>
  );
};
