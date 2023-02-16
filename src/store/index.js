import { createStore } from "vuex";
import sample from "./sample";
import auth from "./auth";

const store = createStore({
  modules: {
    sample,
    auth,
  },
});

export default store;
