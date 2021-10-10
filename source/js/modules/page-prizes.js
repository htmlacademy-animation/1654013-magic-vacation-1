import {animateChars, getCharAnimation} from './char-animation';

export default () => {
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
};
