<template>
  <header id="global-nav">
    <nav class="container">
      <router-link class="logo" to="/">
        <default-symbol class="symbol" :style="boxStyle" />
        <img class="lettertype" :src="getURL('/assets/lettertype.svg')" alt="" />
      </router-link>
      <button class="btn btn-text btn-hbg">
        <span class="line" />
        <span class="line" />
        <span class="line" />
      </button>
    </nav>
  </header>
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

    const rotation = ref(0);
    const boxStyle = computed(() => {
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

    return { getURL, boxStyle };
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
  background-color: white;
  padding: 1rem 0;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    }
  }
}
</style>
