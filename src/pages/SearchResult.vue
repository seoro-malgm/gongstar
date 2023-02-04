<template>
  <div class="container my-5 pb-5">
    <div class="row mb-3">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="input-group my-3">
          <input
            type="text"
            class="form-control text-14 text-lg-20 border-0 border-bottom rounded-0"
            v-model="str"
            placeholder="검색어를 입력하세요"
            @keypress.enter="search(str)"
          />
          <div class="input-group-append ms-2">
            <button class="btn btn-text p-0 btn-search" @click="search(str)">
              <i class="icon icon-search-1 text-24"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <header class="page-header flex-column flex-md-row">
      <h2 class="mb-0 d-flex align-items-center text-nowrap">
        <strong class="text-truncate d-block" :style="{ maxWidth: '80vw' }">{{ query }} </strong>에
        대한 검색결과
      </h2>
      <h2 class="result-length ms-0 mt-3 mt-md-0 ms-md-auto">
        총
        <strong class="text-primary">
          {{ items?.length }}
        </strong>
        개
      </h2>
    </header>
    <section class="mt-5 py-5">
      <div class="mb-5">
        <header class="p-2 text-14 text-white bg-primary">ARCHIVE</header>
        <ul class="list-unstyled border-top">
          <li v-for="(item, i) in items" :key="i" class="py-3 mb-2 border-bottom">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="mb-5">
        <header class="p-2 text-14 text-white bg-primary">MEMBERS</header>
        <ul class="list-unstyled border-top">
          <li v-for="(item, i) in items" :key="i" class="py-3 mb-2 border-bottom">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="mb-5">
        <header class="p-2 text-14 text-white bg-primary">NEWS</header>
        <ul class="list-unstyled border-top">
          <li v-for="(item, i) in items" :key="i" class="py-3 mb-2 border-bottom">
            {{ item }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const query = computed(() => {
      return route?.query?.query;
    });

    const items = ref(["결과1", "결과2", "결과3"]);

    const str = ref(null);

    onMounted(() => {
      if (query?.value) str.value = query.value;
    });

    const router = useRouter();
    const search = (e) => {
      router.push({
        name: "SearchResult",
        query: {
          query: e,
        },
      });
    };

    return { query, items, str, search };
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  .result-length {
    font-size: 20px;
  }
}
</style>
