<template>
  <div>
    <section class="intro">
      <span class="text-white">로고 스케치 영상</span>
    </section>
    <section class="section-gap mb-0">
      <chart-directed></chart-directed>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import ChartDirected from "@/components/Chart/ChartDirected.vue";

export default {
  components: {
    ChartDirected,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.intro {
  width: 100vw;
  background-color: $gray-1;
  height: 100vh;
  @media (min-width: $breakpoint-sm) {
    max-height: calc(100vh - $gnb-height-sm);
  }
  @media (min-width: $breakpoint-md) {
    max-height: calc(100vh - $gnb-height-md);
  }
  @media (min-width: $breakpoint-lg) {
    max-height: calc(100vh - $gnb-height-lg);
  }
  @media (min-width: $breakpoint-xl) {
    max-height: calc(100vh - $gnb-height-xl);
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
