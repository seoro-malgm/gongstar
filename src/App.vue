<template>
  <router-view />
  <BaseToast :option="toast" @close="toast = { show: false, meessage: null }" />
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    /**
     * 토스트 메시지
     * window.toast(message) 로 실행함
     * @todo: 여러개 나올 때, 새 toast가 발생할 때는 상정되어있지 않음
     * @param {String} message
     */
    const toast = ref({
      show: false,
      message: null,
    });
    window.toast = (message) => {
      toast.value = {
        show: true,
        message,
      };
    };

    return {
      toast,
    };
  },
};
</script>

<style lang="scss">
// @import url("@/assets/styles/variable.scss");
</style>
