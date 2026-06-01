export const initExamLoadMore = ({
  itemSelector = '.exam__bot-item',
  imgSelector = '.exam__img',
  buttonSelector = '.port__btn',
  buttonRowSelector = '.exam__btn-row',
  activeClass = '_active',
  step = 4,
} = {}) => {
  const init = () => {
    const items = document.querySelectorAll(itemSelector);
    if (!items.length) return;

    items.forEach((item) => {
      const button = item.querySelector(buttonSelector);
      if (!button) return;

      const buttonContainer = button.closest(buttonRowSelector) || button;
      const images = [...item.querySelectorAll(imgSelector)];
      if (!images.length) return;

      let visibleCount = step;

      const updateImages = () => {
        images.forEach((img, index) => {
          const isVisible = index < visibleCount;
          img.classList.toggle(activeClass, isVisible);
          img.style.display = isVisible ? '' : 'none';
        });

        buttonContainer.style.display = visibleCount >= images.length ? 'none' : '';
      };

      button.addEventListener('click', (event) => {
        event.preventDefault();
        visibleCount = Math.min(visibleCount + step, images.length);
        updateImages();
      });

      updateImages();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
};
