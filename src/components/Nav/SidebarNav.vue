<template>
  <nav id="sidebar" :class="{ active }">
    <section class="sidebar-container">
      <div class="row h-100">
        <div class="col offset-2">
          <!-- <div class="input-group my-3">
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
      </div> -->
          <div class="d-flex flex-column h-100">
            <header class="sidebar-header">
              <img
                class="logo-image"
                :src="getURL('/assets/logo-vertical.svg')"
                alt="dcs lab 로고 이미지"
              />
            </header>
            <ul class="links flex-grow-1">
              <li class="link-item" v-for="(item, i) in links" :key="i">
                <router-link :to="item.url" class="router-link">
                  <span>{{ item.name }}</span>
                </router-link>
              </li>
            </ul>
            <div class="gnb-footer pb-2">
              <h4 class="text-16 mb-1 fw-700 text-gray-2">국립공주대학교 문화재보존과학과</h4>
              <h6 class="text-16 mb-0 fw-700 text-gray-2">디지털보존솔루션랩</h6>
              <div class="d-flex align-items-center mt-2">
                <button class="btn btn-gray-2 rounded-circle p-1">
                  <i class="icon icon-mail text-16"></i>
                </button>
                <button class="btn btn-gray-2 rounded-circle p-1 mx-1">
                  <i class="icon icon-instagram text-16"></i>
                </button>
                <button class="btn btn-gray-2 rounded-circle p-1">
                  <i class="icon icon-facebook text-16"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="dim" />
  </nav>
</template>

<script>
import { ref, computed, inject, watch } from "vue";

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
    const getURL = inject("getImageURL");

    const search = () => {
      context.emit("on-search", str.value);
      str.value = null;
    };
    return { getURL, str, search };
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
    left: -420px;
    transition: all 0.3s;
    padding: 20px 16px 24px;

    width: 420px;
    max-width: 72vw;
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;

    background-color: white;
    z-index: 1055;
    box-shadow: 10px 0 10px rgba($color: #000000, $alpha: 0.1);

    .sidebar-header {
      margin-bottom: 24px;
      .logo-image {
        width: 200px;
        max-width: 50%;
      }
    }
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
          width: 100%;
          font-weight: 900;
          span {
            // background-color: white;
          }
          &:after {
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            // background: url("../../assets/images/pattern.svg");
            // background-size: cover;
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
            // color: $primary;
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
      left: 0;
    }
  }
}
</style>
