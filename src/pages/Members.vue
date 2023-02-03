<template>
  <div class="">
    <section>
      <div class="container my-auto">
        <header class="my-3 mt-md-5 mb-4">
          <h1 class="page-title">MEMBERS</h1>
        </header>
      </div>
    </section>
    <div class="container-fluid container-md pb-5">
      <div class="row mx-0">
        <div class="col-6 col-md-4 px-0" v-for="(item, i) in members" :key="i">
          <div class="member">
            <div class="bg-img ratio-100 bg-secondary" />
            <div class="member-info">
              <h6 class="text-18 text-md-22">이름</h6>
              <span>소속, sns 등</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from "vue";
export default {
  setup() {
    const getURL = inject("getImageURL");
    const members = ref(["", "", "", "", "", "", "", "", "", "", ""]);
    return { getURL, members };
  },
};
</script>

<style lang="scss" scoped>
.member {
  position: relative;
  .member-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: rgba($color: #000000, $alpha: 0.4);
    h6 {
      color: white;
    }
    span {
      color: rgba($color: #ffffff, $alpha: 0.5);
      font-size: 14px;
    }
  }
}
</style>
