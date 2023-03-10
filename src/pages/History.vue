<template>
  <div>
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title">HISTORY</h1>
    </header>
    <section class="pb-5">
      <ul class="list-unstyled m-0">
        <li v-for="(item, i) in sections" :key="i">
          <article>
            <header class="p-2">
              <button
                class="btn btn-outline-primary w-100 text-start text-14 text-md-18 fw-700 btn-collapse"
                data-bs-toggle="collapse"
                :data-bs-target="`#section-${i}`"
                aria-expanded="false"
                :aria-controls="`#section-${i}`"
              >
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    {{ i + 1 }}.
                    {{ item.title }}
                  </div>
                  <div><i class="icon icon-up-dir text-16 text-md-24" /></div>
                </div>
              </button>
            </header>
            <div class="collapse" :id="`section-${i}`">
              <section class="mb-2 p-2 p-md-3">
                <ul class="m-0 border-bottom">
                  <li class="py-1 mb-1" v-for="(item2, index) in item.lists" :key="index">
                    <span
                      >- {{ item2.text }}
                      <template v-if="item2?.link">
                        <a :href="item2.link" target="_blank" class="fw-700">
                          Download Link
                          <i class="icon icon-attach" />
                        </a>
                      </template>
                    </span>
                  </li>
                </ul>
              </section>
            </div>
          </article>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
export default {
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

    return {
      sections,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-collapse {
  i.icon-up-dir {
    transition: transform 0.2s;
    transform: rotate(0);
  }
  &[aria-expanded="false"] {
    i.icon-up-dir {
      transform: rotate(180deg);
    }
  }
}
</style>
