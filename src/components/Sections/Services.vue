<template>
  <section class="section section-gap mt-5">
    <header class="container-fluid py-4">
      <h1 class="section-title text-center">공스타의 서비스</h1>
    </header>
    <section class="mt-5 container-fluid">
      <div
        class="row justify-content-between flex-column flex-md-row align-items-stretch"
        ref="target"
      >
        <div
          class="col-6 col-md-5 col-lg-4 h-100"
          v-for="(item, i) in services"
          :key="i"
          :class="[
            {
              'offset-6 offset-md-2 offset-lg-4': i % 2,
            },
          ]"
        >
          <article
            class="vision-item p-3 p-lg-5"
            :class="[
              {
                'text-end': i % 2,
              },
              {
                show: targetIsVisible,
              },
            ]"
            :style="{
              ...item.style,
            }"
          >
            <header>
              <h5 class="text-20 text-md-24 text-lg-40">{{ item.title }}</h5>
            </header>
            <section>
              <!-- <figure>
                <div class="bg-img ratio-40 bg-gray-2"></div>
              </figure> -->
              <p class="text-14 text-md-20">
                {{ item.text }}
              </p>
            </section>
          </article>
        </div>
      </div>
      <!-- <div class="row justify-content-between flex-column flex-md-row">
       
      </div> -->
      <!-- <div class="stairs">
        <ul class="list-stair" ref="target">
          <li
            class="list-item"
            :class="{ targetIsVisible: targetIsVisible }"
            v-for="item in items"
            :key="item.id"
            :style="{
              width: `${targetIsVisible ? item.width : 0}%`,
              backgroundColor: item.background,
              opacity: targetIsVisible ? 1 : 0,
              color: item?.color ? item.color : '#23235',
            }"
          >
            {{ item.text }}
          </li>
        </ul>
      </div> -->
    </section>
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

const services = ref([
  {
    title: "F&B",
    text: "농촌 자원 활성화를 위해 푸드컨설팅과 케이터링 서비스를 제공합니다. 지역 농산물을 우선 활용하여 협력을 기반으로 BM을 구축합니다.",
    style: {
      transform: "translate(10rem, 10rem) scale(0.2)",
    },
  },
  {
    title: "Brand eXperience",
    text: "브랜드의 A to Z를 세심하게 설계합니다. CI-BI부터 컨설팅까지 브랜드의 약점을 보완하고 강점을 극대화하여 효과적인 스토리텔링을 만듭니다. 결과적으로 브랜드의 가치를 소중하게 만듭니다.",
    style: {
      transform: "translate(-10rem, 10rem) scale(0.2)",
    },
  },
  {
    title: "Project",
    text: "혁신을 추구하는 건강한 커뮤니티를 양성 및 지원하여 지역을 선도하는 기업문화를 만들고 발전적인 인사이트를 나눕니다.",
    style: {
      transform: "translate(10rem, -10rem) scale(0.2)",
    },
  },
  {
    title: "Web Development",
    text: "기업의 내부/외부 환경분석을 기반으로 ICT 서비스 고도화를 통해 글로벌 시대를 함께할 수 있도록 웹 개발 서비스를 제공합니다.",
    style: {
      transform: "translate(-10rem, -10rem) scale(0.2)",
    },
  },
]);
</script>

<style lang="scss" scoped>
.section {
  min-height: 100vh;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
}
.stairs {
  .list-stair {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: end;
    .list-item {
      background-color: #999;
      padding: 2rem;
      font-size: 24px;
      font-weight: 700;
      white-space: nowrap;
      @media (min-width: $breakpoint-md) {
        padding: 3rem;
        font-size: 28px;
      }
      transition: all 0.8s;
      transition-delay: 0.5s;
    }
  }
}
.vision-item {
  width: 100%;
  // min-height: calc(50vh - 100px);
  margin-bottom: 80px;
  border: 2px solid $gray-1;
  opacity: 0;
  transition: all 0.5s $default-ease;
  transition-delay: 0.2s;
  header {
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 2px solid $gray-1;
    h5 {
      text-align: center;
      font-weight: 800;
    }
  }
  &.show {
    opacity: 1;
    transform: translate(0, 0) scale(1) !important;
  }
}
</style>
