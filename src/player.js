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

  move(mx, my) {
    if (!this.game.validPosition(this._position.x + mx, this._position.y + my))
      return;
    this._position.moveTo({
      x: this._position.x + mx,
      y: this._position.y + my,
    });
    this.game.updateBoard();
  }

  moveLeft() {
    this.move(-1, 0);
  }

  moveRight() {
    this.move(1, 0);
  }

  moveUp() {
    this.move(0, -1);
  }

  moveDown() {
    this.move(0, 1);
  }

  get position() {
    return this._position;
  }

  get game() {
    return this._game;
  }
}
