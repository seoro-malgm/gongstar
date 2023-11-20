<template>
  <div id="intro" ref="target">
    <div class="container">
      <div class="dummy-section">
        <div class="lettertype">
          <img :src="getURL('/assets/lettertype.svg')" alt="" />
        </div>
        <header class="section-title">
          <h1 class="text-36 text-md-45 text-lg-64 mix-dif fw-800">
            로컬의 [
            <div class="names"></div>
            ]
          </h1>
          <p class="text-14 text-md-15">
            본 회사는 온라인 플랫폼 개발 및 온라인 인프라 구축을 통해 <br />
            도시재생을 장려하고 혁신적인 사회서비스를 제공하여 <br />
            지역사회에 공헌함을 목적으로 합니다.
          </p>
        </header>
        <div class="scroll-down">
          <p class="mb-1 fw-700 text-16 text-md-18">Scroll Down</p>
          <i class="icon icon-arr-bottom text-32 text-md-40" />
        </div>
      </div>
      <div class="section-main">
        <section-logo-rotate />
      </div>
      <!-- 플로팅 버튼:회사소개서 다운로드 -->
      <div class="floating-btn" v-if="infos?.infoDocument">
        <a
          :href="infos.infoDocument"
          target="_blank"
          class="btn btn-outline-gray-1 rounded-pill px-3 py-2 fw-700 text-12 text-md-14"
        >
          공스타 회사소개서 다운로드
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed, ref, watch, defineEmits } from "vue";
import SectionLogoRotate from "@/components/Sections/LogoRotate.vue";
const getURL = inject("getImageURL");

import { useStore } from "vuex";
const store = useStore();
const infos = computed(() => {
  return store.getters["auth/getInfos"];
});

// import { useIntersectionObserver, useIntervalFn } from "@vueuse/core";
// const target = ref(null);
// const targetIsVisible = ref(false);
// const emit = defineEmits(["sectionChange"]);
// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
//   targetIsVisible.value = isIntersecting;
// });
// watch(
//   () => targetIsVisible.value,
//   (n) => {
//     if (n) {
//       emit("sectionChange");
//     }
//   }
// );
</script>

<style lang="scss" scoped>
#intro {
  padding-top: 120px;
}
.dummy-section {
  width: 100%;
  height: calc(100vh - 200px);
  margin-bottom: 132px;
  z-index: 2;
  @media (min-width: $breakpoint-md) {
    margin-bottom: 88px;
    height: calc(100vh - 88px);
  }
  // 대제목
  .section-title {
    // position: absolute;
    // bottom: 16vh;
    // left: 50%;
    // transform: translateX(-50%);
    text-align: left;
    // z-index: 10;
  }

  .scroll-down {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 10;
  }
}

@keyframes updown {
  0% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(16px);
  }
}

.section-main {
  width: 100%;
  height: calc(100vh - 200px);
  top: 0;
  left: 0;
  z-index: -1;
  @media (min-width: $breakpoint-md) {
    height: calc(100vh - 140px);
  }
  // position: relative;
  position: absolute;
}

.icon.icon-arr-bottom {
  animation-name: updown;
  animation-timing-function: cubic-bezier(0.6, 0, 0.735, 0.045);
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}

.floating-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
</style>
