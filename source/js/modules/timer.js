export default (minutesElement, secondsElement, startMinutes, startSeconds, callback) => {
  const setTime = (timeUnit, timeUnitContainer) => {
    timeUnitContainer.innerText = timeUnit;
  };

  const getFormattedTimeUnit = (timeUnit) => {
    return `0${timeUnit}`.slice(-2);
  };

  const getNewTime = (timerStartDate, timerMinutes, timerSeconds) => {
    const endTime = timerStartDate.getTime() + timerMinutes * 60 * 1000 + timerSeconds * 1000;
    const remainingTime = endTime - Date.now();

    const remainingMinutes = Math.floor(remainingTime / 1000 / 60);
    const remainingSeconds = Math.floor(remainingTime / 1000 - remainingMinutes * 60);

    return {
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  };

  const getStartDate = () => {
    const now = new Date();
    const initialFlooringFix = 999;
    now.setTime(now.getTime() + initialFlooringFix);

    return now;
  };

  let startDate;
  let animationFrameId;

  const runTimer = () => {
    startDate = startDate || getStartDate();

    const newTime = getNewTime(startDate, startMinutes, startSeconds);

    setTime(getFormattedTimeUnit(newTime.minutes), minutesElement);
    setTime(getFormattedTimeUnit(newTime.seconds), secondsElement);

    if (newTime.seconds > 0 || newTime.minutes > 0) {
      animationFrameId = requestAnimationFrame(runTimer);
    } else {
      callback();
    }
  };

  const cancelTimer = () => {
    cancelAnimationFrame(animationFrameId);
  };

  animationFrameId = requestAnimationFrame(runTimer);

  return cancelTimer;
};
