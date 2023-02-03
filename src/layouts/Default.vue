<template>
  <div>
    <global-nav />
    <main id="main">
      <router-view />
      <div class="container-fluid">
        <div class="row w-100">
          <div class="col-1" v-for="i in 12" :key="i" />
        </div>
      </div>
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
