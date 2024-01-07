import Game, { TILE_CONTENTS } from "./game/game";
import Player from "./game/player";

import empty from "./assets/empty.png";
import forest from "./assets/forest.png";
import char from "./assets/character.png";
import KeyboardListener from "./KeyboardListener";

const CELL_SIZE = 50;

class GameUI {
  constructor(images) {
    this.images = images;
    this.game = new Game();
    this.player = new Player(this.game);
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.game.setupBoard(20, 20, 20);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.game.getBoard().forEach((row, y) => {
      row.forEach((tile, x) => {
        this.ctx.drawImage(
          tile === TILE_CONTENTS.EMPTY ? this.images[0] : this.images[1],
          x * CELL_SIZE,
          y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      });
    });

    this.ctx.drawImage(
      this.images[2],
      this.player._position.x * CELL_SIZE,
      this.player._position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
}

function loadImage(path) {
  return new Promise((r) => {
    let i = new Image();
    i.onload = () => r(i);
    i.src = path;
  });
}

function preload(images) {
  return Promise.all(images.map(loadImage));
}

export async function main() {
  console.log("Preload images");
  images = await preload([empty, forest, char]);

  console.log("Init GameUI");
  let ui = new GameUI(images);

  console.log("Add KeyboardListener");
  let listener = new KeyboardListener(ui);
  window.addEventListener("keydown", listener, false);

  console.log("Initial draw");
  ui.draw();
}
