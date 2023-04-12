<template>
  <div>
    <div class="container-fluid">
      <div class="row align-items-end">
        <div class="col-12 col-md-11">
          <section class="section-main">
            <div class="main-title">
              <h1 class="text-24 text-md-40">DESIGN FOR LOCAL</h1>
              <h2 class="text-20 text-md-32">주식회사 공스타입니다.</h2>
            </div>
          </section>
        </div>
        <div class="col-12 col-md-1">
          <div class="text-center mt-3">
            <p class="mb-2 fw-700 text-16 text-md-20">Scroll Down</p>
            <i class="icon icon-arr-bottom text-32 text-md-40" />
          </div>
        </div>
      </div>
    </div>
    <section class="section-gap">
      <div class="container-fluid text-end">
        <h1 class="fw-900">비전</h1>
      </div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, odio nostrum cumque tenetur
      vitae excepturi quaerat repudiandae accusamus dicta facere ab atque eius, fugiat iste,
      voluptatibus reprehenderit adipisci eaque possimus!
    </section>
    <section class="section-gap">
      <h1>서비스</h1>
    </section>
    <section class="section-gap">
      <h1>연혁</h1>
    </section>
    <section class="section-gap">
      <h1>공헌</h1>
    </section>
    <section class="section-gap">
      <h1>프로젝트 문의</h1>
    </section>
  </div>
</template>

<script>
import { ref, inject, onMounted } from "vue";

export default {
  components: {},
  setup() {
    const getURL = inject("getImageURL");

    return { getURL };
  },
};
</script>

<style lang="scss" scoped>
.section-main {
  width: 100%;
  padding-bottom: calc(100vh - 200px);
  @media (min-width: $breakpoint-md) {
    padding-bottom: calc(100vh - 140px);
  }
  background: #999;
  position: relative;
  border-radius: 2rem;
  .main-title {
    position: absolute;
    top: 50%;
    left: 1.5rem;
    transform: translateY(-50%);
    h1 {
      font-weight: 900;
    }
  }
}

@keyframes updown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(24px);
  }
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
