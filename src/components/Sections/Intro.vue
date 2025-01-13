<template>
  <div id="intro" ref="target">
    <div class="container">
      <div class="dummy-section">
        <div class="lettertype">
          <img :src="getURL('/assets/lettertype-white.svg')" alt="" />
        </div>
        <header class="section-title">
          <h1
            class="text-36 text-md-56 text-lg-80 mix-dif fw-800 mt-4 mt-lg-0 text-nowrap"
          >
            로컬의 [ 체인지메이커 ]
            <!-- <div class="names">{{ names }}, {{ index }}</div> -->
          </h1>
          <p class="text-14 text-md-18">
            우리는 지역에서 새로운 기준을 만들어갑니다. <br />
            온·오프라인 인프라를 구축하며, <br />
            혁신적인 사회 서비스를 통해 <br />
            지역사회에 특별한 가치를 제공합니다.
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
      <!-- <div class="floating-btn" v-if="infos?.infoDocument">
        <a
          :href="infos.infoDocument"
          target="_blank"
          class="btn btn-outline-gray-1 rounded-pill px-3 py-2 fw-700 text-12 text-md-14"
        >
          공스타 회사소개서 다운로드
        </a>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { inject, computed, ref, watch, onMounted } from "vue";
import SectionLogoRotate from "@/components/Sections/LogoRotate.vue";
import { useIntersectionObserver, useIntervalFn } from "@vueuse/core";
import { useStore } from "vuex";
const getURL = inject("getImageURL");

const store = useStore();
const infos = computed(() => {
  return store.getters["auth/getInfos"];
});

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
// todos
// const names = ref(["체인지에미커", "억", "윽"]);
// const name = computed(() => {
//   return names[index];
// });
// let index = 0;
// let nameInterval = null;
// onMounted(() => {
//   setInterval(() => {
//     if (index >= names?.length) {
//       index = 0;
//     }
//     index++;
//   }, 4000);
// });
</script>

<style lang="scss" scoped>
#intro {
  // padding-top: 120px;
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
  .lettertype {
    mix-blend-mode: difference;
  }
  // 대제목
  .section-title {
    color: white;
    // position: absolute;
    // bottom: 16vh;
    // left: 50%;
    // transform: translateX(-50%);
    text-align: left;
    // z-index: 10;
    mix-blend-mode: difference;
    h1 {
      display: inline-flex;
    }
  }

  .scroll-down {
    position: absolute;
    bottom: 1.5rem;
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
  top: 96px;
  left: 0;
  z-index: -1;
  @media (min-width: $breakpoint-md) {
    top: 48px;
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
