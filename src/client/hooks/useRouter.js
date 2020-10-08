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

export default pages => {
  const [pageIndex, setPageIndex] = useState(() =>
    parseAndWriteUrl(window.location.pathname + window.location.hash, pages)
  );

  useEffect(() => {
    window.addEventListener("popstate", () => {
      const pageIndex = parseAndWriteUrl(
        window.location.pathname + window.location.hash,
        pages
      );
      setPageIndex(pageIndex);
    });
    return () => {
      window.removeEventListener("popstate", () => {});
    };
  }, []);

  return [pages[pageIndex].component];
};
