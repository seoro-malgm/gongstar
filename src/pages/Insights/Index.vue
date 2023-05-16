<template>
  <div class="container-fluid min-vh-100 section-gap mt-5">
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title text-center">INSIGHTS</h1>
    </header>
    <section class="section-category" v-if="categories?.length">
      <ul class="list-category">
        <li class="list-item">
          <button
            class="btn btn-outline-gray-1 btn-category"
            :class="{ active: !categorySelected }"
            @click="
              $router.push({
                name: 'InsightsList',
              })
            "
          >
            <span>All</span>
          </button>
        </li>
        <li class="list-item" v-for="(category, i) in categories" :key="i">
          <button
            class="btn btn-outline-gray-1 btn-category"
            :class="{ active: categorySelected === category.value }"
            @click="
              $router.push({
                name: 'InsightsList',
                query: {
                  category: category.value,
                },
              })
            "
          >
            <span>{{ category.text }}</span>
          </button>
        </li>
      </ul>
    </section>
    <section>
      <ul class="list-insights" v-if="items?.length">
        <li class="list-item" v-for="(item, i) in items" :key="i">
          <article class="item-insights">
            <header class="header-insights text-truncate">
              <router-link
                class="text-18 text-md-28 text-lg-36 btn btn-text btn-text-gray-1"
                :to="{
                  name: 'InsightsDetail',
                  params: {
                    id: item.no,
                  },
                }"
              >
                {{ item.title }}
              </router-link>
            </header>
            <div
              class="item-thumbnail"
              :style="
                item?.thumbnail
                  ? {
                      backgroundImage: `url(${item.thumbnail})`,
                    }
                  : {
                      backgroundColor: '#ededed',
                    }
              "
            ></div>
          </article>
        </li>
      </ul>
      <section v-else>
        <template v-if="items === null">
          <div class="d-flex align-items-center justify-content-center p-3">
            <base-error />
          </div>
        </template>
        <template v-if="items !== null && !items?.length">
          <div class="p-3 text-center">
            <span class="text-14 text-gray-2"> 표시할 인사이트 현재 없습니다. </span>
          </div>
        </template>
      </section>
    </section>
  </div>
</template>
<script>
import { ref, inject, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const getURL = inject("getImageURL");
    const store = useStore();
    const { boardAPI } = inject("firebase");

    // 목록
    const items = ref(null);
    const getItems = async (category) => {
      try {
        const data = await boardAPI.getAllBoards("insights", {
          category,
          visible: true,
        });
        if (data?.length) {
          function compareNumbers(a, b) {
            if (b?.no && a?.no) {
              return +b?.no - +a?.no;
            } else return 0;
          }
          items.value = data.sort(compareNumbers);
        } else items.value = [];
      } catch (error) {
        items.value = null;
      }
    };

    const route = useRoute();
    // 현재 카테고리
    const categorySelected = computed(() => {
      return route?.query?.category;
    });
    // 카테고리 목록
    const categories = computed(() => {
      const list = store.getters["categories/getCategoryInsights"];
      return list?.length ? list.filter((i) => i.value !== null) : [];
    });

    onMounted(() => {
      getItems(categorySelected.value);
    });

    watch(
      () => categorySelected.value,
      (n) => {
        items.value = [];
        getItems(n);
      }
    );

    return { getURL, items, categorySelected, categories };
  },
};
</script>
<style lang="scss" scoped>
// 필터링
.section-category {
  margin-bottom: 1rem;
  padding: 1rem 1rem 0.5rem;
  border-top: 1px solid $gray-2;
  border-bottom: 1px solid $gray-2;

  .list-category {
    display: inline-flex;
    flex-wrap: wrap;
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
.list-insights {
  @media (max-width: $breakpoint-lg) {
    display: flex;
    .list-item {
      flex: 50 0 0;
      max-width: 50%;
      padding: 1rem;
      .item-insights {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .item-thumbnail {
          order: 0;
          width: 100%;
          padding-bottom: 100%;
          background-position: center center;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .header-insights {
          order: 1;
          max-width: 100%;
          .btn {
            padding: 0;
            font-weight: 700;
          }
        }
      }
    }
  }
  @media (min-width: $breakpoint-lg) {
    padding-bottom: 40px;
    .list-item {
      margin-bottom: 24px;
      padding: 0.75rem 0.5rem;
      border-bottom: 1px solid $gray-2;
      position: relative;
      .item-insights {
        .header-insights {
        }

        .item-thumbnail {
          transform: translateY(-50%) scale(0.2);
          transition: transform 0.4s $default-ease;
          user-select: none;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        &:hover {
          .header-insights {
            .btn {
              font-weight: 700;
            }
          }
          .item-thumbnail {
            position: absolute;
            top: 50%;
            right: 8vw;
            width: 420px;
            padding-bottom: 420px;
            z-index: -1;
            @media (max-width: $breakpoint-md) {
              width: 400px;
              max-width: 45vw;
              padding-bottom: 45vw;
              right: 3vw;
            }
            transform: translateY(-50%) scale(1);
          }
        }
      }
    }
  }
}
</style>
