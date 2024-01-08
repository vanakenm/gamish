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

Technically speaking, this could select the same tile different time, leading to slightly less rocks. It could be fixed (by testing & rerolling in case of duplicates), but as the only consequence is having slightly less rocks, I don't think it's worth the work for now.

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
