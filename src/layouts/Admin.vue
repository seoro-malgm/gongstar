<template>
  <div>
    <global-nav :links="links" />
    <div class="row">
      <main id="main" class="col-10 offset-1">
        <header
          class="pt-5 pb-3 border-bottom mb-5 d-flex flex-column flex-md-row justify-contennt-between"
        >
          <h1>관리자페이지{{ title ? `:${title}` : "" }}</h1>
          <!-- <div class="utils ms-md-auto">
            <button class="btn btn-black" v-if="user" @click="$router.push('/admin/logout')">
              로그아웃
            </button>
          </div> -->
        </header>
        <router-view />
      </main>
      <!-- <global-footer /> -->
    </div>
  </div>
</template>

<script>
import GlobalNav from "@/components/Nav/GlobalNav.vue";
import GlobalFooter from "@/components/Nav/GlobalFooter.vue";
import { ref, computed, inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    GlobalNav,
    GlobalFooter,
  },
  setup(app, context) {
    // const firebase = inject("firebase");
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const collapsed = ref(false);
    const links = ref([
      {
        name: "프로젝트 관리",
        url: "/admin/project",
      },
      {
        name: "인사이트 관리",
        url: "/admin/insights",
      },
      // {
      //   name: "연혁 관리",
      //   url: "/admin/history",
      // },
      // {
      //   name: "클라인트 관리",
      //   url: "/admin/client",
      // },
      {
        name: "견적 관리",
        url: "/admin/contact",
      },
      {
        name: "로그아웃",
        url: "/admin/logout",
      },
    ]);

    const user = computed(() => {
      return sessionStorage.getItem("gongstar-token") || store.getters["auth/getUser"];
    });

    onMounted(() => {
      if (!user.value) {
        router.push("/admin/login");
      }
    });

    const title = computed(() => {
      return route?.meta?.title;
    });

    return {
      collapsed,
      links,
      title,
      user,
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
