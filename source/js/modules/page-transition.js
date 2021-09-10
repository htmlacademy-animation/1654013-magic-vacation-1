export default (eventEmitter) => {
  const sectionUnfoldingBackground = document.querySelector(`.js-section-unfolding-background`);

  const animateFooterAppearance = ({screenElement}) => {
    const animatedFooterCloneClass = `animated-footer--screen-transition-clone`;
    const footer = screenElement.querySelector(`.animated-footer`);

    if (!footer) {
      return;
    }

    const clone = footer.cloneNode(true);
    clone.addEventListener(`animationend`, () => {
      setTimeout(() => sectionUnfoldingBackground.removeChild(clone), 100);
    });
    sectionUnfoldingBackground.appendChild(clone);
    clone.classList.add(animatedFooterCloneClass);
  };

  const animateFooterTextAppearance = ({screenElement}) => {
    const footer = screenElement.querySelector(`.animated-footer`);

    if (!footer) {
      return;
    }

    const animatedTextFooterClass = `animated-footer--screen-transition`;
    setTimeout(() => {
      footer.addEventListener(`animationend`, () => {
        footer.classList.remove(animatedTextFooterClass);
      });
      footer.classList.add(animatedTextFooterClass);
    });
  };

  const animateBackground = (params) => {
    const fastHideClass = `section-unfolding-background--fast-hide`;
    const activeClass = `section-unfolding-background--active`;

    const onTransitionEnd = () => {
      sectionUnfoldingBackground.removeEventListener(`transitionend`, onTransitionEnd);
      sectionUnfoldingBackground.classList.add(fastHideClass);
      sectionUnfoldingBackground.classList.remove(activeClass);
      setTimeout(() => sectionUnfoldingBackground.classList.remove(fastHideClass));
      params.callback();
    };

    sectionUnfoldingBackground.classList.add(activeClass);
    animateFooterAppearance(params);
    sectionUnfoldingBackground.addEventListener(`transitionend`, onTransitionEnd);
  };

  const isBackgroundAnimationRequired = ({screenElement, prevScreenElement}) => {
    return screenElement.dataset.unfoldBackgroundFrom === prevScreenElement.id;
  };

  eventEmitter.on(`SCREEN_CHANGE_START`, (params) => {
    if (isBackgroundAnimationRequired(params)) {
      animateBackground(params);
    } else {
      animateFooterTextAppearance(params);
      params.callback();
    }
  });
};
