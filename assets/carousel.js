const ntcCarouselTimeouts = [];

function slideReadTime(slidesContainer, scrollPosition) {
  const slideWidth = slidesContainer.clientWidth;
  const curIndex = scrollPosition / slideWidth;
  const element = slidesContainer.querySelector(".ntc-slide:nth-child(" + (curIndex + 1) + ")");
  const text = element.innerHTML;
  const textLength = text.length;
  return textLength * 50;
}

function ntcCarouselNextClicked(e) {
  const slidesContainer = ntcGetParentByClassName(e.target, 'ntc-slider-wrapper').querySelector(".ntc-slides-container");
  ntcCarouselShowNextSlide(slidesContainer);
}

function ntcCarouselShowNextSlide(slidesContainer) {
  slidesContainer.id && ntcCarouselTimeouts[slidesContainer.id] && clearTimeout(ntcCarouselTimeouts[slidesContainer.id]);
  const totalWidth = slidesContainer.scrollWidth;
  const slideWidth = slidesContainer.clientWidth;
  const distanceToScroll = slideWidth - (slidesContainer.scrollLeft % slideWidth);
  const newScrollPosition =
    slidesContainer.scrollLeft + slideWidth + distanceToScroll >= totalWidth
      ? 0
      : slidesContainer.scrollLeft + distanceToScroll;
  slidesContainer.scrollLeft = newScrollPosition;
  if (slidesContainer.id) {
    ntcCarouselTimeouts[slidesContainer.id] = setTimeout(() => ntcCarouselShowNextSlide(slidesContainer), slideReadTime(slidesContainer, newScrollPosition));
  }

}

function ntcCarouselPrevClicked(e) {
  const slidesContainer = ntcGetParentByClassName(e.target, 'ntc-slider-wrapper').querySelector(".ntc-slides-container");
  ntcCarouselShowPrevSlide(slidesContainer);
}

function ntcGetParentByClassName(element, className) {
  if (element.classList.contains(className)) {
    return element;
  } else {
    return ntcGetParentByClassName(element.parentElement, className);
  }
}

function ntcCarouselShowPrevSlide(slidesContainer) {
  slidesContainer.id && ntcCarouselTimeouts[slidesContainer.id] && clearTimeout(ntcCarouselTimeouts[slidesContainer.id]);
  const slideWidth = slidesContainer.clientWidth;
  const shift = slidesContainer.scrollLeft % slideWidth
  const distanceToScroll = shift === 0 ? slideWidth : shift
  const newScrollPosition = slidesContainer.scrollLeft - distanceToScroll;
  slidesContainer.scrollLeft = newScrollPosition;
  if (slidesContainer.id) {
    ntcCarouselTimeouts[slidesContainer.id] = setTimeout(() => ntcCarouselShowNextSlide(slidesContainer), slideReadTime(slidesContainer, newScrollPosition));
  }
}

function ntcCarouseliInitSlides() {
  const slideWrappers = document.querySelectorAll(".ntc-slider-wrapper");
  slideWrappers.forEach((wrapper) => {
    const container = wrapper.querySelector(".ntc-slides-container");
    container.id = "slider-" + Math.floor(Math.random() * 100000);
    const nextButton = wrapper.querySelector(".ntc-slide-arrow-next");
    const prevButton = wrapper.querySelector(".ntc-slide-arrow-prev");
    nextButton.addEventListener("click", ntcCarouselNextClicked);
    prevButton.addEventListener("click", ntcCarouselPrevClicked);
    ntcCarouselTimeouts[container.id] = setTimeout(() => nextButton.click(), slideReadTime(container, 0));
  });
}

ntcCarouseliInitSlides();
