import { useEffect, useState } from "react";

const parseAndWriteUrl = (path, pages) => {
  const matchedIndex = pages.findIndex(
    ({ regex }) => path.match(regex) !== null
  );
  if (matchedIndex < 0) {
    const { title, path } = pages[0];
    window.history.pushState({}, title, path);
    return 0;
  }
  return matchedIndex;
};

export default (pages) => {
  const [pageIndex, setPageIndex] = useState(() =>
    parseAndWriteUrl(window.location.pathname + window.location.hash, pages)
  );

<<<<<<< HEAD
  const handlePopState = () => {
    const pageIndex = parseAndWriteUrl(
      window.location.pathname + window.location.hash,
      pages
    );
    setPageIndex(pageIndex);
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
=======
  useEffect(() => {
    window.addEventListener("popstate", () => {
      const pageIndex = parseAndWriteUrl(
        window.location.pathname + window.location.hash,
        pages
      );
      setPageIndex(pageIndex);
    });
    return () => {
      window.removeEventListener("popstate", useEffect);
      // window.removeEventListener("popstate", () => {});
>>>>>>> 0326abeae11d4f96dee5f7a149c51247d57232cc
    };
  }, []);

  return [pages[pageIndex].component];
};
