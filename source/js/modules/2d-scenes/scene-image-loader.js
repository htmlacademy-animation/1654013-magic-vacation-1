export class SceneImageLoader {
  constructor(sceneImages) {
    this.sceneImages = sceneImages;
    this.isLoaded = false;
  }

  loadAll() {
    const loadOne = (sceneImage) => this.loadOne(sceneImage.source)
      .catch((error, image) => {
        return image;
      })
      .then((image) => {
        sceneImage.setDOMElement(image);
      });

    return Promise.all(this.sceneImages.map(loadOne))
      .then(() => {
        this.isLoaded = true;

        return this;
      });
  }

  loadOne(source) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve(image);
      };

      image.onerror = (error) => {
        reject(error, image);
      };

      image.src = source;
    });
  }
}
