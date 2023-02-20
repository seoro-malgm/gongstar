<template>
  <div>
    <global-nav :links="links" :collapsed="collapsed" @toggle="collapsed = true" />
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
    const links = ref([
      {
        name: "ABOUT",
        // name: "어바웃",
        url: "/about",
      },
      // {
      //   name: "PROFESSOR",
      //   url: "/professor",
      // },
      {
        name: "MEMBERS",
        // name: "멤버",
        url: "/member",
      },
      {
        name: "ARCHIVE",
        // name: "아카이브",
        url: "/archive",
      },
      {
        name: "NEWS",
        // name: "소식",
        url: "/news",
      },
      {
        name: "CONTACT",
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
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
</style>
