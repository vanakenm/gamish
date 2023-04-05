import { show } from "./utils";
import Game from "./game";

console.log(show());

let game = new Game();
game.setupBoard(5, 5);

let canvas = document.getElementById("canvas");
let width = canvas.width;
let height = canvas.height;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";

let state = {
  x: width / 2,
  y: height / 2,
};

function update(progress) {
  state.x += progress / 5;

  if (state.x > width) {
    state.x -= width;
  }
}

const CELL_SIZE = 25;
const CELL_MARGIN = 5;

function draw() {
  ctx.clearRect(0, 0, width, height);
  game.getBoard().forEach((row, y) => {
    row.forEach((tile, x) => {
      ctx.fillRect(
        x * CELL_SIZE,
        y * CELL_SIZE,
        CELL_SIZE - CELL_MARGIN,
        CELL_SIZE - CELL_MARGIN
      );
    });
  });
}

function loop(timestamp) {
  var progress = timestamp - lastRender;

  //update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

let lastRender = 0;
window.requestAnimationFrame(loop);
