let playerState = "run";
document.getElementById("playerState").onchange = function(e) {
  playerState = e.target.value;
};
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = (canvas.width = 600);
const canvasHeight = (canvas.height = 600);

const img = new Image();
img.src = "../elements/Shadow Dog.png";

const sw = 575;
const sh = 523;

let gameFrame = 0;
let staggerFrame = 7;

const animationStates = [
  { name: "idle", frame: 7 },
  { name: "jump", frame: 7 },
  { name: "fall", frame: 7 },
  { name: "run", frame: 9 },
  { name: "dizzy", frame: 11 },
  { name: "sit", frame: 5 },
  { name: "roll", frame: 7 },
  { name: "bite", frame: 7 },
  { name: "ko", frame: 12 },
  { name: "getHit", frame: 4 },
];

const spriteAnimations = Object.assign(
  {},
  ...animationStates.map((state, i) => {
    const frames = {
      loc: [],
    };
    for (let j = 0; j < state.frame; j++) {
      let positionX = j * sw;
      let positionY = i * sh;
      frames.loc.push({ x: positionX, y: positionY });
    }
    return { [state.name]: frames };
  }),
);

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  let pos =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length;
  const locX = spriteAnimations[playerState].loc[pos].x;
  const locY = spriteAnimations[playerState].loc[pos].y;
  ctx.drawImage(img, locX, locY, sw, sh, 0, 0, sw, sh);
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
