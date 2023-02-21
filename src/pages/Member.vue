<template>
  <div class="">
    <header class="my-3 mt-md-5 mb-4">
      <h1 class="page-title">PROPESSOR</h1>
    </header>
    <div class="row justify-content-center">
      <div class="col-12 col-md-9">
        <article class="row flex-column align-items-center justify-content-center">
          <div class="col-8 col-md-7 col-lg-4">
            <img
              :src="getURL('/assets/images/profressor.png')"
              alt="교수님 이미지"
              class="profressor-image"
            />
          </div>
          <div class="col-12 col-lg-7 pb-5">
            <div class="mb-3 text-center mt-3">
              <h2 class="text-28 text-lg-40 text-md-30 fw-700 mb-0">조영훈</h2>
              <span class="text-14">CHO YOUNG HUN</span>
            </div>

            <ul class="list-unstyled text-center">
              <li v-for="(item, i) in professorInfos" :key="i" class="mb-2">
                <span class="text-16 text-lg-20">
                  {{ item }}
                </span>
              </li>
            </ul>
            <div class="d-flex align-items-center justify-content-center">
              <button class="btn btn-primary rounded-circle px-2 py-2">
                <i class="icon icon-mail text-20"></i>
              </button>
              <button class="btn btn-primary rounded-circle px-2 py-2 mx-3">
                <i class="icon icon-instagram text-20"></i>
              </button>
              <button class="btn btn-primary rounded-circle px-2 py-2">
                <i class="icon icon-facebook text-20"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
    <section>
      <div class="container my-auto">
        <header class="my-3 mt-md-5 mb-4">
          <h1 class="page-title">MEMBERS</h1>
        </header>
      </div>
    </section>
    <div class="container-fluid container-md pb-5">
      <transition-group name="fade-up" tag="div" class="row" appear @enter="onEnter">
        <div
          class="col-6 col-md-3 member-column mb-3"
          v-for="(item, i) in items"
          :key="i"
          :data-index="i"
          :style="{
            transitionDelay: `${i * 0.1}s`,
          }"
        >
          <div class="member">
            <div class="position-relative" :style="{ paddingBottom: '138%' }">
              <div
                class="bg-img ratio-138 profile"
                :style="{
                  background: `url(${item.profile})`,
                }"
              />
              <div
                class="bg-img ratio-138 profile-hovered"
                v-if="item.profileHovered"
                :style="{
                  background: `url(${item.profileHovered})`,
                }"
              />
            </div>

            <div class="member-info">
              <div class="d-flex align-items-end mb-1">
                <h6 class="text-20 text-md-26 mb-0">{{ item.name }}</h6>
                <span class="text-16 text-md-18 ms-2 text-white">{{ item.type }}</span>
              </div>
              <span class="text-14 text-md-16">{{ item.employment }}</span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted } from "vue";
// import members from "@/database/members";
export default {
  setup() {
    const getURL = inject("getImageURL");
    // const items = ref(members);
    const show = ref(false);

    const professorInfos = ref([
      "디지털 유산(기록화, 복원·복제, 영상분석, 콘텐츠), 건전성평가",
      "산학연구관204호",
      "실험실 / 디지털보존솔루션랩(연구관418호)",
      "041)850-8539",
      "joyh@kongju.ac.kr",
    ]);

    function onEnter(el, done) {
      // gsap.to(el, {
      //   opacity: 1,
      //   height: "1.6em",
      //   delay: el.dataset.index * 0.15,
      //   onComplete: done,
      // });
    }

    const { boardAPI } = inject("firebase");
    const items = ref(null);
    const getItems = async () => {
      const data = await boardAPI.getAllBoards("member");
      items.value = data;
    };
    onMounted(() => {
      getItems();
    });

    return { getURL, professorInfos, items, onEnter };
  },
};
</script>

<style lang="scss" scoped>
.member {
  position: relative;
  .bg-img {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.4s ease-in-out;
    &.profile {
      opacity: 1;
    }
    &.profile-hovered {
      opacity: 0;
    }
  }
  .member-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    min-height: 25%;
    padding: 1rem 1.5rem;
    background-color: rgba($color: #000000, $alpha: 0.4);
    h6 {
      color: white;
    }
    span {
      color: rgba($color: #ffffff, $alpha: 0.5);
    }
  }
  &:hover {
    .bg-img {
      &.profile {
        opacity: 0;
      }
      &.profile-hovered {
        opacity: 1;
      }
    }
  }
}

// .member-column {
//   transition-delay: 0.25s;
// }
.fade-up-move,
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.5s $default-ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
}
</style>
