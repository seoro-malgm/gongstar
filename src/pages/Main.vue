<template>
  <div>
    <div class="container-fluid">
      <div class="dummy-section">
        <div class="lettertype">
          <img :src="getURL('/assets/lettertype.svg')" alt="" />
        </div>
        <header class="section-title">
          <h1 class="text-24 text-md-32 text-lg-48 mix-dif">디지털로 지역을 SAVE하다</h1>
        </header>
        <div class="scroll-down">
          <p class="mb-1 fw-700 text-16 text-md-18">Scroll Down</p>
          <i class="icon icon-arr-bottom text-32 text-md-40" />
        </div>
      </div>
      <div class="section-main">
        <section-logo-rotate />
      </div>
    </div>
    <!-- 비전 -->
    <!-- <section-vision /> -->
    <!-- 서비스 -->
    <section-services />
    <!-- 공헌 -->
    <!-- <section-contribution class="mb-0" /> -->
    <!-- 연혁 -->
    <section-history />
    <!-- 파트너스 -->
    <section-partners />
    <!-- 프로젝트 문의 -->
    <section-contact />
  </div>
</template>

<script>
import { inject, ref } from "vue";

import SectionLogoRotate from "@/components/Sections/LogoRotate.vue";
import SectionVision from "@/components/Sections/Vision.vue";
import SectionServices from "@/components/Sections/Services.vue";
import SectionHistory from "@/components/Sections/History.vue";
import SectionContribution from "@/components/Sections/Contribution.vue";
import SectionContact from "@/components/Sections/Contact.vue";
import SectionPartners from "@/components/Sections/Partners.vue";

export default {
  components: {
    SectionLogoRotate,
    SectionVision,
    SectionHistory,
    SectionServices,
    SectionContribution,
    SectionPartners,
    SectionContact,
  },
  setup() {
    const getURL = inject("getImageURL");

    return { getURL };
  },
};
</script>

<style lang="scss" scoped>
// .section-main {
//   width: 100%;
//   padding-bottom: calc(100vh - 200px);
//   @media (min-width: $breakpoint-md) {
//     padding-bottom: calc(100vh - 140px);
//   }
//   background: $primary;
//   position: relative;
//   // border-radius: 2rem;
//   .main-title {
//     position: absolute;
//     top: 50%;
//     left: 1.5rem;
//     transform: translateY(-50%);
//     h1 {
//       font-weight: 900;
//     }
//   }
// }

.dummy-section {
  width: 100%;
  height: calc(100vh - 200px);
  margin-bottom: 132px;
  z-index: 2;
  @media (min-width: $breakpoint-md) {
    margin-bottom: 88px;
    height: calc(100vh - 140px);
  }
  // 대제목
  .section-title {
    position: absolute;
    bottom: 24vh;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 10;
  }

  .scroll-down {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 10;
  }
}

@keyframes updown {
  0% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(16px);
  }
}

.section-main {
  width: 100%;
  height: calc(100vh - 200px);
  top: 0;
  left: 0;
  z-index: -1;
  @media (min-width: $breakpoint-md) {
    height: calc(100vh - 140px);
  }
  // position: relative;
  position: fixed;
}

.icon.icon-arr-bottom {
  animation-name: updown;
  animation-timing-function: cubic-bezier(0.6, 0, 0.735, 0.045);
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
</style>
