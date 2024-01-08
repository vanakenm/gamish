# Gamish V2 - Engine and Canvas

## Session goals

I try to keep a list of objectives in my README.md (when I feel fancy I create a TODO.md), using basic list and the `[]` GitHub Markown trick (GitHub renders `[]` as a unchecked box and `[x]` as a checked one, making it the World Simplest Task Tracker (tm)).

For this session I want to:

- [] Setup a board
- [] Show the board on the page
- [] Create a player
- [] Show the player on the page
- [] Alow the player to move around

The "player" here will be a sort of single unit that the user can move on the board - for example with the arrow keys.

Design wise, the first parts do not require any UI - it will come when we want to show it and let someone moves the player.

## Let's go

### Game and Board

First thing I though was to create a Game object that would serve as the main/God object (I know it's bad for most design, but I think it make sense here - and anyway, I can change the structure as needed).

To try some specs, this would be a nice start:

- We can create a game
- With a game object we can setup a board of x \* y size
- All tiles on the board are by default empty.

I decide to play a bit of TDD here, writing my tests before or along my code.

```javascript
// game.test.js
import Game, { TILE_CONTENTS } from "./game";
import { beforeEach, expect, describe, it } from "vitest";

let game;

beforeEach(() => {
  game = new Game();
});

describe("setupBoard", () => {
  it("should create a board with the correct dimensions", () => {
    game.setupBoard(3, 3);

    expect(game.getBoard().length).toBe(3);
    expect(game.getBoard()[0].length).toBe(3);

    expect(game.getBoard()[2][1]).toBe(TILE_CONTENTS.EMPTY);
  });
});
```

To make that green is not that complicated:

```javascript
// game.js
export const TILE_CONTENTS = {
  EMPTY: 0,
};

export default class Game {
  constructor() {}

  setupBoard(x, y) {
    this.board = new Array(x);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(y).fill(TILE_CONTENTS.EMPTY);
    }
  }

  getTileAt(x, y) {
    return this.board[y][x];
  }

  getBoard() {
    return this.board;
  }
}
```

I like having constants early, even if this does not make much sense at this point (I could work by just using '0').

I added "getTileAt" because it's simpler to write, it leaves the "nitty gritty" details inside the Game object and it reverse the coordinates so I can use them in a more logical (for me) way.

- [x] Setup a board
- [] Show the board on the page
- [] Create a player
- [] Show the player on the page
- [] Alow the player to move around

### Showing Game on the page

Back to the `app.js` page, we can use our newly created Game object to know what we want to draw.

But first, to draw stuff we need a canvas - which itself needs a div to live in:

```javascript
let canvas = document.getElementById("canvas");
let ctx = this.canvas.getContext("2d");
```

So for this to work, we need a little update to the HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Gamish</title>
    <script type="module" src="app.js"></script>
  </head>
  <body>
    <canvas id="canvas" height="1000" width="1000" />
  </body>
</html>
```

With the canvas' context in hand we can read our board and write our tiles - for now let's go with squares with some margins so we can see the tiles.

```javascript
// app.js
let canvas = document.getElementById("canvas");
let ctx = this.canvas.getContext("2d");

const CELL_SIZE = 25;
const CELL_MARGIN = 5;

let game = new Game();
game.setupBoard(20, 20);

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
}

draw();
```

There are a couple of issue there, but it does the job, and we get a "nice" 20x20 "board" of red tiles.

There are a lot of things I'm not super at ease with (like global variables, Board not being its own class, etc), but I'll figure out that along the way.

Note that I don't have a "game loop" as there is not reason (for now) to update the board on the screen without the user doing something - so we can always redraw as needed.

Speaking of doing something...

- [x] Setup a board
- [x] Show the board on the page
- [] Create a player
- [] Show the player on the page
- [] Alow the player to move around

## Player

Before even talking of "units" I want a single, player controller kind of "unit". I'll call it "player" for now.

### The player object

While I design along the way, I'm pretty sure the player should not be "just" a different kind of tile on the board. Why?

- It needs to move
- The place it leave will return to it's "normal" state
- It will at some points have a lot of other properties

What does my Player need?

- The Game it's part of
- A position on the board (x,y)

To make things a bit easier, I'm extracting a Position object from it. I want Position to be created, then easily moved into neighbouring places:

```javascript
// position.test.js
import Position from "./position";
import { expect, describe, it } from "vitest";

