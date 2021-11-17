import {animateChars, getCharAnimation} from './char-animation';

export default (eventEmitter) => {
  const title = document.querySelector(`.prizes__title`);
  const animationShifts = [
    0.18,
    0.15,
    0.1,
    0.15,
    0.18,
    0.15,
    0.1,
  ];
  animateChars(title, animationShifts.map((shift) =>
    getCharAnimation({duration: 0.4, delay: shift})));

  const loadPrizeImages = () => {
    const prizeImages = Array.from(document.querySelectorAll(`.prizes__icon img`));
    prizeImages.forEach((prizeImage) => {
      prizeImage.setAttribute(`src`, prizeImage.dataset.src);
    });
  };
  const screenChangeHandler = (event) => {
    if (event.screenName === `prizes`) {
      loadPrizeImages();
    }
  };
  eventEmitter.on(`SCREEN_CHANGED`, screenChangeHandler);
};
