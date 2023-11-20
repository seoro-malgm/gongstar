const state = {
  categories: {
    project: [
      {
        text: "카테고리를 선택하세요",
        value: null,
      },
      {
        text: "브랜드 크래프팅",
        value: "bx",
      },
      {
        text: "테크놀리지 솔루션",
        value: "it",
      },
      {
        text: "로컬 큐레이팅",
        value: "local",
      },
      {
        text: "푸드 솔루션",
        value: "food",
      },
    ],
    insight: [
      {
        text: "카테고리를 선택하세요",
        value: null,
      },
      {
        text: "Free",
        value: "free",
      },
    ],
  },
};

const getters = {
  getCategoryProject: (state) => {
    return state.categories.project;
  },
  getCategoryInsights: (state) => {
    return state.categories.insight;
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
