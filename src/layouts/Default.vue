<template>
  <div class="layout-default">
    <global-nav :links="links" @toggle="collapsed = true" />
    <main id="main">
      <router-view />
    </main>
    <!-- <global-footer /> -->
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
    const links = ref([
      {
        name: "project",
        url: "/project",
        description: "프로젝트 소개",
      },

      {
        name: "insight",
        url: "/insight",
        description: "인사이트",
      },

      {
        name: "contact",
        url: "/contact",
        description: "견적문의",
      },
    ]);
    return {
      links,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-default {
  #main {
    min-height: 4000px;
    padding-top: 88px;
  }
}
</style>
