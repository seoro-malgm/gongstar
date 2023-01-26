<template>
  <div class="container-fluid">
    <article class="article-page">
      <header class="profressor-header">
        <h1 class="page-title">PROPESSOR</h1>
      </header>
      <section class="profressor-section">
        <img :src="getURL('images/profressor.png')" alt="교수님 이미지" class="profressor-image" />
      </section>
    </article>
  </div>
</template>

<script>
import { ref, computed, inject } from "vue";
export default {
  setup() {
    const getURL = inject("getImageURL");
    return { getURL };
  },
};
</script>

<style lang="scss" scoped>
.profressor-header {
  margin-top: 80px;
}
.profressor-section {
  margin-top: 130px;
  text-align: center;
  .profressor-image {
    width: 300px;
  }
}
</style>
