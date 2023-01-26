<template>
  <header id="global-nav">
    <nav>
      <router-link class="logo" to="/">
        <img :src="getURL('logo.svg')" alt="dcs lab 로고 이미지" />
      </router-link>
      <div class="gnb-utils">
        <div class="links">
          <div class="link-item" v-for="(item, i) in links" :key="i">
            <router-link :to="item.url" class="router-link">
              {{ item.name }}
            </router-link>
          </div>
        </div>
        <div class="search">
          <base-button @click="search" type="text" rounded="circle">
            <i class="icon icon-search-1 text-20"></i>
          </base-button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, computed, inject } from "vue";
export default {
  name: "GloabalNav",
  setup() {
    const getURL = inject("getImageURL");

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

    const search = (e) => {
      console.log("e:", e);
    };
    return { getURL, links, search };
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
  > nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $padding-x 12px;
    .logo {
      margin-top: 12px;
      img {
        width: 192px;
      }
    }
    .gnb-utils {
      .links {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        .link-item {
          margin: 0 2px;
          .router-link {
            padding: 48px 8px 8px;
            position: relative;
            transition: color 0.3s;
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
        display: none;
      }
    }
  }
}
</style>
