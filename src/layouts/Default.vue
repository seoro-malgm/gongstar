<template>
  <div>
    <global-nav :collapsed="collapsed" @toggle="collapsed = true" />
    <div class="row">
      <main id="main" class="col-10 col-lg-11 offset-2 offset-lg-1">
        <router-view />
      </main>
      <!-- <global-footer /> -->
    </div>
  </div>
</template>

<script>
import GlobalNav from "@/components/Nav/GlobalNav.vue";
import GlobalFooter from "@/components/Nav/GlobalFooter.vue";
import { ref } from "vue";
export default {
  components: {
    GlobalNav,
    GlobalFooter,
  },
  setup(app, context) {
    const collapsed = ref(false);
    return {
      collapsed,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-default {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
</style>
