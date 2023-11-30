<template>
  <div class="container-fluid min-vh-100 section-gap mt-5">
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title">Our Solutions</h1>
    </header>
    <section class="section-category" v-if="categories?.length">
      <ul class="list-category">
        <li class="list-item">
          <button
            class="btn btn-outline-gray-1 btn-category text-18 text-md-24"
            :class="{active: !categorySelected}"
            @click="
              $router.push({
                name: 'ProjectList',
              })
            "
          >
            <span>모두</span>
          </button>
        </li>
        <li class="list-item" v-for="(category, i) in categories" :key="i">
          <button
            class="btn btn-outline-gray-1 btn-category text-18 text-md-24"
            :class="{active: categorySelected === category.value}"
            @click="
              $router.push({
                name: 'ProjectList',
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
      <div class="pb-3 px-5" v-if="categorySelected">
        <p class="text-15 text-md-18 text-center text-gray-2">
          {{ categories?.find(c => c.value === categorySelected)?.desc }}
        </p>
      </div>
      <div class="row">
        <div
          v-for="item in items"
          :key="item.id"
          class="col-6 col-md-4 col-lg-3 mb-3"
        >
          <div class="item-project">
            <figure class="bg-img ratio-100">
              <router-link
                :to="{
                  name: 'ProjectDetail',
                  params: {
                    id: item.no,
                  },
                }"
              >
                <img
                  :src="getURL(item.thumbnail)"
                  :alt="`${item.title} 썸네일 이미지`"
                />
              </router-link>
            </figure>
            <figcaption class="caption">
              <h6 class="text-18 text-md-20 fw-700">{{ item.title }}</h6>
              <span>{{ getCategory(item.category) }}</span>
            </figcaption>
          </div>
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
          <span class="text-14 text-gray-2">
            표시할 프로젝트가 현재 없습니다.
          </span>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
  import {ref, inject, computed, onMounted, watch} from 'vue';
  import {useStore} from 'vuex';
  import {useRoute} from 'vue-router';

  export default {
    setup() {
      const getURL = inject('getImageURL');
      const store = useStore();
      const {boardAPI} = inject('firebase');

      // 목록
      const items = ref(null);
      const getItems = async category => {
        try {
          const data = await boardAPI.getAllBoards('project', {
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
        const list = store.getters['categories/getCategoryProject'];
        return list?.length ? list.filter(i => i.value !== null) : [];
      });
      // 카테고리 value에서 text 구하기
      const getCategory = value => {
        return categories.value.find(c => c.value === value)?.text;
      };

      onMounted(() => {
        getItems(categorySelected.value);
      });

      watch(
        () => categorySelected.value,
        n => {
          items.value = [];
          getItems(n);
        },
      );

      return {getURL, items, categorySelected, categories, getCategory};
    },
  };
</script>

<style lang="scss" scoped>
  // 필터링
  .section-category {
    margin-bottom: 2rem;
    padding: 1rem 1rem 0.5rem;
    border-top: 2px solid $gray-2;
    border-bottom: 2px solid $gray-2;

    .list-category {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .list-item {
        margin: 0 12px 12px 0;
        .btn-category {
          transition: all 0.2s;
          &.active {
            background-color: $gray-1;
            border-color: $gray-1;
            border-radius: 7px;
          }
        }
      }
    }
  }

  .item-project {
    position: relative;
    figure {
      transition: transform 0.3s;
      overflow: hidden;
      img {
        transition: transform 0.3s;
      }
    }
    figcaption {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      background-color: white;
      padding: 0.25rem 1rem;
      z-index: 10;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s;
      color: $gray-1;
    }
    &:hover {
      // cursor: pointer;
      figure {
        transform: scale(0.94);
        img {
          transform: scale(1.2);
        }
      }
      figcaption {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>
