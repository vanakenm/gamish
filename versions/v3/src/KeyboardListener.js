export default class KeyboardListener {
  constructor(ui) {
    this.ui = ui;
  }
  handleEvent(event) {
    let key = event.code;
    if (key === "Numpad4" || key === "ArrowLeft") {
      this.ui.player.moveLeft();
      this.ui.draw();
    }
    if (key === "Numpad6" || key === "ArrowRight") {
      this.ui.player.moveRight();
      this.ui.draw();
    }
    if (key === "Numpad8" || key === "ArrowUp") {
      this.ui.player.moveUp();
      this.ui.draw();
    }
    if (key === "Numpad2" || key === "ArrowDown") {
      this.ui.player.moveDown();
      this.ui.draw();
    }
  }
}
