import { show } from "./utils";
import Game, { TILE_CONTENTS } from "./game";
import Player from "./player";

console.log(show());

let game = new Game();
game.setupBoard(20, 20);
let player = new Player(game);

function keydown(event) {
  let key = event.code;
  if (key === "Numpad4") {
    player.moveLeft();
    draw();
  }
  if (key === "Numpad6") {
    player.moveRight();
    draw();
  }
  if (key === "Numpad8") {
    player.moveUp();
    draw();
  }
  if (key === "Numpad2") {
    player.moveDown();
    draw();
  }
}

window.addEventListener("keydown", keydown, false);

let canvas = document.getElementById("canvas");
let width = canvas.width;
let height = canvas.height;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";

const CELL_SIZE = 25;
const CELL_MARGIN = 5;

function draw() {
  ctx.clearRect(0, 0, width, height);
  game.getBoard().forEach((row, y) => {
    row.forEach((tile, x) => {
      ctx.fillStyle = tile === TILE_CONTENTS.EMPTY ? "blue" : "red";
      ctx.fillRect(
        x * CELL_SIZE,
        y * CELL_SIZE,
        CELL_SIZE - CELL_MARGIN,
        CELL_SIZE - CELL_MARGIN
      );
    });
  });
}

draw();
