<template>
  <div>
    <section class="intro"></section>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
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
}
</style>
