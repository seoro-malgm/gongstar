<template>
  <div class="container-fluid min-vh-100 section-gap mt-5">
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title">PROJECT</h1>
    </header>
    <section class="section-category" v-if="categories?.length">
      <ul class="list-category">
        <li class="list-item">
          <button
            class="btn btn-outline-gray-1 btn-category"
            :class="{ active: !categorySelected }"
            @click="
              $router.push({
                path: '/project',
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
                path: '/project',
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
    <section v-if="items?.length">
      <div class="row">
        <div v-for="item in items" :key="item.id" class="col-6 col-md-4 col-lg-3">
          <figure class="bg-img ratio-67">
            <img :src="getURL(item.thumbnail)" :alt="`${item.title}`" />
          </figure>
        </div>
      </div>
    </section>
    <section v-else>
      <template v-if="items === null">
        <div class="d-flex align-items-center justify-content-center p-3">
          <base-error />
        </div>
      </template>
      <template v-if="items !== null && !items?.length">
        <div class="p-3 text-center">
          <span class="text-14 text-gray-2"> 표시할 프로젝트가 현재 없습니다. </span>
        </div>
      </template>
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
        const data = await boardAPI.getAllBoards("project", {
          category,
        });
        if (data?.length) {
          items.value = data;
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
      const list = store.getters["categories/getCategoryProject"];
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
  margin-bottom: 2rem;
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
</style>
