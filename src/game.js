export const TILE_CONTENTS = {
  EMPTY: 0,
  PLAYER: 1,
};

export default class Game {
  constructor() {}

  setupBoard(x, y) {
    this.board = new Array(x);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(y).fill(TILE_CONTENTS.EMPTY);
    }
  }

  setPlayer(x, y) {
    this.player = [x, y];
    this.board[x][y] = TILE_CONTENTS.PLAYER;
  }

  getPlayer() {
    return this.player;
  }

  getTileAt(x, y) {
    return this.board[x][y];
  }

  getBoard() {
    return this.board;
  }
}
