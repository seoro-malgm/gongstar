<template>
  <aside id="sidebar" :class="{ active: active }">
    <div class="container-fluid h-100">
      <div class="utils">
        <ul class="list-links">
          <li v-for="(item, i) in links" :key="i">
            <router-link :to="item.url" class="link-item btn btn-link text-secondary">
              {{ item.name }}</router-link
            >
            <small v-if="item.description"> {{ item.description }} </small>
          </li>
        </ul>
        <div class="sidebar-footer">
          <ul class="links">
            <li>
              <button
                class="btn btn-text px-2 py-1 text-secondary"
                @click="copyText(infos.email, '전화번호가')"
              >
                <i class="icon icon-phone-outline text-24" />
                <span class="ms-2">
                  {{ infos.phone }}
                </span>
              </button>
            </li>
            <li>
              <button
                class="btn btn-text px-2 py-1 text-secondary"
                @click="copyText(infos.email, '이메일 주소가')"
              >
                <i class="icon icon-mail-2 text-24" />
                <span class="ms-2">
                  {{ infos.email }}
                </span>
              </button>
            </li>
            <li>
              <button
                class="btn btn-text px-2 py-1 text-secondary"
                @click="copyText(infos.addressSummary, '주소가')"
              >
                <i class="icon icon-compass text-24" />
                <span class="ms-2">
                  {{ infos.address }}
                </span>
              </button>
            </li>
            <li>
              <a
                class="btn btn-text px-2 py-1 text-secondary"
                :href="infos.instagram"
                target="_blank"
              >
                <i class="icon icon-instagram text-24" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { computed, inject, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
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
  setup(props, context) {
    const copyText = inject("copyText");
    const store = useStore();
    const route = useRoute();
    const path = computed(() => {
      return route.path;
    });
    watch(
      () => path.value,
      (n) => {
        context.emit("close");
        // if (onMenuToggle.value) onMenuToggle.value = false;
      }
    );

    // 정보
    const infos = computed(() => {
      return store.getters["auth/getInfos"];
    });

    return {
      infos,
      copyText,
    };
  },
};
</script>

<style lang="scss" scoped>
// gnb 높이
$gnb-height: 72px;

// 사이드바
#sidebar {
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s;
  position: fixed;
  top: $gnb-height;
  left: 0;
  background-color: $primary;
  width: 100%;
  height: calc(100% - $gnb-height);
  padding: 2rem 1rem;
  z-index: 2020;
  // 열렸을 때
  &.active {
    opacity: 1;
    transform: translateY(0);
  }

  // 유틸 목록
  .utils {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .list-links {
      // flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin: auto 0;
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
            background-color: $secondary;
            color: $primary !important;
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
    .sidebar-footer {
      margin-top: auto;
      margin-bottom: 1rem;
      .links {
        margin: 0;
        padding: 0;
        li {
          margin-bottom: 2px;
          a {
            display: inline-flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
