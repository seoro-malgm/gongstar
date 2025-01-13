<template>
  <div class="layout-default">
    <global-nav :links="links" @toggle="collapsed = true" />
    <main id="main">
      <router-view />
    </main>
    <global-footer />
  </div>
</template>

<script setup>
import GlobalNav from "@/components/Nav/GlobalNav.vue";
import GlobalFooter from "@/components/Nav/GlobalFooter.vue";

import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const infos = computed(() => {
  return store.getters["auth/getInfos"];
});

const links = computed(() => {
  return [
    {
      name: "Our Solutions",
      url: "/project",
      description: "프로젝트 소개",
      icon: "folder-open-empty"
    },
    {
      name: "insights",
      url: "/insights",
      description: "인사이트"
    },
    {
      name: "Contact",
      // href: infos.value.notionContact,
      url: "/contact",
      description: "공스타에 문의하기",
      icon: "phone-outline"
    }
    // {
    //   name: "채용",
    //   url: "/career",
    //   description: "채용 및 영입 문의",
    // },

    // {
    //   name: "contact",
    //   url: "/contact",
    //   description: "프로젝트 문의",
    // },
  ];
});
</script>

<style lang="scss" scoped>
.layout-default {
  #main {
    padding-top: 120px;
  }
}
</style>
