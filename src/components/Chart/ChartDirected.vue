<!-- App.vue -->

<template>
  <div id="wrapper"></div>
</template>

<script>
import { onMounted, onBeforeMount, onBeforeUnmount, reactive } from "vue";
// import createP5 from "@/plugins/p5.js";
import P5 from "p5";

export default {
  setup() {
    onMounted(() => {
      const script = function (p5) {
        var speed = 2;
        var posX = 0;

        // NOTE: Set up is here
        p5.setup = () => {
          const { innerWidth, innerHeight } = window;

          p5.createCanvas(innerWidth, innerHeight);
          p5.ellipse(p5.width / 2, p5.height / 2, 500, 500);
        };
        p5.windowResized = () => {
          const { innerWidth, innerHeight } = window;
          p5.resizeCanvas(innerWidth, innerHeight);
        };
        // NOTE: Draw is here
        p5.draw = () => {
          p5.background("#ffffff");
          const degree = p5.frameCount * 3;
          const y = p5.sin(p5.radians(degree)) * 50;

          p5.push();
          p5.translate(0, p5.height / 2);
          p5.ellipse(posX, y, 50, 50);
          p5.pop();
          posX += speed;

          if (posX > p5.width || posX < 0) {
            speed *= -1;
          }
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
