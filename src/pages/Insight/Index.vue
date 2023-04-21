<template>
  <div class="container-fluid min-vh-100 section-gap mt-5">
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title text-center">INSIGHTS</h1>
    </header>
    <!-- <section class="section-filtering">
      <ul class="list-category">
        <li class="list-item" v-for="(item, i) in categories" :key="i">
          <button
            class="btn btn-outline-gray-1 btn-category"
            :class="{ active: categorySelected === item.id }"
            @click="
              $router.push({
                path: '/insight',
                query: {
                  category: item.id,
                },
              })
            "
          >
            <span>주제1</span>
          </button>
        </li>
      </ul>
    </section>
    <section>
      <ul class="list-insight" v-if="items?.length">
        <li class="list-item" v-for="(item, i) in items" :key="i">
          <article class="item-insight">
            <header class="header-insight">
              <router-link
                class="text-24 text-md-40 btn btn-text btn-text-gray-1"
                :to="{
                  name: 'InsightDetail',
                  params: {
                    id: item.id,
                  },
                }"
              >
                {{ item.title }}
              </router-link>
            </header>
            <div
              class="item-thumbnail"
              :style="{
                backgroundColor: '#ededed',
              }"
            ></div>
          </article>
        </li>
      </ul>
    </section> -->

    <!-- <transition name="fade-right">
      <header class="page-header" v-if="hoveredItem">
        <h1>
          {{ hoveredItem?.title }}
        </h1>
        <strong class="mt-3">
          {{ hoveredItem?.author }}
        </strong>
      </header>
    </transition> -->
    <section>
      <div class="d-flex align-items-center justify-content-center p-3">
        <base-error />
      </div>
      <div class="my-4">
        <p class="text-14 text-md-16 text-gray-2 text-center">
          일과 문화에 대한 공스타의 인사이트를 작성중입니다. 금방 공개하겠습니다!
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, inject, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    // const items = allProject;
    // console.log("items:", items);
    const getURL = inject("getImageURL");
    const side = ref(["top", "bottom", "left", "right"]);

    const { boardAPI } = inject("firebase");
    const items = ref([
      {
        id: 1,
        title: "블로그 글  타이틀",
        category: "카테고리",
        thumbnail: "",
      },
      {
        id: 1,
        title: "블로그 글  타이틀",
        category: "카테고리",
        thumbnail: "",
      },
      {
        id: 1,
        title: "블로그 글  타이틀",
        category: "카테고리",
        thumbnail: "",
      },
      {
        id: 1,
        title: "블로그 글  타이틀",
        category: "카테고리",
        thumbnail: "",
      },
      {
        id: 1,
        title: "블로그 글  타이틀",
        category: "카테고리",
        thumbnail: "",
      },
      {
        id: 1,
        title: "블로그 글  타이틀",
        category: "카테고리",
        thumbnail: "",
      },
    ]);

    const getItems = async (category) => {
      // const data = await boardAPI.getAllBoards("blog");
      // items.value = data;
    };
    onMounted(() => {
      // getItems();
      // console.log("items.value:", items.value);
    });

    const categories = ref([
      {
        id: "1",
        text: "주제1",
      },
      {
        id: "2",
        text: "주제2",
      },
      {
        id: "3",
        text: "주제3",
      },
    ]);
    const route = useRoute();
    const categorySelected = computed(() => {
      return route?.query?.category;
    });
    watch(
      () => categorySelected.value,
      (n) => {
        getItems(n);
      }
    );

    return { getURL, side, items, categories, categorySelected };
  },
};
</script>

<style lang="scss" scoped>
// 필터링
.section-filtering {
  padding: 1rem 1rem 0.5rem;
  border-top: 1px solid $gray-2;
  border-bottom: 1px solid $gray-2;

  .list-category {
    display: inline-flex;
    align-items: center;
    .list-item {
      margin: 0 12px 12px 0;
      .btn-category {
        &.active {
          background-color: $gray-1;
          border-color: $gray-1;
        }
      }
    }
  }
}

// 목록
.list-insight {
  padding-bottom: 40px;
  .list-item {
    margin-bottom: 24px;
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid $gray-2;
    position: relative;
    .item-insight {
      .header-insight {
      }

      .item-thumbnail {
        transform: translateY(-50%) scale(0.2);
        transition: transform 0.4s $default-ease;
        user-select: none;
      }

      &:hover {
        .item-thumbnail {
          position: absolute;
          top: 50%;
          right: 8vw;
          width: 420px;
          padding-bottom: 420px;
          @media (max-width: $breakpoint-md) {
            width: 400px;
            max-width: 45vw;
            padding-bottom: 45vw;
            right: 3vw;
          }
          transform: translateY(-50%) scale(1);
          z-index: 10;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
    }
  }
}
</style>
