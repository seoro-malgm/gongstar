<template>
  <section class="section section-gap-padding">
    <header class="container-fluid text-center">
      <h1 class="section-title">파트너스</h1>
      <p class="mt-3">공스타와 함께하고 있는 협력사입니다</p>
    </header>
    <div class="container my-4">
      <div class="bg-gray-3 rounded p-4">
        <div class="row justify-content-center">
          <div class="col-6 col-md-4 col-lg-3 my-2" v-for="(item, i) in items" :key="i">
            <figure class="logo-image p-3">
              <img :src="getURL(`/assets/images/partners/${item.filename}.svg`)" alt="" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, inject } from "vue";
export default {
  setup() {
    const getURL = inject("getImageURL");

    const items = ref([
      {
        name: "DCS LAB",
        filename: "dcslab",
      },
      {
        name: "DCS LAB",
        filename: "dcslab",
      },
      {
        name: "DCS LAB",
        filename: "dcslab",
      },
      {
        name: "DCS LAB",
        filename: "dcslab",
      },
      {
        name: "DCS LAB",
        filename: "dcslab",
      },
      {
        name: "DCS LAB",
        filename: "dcslab",
      },
    ]);
    return { getURL, items };
  },
};
</script>

<style lang="scss" scoped>
.logo-image {
  filter: saturate(0%);
}
.section {
  background-color: white;
}
</style>
