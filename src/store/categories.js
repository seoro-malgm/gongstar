const state = {
  categories: {
    project: [
      {
        text: "카테고리를 선택하세요",
        value: null
      },
      {
        text: "크리에이트",
        value: "bx",
        desc: "전문적인 콘텐츠 제작과 행사 기획을 통해 브랜드의 정체성을 만들어갑니다. 콘텐츠에 몰입하기 위해 A to Z를 설계하며 최적화된 콘텐츠를 제공합니다. "
      },
      {
        text: "로컬 큐레이팅",
        value: "local",
        desc: "로컬 콘텐츠를 발굴하고 보존하며, 전시, 교육등 다채로운 방식으로 지역의 가치를 데이터화합니다. 우리는 현대 아키비스트가되어 로컬의 콘텐츠를 수집하고 보존하며 재해석합니다."
      },
      {
        text: "F&B",
        value: "food",
        desc: "커피 원두 납품부터 맞춤형 디저트 케이터링과 경영 지원까지, 창의적인 식문화를 제시하며 믿을 수 있는 파트너로 함께합니다. 원가 공학을 토대로 카페 컨설팅 등 경영학 전문가의 전문성을 바탕으로, 효율성과 창의성을 모두 갖춘 우리만의 독창적인 식문화 세계관을 제시합니다."
      }
    ],
    insight: [
      {
        text: "카테고리를 선택하세요",
        value: null
      },
      {
        text: "Free",
        value: "free"
      }
    ]
  }
};

const getters = {
  getCategoryProject: state => {
    return state.categories.project;
  },
  getCategoryInsights: state => {
    return state.categories.insight;
  }
};

const mutations = {
  // store.commit('auth/setState', ['key', value]);
  setState(state, [key, value]) {
    state[key] = value;
  }
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
