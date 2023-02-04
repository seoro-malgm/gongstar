<template>
  <div class="">
    <section>
      <div class="container my-auto">
        <header class="my-3 mt-md-5 mb-4">
          <h1 class="page-title">MEMBERS</h1>
        </header>
      </div>
    </section>
    <div class="container-fluid container-md pb-5">
      <transition-group name="fade-up" tag="div" class="row mx-0" appear @enter="onEnter">
        <div
          class="col-6 col-md-3 px-0 member-column"
          v-for="(item, i) in members"
          :key="i"
          :data-index="i"
          :style="{
            transitionDelay: `${i * 0.1}s`,
          }"
        >
          <div class="member">
            <div class="bg-img ratio-100 bg-secondary" />
            <div class="member-info">
              <h6 class="text-18 text-md-22">이름</h6>
              <span class="text-14 text-md-16">소속, sns 등</span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted } from "vue";
export default {
  setup() {
    const getURL = inject("getImageURL");
    const members = ref(["", "", "", "", "", "", "", "", "", "", ""]);
    const show = ref(false);

    function onEnter(el, done) {
      // gsap.to(el, {
      //   opacity: 1,
      //   height: "1.6em",
      //   delay: el.dataset.index * 0.15,
      //   onComplete: done,
      // });
    }

    return { getURL, members, onEnter };
  },
};
</script>

<style lang="scss" scoped>
.member {
  position: relative;
  .member-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: rgba($color: #000000, $alpha: 0.4);
    h6 {
      color: white;
    }
    span {
      color: rgba($color: #ffffff, $alpha: 0.5);
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
