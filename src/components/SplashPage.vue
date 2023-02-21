<template>
  <div id="splash">
    <div class="logo">
      <div class="dim" :class="{ active: active }"></div>
      <img :src="getURL('/assets/logo-vertical.svg')" alt="dcs lab 로고 이미지" />
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted } from "vue";
export default {
  setup() {
    const getURL = inject("getImageURL");
    const active = ref(false);
    onMounted(() => {
      setTimeout(() => {
        active.value = true;
      }, 1000);
    });
    return { getURL, active };
  },
};
</script>

<style lang="scss" scoped>
#splash {
  position: fixed;
  top: 0;
  left: 0;
  user-select: none;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    width: 300px;
    height: 400px;
    max-width: 80vw;
    position: relative;
    .dim {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      z-index: 3001;
      width: 100%;
      height: 100%;
      transition: all 1s;
      &.active {
        transform: translate(-50%, -150%);
      }
    }
  }
}
</style>
