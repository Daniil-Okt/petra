export const initExamTabs = ({
  rootSelector = '.exam',
  linkSelector = '.exam__slide .bs-link',
  itemSelector = '.exam__bot-item',
  activeClass = '_active',
} = {}) => {
  const roots = document.querySelectorAll(rootSelector);
  if (!roots.length) return;

  roots.forEach((root) => {
    const links = [...root.querySelectorAll(linkSelector)];
    const items = [...root.querySelectorAll(itemSelector)];

    if (!links.length || !items.length) return;

    const setActive = (index) => {
      links.forEach((link, linkIndex) => {
        link.classList.toggle(activeClass, linkIndex === index);
      });

      items.forEach((item, itemIndex) => {
        item.style.display = itemIndex === index ? 'block' : 'none';
      });
    };

    links.forEach((link, index) => {
      link.addEventListener('click', () => setActive(index));
    });

    setActive(0);
  });
};
