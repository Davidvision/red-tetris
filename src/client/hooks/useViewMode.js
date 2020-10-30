import { useEffect, useContext, useCallback } from "react";
import { Context as HomeContext } from "../context/HomeContext";

export default () => {
  const {
    setIsMobile,
    setWinHeight,
    state: { isMobile }
  } = useContext(HomeContext);

  const handleWindowResize = useCallback(() => {
    setWinHeight(window.innerHeight);
    if (window.innerWidth < 800 && isMobile === "r") {
      setIsMobile(true);
    } else if (window.innerWidth >= 800 && isMobile === "m") {
      setIsMobile(false);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);
};
