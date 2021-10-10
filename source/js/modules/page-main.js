import {animateChars, getCharAnimation} from './char-animation';

export default () => {
  const titleWords = document.querySelectorAll(`.intro__title-word`);
  const titleWordsBaseShift = 0.1;
  const titleWord1AnimationShifts = [
    0.18,
    0.15,
    0.1,
    0.15,
    0.17,
    0.15,
    0.11,
    0.22,
    0.17,
    0.1,
    0.17,
    0.1,
  ];
  const titleWord2AnimationShifts = [
    0.4,
    0.38,
    0.33,
    0.3,
    0.4,
    0.32,
  ];

  animateChars(titleWords[0], titleWord1AnimationShifts.map((shift) =>
    getCharAnimation({delay: shift + titleWordsBaseShift})));
  animateChars(titleWords[1], titleWord2AnimationShifts.map((shift) =>
    getCharAnimation({delay: shift + titleWordsBaseShift})));

  const introDate = document.querySelector(`.intro__date`);
  const titleDateBaseShift = 0.9;
  const introDateAnimationsShifts = [
    0.18,
    0.15,
    0,
    0.1,
    0,
    0.2,
    0.15,
    0.17,
    0.17,
    0.22,
    0,
    0.17,
    0,
    0.15,
    0.2,
    0.17,
    0.15,
  ];
  animateChars(introDate, introDateAnimationsShifts.map((shift) =>
    getCharAnimation({delay: shift + titleDateBaseShift})));
};

