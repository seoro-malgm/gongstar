<template>
  <div>
    <header class="mb-5 d-flex justify-content-between">
      <h3>목록</h3>
      <button
        class="btn btn-primary px-5"
        @click="
          $router.push({
            name: 'AdminWrite',
            query: {
              type: 'contact',
            },
          })
        "
      >
        새로 견적 작성
      </button>
    </header>
    <section>
      <!-- {{ items }} -->
      <ul class="list-unstyled my-4 py-2">
        <template v-if="items !== null && items?.length">
          <li class="row mb-2 bg-gray-2 text-white py-2 d-none d-md-flex">
            <div class="col-1">날짜</div>
            <div class="col-4">제목</div>
            <div class="col-5">정보</div>
            <div class="col-2 text-right">관리</div>
          </li>
          <li class="row border-bottom py-2" v-for="(item, i) in items" :key="i">
            <div class="col-1 col-md-1">
              {{ item?.date }}
            </div>
            <div class="col-11 col-md-4">
              <h6 v-if="item.title">
                {{ item.title }}
              </h6>
            </div>
            <div class="col-12 col-md-5">
              <ul class="p-0 m-0 text-gray-2 text-13 text-truncate">
                <li>
                  담당자/회사명:
                  <strong v-if="item?.name">{{ item.name }}</strong>
                </li>
                <li>
                  유형:
                  <strong v-if="item?.type?.length">{{ item.type.join(',') }}</strong>
                </li>
                <li>
                  내용 :
                  <strong v-if="item?.desc">{{ item.desc }}</strong>
                </li>
                <li>
                  연락처:
                  <strong v-if="item?.phone">{{ item.phone }}</strong>
                </li>
                <li>
                  예산 규모:
                  <strong v-if="item?.price">{{ item.price }}</strong>
                </li>
              </ul>
            </div>
            <div class="col-12 col-md-2">
              <div class="d-flex flex-column">
                <button
                  class="btn btn-outline-gray-1 mb-2"
                  @click="
                    $router.push({
                      name: 'AdminWrite',
                      query: {
                        type: 'contact',
                        id: item.id,
                      },
                    })
                  "
                >
                  관리
                </button>
                <button class="btn btn-error" @click="removeItem('contact', item.id)">삭제</button>
              </div>
            </div>
          </li>
        </template>
        <template v-else>
          <li class="p-3 text-center text-14">
            <template v-if="!items">
              <div class="spinner-border" role="status" />
            </template>
            <template v-else> 업로드된 프로젝트 데이터가 없습니다. </template>
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
      const data = await boardAPI.getAllBoards("contact");
      console.log(data);
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
