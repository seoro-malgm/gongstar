const state = {
  me: null,
};

const getters = {
  getMe: state => {
    return state.me;
  },
};

const mutations = {
  // store.commit('auth/setState', ['key', value]);
  setState(state, [key, value]) {
    state[key] = value;
  },
};

const actions = {
  /**
   * state를 set 하는 setter
   * @param {*} state
   * @param {Array} [key, value] key:state에서 변경할 key값, value: 변경하여 적용할 값
   * 사용법:
   *  store.dispatch('auth/setState', ['marketList', value]);
   *  auth의 setState 실행 => state의 value로 적용
   */
  setState({commit}, [key, value]) {
    commit('setState', [key, value]);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
