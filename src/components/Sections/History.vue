<template>
  <div class="section-wrapper">
    <section class="section section-history" :class="{ fixed: fixed }">
      <div class="interaction-start" ref="start"></div>
      <header class="">
        <h1 class="section-title text-center text-white">
          공스타의 연혁

          {{ fixed }}
        </h1>
      </header>
      <div class="logo-rotate">
        <section-logo-rotate :size="2.2" mode="black" />
      </div>
    </section>
    <div class="mt-auto" ref="end"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import SectionLogoRotate from "@/components/Sections/LogoRotate.vue";
import { useIntersectionObserver } from "@/plugins/useIntersectionObserver";
export default {
  components: {
    SectionLogoRotate,
  },

  setup(props, context) {
    const fixed = ref(false);
    const start = useIntersectionObserver((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        fixed.value = !fixed.value;
      }
    });
    const end = useIntersectionObserver((entry) => {
      if (entry.isIntersecting) {
        fixed.value = !fixed.value;
      }
    });
    return { fixed, start, end };
  },
};
</script>

<style lang="scss" scoped>
.section-wrapper {
  min-height: 300vh;
  .section-history {
    padding-top: 4rem;
    background-color: black;
    .logo-rotate {
      width: 100%;
      height: calc(100vh - 200px);
      @media (min-width: $breakpoint-md) {
        height: calc(100vh - 140px);
      }
    }
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 100vh;
      z-index: 100;
    }
    .interaction-start {
      min-height: 100vh;
    }
  }
}
</style>
