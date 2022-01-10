export class SceneCanvas {
  constructor(canvas, size) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext(`2d`);
    this.size = size;
  }

  prepare() {
    this.applySize();
  }

  setSize(size) {
    this.size = size;

    return this;
  }

  applySize() {
    this.canvas.width = this.size;
    this.canvas.height = this.size;
  }

  getWidth() {
    return this.size;
  }

  getHeight() {
    return this.size;
  }
}
