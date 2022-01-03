export const easeLinear = (x) => x;

export const easeInCubic = (x) => Math.pow(x, 3);

export const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

export const easeInQuad = (x) => Math.pow(x, 4);

export const easeOutQuad = (x) => 1 - Math.pow(1 - x, 4);

export const easeInExpo = (x) => {
  if (x === 0) {
    return 0;
  }

  return Math.pow(2, 10 * x - 10);
};

export const easeOutExpo = (x) => {
  if (x === 1) {
    return 1;
  }

  return 1 - Math.pow(2, -10 * x);
};

export const easeInElastic = (x) => {
  if (x === 0) {
    return 0;
  }

  if (x === 1) {
    return 1;
  }

  const c4 = (2 * Math.PI) / 3;

  return Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
};

export const easeOutElastic = (x) => {
  if (x === 0) {
    return 0;
  }

  if (x === 1) {
    return 1;
  }

  const c4 = (2 * Math.PI) / 3;

  return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};
