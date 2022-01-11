import {Scene2D} from './scene-2d';
import {Animation} from './animation';
import {easeInQuad, easeOutElastic} from './timing-functions';

export class GameVictoryScene extends Scene2D {
  constructor(options) {
    super(options);

    this.locals = {
      blob: {
        centerX: 45,
        centerY: 55,
        radius: 15,
        endX: 87,
        endY: 53,
        angle: 45,
        deltasLength: 10,
        opacity: 0
      }
    };

    this.getImage(`plane`).beforeDraw = () => {
      this.drawBlob();
    };
  }

  initAnimations() {
    this.initMain();
    this.initPlaneAnimations();
    this.initBlobAnimations();
    this.initTreesAnimations();
    this.initSeaCalfAnimation();
    this.initSnowflakesAnimations();
  }

  initMain() {
    this.animations.push(new Animation({
      func: () => {
        this.draw();
      },
      duration: `infinite`,
      fps: 60
    }));
  }

  initPlaneAnimations() {
    const planeImage = this.getImage(`plane`);

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        planeImage.transforms.translateX = -40 * progressReversed;
        planeImage.transforms.translateY = 5 * Math.sin(Math.PI * progressReversed) - 15 * progressReversed;
        planeImage.transforms.rotate = 45 * Math.sin(Math.PI * progressReversed) + 45 * progressReversed;
        planeImage.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: easeInQuad
    }));
  }

  initSeaCalfAnimation() {
    const seaCalfImage = this.getImage(`sea-calf`);
    const iceImage = this.getImage(`ice`);

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        seaCalfImage.transforms.translateY = 30 * progressReversed;
        seaCalfImage.transforms.rotate = -30 * Math.sin(progressReversed * 2);

        iceImage.transforms.translateY = 30 * progressReversed;
        iceImage.transforms.rotate = -30 * Math.sin(progressReversed * 2);
      },
      duration: 2000,
      delay: 1000,
      easing: easeOutElastic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        seaCalfImage.opacity = progress;
        iceImage.opacity = progress;
      },
      duration: 100,
      delay: 1000,
      easing: easeInQuad
    }));
  }

  initTreesAnimations() {
    const tree1 = this.getImage(`tree-1`);
    const tree2 = this.getImage(`tree-2`);

    this.animations.push(new Animation({
      func: (progress) => {
        tree1.transforms.translateY = 30 * (1 - progress);
        tree1.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: easeInQuad
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        tree2.transforms.translateY = 30 * (1 - progress);
        tree2.opacity = progress;
      },
      duration: 500,
      delay: 1500,
      easing: easeInQuad
    }));
  }

  initSnowflakesAnimations() {
    const snowflake1 = this.getImage(`snowflake-1`);
    const snowflake2 = this.getImage(`snowflake-2`);

    this.animations.push(new Animation({
      func: (progress, details) => {
        snowflake1.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      duration: `infinite`
    }));

    this.animations.push(new Animation({
      func: (progress, details) => {
        snowflake2.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      duration: `infinite`,
      delay: 800
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        snowflake1.opacity = progress;
      },
      duration: 500,
      delay: 1500,
      easing: easeInQuad
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        snowflake2.opacity = progress;
      },
      duration: 500,
      delay: 1900,
      easing: easeInQuad
    }));
  }

  initBlobAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.locals.blob.radius = 15 * progress;
        this.locals.blob.centerY = 55 - 15 * progressReversed;
        this.locals.blob.endX = 87 - 35 * progressReversed;
        this.locals.blob.endY = 53 - 12 * progressReversed;
        this.locals.blob.angle = 40 + 120 * progressReversed;
        this.locals.blob.deltasLength = 10 * progress;
        this.locals.blob.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: easeInQuad
    }));
  }

  drawBlob() {
    const {ctx} = this.sceneCanvas;
    const b = this.locals.blob;
    const angle = b.angle * Math.PI / 180;

    if (b.opacity === 0) {
      return;
    }

    const s = this.sceneCanvas.size / 100;

    ctx.save();
    ctx.globalAlpha = b.opacity;
    ctx.fillStyle = `#acc3ff`;

    ctx.beginPath();
    ctx.arc(
        b.centerX * s,
        b.centerY * s,
        b.radius * s,
        Math.PI / 2,
        Math.PI * 3 / 2
    );
    ctx.bezierCurveTo(
        (b.centerX + 10) * s,
        (b.centerY - b.radius) * s,
        (b.endX - b.deltasLength * Math.sin(angle)) * s,
        (b.endY + b.deltasLength * Math.cos(angle)) * s,
        b.endX * s,
        b.endY * s
    );
    ctx.bezierCurveTo(
        (b.endX - b.deltasLength * Math.sin(angle)) * s,
        (b.endY + b.deltasLength * Math.cos(angle)) * s,
        (b.centerX + 10) * s,
        (b.centerY + b.radius) * s,
        b.centerX * s,
        (b.centerY + b.radius) * s
    );

    ctx.fill();
    ctx.restore();
  }
}
