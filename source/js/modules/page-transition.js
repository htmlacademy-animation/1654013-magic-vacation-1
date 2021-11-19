export default (eventEmitter) => {
  const backgroundActiveClass = `section-unfolding-background--active`;

  const getInitialState = () => ({
    sectionUnfoldingBackground: document.querySelector(`.js-section-unfolding-background`),
    footerClone: null,
    isBackgroundAnimationFinished: false,
    isFooterAnimationFinished: false,
  });

  const animateFooter = (params, state) => {
    const animatedFooterCloneClass = `animated-footer--screen-transition-clone`;
    const footer = params.screenElement.querySelector(`.animated-footer`);

    if (!footer) {
      return;
    }

    const clone = footer.cloneNode(true);
    state.footerClone = clone;

    const onAnimationEnd = () => {
      clone.removeEventListener(`animationend`, onAnimationEnd);
      state.isFooterAnimationFinished = true;
      finishAnimation(params, state);
    };

    state.sectionUnfoldingBackground.appendChild(clone);
    clone.classList.add(animatedFooterCloneClass);
    clone.addEventListener(`animationend`, onAnimationEnd);
  };

  const hideFooter = (params, state) => {
    setTimeout(() => {
      state.sectionUnfoldingBackground.removeChild(state.footerClone);
    });
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

  const animateBackground = (params, state) => {
    const {sectionUnfoldingBackground} = state;

    const onTransitionEnd = () => {
      sectionUnfoldingBackground.removeEventListener(`transitionend`, onTransitionEnd);
      state.isBackgroundAnimationFinished = true;
      finishAnimation(params, state);
    };

    sectionUnfoldingBackground.classList.add(backgroundActiveClass);
    sectionUnfoldingBackground.addEventListener(`transitionend`, onTransitionEnd);
  };

  const hideBackground = (params, state) => {
    const {sectionUnfoldingBackground} = state;
    const fastHideClass = `section-unfolding-background--fast-hide`;

    sectionUnfoldingBackground.classList.add(fastHideClass);
    sectionUnfoldingBackground.classList.remove(backgroundActiveClass);
    setTimeout(() => sectionUnfoldingBackground.classList.remove(fastHideClass));
  };

  const finishAnimation = (params, state) => {
    if (state.isBackgroundAnimationFinished && state.isFooterAnimationFinished) {
      hideBackground(params, state);
      hideFooter(params, state);
      params.callback();
    }
  };

  const isBackgroundAnimationRequired = ({screenElement, prevScreenElement}) => {
    return screenElement.dataset.unfoldBackgroundFrom === prevScreenElement.id;
  };

  eventEmitter.on(`SCREEN_CHANGE_START`, (params) => {
    if (isBackgroundAnimationRequired(params)) {
      const state = getInitialState();
      animateBackground(params, state);
      animateFooter(params, state);
    } else {
      animateFooterTextAppearance(params);
      params.callback();
    }
  });
};
