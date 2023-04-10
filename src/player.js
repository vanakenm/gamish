import Position from "./position";

export default class Player {
  constructor(game) {
    this._game = game;
    this._position = new Position({ x: 0, y: 0 });
    this._game.setPlayer(this);
  }

  moveTo(x, y) {
    if (!this.game.validPosition(x, y)) return;
    this._position.moveTo({ x, y });
    this.game.updateBoard();
  }

  moveLeft() {
    if (!this.game.validPosition(this._position.x - 1, this._position.y))
      return;
    this._position.moveLeft();
    this.game.updateBoard();
  }

  moveRight() {
    if (!this.game.validPosition(this._position.x + 1, this._position.y))
      return;
    this._position.moveRight();
    this.game.updateBoard();
  }

  moveUp() {
    if (!this.game.validPosition(this._position.x, this._position.y - 1))
      return;
    this._position.moveUp();
    this.game.updateBoard();
  }

  moveDown() {
    if (!this.game.validPosition(this._position.x, this._position.y + 1))
      return;
    this._position.moveDown();
    this.game.updateBoard();
  }

  get position() {
    return this._position;
  }

  get game() {
    return this._game;
  }
}
