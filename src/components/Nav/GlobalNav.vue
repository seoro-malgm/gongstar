<template>
  <header id="global-nav" class="col-2 col-lg-1" :class="{ collapsed: collapsed }">
    <template v-if="collapsed">
      <div class="bg-pattern h-100 w-100">
        <button class="btn btn-text px-1 m-1 bg-white border-primary" @click="$emit('toggle')">
          <div class="hbg">
            <span class="line" />
            <span class="line" />
          </div>
        </button>
      </div>
    </template>
    <template v-else>
      <nav class="nav-wrap">
        <router-link class="logo" to="/">
          <img class="" :src="getURL('/assets/logo-vertical.svg')" alt="dcs lab 로고 이미지" />
          <!-- <img
            class="d-none d-lg-block"
            :src="getURL('/assets/logo-vertical.svg')"
            alt="dcs lab 로고 이미지"
          />
          <img
            class="d-block d-lg-none"
            :src="getURL('/assets/lettertype.svg')"
            alt="dcs lab 로고 이미지"
          /> -->
        </router-link>
        <div class="gnb-utils">
          <div class="links">
            <div class="link-item" v-for="(item, i) in links" :key="i">
              <router-link :to="item.url" class="router-link text-18">
                <span>
                  {{ item.name }}
                </span>
              </router-link>
            </div>
            <!-- <div class="">
            <button class="btn btn-text rounded-circle px-2" @click="showSearch = true">
              <i class="icon icon-search-1 text-20"></i>
            </button>
          </div> -->
          </div>
          <button
            class="btn btn-text p-1 rounded-0 d-block d-lg-none border-primary bprder-2"
            @click="showSidebar = !showSidebar"
          >
            <div class="hbg" :class="{ toggle: showSidebar }">
              <span class="line" />
              <span class="line" />
            </div>
          </button>
        </div>
        <div class="gnb-footer text-center pb-4 d-none d-lg-block">
          <h4 class="text-14 mb-1 fw-700 text-gray-2">국립공주대학교 문화재보존과학과</h4>
          <h6 class="text-14 mb-0 fw-700 text-gray-2">디지털보존솔루션랩</h6>
          <div class="d-flex align-items-center justify-content-center mt-2">
            <button class="btn btn-gray-2 rounded-circle p-1">
              <i class="icon icon-mail text-16"></i>
            </button>
            <a
              class="btn btn-gray-2 rounded-circle p-1 mx-1"
              :href="infos.instagram"
              target="_blank"
            >
              <i class="icon icon-instagram text-16"></i>
            </a>
            <a class="btn btn-gray-2 rounded-circle p-1" :href="infos.facebook" target="_blank">
              <i class="icon icon-facebook text-16"></i>
            </a>
          </div>
        </div>
      </nav>
      <sidebar-nav :active="showSidebar" :links="links" @on-search="search" />
      <!-- <input-search v-show="showSearch" @on-search="search" @on-close="showSearch = false" /> -->
    </template>
  </header>
</template>

<script>
import { ref, computed, inject, watch } from "vue";
import InputSearch from "@/components/InputSearch.vue";
import SidebarNav from "@/components/Nav/SidebarNav.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "GloabalNav",
  components: {
    InputSearch,
    SidebarNav,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    links: {
      type: Array,
      default: null,
    },
  },
  setup() {
    const getURL = inject("getImageURL");
    const router = useRouter();
    const store = useStore();

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

    const infos = computed(() => {
      return store.getters["auth/getInfos"];
    });
    return { getURL, showSearch, search, showSidebar, path, infos };
  },
};
</script>

<style lang="scss" scoped>
#global-nav {
  position: fixed;
  top: 0;
  left: 0;
  // width: 100vw;
  // width: 120px;
  // width: 8.33333333%;
  // max-width: 8.33333333vw;
  // &.collapsed {
  //   width: 50px;
  //   max-width: unset;
  // }
  padding: 0 8px;
  height: 100vh;
  // max-width: 100vw;
  background-color: $white;
  z-index: 1055;
  .nav-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    // padding: 0 $padding-x 12px;
    @media (max-width: 1320px) {
      padding-top: 12px;
    }
    .logo {
      margin-top: 12px;
      @media (max-width: 1320px) {
        margin-top: 0;
      }
      img {
        width: 100px;
        max-width: 100%;
      }
    }
    .gnb-utils {
      // margin-left: auto;
      width: 100%;
      margin-top: 24px;
      flex-grow: 1;
      .links {
        // position: fixed;
        // top: 0;
        // left: 50%;
        // transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        .link-item {
          width: 100%;
          z-index: 10;
          text-align: center;
          .router-link {
            padding: 8px 10px 8px;
            transition: color 0.3s $default-ease;
            position: relative;
            width: 100%;
            font-weight: 900;
            span {
              // background-color: $white;
            }
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
              // background: url("../../assets/images/pattern.svg");
              // background-repeat: repeat-y;
              // background-size: cover;
              transition: all 0.3s $default-ease;
              display: block;
              content: "";
              z-index: -1;
            }
            &:hover,
            &.router-link-active,
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
  transition: all 0.3s $default-ease;
  position: relative;
  z-index: 1060;
  .line {
    transition: all 0.3s $default-ease;
    transition-delay: 0.1s;
    left: 0;
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
