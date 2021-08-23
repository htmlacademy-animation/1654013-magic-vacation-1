import Swiper from "swiper";

export default (eventEmitter) => {
  const activeBackClass = `slider__item--active-back`;
  let screenChangeHandler;
  let storySlider;
  let sliderContainer = document.getElementById(`story`);
  sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;

  const slider = sliderContainer.querySelector(`.slider`);
  const storySliderModifier1 = `slider--story-page-1`;
  const storySliderModifier2 = `slider--story-page-2`;
  const storySliderModifier3 = `slider--story-page-3`;
  const storySliderModifier4 = `slider--story-page-4`;

  const storySliderModifiers = [
    storySliderModifier1,
    storySliderModifier2,
    storySliderModifier3,
    storySliderModifier4
  ];

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg"), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg"), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg"), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
            }

            Array.from(document.querySelectorAll(`.${activeBackClass}`))
              .forEach((element) => element.classList.remove(activeBackClass));

            if (storySlider.activeIndex < storySlider.previousIndex) {
              storySlider.slides[storySlider.activeIndex].classList.add(activeBackClass);
            }

            eventEmitter.emit(`STORY_PAGE_CHANGE`, storySlider.activeIndex);
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true,
        speed: 1
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            slider.classList.remove(...storySliderModifiers);
            if (storySlider.activeIndex === 0) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg")`;
              slider.classList.add(storySliderModifier1);
            } else if (storySlider.activeIndex === 2) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg")`;
              slider.classList.add(storySliderModifier2);
            } else if (storySlider.activeIndex === 4) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg")`;
              slider.classList.add(storySliderModifier3);
            } else if (storySlider.activeIndex === 6) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg")`;
              slider.classList.add(storySliderModifier4);
            }

            eventEmitter.emit(`STORY_PAGE_CHANGE`, storySlider.activeIndex);
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true,
        speed: 1
      });
    }

    eventEmitter.off(`SCREEN_CHANGED`, screenChangeHandler);
    screenChangeHandler = (event) => {
      const pageIndex = event.screenName === `story` ? storySlider.activeIndex : null;
      eventEmitter.emit(`STORY_PAGE_CHANGE`, pageIndex);
    };
    eventEmitter.on(`SCREEN_CHANGED`, screenChangeHandler);
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};
