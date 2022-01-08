import {Scene2D} from './scene-2d';
import {Animation} from './animation';
import {easeInCubic, easeOutCubic, easeOutQuad} from './timing-functions';

export class GameLoseScene extends Scene2D {
  constructor(options) {
    super(options);

    this.locals = {
      detailsScaleFormula: (progress) => Math.min(0.3 + progress, 2),
      crocodileDuration: 500,
    };

    this.getImage(`crocodile`).afterDraw = () => {
      this.drawLockMask();
    };
  }

  createDetailsAppearanceAnimationOptions() {
    return {
      duration: 700,
      delay: 1200,
      easing: easeOutQuad,
    };
  }

  createDetailsDisappearanceAnimationOptions(image) {
    const appearanceOptions = this.createDetailsAppearanceAnimationOptions();

    return {
      duration: 500,
      delay: appearanceOptions.delay + appearanceOptions.duration,
      easing: easeInCubic,
      func: (progress) => {
        image.transforms.translateY += 80 * progress;
      }
    };
  }

  initAnimations() {
    this.initMain();
    this.initKeyAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initPlanetAnimations();
    this.initCrocodileAnimations();
    this.initDropAnimations();
  }

  drawLockMask() {
    const lockImage = this.getImage(`key`);
    const {ctx, canvas} = this.sceneCanvas;
    const lockImageWidth = this.imageDrawer.getImageWidth(lockImage);
    const lockImageHeight = this.imageDrawer.getImageHeight(lockImage);
    const lockImageX = this.imageDrawer.getImageX(lockImage, lockImageWidth) + this.imageDrawer.getTranslateXShift(lockImage);
    const lockImageY = this.imageDrawer.getImageY(lockImage, lockImageHeight) + this.imageDrawer.getTranslateYShift(lockImage);
    const LOCK_IMAGE_RADIUS = lockImageHeight * 0.268;
    const LOCK_IMAGE_LOWER_HEIGHT = lockImageHeight * 0.45;
    const LOCK_FOUNDATION_ANGLE_TAN = 4.78;
    const LOCK_IMAGE_BOTTOM_RIGHT_DIFF = LOCK_IMAGE_LOWER_HEIGHT / LOCK_FOUNDATION_ANGLE_TAN;
    const ARC_START_ANGLE = -Math.PI / 2;
    const ARC_END_ANGLE = Math.PI / 3.61;
    const maskX = lockImageX + lockImageWidth / 2;
    const maskY = lockImageY + LOCK_IMAGE_RADIUS;
    const xAfterArc = maskX + LOCK_IMAGE_RADIUS * Math.cos(ARC_END_ANGLE);

    ctx.save();

    ctx.fillStyle = `#5F458C`;
    ctx.beginPath();
    ctx.arc(maskX, maskY, LOCK_IMAGE_RADIUS, ARC_START_ANGLE, ARC_END_ANGLE);
    ctx.lineTo(xAfterArc + LOCK_IMAGE_BOTTOM_RIGHT_DIFF, maskY + LOCK_IMAGE_LOWER_HEIGHT + LOCK_IMAGE_RADIUS);
    ctx.lineTo(xAfterArc + LOCK_IMAGE_BOTTOM_RIGHT_DIFF + canvas.width / 2, maskY + LOCK_IMAGE_LOWER_HEIGHT + LOCK_IMAGE_RADIUS);
    ctx.lineTo(xAfterArc + LOCK_IMAGE_BOTTOM_RIGHT_DIFF + canvas.width / 2, maskY - LOCK_IMAGE_RADIUS);
    ctx.lineTo(maskX, maskY - LOCK_IMAGE_RADIUS);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
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

  initKeyAnimations() {
    const keyImage = this.getImage(`key`);
    const scaleFormula = (progress) => Math.min(0.7 + (progress / 4), 1);

    this.animations.push(new Animation({
      func: (progress) => {
        keyImage.transforms.scaleX = scaleFormula(progress);
        keyImage.transforms.scaleY = scaleFormula(progress);
        keyImage.opacity = progress;
      },
      duration: 200,
      delay: 1000,
      easing: easeOutCubic,
    }));
  }

  initFlamingoAnimations() {
    const {detailsScaleFormula} = this.locals;
    const flamingoImage = this.getImage(`flamingo`);

    this.animations.push(new Animation({
      ...this.createDetailsAppearanceAnimationOptions(),
      func: (progress) => {
        flamingoImage.transforms.rotate = 25 - progress * 30;
        flamingoImage.transforms.scaleX = detailsScaleFormula(progress);
        flamingoImage.transforms.scaleY = detailsScaleFormula(progress);
        flamingoImage.transforms.translateX = -20 * progress;
        flamingoImage.transforms.translateY = -5 * progress;
        flamingoImage.opacity = progress;
      },
    }));

    this.animations.push(new Animation(this.createDetailsDisappearanceAnimationOptions(flamingoImage)));
  }

  initWatermelonAnimations() {
    const {detailsScaleFormula} = this.locals;
    const watermelonImage = this.getImage(`watermelon`);

    this.animations.push(new Animation({
      ...this.createDetailsAppearanceAnimationOptions(),
      func: (progress) => {
        watermelonImage.transforms.rotate = 25 - progress * 30;
        watermelonImage.transforms.scaleX = detailsScaleFormula(progress);
        watermelonImage.transforms.scaleY = detailsScaleFormula(progress);
        watermelonImage.transforms.translateX = -35 * progress;
        watermelonImage.transforms.translateY = 18 * progress;
        watermelonImage.opacity = progress;
      },
    }));

    this.animations.push(new Animation(this.createDetailsDisappearanceAnimationOptions(watermelonImage)));
  }

  initLeafAnimations() {
    const {detailsScaleFormula} = this.locals;
    const leafImage = this.getImage(`leaf`);

    this.animations.push(new Animation({
      ...this.createDetailsAppearanceAnimationOptions(),
      func: (progress) => {
        leafImage.transforms.rotate = progress * 10;
        leafImage.transforms.scaleX = detailsScaleFormula(progress);
        leafImage.transforms.scaleY = detailsScaleFormula(progress);
        leafImage.transforms.translateX = 40 * progress;
        leafImage.transforms.translateY = -15 * progress;
        leafImage.opacity = progress;
      },
    }));

    this.animations.push(new Animation(this.createDetailsDisappearanceAnimationOptions(leafImage)));
  }

  initSnowflakeAnimations() {
    const {detailsScaleFormula} = this.locals;
    const snowflakeImage = this.getImage(`snowflake`);

    this.animations.push(new Animation({
      ...this.createDetailsAppearanceAnimationOptions(),
      func: (progress) => {
        snowflakeImage.transforms.rotate = progress * 10;
        snowflakeImage.transforms.scaleX = detailsScaleFormula(progress);
        snowflakeImage.transforms.scaleY = detailsScaleFormula(progress);
        snowflakeImage.transforms.translateX = 25 * progress;
        snowflakeImage.transforms.translateY = 5 * progress;
        snowflakeImage.opacity = progress;
      },
    }));

    this.animations.push(new Animation(this.createDetailsDisappearanceAnimationOptions(snowflakeImage)));
  }

  initPlanetAnimations() {
    const {detailsScaleFormula} = this.locals;
    const planetImage = this.getImage(`planet`);

    this.animations.push(new Animation({
      ...this.createDetailsAppearanceAnimationOptions(),
      func: (progress) => {
        planetImage.transforms.rotate = 45 - progress * 50;
        planetImage.transforms.scaleX = detailsScaleFormula(progress);
        planetImage.transforms.scaleY = detailsScaleFormula(progress);
        planetImage.transforms.translateX = 35 * progress;
        planetImage.transforms.translateY = 20 * progress;
        planetImage.opacity = progress;
      },
    }));

    this.animations.push(new Animation(this.createDetailsDisappearanceAnimationOptions(planetImage)));
  }

  initCrocodileAnimations() {
    const crocodileImage = this.getImage(`crocodile`);
    const disappearanceOptions = this.createDetailsDisappearanceAnimationOptions();
    const {crocodileDuration} = this.locals;

    this.animations.push(new Animation({
      func: (progress) => {
        crocodileImage.opacity = progress;
        crocodileImage.transforms.translateX = -31 * progress;
        crocodileImage.transforms.translateY = 15 * progress;
      },
      duration: crocodileDuration,
      delay: disappearanceOptions.delay + disappearanceOptions.duration,
      easing: easeOutQuad,
    }));
  }

  initDropAnimations() {
    const dropImage = this.getImage(`drop`);
    const disappearanceOptions = this.createDetailsDisappearanceAnimationOptions();
    const {crocodileDuration} = this.locals;
    const scaleFormula = (progress) => Math.min(progress * 2, 1);

    const createAnimation = (number) => {
      const duration = 1000;

      return new Animation({
        func: (progress) => {
          if (progress < 0.4) {
            dropImage.opacity = progress * 4;
            dropImage.transforms.scaleY = scaleFormula(progress);
          }

          if (progress >= 0.5) {
            dropImage.transforms.translateY = 7 * progress;
          }

          const downsizeMark = 0.6;
          if (progress >= downsizeMark) {
            dropImage.transforms.scaleY = 1 - (progress - downsizeMark) / (1 - downsizeMark);
            dropImage.transforms.scaleX = 1 - (progress - downsizeMark) / (1 - downsizeMark);
            dropImage.transforms.translateX += progress / 18;
          }

          const hideMark = 0.8;
          if (progress >= hideMark) {
            dropImage.opacity = 1 - (progress - hideMark) / (1 - hideMark);
          }

          if (progress === 1) {
            dropImage.transforms.translateX = 0;
            dropImage.transforms.translateY = 0;
            dropImage.transforms.scaleX = 1;
          }
        },
        duration,
        delay: disappearanceOptions.delay + disappearanceOptions.duration + crocodileDuration + (number - 1) * duration,
      });
    };

    this.animations.push(createAnimation(1));
    this.animations.push(createAnimation(2));
    this.animations.push(createAnimation(3));
  }
}
