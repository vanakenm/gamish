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

  moveRight() {
    this._x += 1;
  }

  moveUp() {
    this._y -= 1;
  }

  moveDown() {
    this._y += 1;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
