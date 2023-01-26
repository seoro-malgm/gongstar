export default {
  install: (app, options) => {
    // 컴포넌트, 페이지로 이동
    const getImageURL = (path) => {
      const url = new URL(`/src/assets/${path}`, import.meta.url).href;
      // console.log({
      //   path: `/assets/${path}`,
      //   url,
      // });
      return url;
    };
    app.provide("getImageURL", getImageURL);
  },
};
