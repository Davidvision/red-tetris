export default (title, path, hash) => {
  if (window.location.pathname !== path || window.location.hash !== hash) {
    window.history.pushState({}, title, path + hash);
    window.dispatchEvent(new Event("popstate"));
  }
};
