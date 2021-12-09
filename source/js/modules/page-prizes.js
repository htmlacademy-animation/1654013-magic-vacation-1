import {animateChars, getCharAnimation} from './char-animation';
import counter from './counter';

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
  const getSecondaryPrize = () => document.querySelector(`.prizes__item--cases`);
  const getAdditionalPrize = () => document.querySelector(`.prizes__item--codes`);

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

    const additionalPrize = getAdditionalPrize();

    const onAnimationEnd = () => {
      prizeList.classList.add(LOADED_CLASS);
      additionalPrize.removeEventListener(`animationend`, onAnimationEnd);
    };

    additionalPrize.addEventListener(`animationend`, onAnimationEnd);
  };

  let cancelSecondaryPrizeCounter;
  let cancelAdditionalPrizeCounter;

  const runAwardCounters = () => {
    const secondaryPrize = getSecondaryPrize();
    const additionalPrize = getAdditionalPrize();
    const secondaryAwardCounterContainer = document.querySelector(`.prizes__item--cases .prizes__counter`);
    const additionalAwardCounterContainer = document.querySelector(`.prizes__item--codes .prizes__counter`);

    const onSecondaryPrizeAppearanceAnimationEnd = () => {
      cancelSecondaryPrizeCounter = counter({
        container: secondaryAwardCounterContainer,
        from: 1,
        to: 7,
        fps: 12,
        durationCap: 1,
      });

      secondaryPrize.removeEventListener(`animationend`, onSecondaryPrizeAppearanceAnimationEnd);
    };

    const onAdditionalPrizeAppearanceAnimationEnd = () => {
      counter({
        container: additionalAwardCounterContainer,
        from: 11,
        to: 900,
        fps: 12,
        durationCap: 1,
      });

      additionalPrize.removeEventListener(`animationend`, onAdditionalPrizeAppearanceAnimationEnd);
    };

    secondaryPrize.addEventListener(`animationend`, onSecondaryPrizeAppearanceAnimationEnd);
    additionalPrize.addEventListener(`animationend`, onAdditionalPrizeAppearanceAnimationEnd);
  };

  const cancelRunningAnimations = () => {
    if (cancelSecondaryPrizeCounter) {
      cancelSecondaryPrizeCounter();
    }

    if (cancelAdditionalPrizeCounter) {
      cancelAdditionalPrizeCounter();
    }
  };

  const screenChangeHandler = (event) => {
    if (event.screenName === `prizes` && !isScreenLoaded()) {
      loadPrizeImages();
      disableAppearanceAnimation();
      runAwardCounters();
    } else {
      cancelRunningAnimations();
    }
  };

  eventEmitter.on(`SCREEN_CHANGED`, screenChangeHandler);
};
