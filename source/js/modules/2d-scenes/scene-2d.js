import {SceneCanvas} from './scene-canvas';
import {SceneImageLoader} from './scene-image-loader';
import {SceneImage} from './scene-image';
import {SceneImageDrawer} from './scene-image-drawer';

export class Scene2D {
  constructor(options) {
    this.sceneCanvas = new SceneCanvas(options.canvas, this.getCanvasSize());
    this.sceneImages = options.images.map((imageOptions) => new SceneImage(imageOptions));
    this.imageLoader = new SceneImageLoader(this.sceneImages);
    this.imageDrawer = new SceneImageDrawer(this.sceneCanvas, this.sceneImages);
    this.animations = [];
  }

  prepare() {
    this.sceneCanvas.prepare();
    this.setEventListeners();
    this.initAnimations();

    return this.imageLoader.loadAll().then(() => this);
  }

  initAnimations() {}


  play() {
    this.draw();
    this.animate();
  }

  stop() {
    this.animations.forEach((animation) => {
      animation.stop();
    });
  }

  animate() {
    this.animations.forEach((animation) => {
      animation.start();
    });
  }

  draw() {
    this.clear();
    this.imageDrawer.drawAll();
  }

  clear() {
    this.sceneCanvas.ctx.clearRect(0, 0, this.sceneCanvas.getWidth(), this.sceneCanvas.getHeight());
  }

  getCanvasSize() {
    return Math.min(window.innerWidth, window.innerHeight);
  }

  updateSize() {
    this.sceneCanvas.setSize(this.getCanvasSize()).applySize();
  }

  setEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  getImage(imageId) {
    return this.sceneImages.find((image) => image.id === imageId);
  }
}
