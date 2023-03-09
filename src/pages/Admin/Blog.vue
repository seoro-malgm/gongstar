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
              type: 'blog',
              no: items?.length ? +items[0].no + 1 : null,
            },
          })
        "
      >
        새로 올리기
      </button>
    </header>
    <section>
      <!-- {{ items }} -->
      <ul class="list-unstyled my-4 py-2 row">
        <template v-if="items?.length">
          <li class="col-6 col-md-3 border-bottom py-2" v-for="(item, i) in items" :key="i">
            <div>
              {{ item.no }}
            </div>
            <div>
              <div
                class="bg-img ratio-53"
                :style="{
                  background: item?.images ? `url(${item.images[0]})` : '#999999',
                }"
              ></div>
            </div>
            <div>
              <p class="text-truncate line-2 mb-2 pt-1">
                {{ item.desc }}
              </p>
              <a :href="item.url" class="btn btn-text p-0">
                <i class="icon icon-link text-24"></i>
              </a>
            </div>
            <div>
              <div class="d-flex flex-column">
                <button
                  class="btn btn-outline-primary mb-2 w-100"
                  @click="
                    $router.push({
                      path: '/admin/write',
                      query: {
                        type: 'blog',
                        id: item.id,
                      },
                    })
                  "
                >
                  수정
                </button>
                <button class="btn btn-error w-100" @click="removeItem('blog', item.id)">
                  삭제
                </button>
              </div>
            </div>
          </li>
        </template>
        <template v-else>
          <li class="p-3 text-center text-14">
            <template v-if="!items">
              <div class="spinner-border" role="status" />
            </template>
            <template v-else> 업로드된 블로그 데이터가 없습니다. </template>
          </li>
        </template>
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
      const data = await boardAPI.getAllBoards("blog");
      items.value = data;
    };
    onMounted(() => {
      getItems();
    });

    const removeItem = async (documentName, id) => {
      const bool = await window.confirm("삭제하시겠습니까?");
      if (bool) {
        try {
          const data = await boardAPI.removeBoard(documentName, id);
          if (data) {
            window.toast("삭제가 완료되었습니다.");
            getItems();
          }
        } catch (error) {
          console.error("error:", error);
          window.toast("삭제에 실패했습니다.");
        }
      }
    };
    return { items, removeItem };
  },
};
</script>

<style lang="scss" scoped></style>
