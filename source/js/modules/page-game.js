import {animateChars, getCharAnimation} from './char-animation';

export default () => {
  const title = document.querySelector(`.game__title`);
  const animationShifts = [
    0.2,
    0.18,
    0.15,
    0.13,
  ];
  animateChars(title, animationShifts.map((shift) =>
    getCharAnimation({duration: 0.4, delay: shift})));

  const animateHeaders = () => {
    const prepareAnimation = (header) => {
      const chars = header.querySelectorAll(`path`);

      chars.forEach((char) => {
        const pathLength = char.getTotalLength();

        char.setAttribute(`stroke-dashoffset`, pathLength);
        char.setAttribute(`stroke-dasharray`, pathLength);
      });
    };

    const startAnimation = (header) => {
      header.querySelectorAll(`animate`).forEach((animate) => {
        animate.beginElement();
      });
    };

    const startAnimationChain = (header) => {
      header.querySelector(`animateTransform`).beginElement();
    };

    const victoryHeader = document.querySelector(`.victory-header`);
    const victoryHeaderAdditional = document.querySelector(`.victory-header-additional`);
    const lossHeader = document.querySelector(`.loss-header`);

    prepareAnimation(victoryHeader);
    prepareAnimation(victoryHeaderAdditional);
    prepareAnimation(lossHeader);

    document.querySelectorAll(`.game__button`).forEach((button) => {
      button.addEventListener(`click`, () => {
        if (button.dataset.target === `result`) {
          startAnimation(victoryHeader);
        } else if (button.dataset.target === `result2`) {
          startAnimation(victoryHeaderAdditional);
        } else if (button.dataset.target === `result3`) {
          startAnimationChain(lossHeader);
        }
      });
    });
  };

  animateHeaders();
};
