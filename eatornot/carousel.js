const carouselRoot = document.querySelector("[data-carousel]");

if (carouselRoot) {
  const track = carouselRoot.querySelector(".testimonial-carousel");
  const slides = Array.from(carouselRoot.querySelectorAll(".testimonial-card"));
  const prevButton = carouselRoot.querySelector("[data-carousel-prev]");
  const nextButton = carouselRoot.querySelector("[data-carousel-next]");
  const indicators = Array.from(carouselRoot.querySelectorAll("[data-carousel-indicator]"));
  let currentIndex = 0;
  let touchStartX = 0;

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    indicators.forEach((indicator, indicatorIndex) => {
      const isActive = indicatorIndex === currentIndex;
      indicator.classList.toggle("is-active", isActive);
      indicator.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      showSlide(Number(indicator.dataset.carouselIndicator));
    });
  });

  track.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) < 40) {
      return;
    }

    showSlide(currentIndex + (deltaX < 0 ? 1 : -1));
  }, { passive: true });

  showSlide(0);
}
