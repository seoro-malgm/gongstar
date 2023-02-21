const state = {
  user: null,
  infos: {
    home: "국립공주대학교 문화재보존과학과 디지털보존솔루션랩(DCS LAB)",
    email: "joyh@kongju.ac.kr",
    tel: "041-850-8539",
    phone: "041-850-8539",
    address: "(32588) 충청남도 공주시 공주대학로 56 국립공주대학교 산학연구관 204호",
    facebook: "https://www.facebook.com/profile.php?id=100085628826902",
    instagram: "https://www.instagram.com/dcs_lab/?hl=ko",
  },
};

const getters = {
  getUser: (state) => {
    return state.user;
  },
  getInfos: (state) => {
    return state.infos;
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
  setState({ commit }, [key, value]) {
    commit("setState", [key, value]);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
