const state = {
  categories: {
    project: [
      {
        text: "카테고리를 선택하세요",
        value: null
      },
      {
        text: "브랜드 크래프팅",
        value: "bx",
        desc: "브랜드에 몰입하기 위해 A to Z를 설계하며 최적화된 브랜딩을 제공해드립니다. 적정기술을 통해 약점은 보완하고 강점은 극대화하여 최적화된 서사를 만듭니다."
      },
      {
        text: "테크놀리지 솔루션",
        value: "it",
        desc: "혁신적인 프로젝트를 계획하는 선구자들에게 기술적인 도움을 드립니다. 분석을 통해 효율적인 표준화를 제안해드리며 웹디벨러먼트, 플랫폼, cms 개발등 맞춤형 서비스를 제공합니다."
      },
      {
        text: "로컬 큐레이팅",
        value: "local",
        desc: "우리는 현대 아키비스트가되어 로컬의 콘텐츠를 수집하고 보존하며 전시기획부터 교육 마케팅까지 다양한 영역에서 우리만의 개성을 발휘합니다."
      },
      {
        text: "푸드 솔루션",
        value: "food",
        desc: "맞춤형 케이터링, 레시피 표준화, 원가설계 등 개성있는 인프라를 제공하여 든든한 파트너가 되었습니다. 이제는 우리만의 식문화를 향유할 수 있도록 세계관을 선보이고자 합니다."
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
