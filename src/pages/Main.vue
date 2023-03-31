<template>
  <div>this is main page</div>
</template>

<script>
import { ref, inject, onMounted } from "vue";

export default {
  components: {},
  setup() {
    const getURL = inject("getImageURL");

    return { getURL };
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
</style>
