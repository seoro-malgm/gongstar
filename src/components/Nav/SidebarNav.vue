<template>
  <nav id="sidebar" :class="{ active }">
    <header class="sidebar-header"></header>
    <section class="sidebar-container">
      <div class="input-group my-3">
        <input
          type="text"
          class="form-control text-14 text-lg-20 border-0 border-bottom rounded-0"
          v-model="str"
          placeholder="검색어를 입력하세요"
          @keypress.enter="search"
        />
        <div class="input-group-append ms-2">
          <button class="btn btn-text p-0 btn-search" @click="search">
            <i class="icon icon-search-1 text-24"></i>
          </button>
        </div>
      </div>
      <ul class="links">
        <li class="link-item" v-for="(item, i) in links" :key="i">
          <router-link :to="item.url" class="router-link">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </section>
    <div class="dim" />
  </nav>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    links: {
      type: Array,
      default: null,
    },
  },
  setup(app, context) {
    const str = ref(null);

    const search = () => {
      context.emit("on-search", str.value);
      str.value = null;
    };
    return { str, search };
  },
};
</script>

<style lang="scss" scoped>
#sidebar {
  display: none;
  @media (min-width: 1320px) {
    display: none !important;
  }
  .sidebar-container {
    position: fixed;
    top: 0;
    right: -420px;
    transition: all 0.3s;
    padding: 72px 16px 40px;

    width: 420px;
    max-width: 94vw;
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;

    background-color: white;
    z-index: 1055;
    box-shadow: -10px 0 10px rgba($color: #000000, $alpha: 0.1);

    .links {
      list-style: none;
      padding: 0;
      margin: 0;
      .link-item {
        .router-link {
          padding: 16px 10px;
          font-size: 16px;
          position: relative;
          display: block;
          &:after {
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            background-color: $primary;
            transition: all 0.3s;
            display: block;
            content: "";
            z-index: -1;
          }
          &.router-link-active,
          &.router-link-exact-active {
            &:after {
              width: 100%;
            }
            color: $white;
          }
        }
      }
    }
  }

  .dim {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(4px);
    z-index: 1050;
    display: none;
  }

  &.active {
    display: block;
    .dim {
      display: block;
    }
    .sidebar-container {
      right: 0;
    }
  }
}
</style>
