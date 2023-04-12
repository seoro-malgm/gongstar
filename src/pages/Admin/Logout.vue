<template>
  <div class="text-center py-5">
    <span class="spinner" />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// import firebase from '~/plugins/firebase'
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      // 세션스토리지 삭제
      sessionStorage.removeItem("gongstar-token");
      // store에서도 삭제
      store.dispatch("auth/setState", ["user", null]);
      router.replace("/");
    });

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
