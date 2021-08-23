export default (eventEmitter) => {
  let header = document.querySelector(`.js-header`);
  let menuToggler = document.querySelector(`.js-menu-toggler`);
  let menuLinks = document.querySelectorAll(`.js-menu-link`);

  if (menuToggler) {
    menuToggler.addEventListener(`click`, function () {
      if (header.classList.contains(`page-header--menu-opened`)) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      } else {
        header.classList.add(`page-header--menu-opened`);
        document.body.classList.add(`menu-opened`);
      }
    });
  }

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener(`click`, function () {
      if (window.innerWidth < 1025) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      }
    });
  }

  eventEmitter.on(`STORY_PAGE_CHANGE`, (pageIndex) => {
    const storyPageModifier1 = `page-header--story-page-1`;
    const storyPageModifier2 = `page-header--story-page-2`;
    const storyPageModifier3 = `page-header--story-page-3`;
    const storyPageModifier4 = `page-header--story-page-4`;

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

    header.classList.remove(...modifiers);
    if (pageIndex !== null) {
      header.classList.add(modifiers[pageIndex]);
    }
  });
};
