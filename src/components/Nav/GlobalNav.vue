<template>
  <div>
    <header id="global-nav">
      <nav class="container">
        <router-link class="logo" to="/" replace>
          <default-symbol class="symbol" :style="logoStyle" />
          <img class="lettertype" :src="getURL('/assets/lettertype.svg')" alt="" />
        </router-link>

        <button
          class="btn btn-text btn-hbg"
          :class="{ active: onMenuToggle }"
          @click="onMenuToggle = !onMenuToggle"
        >
          <span class="line" />
          <span class="line" />
          <span class="line" />
        </button>
      </nav>
    </header>
    <aside id="sidebar" :class="{ active: onMenuToggle }">
      <div class="container">
        <div class="utils">
          <ul class="list-links">
            <li v-for="(item, i) in links" :key="i">
              <router-link :to="item.url" class="link-item"> {{ item.name }}</router-link>
              <small v-if="item.description"> {{ item.description }} </small>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="dim" v-if="onMenuToggle" />
  </div>
</template>

<script>
import { ref, computed, inject, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import DefaultSymbol from "@/components/DefaultSymbol.vue";
export default {
  name: "GloabalNav",
  components: {
    DefaultSymbol,
  },
  props: {
    links: {
      type: Array,
      default: null,
    },
  },
  setup() {
    const getURL = inject("getImageURL");
    const router = useRouter();
    const store = useStore();
    const route = useRoute();

    // 스크롤
    const rotation = ref(0);
    const logoStyle = computed(() => {
      return {
        transform: `rotate(${rotation.value}deg)`,
      };
    });
    const handleScroll = () => {
      rotation.value = window.scrollY / 3.6;
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    // 메뉴 토글
    const onMenuToggle = ref(false);
    const path = computed(() => {
      return route.path;
    });
    watch(
      () => path.value,
      (n) => {
        if (onMenuToggle.value) onMenuToggle.value = false;
      }
    );

    return { getURL, logoStyle, onMenuToggle };
  },
};
</script>

<style lang="scss" scoped>
#global-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  padding: 1rem 0;
  z-index: 2000;
  > nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 12px;
    padding-right: 12px;
    // 로고
    .logo {
      .symbol {
        width: 40px;
        height: 40px;
        transition: transform 0.5s ease-out;
      }
      .lettertype {
        height: 18px;
        width: auto;
        margin-bottom: 1px;
        margin-left: 6px;
      }
    }
  }
  // 햄버거버튼
  .btn-hbg {
    width: 40px;
    height: 40px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    .line {
      display: block;
      width: 100%;
      height: 6px;
      background-color: $primary;
      margin: 3px 0;
      opacity: 1;
      transition: all 0.3s;
    }
    // 눌렸을 때
    &.active {
      .line {
        &:first-child {
          transform: rotate(45deg) translate(7px, 7px);
        }
        &:nth-child(2) {
          transform: translateX(4rem);
          opacity: 0;
        }
        &:last-child {
          transform: rotate(-45deg) translate(7px, -7px);
        }
      }
    }
  }
}

// 사이드바
#sidebar {
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s;
  position: fixed;
  top: 88px;
  left: 0;
  background-color: white;
  width: 100%;
  height: calc(100% - 88px);
  padding: 1rem;
  z-index: 2020;
  // 열렸을 때
  &.active {
    opacity: 1;
    transform: translateY(0);
  }

  // 유틸 목록
  .utils {
    .list-links {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      li {
        margin-right: 4px;
        display: flex;
        align-items: end;
        margin-bottom: 12px;

        // 링크
        .link-item {
          padding: 6px 12px 4px;
          text-decoration: none;
          transition: all 0.2s;
          text-transform: uppercase;
          font-size: 1.3rem;
          margin: 0;
          font-size: 4rem;
          margin-right: 12px;
          font-weight: 700;
          &:hover,
          &.router-link-active,
          &.router-link-exact-active {
            background-color: $primary;
            color: white;
          }
        }
        // 링크 설명
        small {
          display: block;
          margin-bottom: 30px;
          font-size: 16px;
          color: #666;
        }
        @media (max-width: $breakpoint-md) {
          flex-direction: column;
          align-items: start;
          margin-bottom: 20px;
          .link-item {
            font-size: 1.4rem;
            padding: 4px 12px;
          }
          small {
            font-size: 14px;
            margin-bottom: 0;
            margin-top: 3px;
          }
        }
      }
    }
  }
}
</style>
