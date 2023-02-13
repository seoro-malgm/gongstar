export default {
  install: (app, options) => {
    // 컴포넌트, 페이지로 이동
    const getImageURL = (path) => {
      const url = new URL(path, import.meta.url).href;
      return url;
    };
    app.provide("getImageURL", getImageURL);
  },
};
