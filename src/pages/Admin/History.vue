<template>
  <div>
    <nav class="d-flex justify-content-end">
      <button class="btn btn-primary px-4 py-2" @click="submit">저장하기</button>
    </nav>
    <section class="my-3 py-3 border-top border-bottom">
      <template v-if="!pending">
        <ul class="list-unstyled m-0">
          <li v-for="(item, i) in sections" :key="i">
            <article>
              <header class="py-2 w-100">
                <div class="row align-items-end pb-2 border-bottom">
                  <div class="col-9">
                    <div class="d-flex align-items-center w-100">
                      <div class="me-2">
                        <strong class="text-18"> {{ i + 1 }}. </strong>
                      </div>
                      <div class="flex-grow-1">
                        <input
                          type="text"
                          class="form-control w-100"
                          placeholder="섹션제목을 입력하세요"
                          v-model="item.title"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-2">
                    <button
                      class="btn btn-outline-black w-100"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="`#section-${i}`"
                      aria-expanded="false"
                      :aria-controls="`#section-${i}`"
                    >
                      내용 열기
                    </button>
                  </div>
                  <div class="col-1">
                    <button
                      class="btn btn-outline-error w-100"
                      type="button"
                      @click="onRemoveSection(item.id, i)"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </header>
              <div class="collapse" :id="`section-${i}`">
                <section class="p-1 border-bottom">
                  <div class="ps-1">
                    <ul class="m-0">
                      <draggable
                        v-model="item.lists"
                        @start="onDrag = true"
                        @end="onDrag = false"
                        item-key="id"
                      >
                        <template #item="{ element, index }">
                          <li class="mb-2">
                            <div class="d-flex align-items-stretch">
                              <div class="me-2 h-100 d-flex flex-row align-items-stretch">
                                <button class="rounded border p-2 btn-grap flex-grow-1">::</button>
                              </div>
                              <div class="row w-100">
                                <div class="col-11">
                                  <div class="row mx-n2">
                                    <div class="col-9 px-2">
                                      <textarea
                                        type="text"
                                        rows="3"
                                        class="form-control"
                                        v-model="item.lists[index].text"
                                        @keypress.enter="addList(item.lists)"
                                      />
                                    </div>
                                    <div class="col-3 px-2">
                                      <input
                                        class="form-control"
                                        type="text"
                                        placeholder="링크를 입력하세요(없다면 비우기)"
                                        v-model="item.lists[index].link"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-1">
                                  <!-- <button class="btn btn-outline-primary me-1">링크추가</button> -->
                                  <button
                                    class="btn btn-outline-black w-100"
                                    @click="removeList(item.lists, index)"
                                  >
                                    삭제
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </template>
                      </draggable>
                      <li class="ps-4 mt-2 mb-3">
                        <button
                          class="btn btn-outline-black text-13 w-100"
                          @click="addList(item.lists)"
                        >
                          목록 추가
                        </button>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </article>
          </li>
          <li>
            <button class="btn btn-primary w-100" @click="addSection">섹션 추가</button>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="text-center p-3">
          <div class="spinner-border" />
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  setup() {
    const sections = ref([]);
    const { boardAPI } = inject("firebase");
    const getHistory = async () => {
      const data = await boardAPI.getAllBoards("history", {
        text: "no",
        value: "asc",
      });
      sections.value = data;
    };
    onMounted(async () => {
      await getHistory();
      console.log("sections.value.length:", sections.value.length);
    });
    const addSection = () => {
      sections.value.push({
        isNew: true,
        title: null,
        // id: new Date().getTime(),
        no: sections.value.length,
        lists: [
          {
            id: "0",
            text: "",
          },
        ],
      });
    };
    const onRemoveSection = async (id, sectionIndex) => {
      console.log("id, sectionIndex:", id, sectionIndex);

      try {
        const bool = await window.prompt(
          '위 섹션과 하위 내용까지 모두 삭제하시겠습니까? 삭제한 내용은 다시 불러올 수 없습니다. 섹션을 삭제하는 게 맞다면 "섹션 삭제"를 입력하세요.'
        );
        if (!bool) return;
        if (bool === "섹션 삭제") {
          await boardAPI.removeBoard("history", id);
          sections.value.splice(sectionIndex, 1);
          window.toast("섹션이 삭제되었습니다.");
        } else {
          throw "code-missmatched";
        }
      } catch (error) {
        console.log("error:", error);
        switch (error) {
          case "code-missmatched":
            window.toast("삭제 문구가 정확하지 않습니다.");
            break;
          default:
            break;
        }
        console.error("error:", error);
      }
    };

    const onDrag = ref(false);

    const addList = (tartget) => {
      tartget.push({
        id: new Date().getTime(),
        text: "",
      });
    };

    const removeList = (tartget, index) => {
      tartget.splice(index, 1);
    };
    const pending = ref(false);
    const submit = async () => {
      pending.value = true;
      try {
        const data = await boardAPI.setHistory("history", sections.value);
        if (data) {
          await getHistory();
          setTimeout(() => {
            window.toast("저장이 완료되었습니다.");
            pending.value = false;
          }, 1200);
        }
      } catch (error) {
        window.toast("저장에 실페했습니다.");
        pending.value = false;
      }
    };

    return {
      sections,
      onDrag,
      addSection,
      onRemoveSection,
      addList,
      removeList,
      pending,
      submit,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-grap {
  cursor: grab;
}
</style>
