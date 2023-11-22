<template>
  <section class="section section-history section-gap-padding">
    <div class="container">
      <header class="">
        <h1 class="section-title text-white">공스타의 연혁</h1>
      </header>
      <div ref="target"></div>
      <section class="mt-4">
        <ul class="list-history">
          <li v-for="(item, i) in items" :key="item.date" class="list-item">
            <div class="row mx-n1">
              <div class="col-1 dot-wrap px-1">
                <div class="dot" />
                <div class="line" />
              </div>
              <div class="col-11 px-1">
                <div class="p-3 py-md-5 px-md-3">
                  <h3 class="date text-32 text-md-48">
                    {{ item.date }}
                  </h3>
                  <h2 class="content text-20 text-md-32">
                    {{ item.text }}
                  </h2>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, defineEmits, watch } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const target = ref(null);
const targetIsVisible = ref(false);
const emit = defineEmits(["sectionChange"]);

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
  targetIsVisible.value = isIntersecting;
});
watch(
  () => targetIsVisible.value,
  (n) => {
    if (n) {
      emit("sectionChange");
    }
  }
);

const items = ref([
  {
    date: "2021-11",
    text: "법인 설립",
  },
  {
    date: "2022-03",
    text: "사회적 기업 육성지원사업 선정, 농촌 신활력 플러스 지원사업 선정",
  },
  {
    date: "2022-07",
    text: "충남지방중소기업벤처 여성 기업 지정",
  },
  {
    date: "2022-11",
    text: "충남형 예비사회적기업 지정 지역사회공헌형(나)",
  },
  {
    date: "2023-02",
    text: "CTO 영입 및 F&B사업 확장",
  },
]);
</script>

<style lang="scss" scoped>
.section-history {
  background-color: $gray-1;
  color: white;
  min-height: 100vh;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(24px);
}

.list-item {
  position: relative;
  .dot-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .dot {
      margin: auto;
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      @media (min-width: $breakpoint-md) {
        width: 40px;
        height: 40px;
      }
      border-radius: 50%;
      background-color: white;
      &:before,
      &:after {
        position: absolute;
        z-index: 2;
        content: "";
        display: block;
        background-color: white;
        width: 3px;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
      &:before {
        top: -50%;
      }
      &:after {
        top: 50%;
      }
    }
  }
  &:first-child .dot::before {
    display: none;
  }
  // &:last-child .dot::after {
  //   display: none3
  // }
  .date {
    opacity: 0.3;
    position: absolute;
    top: -0.5rem;
    @media (min-width: $breakpoint-lg) {
      top: 1rem;
    }
  }
  .content {
    line-height: 1 !important;
    @media (min-width: $breakpoint-lg) {
      line-height: 1.6 !important;
    }
  }
}
</style>
