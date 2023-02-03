<template>
  <div class="">
    <section class="section-professor">
      <div class="container my-auto">
        <header class="my-3 mt-md-5 mb-4">
          <h1 class="page-title">PROPESSOR</h1>
        </header>
        <div class="row justify-content-center">
          <div class="col-12 col-md-9">
            <article class="row flex-column align-items-center justify-content-center">
              <div class="col-10 col-md-7 col-lg-4">
                <img
                  :src="getURL('images/profressor.png')"
                  alt="교수님 이미지"
                  class="profressor-image"
                />
              </div>
              <div class="col-12 col-lg-7 pb-5">
                <div class="mb-3 text-center mt-3">
                  <h2 class="text-28 text-lg-40 text-md-30 fw-700 mb-0">조명훈</h2>
                  <span class="text-14">CHO YOUNG HUN</span>
                </div>

                <ul class="list-unstyled text-center">
                  <li v-for="(item, i) in infos" :key="i" class="mb-2">
                    <span class="text-16 text-lg-20">
                      {{ item }}
                    </span>
                  </li>
                </ul>
                <div class="d-flex align-items-center justify-content-center">
                  <button class="btn btn-primary rounded-circle px-2 py-2 me-3">
                    <i class="icon icon-mail text-20"></i>
                  </button>
                  <button class="btn btn-primary rounded-circle px-2 py-2">
                    <i class="icon icon-instagram text-20"></i>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-intro px-3">
      <div class="text-center my-auto">
        <h1 class="text-white">LAB OF DISITAL CONSERVATION SOLUTION</h1>
        <h3 class="text-white">문화유산 보존과활용 그리고 디지털 전환</h3>
      </div>
    </section>

    <!-- <article class="article-page">
      <header class="profressor-header">
        <h1 class="page-title">PROPESSOR</h1>
      </header>
      <section class="profressor-section">
        <img :src="getURL('images/profressor.png')" alt="교수님 이미지" class="profressor-image" />
      </section>
    </article> -->
  </div>
</template>

<script>
import { ref, computed, inject } from "vue";
export default {
  setup() {
    const getURL = inject("getImageURL");
    const infos = ref([
      "디지털 유산(기록화, 복원·복제, 영상분석, 콘텐츠), 건전성평가",
      "산학연구관204호",
      "실험실 / 디지털보존솔루션랩(연구관4518호)",
      "041)850-8539",
      "joyh@kongju.ac.kr",
    ]);
    return { getURL, infos };
  },
};
</script>

<style lang="scss" scoped>
.section-intro {
  background-color: #000;
  width: 100%;
  height: calc(100vh - 150px);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.section-professor {
  background-color: white;
  padding: 2rem;
  margin-bottom: 5rem;
}
</style>
