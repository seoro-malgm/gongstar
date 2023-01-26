export default {
  install(app) {
    const files = import.meta.globEager("@/components/base/*.vue");
    Object.entries(files).forEach(([path, m]) => {
      const name = path
        .split("/")
        .pop()
        .replace(/\.\w+$/, "");
      app.component(`Base${name}`, m.default);
    });
  },
};
