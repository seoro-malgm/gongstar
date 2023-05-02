const state = {
  user: null,
  infos: {
    home: "공스타",
    licenseNumber: "821-86-02205", // 사업자등록번호
    email: "gongstar2021@gmail.com",
    tel: "010-7191-4270",
    phone: "010-7191-4270",
    address: "충청남도 공주시 신관동 흑수골길 41, 2층",
    addressSummary: "공주시 신관동 흑수골길 41, 2층",
    // facebook: "https://www.facebook.com/profile.php?id=100085628826902",
    instagram: "https://www.instagram.com/gong__star2021/?hl=ko",
    // 회사소개서
    infoDocument:
      "https://firebasestorage.googleapis.com/v0/b/community-newwaves.appspot.com/o/documents%2F%E1%84%80%E1%85%A9%E1%86%BC%E1%84%89%E1%85%B3%E1%84%90%E1%85%A1%20%E1%84%92%E1%85%AC%E1%84%89%E1%85%A1%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%E1%84%89%E1%85%A5(2023ver).pdf?alt=media&token=ddecc40d-a777-4276-a495-e39c572af3f9",
    accountNumber: "000-000-000",
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
