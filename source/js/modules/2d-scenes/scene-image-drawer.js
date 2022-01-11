export class SceneImageDrawer {
  constructor(sceneCanvas, sceneImages) {
    this.sceneCanvas = sceneCanvas;
    this.sceneImages = sceneImages;
  }

  drawAll() {
    this.sceneImages.forEach((sceneImage) => {
      if (typeof sceneImage.beforeDraw === `function`) {
        sceneImage.beforeDraw();
      }

      this.drawOne(sceneImage);

      if (typeof sceneImage.afterDraw === `function`) {
        sceneImage.afterDraw();
      }
    });
  }

  drawOne(sceneImage) {
    const {opacity, transforms} = sceneImage;

    if (opacity === 0) {
      return;
    }

    if (transforms && (transforms.scaleX === 0 || transforms.scaleY === 0)) {
      return;
    }

    const isContextTransforming = opacity
      || (transforms && (transforms.rotate || transforms.scaleX || transforms.scaleY));

    if (isContextTransforming) {
      this.sceneCanvas.ctx.save();
    }

    let width = this.getImageWidth(sceneImage);
    let height = this.getImageHeight(sceneImage);
    let x = this.getImageX(sceneImage, width);
    let y = this.getImageY(sceneImage, height);

    if (transforms) {
      const transformed = this.applyTransformations(sceneImage, x, y, width, height);
      x = transformed.x;
      y = transformed.y;
      width = transformed.width;
      height = transformed.height;
    }

    if (opacity) {
      this.sceneCanvas.ctx.globalAlpha = opacity;
    }

    this.sceneCanvas.ctx.drawImage(sceneImage.domElement, x, y, width, height);

    if (isContextTransforming) {
      this.sceneCanvas.ctx.restore();
    }
  }

  applyTransformations(sceneImage, startX, startY, startWidth, startHeight) {
    const {ctx} = this.sceneCanvas;
    const {transforms} = sceneImage;
    let x = startX;
    let y = startY;
    let width = startWidth;
    let height = startHeight;

    if (transforms.translateX) {
      x += this.getTranslateXShift(sceneImage);
    }

    if (transforms.translateY) {
      y += this.getTranslateYShift(sceneImage);
    }

    if (transforms.rotate) {
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(transforms.rotate * Math.PI / 180);
    }

    if (transforms.scaleX) {
      width *= transforms.scaleX;

      if (transforms.scaleX < 0) {
        ctx.scale(-1, 1);

        x = -x;
      }
    }

    if (transforms.scaleY) {
      height *= transforms.scaleY;

      if (transforms.scaleY < 0) {
        ctx.scale(1, -1);

        y = -y;
      }
    }

    if (transforms.rotate) {
      ctx.translate(-x - width / 2, -y - height / 2);
    }

    return {x, y, width, height};
  }

  getImageWidth(sceneImage) {
    return this.sceneCanvas.size * sceneImage.size / 100;
  }

  getImageHeight(sceneImage) {
    return this.getImageWidth(sceneImage) * sceneImage.domElement.height / sceneImage.domElement.width;
  }

  getImageX(sceneImage, width) {
    return this.sceneCanvas.size * sceneImage.x / 100 - width / 2;
  }

  getImageY(sceneImage, height) {
    return this.sceneCanvas.size * sceneImage.y / 100 - height / 2;
  }

  getTranslateXShift(sceneImage) {
    return this.sceneCanvas.size * (sceneImage.transforms.translateX || 0) / 100;
  }

  getTranslateYShift(sceneImage) {
    return this.sceneCanvas.size * (sceneImage.transforms.translateY || 0) / 100;
  }
}
