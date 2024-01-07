export const TILE_CONTENTS = {
  EMPTY: 0,
  PLAYER: 1,
  ROCK: 2,
};

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

  setPlayer(player) {
    this._player = player;
  }

  get colNumber() {
    return this.board.length;
  }

  get rowNumber() {
    return this.board[0].length;
  }

  validPosition(x, y) {
    return x >= 0 && x < this.rowNumber && y >= 0 && y < this.colNumber && this.board[y][x] !== TILE_CONTENTS.ROCK  ;
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
