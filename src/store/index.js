import {createStore} from 'vuex';
import sample from './sample';
import auth from './auth';
import categories from './categories';

const store = createStore({
  modules: {
    sample,
    auth,
    categories,
  },
});

export default store;
