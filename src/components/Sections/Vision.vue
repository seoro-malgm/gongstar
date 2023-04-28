<template>
  <section class="section section-gap mt-5">
    <header class="container-fluid py-4">
      <h1 class="section-title text-center">공스타의 비전</h1>
    </header>
    <section class="mt-5 container-fluid">
      <div
        class="row justify-content-between flex-column flex-md-row align-items-stretch"
        ref="target"
      >
        <div
          class="col-6 col-md-5 col-lg-4 h-100"
          v-for="(item, i) in visions"
          :key="i"
          :class="[
            {
              'offset-6 offset-md-2 offset-lg-4': i % 2,
            },
          ]"
        >
          <article
            class="vision-item p-3 p-lg-5"
            :class="[
              {
                'text-end': i % 2,
              },
              {
                show: animated,
              },
            ]"
            :style="{
              ...item.style,
            }"
          >
            <header>
              <h5 class="text-20 text-md-24 text-lg-40">{{ item.title }}</h5>
            </header>
            <section>
              <!-- <figure>
                <div class="bg-img ratio-40 bg-gray-2"></div>
              </figure> -->
              <p class="text-14 text-md-20">
                {{ item.text }}
              </p>
            </section>
          </article>
        </div>
      </div>
      <!-- <div class="row justify-content-between flex-column flex-md-row">
       
      </div> -->
      <!-- <div class="stairs">
        <ul class="list-stair" ref="target">
          <li
            class="list-item"
            :class="{ animated: animated }"
            v-for="item in items"
            :key="item.id"
            :style="{
              width: `${animated ? item.width : 0}%`,
              backgroundColor: item.background,
              opacity: animated ? 1 : 0,
              color: item?.color ? item.color : '#23235',
            }"
          >
            {{ item.text }}
          </li>
        </ul>
      </div> -->
    </section>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { useIntersectionObserver } from "@/plugins/useIntersectionObserver";

export default {
  setup() {
    const animated = ref(false);
    const target = useIntersectionObserver((entry) => {
      if (entry.isIntersecting) {
        if (!animated.value) {
          animated.value = true;
          // console.log(animated.value);
        }
      }
    });

    const items = ref([
      {
        text: "지역사회를 공헌하는 기업문화",
        width: 30,
        background: "#ffe618",
      },
      {
        text: "로컬 자원 활성화",
        width: 40,
        background: "#F2D857",
      },
      {
        text: "로컬 자원 활성화",
        width: 60,
        background: "#888",
      },
      {
        text: "로컬 자원 활성화",
        width: 80,
        background: "#444",
        color: "white",
      },
      {
        text: "로컬 자원 활성화",
        width: 100,
        background: "#222",
        color: "white",
      },
    ]);

    const visions = ref([
      {
        title: "로컬 자원 활성화",
        text: "공스타는 지역 자원을 최대한 활용하여 사업을 합니다. 지역 청년고용과 지역 생산물 우선 사용 등 예비사회적 기업으로써 지역에 필요한 기업이 되기위해 노력합니다.",
        style: {
          transform: "translate(10rem, 10rem) scale(0.2)",
        },
      },
      {
        title: "상호작용 브랜딩",
        text: "수도권 기준이 아닌 지역 환경에 반영된 브랜딩을 합니다. 공장처럼 찍어내는 것이 아닌 언제 어디서든 활용할 수 있는 솔루션을 제시하기 위해 노력합니다.",
        style: {
          transform: "translate(-10rem, 10rem) scale(0.2)",
        },
      },
      {
        title: "농촌 신활력",
        text: "공스타는 소멸해가는 농촌을 활성화 하기 위해 F&B 사업에 진 입하였습니다. 지역이 할 수 있는 일과 공스타가 할 수 있는 일 을 명확하게 나누어 필요한 기업이 되기위해 노력합니다.",
        style: {
          transform: "translate(10rem, -10rem) scale(0.2)",
        },
      },
      {
        title: "그리고?",
        text: "???",
        style: {
          transform: "translate(-10rem, -10rem) scale(0.2)",
        },
      },
    ]);

    return {
      target,
      animated,
      items,
      visions,
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  min-height: 100vh;
}
.stairs {
  .list-stair {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: end;
    .list-item {
      background-color: #999;
      padding: 2rem;
      font-size: 24px;
      font-weight: 700;
      white-space: nowrap;
      @media (min-width: $breakpoint-md) {
        padding: 3rem;
        font-size: 28px;
      }
      transition: all 0.8s;
      transition-delay: 0.5s;
    }
  }
}
.vision-item {
  width: 100%;
  // min-height: calc(50vh - 100px);
  margin-bottom: 80px;
  border: 2px solid $gray-1;
  opacity: 0;
  transition: all 0.5s $default-ease;
  transition-delay: 0.2s;
  header {
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 2px solid $gray-1;
    h5 {
      text-align: center;
      font-weight: 800;
    }
  }
  &.show {
    opacity: 1;
    transform: translate(0, 0) scale(1) !important;
  }
}
</style>
