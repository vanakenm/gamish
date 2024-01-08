import Game from "./game";
import Player from "./player";

let canvas = document.getElementById("canvas");
let ctx = this.canvas.getContext("2d");

const CELL_SIZE = 25;
const CELL_MARGIN = 5;

let game = new Game();
game.setupBoard(20, 20);

let player = new Player(this.game);

function draw() {
  ctx.fillStyle = "blue";
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

  ctx.fillStyle = "red";
  ctx.fillRect(
    player.position.x * CELL_SIZE,
    player.position.y * CELL_SIZE,
    CELL_SIZE - CELL_MARGIN,
    CELL_SIZE - CELL_MARGIN
  );
}

draw();

function handleEvent(event) {
  let key = event.code;
  if (key === "Numpad4" || key === "ArrowLeft") {
    player.moveLeft();
    draw();
  }
  if (key === "Numpad6" || key === "ArrowRight") {
    player.moveRight();
    draw();
  }
  if (key === "Numpad8" || key === "ArrowUp") {
    player.moveUp();
    draw();
  }
  if (key === "Numpad2" || key === "ArrowDown") {
    player.moveDown();
    draw();
  }
}

window.addEventListener("keydown", handleEvent);
