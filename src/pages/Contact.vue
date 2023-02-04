<template>
  <div class="container min-vh-100 section-gap mt-5">
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title">CONTACT US</h1>
    </header>
  </div>
</template>

<script>
import { ref, inject } from "vue";

export default {
  setup() {
    const getURL = inject("getImageURL");
    return { getURL };
  },
};
</script>

<style lang="scss" scoped></style>
