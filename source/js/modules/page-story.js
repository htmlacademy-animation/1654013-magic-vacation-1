import {animateChars, getCharAnimation} from './char-animation';

export default () => {
  const itemTitle = document.querySelector(`.slider__item-title`);
  const titleDateBaseShift = 0;
  const itemTitle1AnimationShifts = [
    0.18,
    0.15,
    0.1,
    0.15,
    0.18,
    0.15,
    0.1,
  ];
  animateChars(itemTitle, itemTitle1AnimationShifts.map((shift) =>
    getCharAnimation({duration: 0.4, delay: shift + titleDateBaseShift})));
};
