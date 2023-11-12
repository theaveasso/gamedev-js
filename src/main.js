const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = (canvas.width = 800);
const canvasHeight = (canvas.height = 700);

const bgL1 = new Image();
bgL1.src = "../elements/environment-bg/layer-1.png";
const bgL2 = new Image();
bgL2.src = "../elements/environment-bg/layer-2.png";
const bgL3 = new Image();
bgL3.src = "../elements/environment-bg/layer-3.png";
const bgL4 = new Image();
bgL4.src = "../elements/environment-bg/layer-4.png";
const bgL5 = new Image();
bgL5.src = "../elements/environment-bg/layer-5.png";

window.addEventListener("load", () => {
  let gameFrame = 0;
  let gameSpeed = 5;
  document.getElementById("gameSpeed").addEventListener("input", (e) => {
    gameSpeed = e.target.value;
  });
  class Layer {
    constructor(image, speedModifier) {
      this.width = 2400;
      this.height = 700;
      this.y = 0;
      this.x = 0;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }

    update() {
      this.speed = gameSpeed * this.speedModifier;
      // this.x = (gameFrame * this.speed) % this.width;
      if (this.x <= -this.width) {
        this.x = 0;
      }
      this.x = Math.floor(this.x - this.speed);
    }

    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height,
      );
    }
  }

  const layer1 = new Layer(bgL1, 0.3);
  const layer2 = new Layer(bgL2, 0.2);
  const layer3 = new Layer(bgL3, 0.1);
  const layer4 = new Layer(bgL4, 0.5);
  const layer5 = new Layer(bgL5, 1);

  const layers = [layer1, layer2, layer3, layer4, layer5];
  function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    layers.forEach((layer) => {
      layer.update();
      layer.draw();
    });
    gameFrame--;
    requestAnimationFrame(animate);
  }

  animate();
});
