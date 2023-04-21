<template>
  <div>
    <header id="global-nav">
      <nav class="container-fluid">
        <router-link class="logo" to="/" replace>
          <default-symbol class="symbol" :style="logoStyle" />
          <img
            class="lettertype"
            :class="{ show: scrolled }"
            :src="getURL('/assets/lettertype.svg')"
            alt="공스타 로고"
          />
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
    <global-sidebar :active="onMenuToggle" :links="links" @close="onMenuToggle = false" />
  </div>
</template>

<script>
import { ref, computed, inject, onMounted, onBeforeUnmount } from "vue";
import GlobalSidebar from "@/components/Nav/GlobalSidebar.vue";
import DefaultSymbol from "@/components/DefaultSymbol.vue";
export default {
  name: "GloabalNav",
  components: {
    DefaultSymbol,
    GlobalSidebar,
  },
  props: {
    links: {
      type: Array,
      default: null,
    },
  },
  setup() {
    const getURL = inject("getImageURL");
    // 스크롤
    const rotation = ref(0);
    const scrolled = ref(false);
    const logoStyle = computed(() => {
      return {
        transform: `rotate(${rotation.value}deg)`,
      };
    });
    const handleScroll = () => {
      if (window.scrollY > 200) {
        scrolled.value = true;
      } else if (window.scrollY < 200) {
        scrolled.value = false;
      }
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

    return { getURL, logoStyle, onMenuToggle, scrolled };
  },
};
</script>

<style lang="scss" scoped>
// gnb
#global-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  padding: 1rem 0;
  z-index: 2000;
  background-color: white;
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
        opacity: 0;
        transition: opacity 0.3s $default-ease;
        &.show {
          opacity: 1;
        }
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
      background-color: $secondary;
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
</style>
