import React from "react";
import useRouter from "../hooks/useRouter";
import { pages } from "../utils/router";
import useListenSockets from "../hooks/useListenSockets";
import ChangeTheme from "../components/ChangeTheme";
import useKeyboard from "../hooks/useKeyboard";

export default () => {
  useListenSockets();
  useKeyboard();
  const [currentPage] = useRouter(pages);

  return (
    <div className="main">
      <ChangeTheme />
      {currentPage}
    </div>
  );
};
