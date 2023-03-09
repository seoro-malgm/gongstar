import { createApp } from "vue";
import commons from "@/plugins/commons";
import firebase from "@/plugins/firebase";
import globals from "@/plugins/globalComponents";

import "bootstrap";
import "@/assets/styles/index.scss";
// import "@/locales/i18n.js";
import App from "./App.vue";
import store from "@/store//index.js";
import router from "@/router/index.js";
// import VueI18n from "vue-i18n";

createApp(App)
  .use(router)
  .use(store)
  .use(firebase)
  .use(commons)
  .use(globals)
  // .use(VueI18n)
  .mount("#app");
