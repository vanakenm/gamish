# Gamish V2 - Engine and Canvas

## Session goals

So we have a board, a player and it can move.

Let's try to make this a bit more interesting by:

- [] Adding rocks - a certain number of rocks are created at the start. Player cannot go on rocks tiles.
- [] Updating the UI by using images instead of colored boxes
- [] Refactor the mess we've created, mostly on the UI side

We put a lot of the foundation last time, so this should be shorter.

## Adding rocks

So what we need here is:

- A new TILE_CONTENTS type for ROCK
- Creating a certain number of rocks while setting up the board
- Show the rocks in a different color on the screen
- Prevent the player to enter rock tiles

### New TILE_CONTENTS

```javascript
// game.js
export const TILE_CONTENTS = {
  EMPTY: 0,
  ROCK: 1,
};
```

That's easy enough.

### Creting rocks

It means adding a new parameter to the `setupBoard` method with the number of rocks we want - then we just randomy select a tile.

```javascript
// game.js
export default class Game {
  constructor() {}

  setupBoard(x, y, rocks) {
    this.board = new Array(x);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(y).fill(TILE_CONTENTS.EMPTY);
    }

    for (let i = 0; i < rocks; i++) {
      let x = Math.floor(Math.random() * this.board.length);
      let y = Math.floor(Math.random() * this.board.length);
      this.board[y][x] = TILE_CONTENTS.ROCK;
    }
  }
  ...
```

Technically speaking, this could select the same tile several times, leading to slightly less rocks. It could be fixed (by testing & rerolling in case of duplicates), but as the only consequence is having slightly less rocks, I don't think it's worth the work for now.

### Showing rocks

That's as simple as adding a condition to our `draw` method so that we change color for rocks.

```javascript
// app.js
function draw() {
    game.getBoard().forEach((row, y) => {
        row.forEach((tile, x) => {
            ctx.fillStyle = tile === TILE_CONTENTS.EMPTY ? "blue" : "grey";
            ctx.fillRect(
                x * CELL_SIZE,
                y * CELL_SIZE,
                CELL_SIZE - CELL_MARGIN,
                CELL_SIZE - CELL_MARGIN
            );
    });
  });
```

### Make rocks impassable

We have already the tool we need - our `validPosition` method. It was checking for not moving out of the board, we just have to add one condition:

```javascript
  validPosition(x, y) {
      return x >= 0 && x < this.rowNumber && y >= 0 && y < this.colNumber && this.board[y][x] !== TILE_CONTENTS.ROCK  ;
  }
```

With this, the player should still be able to move - but not into rocks. Note that if it starts in one, he can leave it, but not enter it again.

- [x] Adding rocks - a certain number of rocks are created at the start. Player cannot go on rocks tiles.
- [] Updating the UI by using images instead of colored boxes
- [] Refactor the mess we've created, mostly on the UI side

## Use images instead of colored boxes

The first thing we need for that is... images. Nice part is that there are a lot of "tiles librairies" available on the web, a good amount for free or very low prices (2-10$) - I found most of them on [Itch](itch.io).

To make my work easy, I aim for top view, 32px tiles - three for now:

- One for "empty" tiles on which the character can walk
- One for "rocks"
- One for the character itself

I put them in a new src/assets folder.

![](/src/assets/empty.png)
![](/src/assets/forest.png)
![](/src/assets/character.png)

My rocks may actually be trees, but it works the same.

Whatever image you choose, make sure the character has a transparent background.

### Loading images

This ended up being slightly more complex than expected, as image loading is an async process - in other words, loading an image tend to work using a Promise, and I want to be sure to have all my images loaded before I used them.

To solve this for now, I created a new async main method with all my code in:

```javascript
//app.js

import empty from "./assets/empty.png";
import forest from "./assets/forest.png";
import char from "./assets/character.png";

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

async function main() {
  console.log("Preload images");
  let images = await preload([empty, forest, char]);
  ...

main()
```

So the loadImage load a single image from a path, as a promise.

The "preload" is taking my array of paths, call the loadImage method and mostly make sure all Promises are grouped together.

Finally, in the main, we take the three imported paths and get the images using "await".

### Showing images

With this done, replacing our boxes with images is actually simple:

```javascript
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
```

So we just pass the selected image to the drawImage method, keeping the sizes as before and voilà - we have much better results:

![](/src/assets/posts/Gamishv3.png)

The character should still be moving as before.

- [x] Adding rocks - a certain number of rocks are created at the start. Player cannot go on rocks tiles.
- [x] Updating the UI by using images instead of colored boxes
- [] Refactor the mess we've created, mostly on the UI side

## Code cleanup

While the "game" model code is realtively well organized, the UI part is pretty much a long serie of functions inside app.js.

Let's organize all this in a new `GameUI` object - that would be the parralel to the `Game` object - tasked with all interactions with the player and the screen.

First thing is to create this object and put every dependency in:

```javascript
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
    ...
  }
}
```

We get our images (from our preload), create a new `Game`, `Player` and the canvas's context we need.

The `draw()` function can then move into that object - while the image loading ones stay outside.

`main()` can then be simplified as:

```javascript
export async function main() {
  let images = await preload([empty, forest, char]);
  let ui = new GameUI(images);

  let listener = new KeyboardListener(ui);
  window.addEventListener("keydown", listener, false);

  ui.draw();
}
```

Note that the KeyListener needs the ui object to be able to call the various player and the draw function.

This does not impact anything screenwise - but it feels like a much better structure to work with.

- [x] Adding rocks - a certain number of rocks are created at the start. Player cannot go on rocks tiles.
- [x] Updating the UI by using images instead of colored boxes
- [x] Refactor the mess we've created, mostly on the UI side

## That's it

We're done for today - we have a much nicer board, rocks to avoid and a better structure to go forward with.

Next time we're going back to the model to add key notions such as turns and movement limits.
