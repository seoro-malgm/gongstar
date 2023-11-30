<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center">
    <div class="text-center">
      <div class="p-3 d-flex justify-content-center">
        <base-error />
      </div>
      <h1 class="text-18 text-md-24">페이지를 찾을 수 없습니다</h1>
      <p class="text-13 text-md-14">링크를 다시 확인하시길 바랍니다</p>
      <div class="text-center mt-3">
        <a href="/" class="btn btn-secondary px-4 py-2"
          >메인페이지로 이동하기</a
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    setup() {
      return {};
    },
  };
</script>

<style lang="scss" scoped></style>
