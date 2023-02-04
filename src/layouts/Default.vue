<template>
  <div>
    <global-nav />
    <main id="main">
      <router-view />
    </main>
    <global-footer />
  </div>
</template>

<script>
import GlobalNav from "@/components/Nav/GlobalNav.vue";
import GlobalFooter from "@/components/Nav/GlobalFooter.vue";
export default {
  components: {
    GlobalNav,
    GlobalFooter,
  },
};
</script>

<style lang="scss" scoped></style>
