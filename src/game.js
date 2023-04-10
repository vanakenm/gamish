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

  updateBoard() {
    for (let col = 0; col < this.board.length; col++) {
      for (let row = 0; row < this.board[col].length; row++) {
        this.board[col][row] =
          this._player.position.x === row && this._player.position.y === col
            ? TILE_CONTENTS.PLAYER
            : TILE_CONTENTS.EMPTY;
      }
    }
  }

  setPlayer(player) {
    this._player = player;
    this.board[this._player.position.y][this._player.position.x] =
      TILE_CONTENTS.PLAYER;
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
