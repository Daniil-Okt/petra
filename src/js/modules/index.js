//маска для телефона
export function maskTel() {
    window.addEventListener("DOMContentLoaded", function() {
        [].forEach.call( document.querySelectorAll('.tel'), function(input) {
          var keyCode;
          var prefixEndPosition = 3;

          function setCursorAfterPrefix(inputElement) {
            if (inputElement.value.length && inputElement.selectionStart < prefixEndPosition) {
              inputElement.setSelectionRange(prefixEndPosition, prefixEndPosition);
            }
          }

          function setCursorAfterPrefixAsync(event) {
            setTimeout(function() {
              setCursorAfterPrefix(event.target);
            }, 0);
          }

          function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (
              event.type === "keydown" &&
              ((event.key === "Backspace" && pos <= prefixEndPosition) ||
                (event.key === "Delete" && pos < prefixEndPosition))
            ) {
              event.preventDefault();
            }
            var matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
              this.value = new_value;
            }
            if (event.type == "blur" && this.value.length < 5) {
              this.value = "";
            }
            setCursorAfterPrefix(this);
          }
      
          input.addEventListener("input", mask, false);
          input.addEventListener("focus", mask, false);
          input.addEventListener("blur", mask, false);
          input.addEventListener("keydown", mask, false);
          input.addEventListener("click", setCursorAfterPrefixAsync, false);
          input.addEventListener("mouseup", setCursorAfterPrefixAsync, false);
          input.addEventListener("keyup", setCursorAfterPrefixAsync, false);
      
        });
      
      });
}
//добавление класса для родительского элемента
export function toggleActiveClassParent(elements) {
    elements.forEach(function(element) {
      element.addEventListener('click', function() {
        elements.forEach(function(el) {
          if (el !== element) {
            el.parentElement.classList.remove('_active');
          }
        });
        element.parentElement.classList.toggle('_active');
      });
    });
}
//добавление класса для  элементу
export  function toggleActiveClass(elements) {
  elements.forEach(function(element) {
    element.addEventListener('click', function() {
      elements.forEach(function(el) {
        if (el !== element) {
          el.classList.remove('_active')
        }
      });
      element.classList.toggle('_active');
    });
  });
}
//убрать меню при клики на ссылки меню
export function toggleLinkMenuNoOpen() {
    const menuLinkAll = document.querySelectorAll('.menu__link');
    if(menuLinkAll.length > 0) {
        menuLinkAll.forEach(link => {
        link.addEventListener('click', () => {
        document.documentElement.classList.remove('menu-open');
        document.documentElement.classList.remove('lock');
        })
    });
    }
}
// убираем меню если клик вне меню
export function toggleOutClickMenuRemoveOpen() {
  const menuOpen = document.querySelectorAll('.your-menu');
  document.addEventListener('click', function(event) {
    if (document.documentElement.classList.contains('menu-open')) {
      let clickOutsideMenu = true;
      
      menuOpen.forEach(function(menu) {
        if (menu.contains(event.target)) {
          clickOutsideMenu = false;
        }
      });

      if (clickOutsideMenu) {
        document.documentElement.querySelector('.icon-menu').click();
      }
    }
  });
}

//закрытие при клике вне элемента
export function removeClassOutClickElement(elements, removeClass) {
    
    document.addEventListener('click', function(event) {
      // Перебираем все элементы из массива
      elements.forEach(function(element) {
        if (!element.contains(event.target)) {
          // Удаляем класс 'removeClass'
          element.classList.remove(removeClass);
          element.parentElement.classList.remove(removeClass);
          // document.body.classList.remove('lock')
        }
      });
    });
}

// переключение поиска в header
export function toggleSearchOpen() {
  const search = document.querySelector('.search');
  const searchIcon = document.querySelector('.search__icon');
  const searchInput = search?.querySelector('input.search__input');

  if (!search || !searchIcon) return;

  document.addEventListener('click', (event) => {
    const isIconClick = !!event.target.closest('.search__icon');
    const isInsideSearch = !!event.target.closest('.search');

    if (isIconClick) {
      search.classList.toggle('_open-search');
      if (search.classList.contains('_open-search') && searchInput) {
        searchInput.focus();
      }
      return;
    }

    if (!isInsideSearch) {
      search.classList.remove('_open-search');
    }
  });
}

export function initDownLists({
  listSelector = '.down-list',
  bodySelector = '.down-list-body',
  btnSelector = '.down-list-btn',
} = {}) {
  const downLists = document.querySelectorAll(listSelector);
  if (!downLists.length) return;

  const updateOpenListParentState = (downList) => {
    const openListParent = downList?.parentElement?.closest(listSelector);
    if (!openListParent) return;

    const hasOpened = !!openListParent.querySelector(`${listSelector}._active`);
    openListParent.classList.toggle('_open-list', hasOpened);
  };

  const closeList = (downList) => {
    if (!downList) return;
    const body = downList.querySelector(bodySelector);
    if (body) {
      body.style.maxHeight = '';
    }
    downList.classList.remove('_active');
    updateOpenListParentState(downList);
  };

  downLists.forEach((downList) => {
    const body = downList.querySelector(bodySelector);
    const btn = downList.querySelector(btnSelector);
    if (!body || !btn) return;

    btn.addEventListener('click', (event) => {
      event.preventDefault();

      const parentContainer = downList.parentElement;
      if (!parentContainer) return;
      const siblingLists = parentContainer.querySelectorAll(`${listSelector}`);

      siblingLists.forEach((sibling) => {
        if (sibling === downList) return;
        closeList(sibling);
      });

      const isOpen = !!body.style.maxHeight;
      // body.style.maxWidth = isOpen ? '' : `${body.scrollWidth}px`;
      body.style.maxHeight = isOpen ? '' : `${body.scrollHeight}px`;
      downList.classList.toggle('_active', !isOpen);
      updateOpenListParentState(downList);
    });
  });
}

export function initPortRowsMobile({
  sectionSelector = '.port',
  rowSelector = '.port__row',
  buttonSelector = '.port__btn',
  buttonRowSelector = '.port__btn-row',
  mobileBreakpoint = 575,
} = {}) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const rows = [...section.querySelectorAll(rowSelector)];
  const button = section.querySelector(buttonSelector);
  const buttonRow = section.querySelector(buttonRowSelector);

  if (!rows.length || !button || !buttonRow) return;

  const getExtraRows = () => rows.slice(1);

  const hideButtonIfAllVisible = () => {
    const extraRows = getExtraRows();
    if (!extraRows.length) {
      buttonRow.style.display = 'none';
      return;
    }

    const hasHidden = extraRows.some((row) => window.getComputedStyle(row).display === 'none');
    if (!hasHidden) {
      buttonRow.style.display = 'none';
    }
  };

  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (window.innerWidth > mobileBreakpoint) return;

    getExtraRows().forEach((row) => {
      if (window.getComputedStyle(row).display === 'none') {
        row.style.display = 'flex';
      }
    });

    hideButtonIfAllVisible();
  });

  hideButtonIfAllVisible();
}





  
