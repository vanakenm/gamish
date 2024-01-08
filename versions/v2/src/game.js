export const TILE_CONTENTS = {
  EMPTY: 0,
  PLAYER: 1,
};

export default class Game {
  constructor() {}

  setupBoard(x, y, rocks) {
    this.board = new Array(x);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(y).fill(TILE_CONTENTS.EMPTY);
    }
  }

  get colNumber() {
    return this.board.length;
  }

  get rowNumber() {
    return this.board[0].length;
  }

  validPosition(x, y) {
    return x >= 0 && x < this.rowNumber && y >= 0 && y < this.colNumber;
  }

  get player() {
    return this._player;
  }

  getTileAt(x, y) {
    return this.board[y][x];
  }

  getBoard() {
    return this.board;
  }
}
