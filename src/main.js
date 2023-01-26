import { createApp } from "vue";
import commons from "@/plugins/commons";
import globals from "@/plugins/globalComponents";

import "@/assets/styles/index.scss";
// import "@/locales/i18n.js";
import App from "./App.vue";
import store from "@/store//index.js";
import router from "@/router/index.js";
// import VueI18n from "vue-i18n";

createApp(App)
  .use(router)
  .use(store)
  .use(commons)
  .use(globals)
  // .use(VueI18n)
  .mount("#app");
