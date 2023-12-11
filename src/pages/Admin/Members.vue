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
              type: 'members',
              no: items?.length ? +items[0].no + 1 : null
            }
          })
        "
      >
        새로 올리기
      </button>
    </header>
    <section>
      <!-- {{ items }} -->
      <ul class="list-unstyled my-4 py-2">
        <template v-if="items !== null && items?.length">
          <li class="row mb-2 bg-gray-2 text-white py-2 d-none d-md-flex">
            <div class="col-1">번호</div>
            <div class="col-2">프로필</div>
            <div class="col-2">직책</div>
            <div class="col-5">스킬</div>
            <div class="col-2 text-right">관리</div>
          </li>
          <li
            class="row border-bottom py-2"
            v-for="(item, i) in items"
            :key="i"
          >
            <div class="col-1 col-md-1">
              {{ item.no }}
            </div>
            <div class="col-11 col-md-2">
              <div
                class="bg-img ratio-100"
                :style="{
                  background: item?.profile
                    ? `url(${item.profile})`
                    : '#999999',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat'
                }"
              ></div>
            </div>
            <div class="col-12 col-md-2">
              <h6 class="text-truncate">{{ item.duty }}</h6>
            </div>
            <div class="col-12 col-md-5">
              <ul class="d-inline-flex">
                <li v-for="(skill, i) in item.skill" class="px-1">
                  <span
                    class="d-block border rounded-pill px-3 py-1 border-black text-14"
                  >
                    {{ skill }}
                  </span>
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
                        type: 'members',
                        id: item.id
                      }
                    })
                  "
                >
                  수정
                </button>
                <button
                  class="btn btn-error"
                  @click="removeItem('members', item.id)"
                >
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
      const data = await boardAPI.getAllBoards("members");
      if (data?.length) {
        function compareNumbers(a, b) {
          if (b?.no && a?.no) {
            return +b?.no - +a?.no;
          } else return 0;
        }
        items.value = data.sort(compareNumbers);
      } else items.value = [];
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
  }
};
</script>

<style lang="scss" scoped>
.desc:deep * {
  font-size: 14px;
  margin-top: 2px;
  font-weight: 400;
  color: #222 !important;
}
</style>
