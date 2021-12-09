export default (settings) => {
  const {
    container,
    from,
    to,
    fps,
    durationCap,
  } = settings;

  const timePerFrame = 1000 / fps;
  const totalFrames = durationCap * 1000 / timePerFrame;
  const step = Math.ceil((to - from) / totalFrames);

  let currentValue = from;
  let lastFrameTime = null;
  let animationFrameId;

  const setValue = (value, valueContainer) => {
    valueContainer.innerText = currentValue;
  };

  const runCounter = () => {
    const now = new Date();

    if (lastFrameTime && now.getTime() - lastFrameTime.getTime() < timePerFrame) {
      animationFrameId = requestAnimationFrame(runCounter);
      return;
    }

    lastFrameTime = now;

    currentValue += step;

    if (currentValue > to) {
      currentValue = to;
    }

    setValue(currentValue, container);

    if (currentValue < to) {
      animationFrameId = requestAnimationFrame(runCounter);
    }
  };

  const cancelCounter = () => {
    cancelAnimationFrame(animationFrameId);
  };

  animationFrameId = requestAnimationFrame(runCounter);

  return cancelCounter;
};
