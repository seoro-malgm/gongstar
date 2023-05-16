<template>
  <section class="section-gap mt-5">
    <div class="container">
      <template v-if="(!isPreview && !item) || (isPreview && !previewItem)">
        <div class="p-5 text-center">
          <div class="spinner-border" />
        </div>
      </template>
      <template v-else>
        <div class="row justify-content-center">
          <div class="col-10 col-md-8 col-lg-7">
            <div class="content-wrapper">
              <article class="content-container">
                <header class="mb-3 pb-3 pb-lg-0 text-center">
                  <h1 class="text-20 text-lg-40 fw-900 mb-0 lh-0">{{ item?.title }}</h1>
                  <ul class="my-1 p-0 d-flex align-items-center justify-content-center">
                    <li class="me-1" v-if="item?.category">
                      <span class="text-13 text-md-14 text-gray-2">
                        {{ getCategory(item.category) }}</span
                      >
                    </li>
                    <li class="me-1" v-if="item?.date">
                      <span class="text-13 text-md-14 text-gray-2">{{ item.date }}</span>
                    </li>
                  </ul>
                </header>
                <hr class="my-0" />
                <section class="desc mb-lg-5 py-4" v-if="item?.desc">
                  <description-content :content="item?.desc" />
                </section>
              </article>
            </div>
          </div>
        </div>
        <div class="floating-btns">
          <button v-if="isPreview" class="btn btn-primary" @click="$emit('close-preview')">
            <i class="icon icon-cancel" />
            <span>미리보기 닫기</span>
          </button>
          <button class="btn btn-outline-gray-1" @click="goTo(0, 0)" v-if="!isPreview">
            <i class="icon icon-up-big" />
            <span>맨 위로</span>
          </button>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, inject, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// meta
// import { useMeta } from "vue-meta";
// components
import DescriptionContent from "@/components/DescriptionContent.vue";
export default {
  props: {
    isPreview: {
      type: Boolean,
      default: false,
    },
    showPreview: {
      type: Boolean,
      default: false,
    },
    previewItem: {
      type: Object,
      default: null,
    },
  },
  components: {
    DescriptionContent,
  },
  setup(props, context) {
    // const items = allProject;
    const getURL = inject("getImageURL");
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const id = computed(() => {
      return route?.params?.id;
    });

    const query = computed(() => {
      return route?.query;
    });

    // 카테고리 목록
    const categories = computed(() => {
      const list = store.getters["categories/getCategoryProject"];
      return list?.length ? list.filter((i) => i.value !== null) : [];
    });
    // 카테고리 value에서 text 구하기
    const getCategory = (value) => {
      return categories.value.find((c) => c.value === value)?.text || "";
    };

    const { boardAPI } = inject("firebase");
    const item = ref(null);
    const getItem = async (preview) => {
      if (preview) {
        item.value = props.previewItem;
        // console.log("item.value:", item.value);
      } else {
        const data = await boardAPI.getBoard("project", id.value);

        if (data) {
          item.value = data;
        }
      }
    };

    // const setMeta = (data) => {
    //   useMeta(
    //     // meta값 생성
    //     {
    //       title: `공스타 | ${data?.title || ""}`,
    //       titleTemplate: `공스타 | ${data?.title || ""}`,
    //       meta: [
    //         {
    //           name: "title",
    //           content: `공스타 | ${data?.title || ""}`,
    //         },
    //         {
    //           name: "og:title",
    //           content: `공스타 | ${data?.title || ""}`,
    //         },
    //         {
    //           name: "description",
    //           content: `${data?.desc || ""}`,
    //         },
    //         {
    //           name: "og:description",
    //           content: `${data?.desc || ""}`,
    //         },
    //       ],
    //     }
    //   );
    // };
    onMounted(() => {
      if (props.isPreview) {
        getItem(true);
      } else if (!props.isPreview && id.value) {
        getItem();
        // setMeta(item.value);
      } else {
        window.alert("잘못된 접근입니다");
        router.replace("/project");
      }
    });
    watch(
      () => props.showPreview,
      (n) => {
        getItem(true);
      }
    );

    const goTo = (x, y) => {
      window.scrollTo(x, y);
    };

    return { getURL, id, item, getCategory, goTo };
  },
};
</script>

<style lang="scss" scoped>
.list-dot {
  list-style-type: disc;
}

$ratio: 67vh;
$ratio-md: 45%;
.content-wrapper {
}

.floating-btns {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  button {
    margin-bottom: 12px;
  }
}
</style>
