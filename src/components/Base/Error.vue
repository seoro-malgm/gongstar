<template>
  <div class="logo-error">
    <img :src="getURL('/assets/symbol.svg')" alt="" />
  </div>
</template>

<script>
  import {inject} from 'vue';
  export default {
    setup() {
      const getURL = inject('getImageURL');

      return {getURL};
    },
  };
</script>

<style lang="scss" scoped>
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .logo-error {
    animation-name: rotate;
    animation-duration: 2s;
    animation-timing-function: $default-ease;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    width: 5rem;
    img {
      width: 3rem;
      height: auto;
    }
  }
</style>
