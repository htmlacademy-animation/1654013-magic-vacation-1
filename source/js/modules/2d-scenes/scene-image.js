export class SceneImage {
  constructor({id, source, x, y, size, opacity, transforms}) {
    this.id = id;
    this.source = source;
    this.x = x;
    this.y = y;
    this.size = size;
    this.opacity = opacity;
    this.transforms = transforms;
  }

  setDOMElement(imageElement) {
    this.domElement = imageElement;
  }
}
