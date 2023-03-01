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
              type: 'member',
              no: items?.length ? +items[0].no + 1 : null,
            },
          })
        "
      >
        새로 올리기
      </button>
    </header>
    <section>
      <ul class="list-unstyled my-4 py-2 row">
        <template v-if="items !== null && items?.length">
          <li class="col-6 col-md-4 col-lg-2 mb-5" v-for="(item, i) in items" :key="i">
            <section class="position-relative">
              <header
                class="position-absolute bg-primary text-white p-2"
                :stlye="{ top: '24px', left: '24px' }"
              >
                {{ item.no }}
              </header>
              <div
                class="bg-img ratio-138 img-contain"
                :style="{
                  background: item?.profileHovered ? `url(${item.profileHovered})` : '#999999',
                }"
              ></div>
            </section>
            <section class="pt-2">
              <h6 class="text-truncate text-20">{{ item.name }}</h6>
              <ul class="p-0 m-0 text-gray-2 text-13 text-truncate">
                <li>{{ item.type }}</li>
                <li>{{ item.employment }}</li>
              </ul>
            </section>
            <footer class="row mx-n1 mt-2">
              <div class="col-7 px-1">
                <button
                  class="btn btn-outline-primary mb-2 w-100"
                  @click="
                    $router.push({
                      path: '/admin/write',
                      query: {
                        type: 'member',
                        id: item.id,
                      },
                    })
                  "
                >
                  수정
                </button>
              </div>
              <div class="col-5 px-1">
                <button class="btn btn-error w-100" @click="removeItem('member', item.id)">
                  삭제
                </button>
              </div>
            </footer>
          </li>
        </template>
        <template v-else>
          <li class="p-3 text-center text-14">
            <template v-if="!items">
              <div class="spinner-border" role="status" />
            </template>
            <template v-else> 업로드된 멤버 데이터가 없습니다. </template>
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
      const data = await boardAPI.getAllBoards("member", { text: "no", value: "asc" });
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
