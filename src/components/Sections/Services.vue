<template>
  <section id="services" class="section section-gap mt-5">
    <header class="container-fluid py-4">
      <h1 class="section-title text-center">공스타의 서비스</h1>
    </header>
    <section class="mt-5 container">
      <div
        class="row justify-content-center flex-column flex-md-row align-items-stretch"
        ref="target"
      >
        <div
          class="col-12 col-lg-3 h-100"
          v-for="(item, i) in services"
          :key="i"
        >
          <article
            class="vision-item p-3 p-lg-4"
            :class="[
              {
                show: targetIsVisible
              }
            ]"
            :style="{
              transform: `translate(${i % 2 ? -10 : 10}rem, ${
                i % 2 ? -10 : 10
              }rem) scale(0.3)`
            }"
          >
            <header>
              <h5 class="text-30 text-lg-32">{{ item.text }}</h5>
            </header>
            <section>
              <!-- <figure>
                <div class="bg-img ratio-40 bg-gray-2"></div>
              </figure> -->
              <p class="text-16 text-md-20">
                {{ item.desc }}
              </p>
              <router-link
                class="btn btn-black rounded-pill px-3 py-3 mt-3 text-16 text-md-20 w-100"
                :to="{
                  path: '/project',
                  query: {
                    category: item.value
                  }
                }"
              >
                <span>관련 솔루션 보러가기</span>
                <i class="icon icon-right-big" />
              </router-link>
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
            :class="{ targetIsVisible: targetIsVisible }"
            v-for="item in items"
            :key="item.id"
            :style="{
              width: `${targetIsVisible ? item.width : 0}%`,
              backgroundColor: item.background,
              opacity: targetIsVisible ? 1 : 0,
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

<script setup>
import { ref, computed, watch } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const target = ref(null);
const targetIsVisible = ref(false);
const emit = defineEmits(["sectionChange"]);

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting;
  }
);
watch(
  () => targetIsVisible.value,
  n => {
    if (n) {
      emit("sectionChange");
    }
  }
);

import { useStore } from "vuex";
const store = useStore();
// 카테고리 목록
const services = computed(() => {
  const list = store.getters["categories/getCategoryProject"];
  return list?.length ? list.filter(i => i.value !== null) : [];
});

// const services = ref([
//   {
//     id: 'bx',
//     title: '브랜드 크래프팅',
//     text: '로고 디자인뿐만 아니라 브랜드가 가진 소중한 가치를 발견해드립니다. CI-BI부터 컨설팅까지 브랜드의 약점을 보완하고 강점을 극대화하여 효과적인 스토리텔링을 만듭니다.',
//     style: {
//       transform: 'translate(10rem, 10rem) scale(0.3)',
//     },
//   },
//   {
//     id: 'it',
//     title: '테크놀로지 솔루션',
//     text: '브랜드를 고도화할 수 있도록 기술적인 도움을 드립니다. 홍보 웹사이트, 플랫폼, CMS 개발 서비스를 제공합니다.',
//     style: {
//       transform: 'translate(-10rem, 10rem) scale(0.3)',
//     },
//   },
//   {
//     id: 'local',
//     title: '로컬 큐레이팅',
//     text: '혁신을 추구하는 건강한 커뮤니티를 양성 및 지원하여 지역을 선도하는 기업문화를 만들고 발전적인 인사이트를 나눕니다.',
//     style: {
//       transform: 'translate(10rem, -10rem) scale(0.3)',
//     },
//   },
//   {
//     id: 'food',
//     title: '푸드 솔루션',
//     text: '기업의 내부/외부 환경분석을 기반으로 ICT 서비스 고도화를 통해 글로벌 시대를 함께할 수 있도록 웹 개발 서비스를 제공합니다.',
//     style: {
//       transform: 'translate(-10rem, -10rem) scale(0.3)',
//     },
//   },
// ]);
</script>

<style lang="scss" scoped>
.section {
  // min-height: 100vh;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
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
      transition: all 0.4s;
      transition-delay: 0.3s;
    }
  }
}
.vision-item {
  width: 100%;
  // min-height: calc(50vh - 100px);
  margin-bottom: 40px;
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

@keyframes toggle {
  0% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(8px);
  }
}
.icon-right-big {
  animation-name: toggle;
  animation-timing-function: cubic-bezier(0.6, 0, 0.735, 0.045);
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
</style>
