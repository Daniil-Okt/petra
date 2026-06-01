export const initFormLists = ({
  listSelector = '.form-list',
  titleSelector = '.form-list__title',
  inputSelector = '.form-list__input',
  titleTextSelector = 'span',
  optionSelector = '.form-list__li',
} = {}) => {
  const lists = document.querySelectorAll(listSelector);
  if (!lists.length) return;

  const closeAllLists = () => {
    lists.forEach((list) => list.classList.remove('_active'));
  };

  document.addEventListener('click', (event) => {
    const title = event.target.closest(titleSelector);
    const option = event.target.closest(optionSelector);

    if (title) {
      const currentList = title.closest(listSelector);
      if (!currentList) return;

      const isOpen = currentList.classList.contains('_active');
      closeAllLists();
      currentList.classList.toggle('_active', !isOpen);
      return;
    }

    if (option) {
      const currentList = option.closest(listSelector);
      if (!currentList) return;

      const value = option.textContent.trim();
      const input = currentList.querySelector(inputSelector);
      const titleText = currentList.querySelector(`${titleSelector} ${titleTextSelector}`);

      currentList.querySelectorAll(optionSelector).forEach((item) => item.classList.remove('_select'));
      option.classList.add('_select');
      currentList.classList.add('_select-li');

      if (input) input.value = value;
      if (titleText) titleText.textContent = value;

      closeAllLists();
      return;
    }

    closeAllLists();
  });
};
