<template>
  <div>
    <section class="section-gap">
      <div class="container">아카이브 디테일 페이지</div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const id = computed(() => {
      return route?.query?.id;
    });

    return { id };
  },
};
</script>

<style lang="scss" scoped></style>
