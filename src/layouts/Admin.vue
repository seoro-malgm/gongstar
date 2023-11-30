<template>
  <div class="my-5 py-5">
    <div class="row">
      <main id="main" class="col-10 offset-1">
        <!-- <router-link class="logo" to="/" replace>
          <default-symbol class="symbol" :style="logoStyle" />
          <img
            class="lettertype"
            :class="{ show: scrolled }"
            :src="getURL('/assets/lettertype.svg')"
            alt="공스타 로고"
          />
        </router-link> -->
        <h1>공스타 관리자페이지</h1>
        <nav class="pb-2 mb-4" v-if="user">
          <ul class="d-flex align-items-center">
            <li v-for="(item, i) in links" :key="i">
              <template v-if="item?.variant">
                <router-link :to="item.url" :class="`btn btn-${item.variant}`">
                  {{ item.name }}
                </router-link>
              </template>
              <template v-else>
                <router-link :to="item.url" class="btn btn-outline-black">
                  {{ item.name }}
                </router-link>
              </template>
            </li>
          </ul>
        </nav>
        <header
          class="pt-5 pb-3 border-bottom mb-5 d-flex flex-column flex-md-row justify-contennt-between"
        >
          <h2>{{ title ? `${title}` : '' }}</h2>
        </header>
        <router-view />
      </main>
      <!-- <global-footer /> -->
    </div>
  </div>
</template>

<script>
  // import GlobalNav from "@/components/Nav/GlobalNav.vue";
  import GlobalFooter from '@/components/Nav/GlobalFooter.vue';
  import {ref, computed, inject, onMounted} from 'vue';
  import {useStore} from 'vuex';
  import {useRoute, useRouter} from 'vue-router';

  export default {
    components: {
      // GlobalNav,
      GlobalFooter,
    },
    setup(app, context) {
      // const firebase = inject("firebase");
      const getURL = inject('getImageURL');
      const store = useStore();
      const router = useRouter();
      const route = useRoute();

      const collapsed = ref(false);
      const links = ref([
        {
          name: '프로젝트 관리',
          url: '/admin/project',
        },
        {
          name: '인사이트 관리',
          url: '/admin/insights',
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
          name: '견적 관리',
          url: '/admin/contact',
        },
        {
          name: '로그아웃',
          variant: 'text text-error text-13',
          url: '/admin/logout',
        },
      ]);

      const user = computed(() => {
        return (
          sessionStorage.getItem('gongstar-token') ||
          store.getters['auth/getUser']
        );
      });

      onMounted(() => {
        if (!user.value) {
          router.push('/admin/login');
        }
      });

      const title = computed(() => {
        return route?.meta?.title;
      });

      return {
        getURL,
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
  .router-link-active {
    background-color: black;
    color: white;
  }
</style>
