import {easeLinear} from './timing-functions';

export class Animation {
  constructor(options) {
    this.options = {
      easing: easeLinear,
      duration: 1000,
      delay: 0,
      fps: 60,
      ...options,
    };

    this.timeoutId = null;
    this.requestId = null;
  }

  start(options) {
    const {delay, fps, duration} = this.options;

    this.stop();

    this.timeoutId = setTimeout(() => {
      this.startTime = performance.now();
      this.interval = 1000 / fps;
      this.lastFrameTime = this.startTime;
      this.isFinished = false;

      if (duration === `infinite`) {
        this.runInfiniteAnimation(options);
      } else {
        this.runFiniteAnimation(options);
      }
    }, delay);
  }

  runInfiniteAnimation(options) {
    const animateFrame = (currentTime) => {
      this.requestId = requestAnimationFrame(animateFrame);

      const delta = currentTime - this.lastFrameTime;

      if (delta > this.interval) {
        this.options.func(1, {
          startTime: this.startTime,
          currentTime,
          isFinished: false,
          options,
        });
      }
    };

    this.requestId = requestAnimationFrame(animateFrame);
  }

  runFiniteAnimation(options) {
    const {duration, easing, func, callback} = this.options;

    const animateFrame = (currentTime) => {
      this.requestId = requestAnimationFrame(animateFrame);

      const delta = currentTime - this.lastFrameTime;

      if (delta <= this.interval) {
        return;
      }

      let timeFraction = (currentTime - this.startTime) / duration;

      if (timeFraction > 1) {
        timeFraction = 1;
        this.isFinished = true;
      }

      if (timeFraction <= 1) {
        const progress = easing(timeFraction);

        func(progress, {
          startTime: this.startTime,
          currentTime,
          isFinished: this.isFinished,
          options,
        });

        this.lastFrameTime = currentTime - delta % this.interval;
      }

      if (this.isFinished) {
        this.stop();
        if (typeof callback === `function`) {
          callback();
        }
      }
    };

    this.requestId = requestAnimationFrame(animateFrame);
  }

  restart() {
    this.start();
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }
}
