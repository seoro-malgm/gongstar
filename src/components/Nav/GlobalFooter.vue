<template>
  <footer id="global-footer">
    <span>
      (32588) 충청남도 공주시 공주대학로 56(신관동 182) 문화재보존과학과 / 산학연구관 407호 /
      041-850-8540
    </span>
    <span class="ms-lg-auto">Copyrightⓒ Kongju National University. All Rights Reserved.</span>
  </footer>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#global-footer {
  background-color: #000;
  color: $gray-3;
  padding: 1rem;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  @media (min-width: 1320px) {
    flex-direction: row;
  }
}
</style>
