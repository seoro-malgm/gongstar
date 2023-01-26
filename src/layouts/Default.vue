<template>
  <div>
    <GloabalNav />
    <main id="main">
      <router-view />
    </main>
    <!-- <GlobalFooter /> -->
  </div>
</template>

<script>
import GloabalNav from "@/components/Nav/GloabalNav.vue";
import GlobalFooter from "@/components/Nav/GlobalFooter.vue";
export default {
  components: {
    GloabalNav,
    GlobalFooter,
  },
};
</script>

<style lang="scss" scoped>
#main {
  padding-top: $gnb-height-sm;
  @media (min-width: $breakpoint-sm) {
    padding-top: $gnb-height-sm;
  }
  @media (min-width: $breakpoint-md) {
    padding-top: $gnb-height-md;
  }
  @media (min-width: $breakpoint-lg) {
    padding-top: $gnb-height-lg;
  }
  @media (min-width: $breakpoint-xl) {
    padding-top: $gnb-height-xl;
  }
}
</style>
