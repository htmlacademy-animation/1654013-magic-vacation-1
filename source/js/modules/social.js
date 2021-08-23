export default (eventEmitter) => {
  let socialBlock = document.querySelector(`.js-social-block`);
  socialBlock.addEventListener(`mouseover`, function () {
    socialBlock.classList.add(`social-block--active`);
  });
  socialBlock.addEventListener(`mouseleave`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });

  eventEmitter.on(`STORY_PAGE_CHANGE`, (pageIndex) => {
    const storyPageModifier1 = `social-block--story-page-1`;
    const storyPageModifier2 = `social-block--story-page-2`;
    const storyPageModifier3 = `social-block--story-page-3`;
    const storyPageModifier4 = `social-block--story-page-4`;

    const modifiers = [
      storyPageModifier1,
      storyPageModifier1,
      storyPageModifier2,
      storyPageModifier2,
      storyPageModifier3,
      storyPageModifier3,
      storyPageModifier4,
      storyPageModifier4
    ];

    socialBlock.classList.remove(...modifiers);
    if (pageIndex !== null) {
      socialBlock.classList.add(modifiers[pageIndex]);
    }
  });
};
