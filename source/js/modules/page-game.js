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
};
