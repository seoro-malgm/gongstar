<template>
  <header id="global-nav">
    <nav class="nav-wrap">
      <router-link class="logo" to="/">
        <img
          class="d-none d-lg-block"
          :src="getURL('logo-vertical.svg')"
          alt="dcs lab 로고 이미지"
        />
        <img class="d-block d-lg-none" :src="getURL('lettertype.svg')" alt="dcs lab 로고 이미지" />
      </router-link>
      <div class="gnb-utils">
        <div class="links">
          <div class="link-item" v-for="(item, i) in links" :key="i">
            <router-link :to="item.url" class="router-link">
              {{ item.name }}
            </router-link>
          </div>
          <div class="">
            <button class="btn btn-text rounded-circle px-2" @click="showSearch = true">
              <i class="icon icon-search-1 text-20"></i>
            </button>
          </div>
        </div>
        <button class="btn btn-text p-0 d-block d-lg-none" @click="showSidebar = !showSidebar">
          <div class="hbg" :class="{ toggle: showSidebar }">
            <span class="line" />
            <span class="line" />
          </div>
        </button>
      </div>
    </nav>
    <sidebar-nav :active="showSidebar" :links="links" @on-search="search" />
    <input-search v-show="showSearch" @on-search="search" @on-close="showSearch = false" />
  </header>
</template>

<script>
import { ref, computed, inject, watch } from "vue";
import InputSearch from "@/components/InputSearch.vue";
import SidebarNav from "@/components/Nav/SidebarNav.vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "GloabalNav",
  components: {
    InputSearch,
    SidebarNav,
  },
  setup() {
    const getURL = inject("getImageURL");
    const router = useRouter();

    const links = ref([
      {
        name: "ABOUT",
        url: "/about",
      },
      {
        name: "PROFESSOR",
        url: "/professor",
      },
      {
        name: "MEMBERS",
        url: "/members",
      },
      {
        name: "ARCHIVE",
        url: "/archive",
      },
      {
        name: "NEWS",
        url: "/news",
      },
      {
        name: "CONTACT",
        url: "/contact",
      },
    ]);

    const showSearch = ref(false);

    const search = (e) => {
      showSearch.value = false;
      if (showSidebar.value) showSidebar.value = false;
      router.push({
        name: "SearchResult",
        query: {
          query: e,
        },
      });
    };
    const showSidebar = ref(false);
    const route = useRoute();
    const path = computed(() => {
      return route.path;
    });
    watch(
      () => path.value,
      (n) => {
        if (showSidebar.value) showSidebar.value = false;
      }
    );
    return { getURL, links, showSearch, search, showSidebar, path };
  },
};
</script>

<style lang="scss" scoped>
#global-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  background-color: $white;
  z-index: 1055;
  .nav-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $padding-x 12px;
    @media (max-width: 1320px) {
      padding-top: 12px;
    }
    .logo {
      margin-top: 12px;
      @media (max-width: 1320px) {
        margin-top: 0;
      }
      img {
        width: 102px;
      }
    }
    .gnb-utils {
      .links {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: end;
        .link-item {
          z-index: 10;
          .router-link {
            padding: 110px 10px 8px;
            transition: color 0.3s;
            position: relative;
            &:after {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 0;
              // background: linear-gradient(
              //   0deg,
              //   rgba(11, 49, 143, 1) 0%,
              //   rgba(11, 49, 143, 1) 15%,
              //   rgba(115, 198, 200, 1) 100%
              // );
              background-color: $primary;
              transition: all 0.3s;
              display: block;
              content: "";
              z-index: -1;
            }
            &:hover,
            &.router-link-exact-active {
              &:after {
                height: 100%;
              }
              color: $white;
            }
          }
        }
      }

      .search {
        margin-top: 16px;
      }
      @media (max-width: $breakpoint-lg) {
        .links {
          display: none;
        }
      }
    }
  }
}

.hbg {
  width: 32px;
  height: 32px;
  transition: 0.3s;
  position: relative;
  z-index: 1060;
  .line {
    transition: 0.3s;
    transition-delay: 0.1s;
    right: 0;
    height: 2px;
    background-color: $primary;
    display: block;
    position: absolute;
    &:first-child {
      width: 20px;
      top: 10px;
    }
    &:last-child {
      width: 12px;
      top: 18px;
    }
  }
  &.toggle {
    .line {
      width: 18px;
      top: 50%;
      right: 50%;
      &:first-child {
        transform: translate(50%, -50%) rotate(45deg);
      }
      &:last-child {
        transform: translate(50%, -50%) rotate(-45deg);
      }
    }
  }
}
</style>
