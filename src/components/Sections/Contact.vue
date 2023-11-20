<template>
  <section id="contact" class="section container" ref="target">
    <header class="mb-3">
      <h1 class="section-title">프로젝트 문의</h1>
      <p class="mt-3">
        공스타는 충남에서부터 기업문화를 선도하고, <br />
        귀사의 브랜드 경험을 이끌어낼 수 있도록 돕고 있습니다.
      </p>
    </header>
    <div class="my-5">
      <div class="">
        <router-link
          to="/contact"
          class="btn btn-contact text-20 text-md-24 fw-700 rounded-pill p-0"
        >
          <span class="btn-text"> 프로젝트 의뢰하기</span>
          <i class="icon icon-arr-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";
// import { useIntersectionObserver } from "@vueuse/core";

// const target = ref(null);
// const targetIsVisible = ref(false);
// const emit = defineEmits(["sectionChange"]);

// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
//   targetIsVisible.value = isIntersecting;
// });
// watch(
//   () => targetIsVisible.value,
//   (n) => {
//     if (n) {
//       emit("sectionChange");
//     }
//   }
// );
</script>

<style lang="scss" scoped>
section.section {
  width: 100%;
  padding-top: 120px;
  margin-bottom: 120px;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
}

@keyframes leftRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(12px);
  }
}

.icon.icon.icon-arr-right {
  animation-name: leftRight;
  animation-timing-function: cubic-bezier(0.6, 0, 0.735, 0.045);
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
.btn-contact {
  .btn-text {
    padding-bottom: 2px;
    border-bottom: 3px solid $secondary;
  }
}
</style>
