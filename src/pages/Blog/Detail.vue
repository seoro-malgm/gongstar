<template>
  <section class="section-gap mt-5">
    <div class="container">
      <template v-if="!item">
        <div class="spinner-border" />
      </template>
      <template v-else>
        <header class="mb-3 pb-3 border-bottom">
          <small>BLOG</small>
          <h1 class="text-20 text-lg-40 fw-900 mb-0">{{ item.title }}</h1>
        </header>
        <section class="desc my-lg-5 py-5">
          <p v-html="item.desc" />
        </section>
      </template>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";

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
      const data = await boardAPI.getBoard("blog", id.value);
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
