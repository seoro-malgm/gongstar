<template>
  <div>
    <Transition name="fade">
      <splash-page v-if="splash" />
    </Transition>
    <section class="intro">
      <div class="logo">
        <img :src="getURL('/assets/logo-vertical.svg')" alt="dcs lab 로고 이미지" />
      </div>
      <!-- <div class="text-center mt-5">
        <h5 class="mb-0">국립공주대학교 문화재보존과학과</h5>
        <h4 class="text-30 text-lg-48">디지털보존솔루션랩</h4>
      </div> -->
    </section>
    <section>
      <!-- <chart-directed></chart-directed> -->
    </section>
  </div>
</template>

<script>
import { ref, inject, onMounted } from "vue";
// import DefaultLogo from "@/components/DefaultLogo.vue";
import SplashPage from "@/components/SplashPage.vue";
// import ChartDirected from "@/components/Chart/ChartDirected.vue";

export default {
  components: {
    // ChartDirected,
    // DefaultLogo,
    SplashPage,
  },
  setup() {
    const splash = ref(true);
    const getURL = inject("getImageURL");

    onMounted(() => {
      setTimeout(() => {
        splash.value = false;
      }, 4000);
    });

    return { getURL, splash };
  },
};
</script>

<style lang="scss" scoped>
.intro {
  width: 100%;
  height: 100vh;
  // @media (min-width: $breakpoint-sm) {
  //   max-height: calc(100vh - $gnb-height-sm);
  // }
  // @media (min-width: $breakpoint-md) {
  //   max-height: calc(100vh - $gnb-height-md);
  // }
  // @media (min-width: $breakpoint-lg) {
  //   max-height: calc(100vh - $gnb-height-lg);
  // }
  // @media (min-width: $breakpoint-xl) {
  //   max-height: calc(100vh - $gnb-height-xl);
  // }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: $gradient-primary;
  .logo {
    width: 400px;
    height: auto;
    max-width: 65vw;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
