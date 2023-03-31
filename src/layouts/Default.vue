<template>
  <div class="layout-default">
    <global-nav :links="links" :collapsed="collapsed" @toggle="collapsed = true" />
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
    const collapsed = ref(false);
    const links = ref([
      {
        name: "홈",
        url: "/",
      },
      {
        name: "프로젝트",
        // name: "프로젝트",
        url: "/project",
      },

      {
        name: "블로그",
        // name: "소식",
        url: "/blog",
      },

      {
        name: "연락하기",
        // name: "연락하기",
        url: "/contact",
      },
    ]);
    return {
      collapsed,
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
