<template>
  <div>
    <nav class="d-flex justify-content-end">
      <button class="btn btn-primary px-4 py-2" @click="submit">저장하기</button>
    </nav>
    <section class="my-3 py-3 border-top border-bottom">
      <ul class="list-unstyled m-0">
        <li v-for="(item, i) in sections" :key="i">
          <article>
            <header class="py-2 w-100">
              <div class="row align-items-end">
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
                    @click="onRemoveSection(i)"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </header>
            <div class="collapse" :id="`section-${i}`">
              <section class="p-3 border-bottom">
                <div class="ps-3">
                  <ul class="m-0">
                    <draggable
                      v-model="item.lists"
                      @start="onDrag = true"
                      @end="onDrag = false"
                      item-key="id"
                    >
                      <template #item="{ element, index }">
                        <li class="mb-2">
                          <div class="d-flex align-items-center">
                            <div class="me-2">
                              <button class="rounded border p-2 btn-grap">::</button>
                            </div>
                            <div class="input-group">
                              <input
                                type="text"
                                class="form-control"
                                v-model="item.lists[index].text"
                                @keypress.enter="addList(item.lists)"
                              />
                              <div class="input-group-appned ps-2">
                                <button
                                  class="btn btn-outline-black"
                                  @click="removeList(item.lists, index)"
                                >
                                  목록 삭제
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </template>
                    </draggable>
                    <li class="ps-4 mt-2">
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
    const getHistory = async () => {
      const { boardAPI } = inject("firebase");
      const data = await boardAPI.getAllBoards("history", {
        text: "no",
        value: "asc",
      });
      sections.value = data;
    };
    onMounted(async () => {
      getHistory();
    });
    const addSection = () => {
      sections.value.push({
        title: null,
        lists: [
          {
            id: 0,
            text: "",
          },
        ],
      });
    };
    const onRemoveSection = async (sectionIndex) => {
      try {
        const bool = await window.prompt(
          '위 섹션과 하위 내용까지 모두 삭제하시겠습니까? 삭제한 내용은 다시 불러올 수 없습니다. 섹션을 삭제하는 게 맞다면 "섹션 삭제"를 입력하세요.'
        );
        if (!bool) return;
        console.log("bool:", bool);
        if (bool === "섹션 삭제") {
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

    const submit = async () => {};

    return {
      sections,
      onDrag,
      addSection,
      onRemoveSection,
      addList,
      removeList,
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
