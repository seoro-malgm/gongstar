<template>
  <div>
    <section class="section-gap">
      <div class="container">
        <header class="my-3 mb-5 text-center">
          <h1 class="text-32 text-md-72 fw-900">ABOUT DCS LAB</h1>
        </header>
        <div class="row flex-column flex-md-row align-items-md-center">
          <div class="col-8 col-md-5 mx-auto mx-md-0">
            <div class="row justify-content-center w-100">
              <div class="col-12 col-md-6 col-lg-8">
                <img :src="getURL('logo-vertical.svg')" alt="dcs lab 로고 이미지" />
              </div>
            </div>
          </div>
          <div class="col-10 col-md-6 mt-5 mt-md-0 mb-5 mx-auto">
            <p class="text-14 text-lg-20 lh-180 mb-0">
              디지털 기술의 발전과 함께 문화유산의 보존과 활용 역시 새로운 방식으로 전환되고
              있습니다.
              <br />
              디지털보존솔루션랩은 ‘문화유산 보존·활용, 디지털 전환’이라는 슬로건으로 기록, 분석,
              진단, 모니터링, 복원, 복제, 활용 등 전 분야에 걸쳐 디지털 솔루션을 연구개발하고
              있으며, 연중 외부 전문가 콜로키움을 유치하고 있고, 겨울에는 랩실 자체적으로 3차원
              디지털 기록화 관련 윈터스쿨을 개최하고 있습니다. <br />
              디지털보존솔루션랩은 문화유산의 보존과 활용 분야에서 ‘변화를 주도하는 전문가’를
              양성하는데 앞서노력하고자 합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section-gap">
      <div class="bg-img ratio-53 ratio-lg-36 bg-dummy my-5"></div>
      <div>
        <carousel
          :itemsToShow="2"
          :autoplay="4000"
          :wrapAround="true"
          :breakpoints="{
            700: {
              itemsToShow: 2.5,
            },
            1024: {
              itemsToShow: 3.95,
            },
          }"
        >
          <slide v-for="slide in 10" :key="slide">
            <div class="bg-img ratio-53 bg-dummy">이미지 {{ slide }}</div>
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
      </div>
    </section>

    <section class="section-gap mb-0">
      <div class="row mx-0 align-items-stretch">
        <div class="col-12 px-0">
          <div class="row mx-0 align-items-stretch">
            <div class="col-12 col-md-6 px-0">
              <div
                class="bg-img ratio-100 ratio-lg-53"
                :style="{ backgroundImage: `url(${getURL('images/about-1.png')})` }"
              ></div>
            </div>
            <div
              class="col-12 col-md-6 px-0 bg-black text-gray-3 d-flex flex-column align-items-center justify-content-center"
            >
              <div class="row justify-content-center w-100">
                <div class="col-10 col-xl-6 py-5 py-lg-3">
                  <header class="mb-4 pb-3 border-bottom border-gray-3">
                    <span>Slogan</span>
                    <h1>Digital & Nature</h1>
                  </header>
                  <article>
                    <p class="lh-180 mb-0 text-14">
                      디지털보존솔루션랩은 ‘문화유산 보존·활용, 디지털 전환’이라는 슬로건으로 기록,
                      분석, 진단, 모니터링, 복원, 복제, 활용 등 전 분야에 걸쳐 디지털 솔루션을
                      연구개발하고 있으며, 연중 외부 전문가 콜로키움을 유치하고 있고, 겨울에는 랩실
                      자체적으로 3차원 디지털 기록화 관련 윈터스 쿨을 개최하고 있습니다.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 px-0">
          <div class="row mx-0 align-items-stretch">
            <div
              class="col-12 col-md-6 px-0 py-5 py-md-0 bg-black d-flex flex-column align-items-center justify-content-center order-1 order-md-0"
            >
              <img
                :src="getURL('logo-white.svg')"
                alt="dcs lab 로고 이미지"
                :style="{ width: '25%' }"
              />
            </div>
            <div class="col-12 col-md-6 px-0 order-0 order-md-1">
              <div
                class="bg-img ratio-100 ratio-lg-53"
                :style="{ backgroundImage: `url(${getURL('images/about-2.png')})` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { inject } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  setup() {
    const getURL = inject("getImageURL");
    return { getURL };
  },
};
</script>

<style lang="scss" scoped>
.carousel__slide {
  width: 100px;
  padding: 1rem;
}
.carousel__viewport {
  perspective: 2000px;
}
rack {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}
.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
