<!-- App.vue -->

<template>
  <div id="wrapper"></div>
</template>

<script>
import { ref, onMounted, onBeforeMount, onBeforeUnmount, reactive } from "vue";
// import createP5 from "@/plugins/p5.js";
import P5 from "p5";

export default {
  setup() {
    const items = ref([
      {
        name: "디지털저작권",
      },
      {
        name: "디지털저작권",
      },
      {
        name: "디지털저작권",
      },
      {
        name: "디지털저작권",
      },
      {
        name: "디지털저작권",
      },
      {
        name: "디지털저작권",
      },
      {
        name: "디지털저작권",
      },
      {
        name: "디지털저작권",
      },
      {
        name: "디지털저작권",
      },
      {
        name: "디지털저작권",
      },
    ]);

    onMounted(() => {
      const script = function (p5) {
        let x = 0;
        let tag = (positionX, positionY) => {
          return p5.rect(positionX, positionY, 100, 50);
        };
        // NOTE: Set up is here
        p5.setup = () => {
          const { innerWidth, innerHeight } = window;

          let canvas = p5.createCanvas(innerWidth, innerHeight);
          // ...
        };
        p5.windowResized = () => {
          const { innerWidth, innerHeight } = window;
          p5.resizeCanvas(innerWidth, innerHeight);
        };
        // NOTE: Draw is here
        p5.draw = () => {
          p5.background("#0b318f");
        };
      };
      // NOTE: Use p5 as an instance mode
      new P5(script, "#wrapper");
    });
  },
};
</script>

<style scoped>
#wrapper {
}
</style>
