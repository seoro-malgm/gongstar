<template>
  <div>query: {{ query }}</div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const query = computed(() => {
      return route?.query?.query;
    });

    return { query };
  },
};
</script>

<style lang="scss" scoped></style>
