<template>
  <section class="section section-gap mt-5">
    <header class="container-fluid py-4">
      <h1 class="section-title text-center">공스타의 서비스</h1>
    </header>
    <section class="mt-5 container-fluid">
      <div
        class="row justify-content-between flex-column flex-md-row align-items-stretch"
        ref="target"
      >
        <div
          class="col-6 col-md-5 col-lg-4 h-100"
          v-for="(item, i) in services"
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
        }
      }
    });

    const services = ref([
      {
        title: "Food",
        text: "지역 생산물을 우선 사용하고 활용합니다. 푸드컨설팅과 케이터링 서비스를 제공합니다. 농촌활성화를 위해 F&B 산업에도 진입하여 지역에서 필요한 기업이 되기 위해 노력합니다.",
        style: {
          transform: "translate(10rem, 10rem) scale(0.2)",
        },
      },
      {
        title: "Brand eXperience",
        text: "로고, CI/BI뿐만 아니라 브랜드가 유저에게 도달하기까지 모든 과정을 생각합니다. 브랜드가 단점을 개선하고 강점을 극대화하여 유저들이 브랜드를 더 소중하게 느낄 수 있도록 합니다.",
        style: {
          transform: "translate(-10rem, 10rem) scale(0.2)",
        },
      },
      {
        title: "Community",
        text: "지역을 공헌할 수 있는 커뮤니티를 지원합니다. 지역을 선도하는 기업문화를 만들고, 유의미한 인사이트를 얻을 수 있도록 다양한 커뮤니티를 만들고 소식을 전합니다.",
        style: {
          transform: "translate(10rem, -10rem) scale(0.2)",
        },
      },
      {
        title: "Web Development",
        text: "브랜드의 서비스 고도화를 위해 온라인 시장으로 확대될 수 있도록 돕습니다. UI/UX디자인, 퍼블리싱, 검색최적화(SEO), 등 브랜드에 맞춘 웹 개발 서비스를 제공합니다.",
        style: {
          transform: "translate(-10rem, -10rem) scale(0.2)",
        },
      },
    ]);

    return {
      target,
      animated,
      services,
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
