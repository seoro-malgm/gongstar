<template>
  <section id="starship" class="section container" ref="target">
    Starship
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

// 전체 멤버
const items = ref([]);

const getItems = async () => {
  try {
  } catch (error) {
    console.log("error  :", error);
  }
};

// 스크롤 인터렉션
const target = ref(null);
const targetIsVisible = ref(false);
const emit = defineEmits(["sectionChange"]);

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting;
  }
);
watch(
  () => targetIsVisible.value,
  n => {
    if (n) {
      emit("sectionChange");
    }
  }
);
</script>

<style lang="scss" scoped>
section.section {
  width: 100%;
  min-height: calc(100vh - 120px);
  padding-top: 120px;
  margin-bottom: 80px;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
}
</style>
