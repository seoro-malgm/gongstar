/* p5.js */
import P5 from "p5";

function createP5(parentId, fill = false, w, h) {
  const sketch = (p) => {
    const init = (width, height) => {
      if (fill) {
        const { innerWidth, innerHeight } = window;
        p.createCanvas(innerWidth, innerHeight);
      } else {
        p.createCanvas(width, height);
      }
      p.draw = () => p.background("white");
    };

    p.setup = () => {
      p.noLoop();
      init(w, h, fill);
    };
  };

  return new P5(sketch, parentId);
}

export default createP5;