describe("newPosition", () => {
  it("should create a valid position", () => {
    const position = new Position({ x: 1, y: 2 });
    expect(position.x).toBe(1);
    expect(position.y).toBe(2);
  });
});

describe("movePosition", () => {
  it("should move the position", () => {
    const position = new Position({ x: 1, y: 2 });
    position.moveTo({ x: 2, y: 3 });
    expect(position.x).toBe(2);
    expect(position.y).toBe(3);
  });
});
```

The code itself is quite straighforward:

```javascript
//position.js
export default class Position {
  constructor({ x, y }) {
    this._x = x;
    this._y = y;
  }

  moveTo({ x, y }) {
    this._x = x;
    this._y = y;
  }

  moveLeft() {
    this._x -= 1;
  }

  //move...

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
```

We want to allow our player to move - but not outside of the board. Let's add a simple method to check that on our Game object:

```javascript
  validPosition(x, y) {
    return x >= 0 && x < this.rowNumber && y >= 0 && y < this.colNumber;
  }
```

With this and our Position object, a player does not seems that complicated anymore:

```javascript
export default class Player {
  constructor(game) {
    this._game = game;
    this._position = new Position({ x: 0, y: 0 });
  }

  moveTo(x, y) {
    if (!this.game.validPosition(x, y)) return;
    this._position.moveTo({ x, y });
  }

  move(mx, my) {
    if (!this.game.validPosition(this._position.x + mx, this._position.y + my))
      return;
    this._position.moveTo({
      x: this._position.x + mx,
      y: this._position.y + my,
    });
  }

  moveLeft() {
    this.move(-1, 0);
  }

  //moveRight...
}
```

I've made two methods - a `move` that move the player a certain number of tiles in the x and y direction - and a `moveTo` that pretty much teleport the players. Both are simple delegate to `Position` after a check on the `Game` object to be sure the target position is valid.

The `moveLeft, moveRight, ...` methods are there to make things easier in the next step - when we are going to use the arrow controls to move our player around.

But first - we need to show it.

- [x] Setup a board
- [x] Show the board on the page
- [x] Create a player
- [] Show the player on the page
- [] Alow the player to move around

### Showing the player on the screen

So after creating a game, we create our new Player:

```javascript
let game = new Game();
game.setupBoard(20, 20);
let player = new Player(game);
```

Then in the draw method we draw our Player after the board (so that it get above it):

```javascript
function draw() {
  // draw board as before

  ctx.fillStyle = "red";
  ctx.fillRect(
    player.position.x * CELL_SIZE,
    player.position.y * CELL_SIZE,
    CELL_SIZE - CELL_MARGIN,
    CELL_SIZE - CELL_MARGIN
  );
}
```

If we run the game, we now have a satisfying red square in the top right corner - we just have to make it move.

- [x] Setup a board
- [x] Show the board on the page
- [x] Create a player
- [x] Show the player on the page
- [] Alow the player to move around

### Moving the player

Last item on the list for today - moving around. That's three things

- Intercepting keyboard events
- Calling the relevant method on Player to move it
- Calling draw again to update the board on the screen

Let's go:

```javascript
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
```

So we add a listener on the `keydown` event, we check the keycode and if it matches either the numpad or the arrows we call the relevant method on player, then we redraw the bard

- [x] Setup a board
- [x] Show the board on the page
- [x] Create a player
- [x] Show the player on the page
- [x] Alow the player to move around

## And... we're done for today.

That's not a game - far from it. But we have a board, a player we can move around and respect (some) rules (like: don't get outside of the board).

The code starts to be messy - we're going to improve on that with the next version too.

Next time we're going to put some rocks on that board - and replace the big squares with something nicer.

What I learned:

- Canvas API
- JavaScript classes accessors
