<template>
  <div>this is</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const items = ref([]);

const getItems = async () => {
  try {
    // const data = await ;
    // if (data) {
    // 	items.value = data;
    // }
  } catch (error) {
    console.log("error  :", error);
  }
};
</script>

<style lang="scss" scoped></style>
