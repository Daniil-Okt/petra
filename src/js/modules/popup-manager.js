import Popup from '../helpers/popup';

class PopupManager extends Popup {
  constructor(options = {}) {
    super();

    const defaultOptions = {
      isOpenClass: 'is-open',
      buttonCloseName: 'button-close',
      visibilityDelay: 3000, // 3 секунды задержки
    };

    this.options = { ...defaultOptions, ...options };
    this.timers = new Map(); // Хранилище таймеров для каждого попапа

    this.init();
    this.addEventListeners();
  }

  init() {
    this.popups.forEach((popup) => {
      popup.setAttribute('aria-hidden', 'true');
      popup.style.visibility = 'hidden'; // Изначально скрываем
    });
  }

  addEventListeners() {
    document.addEventListener('click', this.togglePopup.bind(this));
  }

  togglePopup({ target }) {
    const targetDataTypeElement = target.closest('[data-type]');

    if (targetDataTypeElement && !target.closest('[data-popup]')) {
      const popupName = targetDataTypeElement.dataset.type;
      const popup = this.getPopupBySelector(popupName);

      if (popup) {
        this.isOpenElements.forEach((modal) => this.closePopup(modal));
        this.openPopup(popup);
        this.toggleBodyLock(true);
      }
    }

    // Проверяем клик по кнопке закрытия
    const targetCloseElement = target.closest(`.${this.options.buttonCloseName}`);
    
    if (targetCloseElement) {
      const popupToClose = targetCloseElement.closest('[data-popup]');
      if (popupToClose) {
        this.closePopup(popupToClose);
        this.toggleBodyLock(false);
      }
    }

    // Проверяем клик вне контента попапа (заменяет data-close-overlay)
    const isOverlayClick = this.isOverlayClick(target);
    if (isOverlayClick) {
      const popupToClose = target.closest('[data-popup]');
      if (popupToClose) {
        this.closePopup(popupToClose);
        this.toggleBodyLock(false);
      }
    }
  }

  // Новый метод: проверяет, является ли клик кликом по оверлею (вне контента)
  isOverlayClick(target) {
    const popup = target.closest('[data-popup]');
    if (!popup) return false;

    const popupContent = popup.querySelector('.popup__content');
    if (!popupContent) return false;

    // Клик считается по оверлею, если он НЕ внутри .popup__content
    return !popupContent.contains(target);
  }

  getPopupBySelector(popupName) {
    return document.querySelector(`[data-popup="${popupName}"]`);
  }

  get popups() {
    return document.querySelectorAll('[data-popup]');
  }

  get isOpenElements() {
    return document.querySelectorAll(`.${this.options.isOpenClass}`);
  }

  openPopup(popup) {
    // Отменяем таймер скрытия если он есть
    this.clearPopupTimer(popup);
    
    // Сначала делаем видимым, потом добавляем класс открытия
    popup.style.visibility = 'visible';
    
    // Небольшая задержка для плавности (опционально)
    setTimeout(() => {
      popup.classList.add(this.options.isOpenClass);
      popup.setAttribute('aria-hidden', 'false');
    }, 100);
  }

  closePopup(popup) {
    // Убираем класс открытия
    popup.classList.remove(this.options.isOpenClass);
    popup.setAttribute('aria-hidden', 'true');
    
    // Отменяем предыдущий таймер если есть
    this.clearPopupTimer(popup);
    
    // Устанавливаем новый таймер для скрытия visibility
    const timerId = setTimeout(() => {
      popup.style.visibility = 'hidden';
      this.timers.delete(popup); // Удаляем из хранилища после выполнения
    }, this.options.visibilityDelay);
    
    // Сохраняем ID таймера для этого попапа
    this.timers.set(popup, timerId);
  }

  clearPopupTimer(popup) {
    // Отменяем таймер для конкретного попапа если он существует
    if (this.timers.has(popup)) {
      clearTimeout(this.timers.get(popup));
      this.timers.delete(popup);
    }
  }

  // Дополнительный метод для принудительного закрытия всех попапов
  closeAllPopups() {
    this.popups.forEach(popup => {
      this.clearPopupTimer(popup);
      popup.classList.remove(this.options.isOpenClass);
      popup.setAttribute('aria-hidden', 'true');
      popup.style.visibility = 'hidden';
    });
    this.toggleBodyLock(false);
  }

  // Очистка всех таймеров при уничтожении экземпляра
  destroy() {
    this.timers.forEach((timerId, popup) => {
      clearTimeout(timerId);
    });
    this.timers.clear();
    
    // Убираем обработчики событий
    document.removeEventListener('click', this.togglePopup.bind(this));
  }
}

export default PopupManager;