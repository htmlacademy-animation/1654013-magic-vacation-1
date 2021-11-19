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

  const LOADED_CLASS = `prizes__list--loaded`;

  const getPrizeList = () => document.querySelector(`.prizes__list`);

  const loadPrizeImages = () => {
    const prizeImages = Array.from(document.querySelectorAll(`.prizes__icon img`));
    prizeImages.forEach((prizeImage) => {
      prizeImage.setAttribute(`src`, `${prizeImage.dataset.src}?forceReload=${Math.random()}`);
    });
  };

  const isScreenLoaded = () => {
    return getPrizeList().classList.contains(LOADED_CLASS);
  };

  const disableAppearanceAnimation = () => {
    const prizeList = getPrizeList();

    const lastPrize = document.querySelector(`.prizes__item:last-of-type`);

    const onAnimationEnd = () => {
      prizeList.classList.add(LOADED_CLASS);
      lastPrize.removeEventListener(`animationend`, onAnimationEnd);
    };

    lastPrize.addEventListener(`animationend`, onAnimationEnd);
  };

  const screenChangeHandler = (event) => {
    if (event.screenName === `prizes` && !isScreenLoaded()) {
      loadPrizeImages();
      disableAppearanceAnimation();
    }
  };

  eventEmitter.on(`SCREEN_CHANGED`, screenChangeHandler);
};
