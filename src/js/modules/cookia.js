export const initCookia = ({
  blockSelector = '.cookia',
  buttonSelector = '.cookia__btn',
  storageKey = 'petra-cookie-accepted',
  activeClass = '_active',
} = {}) => {
  const block = document.querySelector(blockSelector);
  if (!block) return;

  const buttons = block.querySelectorAll(buttonSelector);

  const hideBlock = () => {
    block.classList.remove(activeClass);
    block.style.display = 'none';
  };

  const showBlock = () => {
    block.classList.add(activeClass);
    block.style.display = 'block';
  };

  if (localStorage.getItem(storageKey) === 'true') {
    hideBlock();
    return;
  }

  showBlock();

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const isAcceptButton = button.textContent.trim().toLowerCase() === 'принять';

      if (isAcceptButton) {
        localStorage.setItem(storageKey, 'true');
      }

      hideBlock();
    });
  });
};
