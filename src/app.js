import { show } from "./utils";
import Game, { TILE_CONTENTS } from "./game";
import Player from "./player";

import empty from "./assets/empty.png";
import forest from "./assets/forest.png";
import char from "./assets/character.png";

const CELL_SIZE = 50;
const CELL_MARGIN = 5;


function loadImage(path) {
  return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = path; });
}

function preload(images) {
  return Promise.all(images.map(loadImage));
}

let images = []
let game = new Game();
let player = new Player(game);
let canvas = document.getElementById("canvas");
let width = canvas.width;
let height = canvas.height;
const ctx = canvas.getContext("2d");

async function main() {
  console.log("Main");
  images = await preload([empty, forest, char]);
  console.log("Preloaded");

  game.setupBoard(20, 20, 20);
  draw();
  window.addEventListener("keydown", keydown, false);
}



function keydown(event) {
  let key = event.code;
  if (key === "Numpad4" || key === "ArrowLeft") {
    player.moveLeft();
    draw();
  }
  if (key === "Numpad6"|| key === "ArrowRight") {
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

function draw() {
  ctx.clearRect(0, 0, width, height);
  game.getBoard().forEach((row, y) => {
    row.forEach((tile, x) => {
      ctx.drawImage(
        tile === TILE_CONTENTS.EMPTY ? images[0] : images[1],
        x * CELL_SIZE,
        y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      
    });
  });

  ctx.drawImage(
    images[2],   
    player._position.x * CELL_SIZE,
    player._position.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
}

main();
