<template>
  <div class="layout-default">
    <global-nav :links="links" @toggle="collapsed = true" />
    <main id="main">
      <router-view />
    </main>
    <global-footer />
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
        name: "Our Solutions",
        url: "/project",
        description: "프로젝트 소개",
      },
      {
        name: "Contact",
        href: "https://gongstar.notion.site/CONTACT-to-GONGSTAR-3c7cb29b7d2c4660ad33fefc7b9550d4?pvs=4",
        description: "공스타에 문의하기",
      },
      // {
      //   name: "채용",
      //   url: "/career",
      //   description: "채용 및 영입 문의",
      // },
      // {
      //   name: "insights",
      //   url: "/insights",
      //   description: "인사이트",
      // },
      // {
      //   name: "contact",
      //   url: "/contact",
      //   description: "프로젝트 문의",
      // },
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
    // padding-top: 120px;
  }
}
</style>
