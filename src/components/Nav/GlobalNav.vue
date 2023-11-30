<template>
  <div>
    <header id="global-nav" class="container" :class="{scrolled: scrolled}">
      <nav class="container">
        <router-link class="logo" to="/" replace>
          <default-3d-symbol class="symbol" />
          <img
            class="lettertype"
            :src="getURL('/assets/lettertype.svg')"
            alt="공스타 로고"
          />
        </router-link>
        <div class="d-none d-xl-block">
          <ul class="list-links">
            <li v-for="(item, i) in links" :key="i">
              <template v-if="item?.href">
                <a
                  :href="item.href"
                  class="link-item btn btn-link text-secondary"
                  target="_blank"
                >
                  <i
                    class="icon text-16 text-md-18"
                    :class="`icon-${item?.icon || 'ok'}`"
                  />
                  {{ item.name }}
                </a>
                <!-- <small v-if="item.description"> {{ item.description }} </small> -->
              </template>
              <template v-else>
                <router-link
                  :to="item.url"
                  class="link-item btn btn-link text-secondary"
                >
                  <i
                    class="icon text-16 text-md-18"
                    :class="`icon-${item?.icon || 'ok'}`"
                  />
                  {{ item.name }}
                </router-link>
                <!-- <small v-if="item.description"> {{ item.description }} </small> -->
              </template>
            </li>
          </ul>
        </div>
        <div class="d-block d-xl-none">
          <button
            class="btn btn-text btn-hbg"
            :class="{active: onMenuToggle}"
            @click="onMenuToggle = !onMenuToggle"
          >
            <span class="line" />
            <span class="line" />
            <span class="line" />
          </button>
          <global-sidebar
            :active="onMenuToggle"
            :links="links"
            @close="onMenuToggle = false"
          />
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
  import {ref, computed, inject, onMounted, onBeforeUnmount} from 'vue';
  import GlobalSidebar from '@/components/Nav/GlobalSidebar.vue';
  import Default3dSymbol from '@/components/Default3dSymbol.vue';

  const props = defineProps({
    links: {
      type: Array,
      default: null,
    },
  });

  const getURL = inject('getImageURL');
  // 스크롤
  const rotation = ref(0);
  const scrolled = ref(false);
  const handleScroll = () => {
    if (window.scrollY > 200) {
      scrolled.value = true;
    } else if (window.scrollY < 200) {
      scrolled.value = false;
    }
    rotation.value = window.scrollY / 3.6;
  };
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  // 메뉴 토글
  const onMenuToggle = ref(false);
</script>

<style lang="scss" scoped>
  // gnb
  #global-nav {
    position: fixed;
    top: 12px;
    left: 50%;
    // width: 100%;
    // max-width: 100vw;
    padding: 1rem 0;
    z-index: 2000;
    background-color: white;
    transform: translateX(-50%);
    transition: all 0.3s $default-ease;
    @media (max-width: $breakpoint-xl) {
      max-width: 92vw;
    }

    &.scrolled {
      left: 50%;
      padding: 1rem 1.25rem;
      box-shadow: 0 0 12px rgba($color: #000000, $alpha: 0.3);
      border-radius: 2rem;
    }
    // background-color: white;
    // border-bottom: 2px solid black;
    > nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 12px;
      padding-right: 12px;
      // 로고
      .logo {
        display: flex;
        align-items: center;
        // opacity: 0;
        // transition: opacity 0.3s $default-ease;

        // &.show {
        //   opacity: 1;
        // }
        .symbol {
          // width: 40px;
          // height: 40px;
          // transition: transform 0.5s ease-out;
        }
        .lettertype {
          height: 18px;
          width: auto;
          margin-bottom: 1px;
          margin-left: 2px;
        }
      }
      .list-links {
        display: flex;
        // flex-direction: column;
        align-items: center;
        margin: auto 0;
        padding: 0;
        li {
          // margin-right: 4px;
          display: flex;
          align-items: end;
          // margin-bottom: 12px;

          // 링크
          .link-item {
            padding: 6px 12px 4px;
            text-decoration: none;
            transition: all 0.2s;
            text-transform: uppercase;
            margin: 0;
            font-size: 20px;
            margin-right: 12px;
            font-weight: 500;
            display: flex;
            align-items: center;
            i.icon {
              margin-right: 2px;
            }
            &:hover,
            &.router-link-active,
            &.router-link-exact-active {
              text-shadow: rgba($color: #000000, $alpha: 0.4) 1px 0 10px;
              // background-color: $secondary;
              // color: $primary !important;
            }
          }
          // 링크 설명
          // small {
          //   display: block;
          //   margin-bottom: 30px;
          //   font-size: 16px;
          //   color: #666;
          // }
          @media (max-width: $breakpoint-md) {
            flex-direction: column;
            align-items: start;
            // margin-bottom: 20px;
            .link-item {
              font-size: 15px;
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
    // 햄버거버튼
    .btn-hbg {
      width: 30px;
      height: 30px;
      padding: 2px;
      display: flex;
      flex-direction: column;
      .line {
        display: block;
        width: 100%;
        height: 5px;
        background-color: $secondary;
        margin: 2px 0;
        opacity: 1;
        transition: all 0.3s;
      }
      // 눌렸을 때
      &.active {
        .line {
          &:first-child {
            transform: rotate(45deg) translate(6px, 6px);
          }
          &:nth-child(2) {
            transform: translateX(4rem);
            opacity: 0;
          }
          &:last-child {
            transform: rotate(-45deg) translate(6px, -6px);
          }
        }
      }
    }
  }
</style>
