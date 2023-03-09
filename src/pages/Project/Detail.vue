<template>
  <section class="section-gap mt-5">
    <div class="container">
      <template v-if="!item">
        <div class="spinner-border" />
      </template>
      <template v-else>
        <header class="mb-3 pb-3 border-bottom">
          <h1 class="text-20 text-lg-40 fw-900 mb-0">{{ item.title }}</h1>
          <strong class="text-18 text-lg-24"> {{ item.subtitle }}</strong>
        </header>
        <section class="mb-4">
          <ul class="p-0">
            <li>과업명: {{ item.subject }}</li>
            <li>지원기관: {{ item.client }}</li>
            <li>
              수행기간: {{ item.date.start }}
              <template v-if="item.date?.end">~ {{ item.date.end }}</template>
            </li>
          </ul>
        </section>
        <section class="mb-4">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-5">
              <p class="text-14 lh-180">
                {{ item.summary }}
              </p>
            </div>
          </div>
        </section>
        <section>
          <ul class="d-inline-flex flex-wrap p-0">
            <li v-for="(word, i) in item.keyword" class="me-2">
              <a href="#" class="btn btn-link p-0 text-gray-2 text-13"> #{{ word }} </a>
            </li>
          </ul>
        </section>
        <section class="desc my-lg-5 py-5">
          <p v-html="item.desc" />
          <!-- <template v-if="item?.images?.length">
            <figure v-for="(image, i) in item.images" class="mb-5">
              <img :src="getURL(`/aseets/project/${id}/${image.src}`)" :alt="image?.caption" />
              <figcaption v-if="image.caption" class="text-13 text-md-14">
                {{ image.caption }}
              </figcaption>
            </figure>
          </template> -->
        </section>
      </template>

      <!-- <pre
        style="
          position: fixed;
          bottom: 0;
          right: 0;
          z-index: 3000;
          background-color: #ededed;
          padding: 0.5rem;
          width: 300px;
          height: 500px;
          overflow-y: scroll;
          font-size: 14px;
          line-height: 17px;
          color: #000;
          text-align: left;
        "
      >
      id: {{ id }}
      item: {{ item }}
      </pre> -->
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
// import allProject from "@/database/project.json";

export default {
  setup() {
    // const items = allProject;
    const getURL = inject("getImageURL");
    const route = useRoute();
    const id = computed(() => {
      return route?.params?.id;
    });

    const { boardAPI } = inject("firebase");
    const item = ref(null);
    const getItem = async () => {
      const data = await boardAPI.getBoard("project", id.value);
      item.value = data;
    };
    onMounted(() => {
      getItem();
    });

    // const item = computed(() => {
    //   return items?.find((el) => el.id === id.value);
    // });

    return { getURL, id, item };
  },
};
</script>

<style lang="scss" scoped>
.desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  figure {
    img {
      width: inherit;
    }
    figcaption {
      padding-top: 8px;
      color: #777;
    }
  }
}
</style>
