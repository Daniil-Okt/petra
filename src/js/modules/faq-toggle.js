export const initFaqToggle = ({
  rootSelector = '.faq__row',
  itemSelector = '.item-faq',
  bodySelector = '.item-faq__body',
  activeClass = '_active',
} = {}) => {
  const roots = document.querySelectorAll(rootSelector);
  if (!roots.length) return;

  const closeItem = (item) => {
    const body = item.querySelector(bodySelector);

    item.classList.remove(activeClass);
    if (body) body.style.maxHeight = '';
  };

  const openItem = (item) => {
    const body = item.querySelector(bodySelector);
    if (!body) return;

    item.classList.add(activeClass);
    body.style.maxHeight = `${body.scrollHeight}px`;
  };

  roots.forEach((root) => {
    const items = [...root.querySelectorAll(itemSelector)];
    if (!items.length) return;

    items.forEach((item) => {
      item.addEventListener('click', () => {
        items.forEach((currentItem) => {
          if (currentItem !== item) closeItem(currentItem);
        });

        openItem(item);
      });
    });
  });

  window.addEventListener('resize', () => {
    roots.forEach((root) => {
      root.querySelectorAll(`${itemSelector}.${activeClass}`).forEach((item) => {
        const body = item.querySelector(bodySelector);
        if (body) body.style.maxHeight = `${body.scrollHeight}px`;
      });
    });
  });
};
