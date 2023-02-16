<template>
  <div>
    <header class="mb-5 d-flex justify-content-between">
      <h3>목록</h3>
      <button
        class="btn btn-primary px-5"
        @click="
          $router.push({
            path: '/admin/write',
            query: {
              type: 'archive',
            },
          })
        "
      >
        새로 올리기
      </button>
    </header>
    <section>
      {{ items }}
      <ul class="list-unstyled my-4 py-2 border-top">
        <li class="row border-bottom py-2">
          <div class="col-2">img</div>
          <div class="col-8">title</div>
          <div class="col-2">
            <div class="d-flex flex-column">
              <button
                class="btn btn-outline-primary mb-2"
                @click="
                  router.push({
                    path: '/admin/write',
                    query: {
                      type: 'archive',
                      id: '0',
                    },
                  })
                "
              >
                수정
              </button>
              <button class="btn btn-error" @click="removeItem('archive', '0')">삭제</button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { ref, inject, computed, onMounted } from "vue";

export default {
  setup() {
    const { boardAPI } = inject("firebase");

    const items = ref(null);
    const getItems = async () => {
      const data = await boardAPI.getAllBoards("archive");
      items.value = data;
    };
    onMounted(() => {
      getItems();
    });

    const removeItem = (pathName, id) => {
      console.log("item:", { pathName, id });
    };
    return { items, removeItem };
  },
};
</script>

<style lang="scss" scoped></style>
