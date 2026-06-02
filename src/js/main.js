/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'
import AOS from 'aos'
import Swiper, { Navigation, EffectCoverflow, EffectFade, Autoplay, Thumbs } from 'swiper';

import BaseHelpers from './helpers/base-helpers';
import PopupManager from './modules/popup-manager';
import BurgerMenu from './modules/burger-menu';
import { smoothScroll } from './libs/smoothScroll';
import { initScrollProgress } from './libs/scrollProgress';
import { initImgLazy } from './modules/imgLazy';
import { initReviewsPopupContent } from './modules/reviews-popup-content';
import { initFormLists } from './modules/form-list';
import { initExamTabs } from './modules/exam-tabs';
import { initExamLoadMore } from './modules/exam-load-more';
import { initFaqToggle } from './modules/faq-toggle';
import { toggleSearchOpen, initDownLists, initPortRowsMobile } from './modules/index';
// import { initAutoplayVideo } from './modules/autoplayVideo';

// import { running } from './libs/running';

// import Tabs from './modules/tabs';
// import Accordion from './modules/accordion';

// import { cursorPoint } from './libs/cursorPoint';

BaseHelpers.checkWebpSupport();
/* Добавление класса touch для HTML если браузер мобильный */
// BaseHelpers.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
BaseHelpers.addLoadedClass();
/* Фиксированный header */
BaseHelpers.headerFixed();





/** ===================================================================================
 * Cкролл Lenis
 * */
// smoothScroll()



/** ===================================================================================
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager();

/** ===================================================================================
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu().init();

/** ===================================================================================
 *  Модуль отложенная загрузка изображений
 * data-delay="1000" - задержка  замены пути
 * data-wait - замена пути только после загрузки изображения
 * */
initImgLazy()
toggleSearchOpen()
initDownLists()
initPortRowsMobile()
initFormLists()
initFaqToggle()

initReviewsPopupContent();


/** ===================================================================================
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
import SimpleParallax from 'simple-parallax-js/vanilla';

window.addEventListener('load', () => {
	setTimeout(() => {
		AOS.init({
			once: true,
			duration: 1200,        // Длительность анимации (ms)
			offset: 50,          // Смещение от низа экрана до срабатывания (px)
			delay: 0,             // Задержка перед анимацией
			// easing: 'ease-in-out'
		});



	const numFon = document.querySelectorAll('.num__fon .img');
		numFon.forEach(img => {
			if (img) {
				new SimpleParallax(img, {
					orientation: 'up',
					scale: 1.05,
					delay: .4,
				});
			}
		});

		const calmImg = document.querySelectorAll('.calm__img._3 img');
		calmImg.forEach(img => {
			if (img) {
				new SimpleParallax(img, {
					orientation: 'down',
					scale: 1.05,
					overflow: true,
					delay: .4,
				});
			}
		});

		const reviewFon = document.querySelectorAll('.review__fon .img');
		reviewFon.forEach(img => {
			if (img) {
				new SimpleParallax(img, {
					orientation: 'up',
					scale: 1.05,
					delay: .4,
				});
			}
		});
	}, 500);
	
})







/** ===================================================================================
 * Параллакс мышей
 * */
// new MousePRLX();


/** ===================================================================================
 * Анимация точки курсора
 * */
// cursorPoint()


/** ===================================================================================
 * Бегущая строка
 * */
// running()


/** ===================================================================================
 * Кастомный скролл бар
 * Добавить класс scrollbar-custom к элементу
 * */
// initScrollProgress()

/** ===================================================================================
 * Автоплей и отложенная загрузка видео
 * */
initAutoplayVideo()




/* ТАБЫ ================================================================================================
 	* На wrapper блока табов добавить атрибут data-tabs="название"
	* Для обертки title табов добавить класс "tabs__nav"
	* Для title таба добавить класс "tabs__trigger"
	* Для обертки body табов добавить класс "tabs__content"
	* Для body таба добавить класс "tabs__panel"
*/
// new Tabs('название', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });


/* АККАРДЕОН ===========================================================================================
 	* Класс wrapper блока аккардеона добавить в инициализацию аккардиона
	* Каждый элемент аккардеона обернуть в блок с классом "accordion__item"
	* Для title аккардеона добавить класс "accordion__header"
	* Для content аккардеона добавить класс "accordion__content"
*/
// new Accordion('.accordion', {
// 	shouldOpenAll: false, // true
// 	defaultOpen: [], // [0,1]
// 	collapsedClass: 'open',
// });


/* Динамический адаптив =================================================================================
* Что бы перебросить блок в другой блок, повешай на него атрибут:
* data-da="class блока куда нужно перебросить, брекпоинт(ширина экрана), позиция в блоке(цифра либо first,last)"
*/
/*Расскоментировать для использования*/
import { useDynamicAdapt } from './modules/dynamicAdapt.js'
useDynamicAdapt()


/* Маска для инпута tel =================================================================================
	* Добавить класс tel к нужному инпуту 
*/
import { maskTel } from './modules/index.js'
maskTel()

/* Cкрыть меню при клике на его ссылки ==================================================================
*/
// import { toggleLinkMenuNoOpen } from './modules/index.js'
//toggleLinkMenuNoOpen()

/* Cкрыть меню при клике вне его ========================================================================
	* Добавить к меню класс 'your-menu'
*/
import { toggleOutClickMenuRemoveOpen } from './modules/index.js'
// toggleOutClickMenuRemoveOpen()

/* Удалить класс _active при клике вне элемента =========================================================
	* Передать в функцию нужный элемент и класс который нужно удалить
*/
// import { removeClassOutClickElement } from './modules/index.js'
// const elements = document.querySelectorAll('.class'); 
// removeClassOutClickElement(elements, '.removeClass')

/* Инициализация  swiper =================================================================================
*/

const updateCertifSlidesOpacity = (swiperInstance) => {
	if (!swiperInstance?.slides?.length) return;

	swiperInstance.slides.forEach((slide) => {
		const progress = slide.progress;
		let opacity = 0;

		// Visible zone for active/next pair with smooth interpolation during drag.
		if (progress >= -1 && progress <= 0) {
			opacity = 1;
		} else if (progress > 0 && progress < 1) {
			opacity = 1 - progress;
		} else if (progress > -2 && progress < -1) {
			opacity = progress + 2;
		}

		slide.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(3);
	});
};

const initSliderNumberPagination = (swiperInstance, numberElementSelector) => {
	if (!swiperInstance) return;

	const numberElement = typeof numberElementSelector === 'string'
		? document.querySelector(numberElementSelector)
		: numberElementSelector;

	if (!numberElement) return;

	const updateSlideNumber = () => {
		numberElement.textContent = String(swiperInstance.realIndex + 1);
	};

	swiperInstance.on('init', updateSlideNumber);
	swiperInstance.on('slideChange', updateSlideNumber);
	swiperInstance.on('realIndexChange', updateSlideNumber);
	updateSlideNumber();
};


window.addEventListener('load', () => {
	setTimeout(() => {
		const swiperAbout = new Swiper('.about__slider', {
			speed: 1400,
			spaceBetween: 0,
			slidesPerView: 1,
			modules: [Autoplay, Navigation, EffectFade],
			loop: true,
			initialSlide: 0,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			autoplay: {
				delay: 4000,
				stopOnLastSlide: false,
				disableOnIteration: false,
			},
			navigation: {
				prevEl: ".about__btn-prev",
				nextEl: ".about__btn-next"
			},
		});

		initSliderNumberPagination(swiperAbout, '.about .pagin__number');
	}, 5000);
	
})


const swiper = new Swiper('.certif__slider', {
  	speed: 800,
	spaceBetween: 0,
	slidesPerView: 'auto',
	watchSlidesProgress: true,
	modules: [Navigation, EffectCoverflow],
	loop: true,
	initialSlide: 0,
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 0,
		stretch: -2,
		depth: 35,
		modifier: 10,
		slideShadows : false,
	},
	//   autoplay: {
	//     delay: 2500,
	//     stopOnLastSlide: false,
	//     disableOnIteration: false,
	//   },
	navigation: {
		prevEl: ".certif__btn-prev",
		nextEl: ".certif__btn-next"
	},
	on: {
		init(swiperInstance) {
			updateCertifSlidesOpacity(swiperInstance);
		},
		setTranslate(swiperInstance) {
			updateCertifSlidesOpacity(swiperInstance);
		},
		slideChangeTransitionStart(swiperInstance) {
			updateCertifSlidesOpacity(swiperInstance);
		},
	},
	breakpoints: {
	576: {
		coverflowEffect: {
			stretch: -3,
		},
    },
	1025: {
		coverflowEffect: {
			stretch: 8.5,
		},
  	},
    1231: {
		coverflowEffect: {
			stretch: 5,
		},
  	},
    1501: {
		coverflowEffect: {
			stretch: -3,
		},
	}
  },
});

initSliderNumberPagination(swiper, '.certif .pagin__number');


const swiperRev = new Swiper('.review__slider', {
  speed: 800,
  spaceBetween: 24,
  slidesPerView: 1,
  modules: [ Navigation],
  loop: true,
  initialSlide: 0,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },
  navigation: {
    prevEl: ".review__btn-prev",
    nextEl: ".review__btn-next"
  },
  breakpoints: {
    1151: {
      slidesPerView: 2,
      spaceBetween: 24,
  	},
  },
});

initSliderNumberPagination(swiperRev, '.review .pagin__number');

const swiperServ = new Swiper('.serv__slider', {
  speed: 800,
  spaceBetween: 24,
  slidesPerView: 1,
  modules: [ Navigation],
  loop: true,
  initialSlide: 0,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },
  navigation: {
    prevEl: ".serv__btn-prev",
    nextEl: ".serv__btn-next"
  },
  breakpoints: {
	576: {
      slidesPerView: 2,
      spaceBetween: 24,
  	},
    1025: {
      slidesPerView: 3,
      spaceBetween: 24,
  	},
	1441: {
      slidesPerView: 4,
      spaceBetween: 24,
  	},
  },
});

initSliderNumberPagination(swiperServ, '.serv .pagin__number');




const desSliderTop = new Swiper('.des__slider-top', {
  speed: 800,
  spaceBetween: 24,
  slidesPerView: 1,
  modules: [Navigation],
  loop: true,
  initialSlide: 0,

  autoplay: {
    delay: 2500,
    stopOnLastSlide: false,
    disableOnIteration: false,
  },

  navigation: {
    prevEl: ".des-top__btn-prev",
    nextEl: ".des-top__btn-next"
  },
  breakpoints: {
	576: {
      slidesPerView: 2,
      spaceBetween: 24,
  	},
    851: {
      slidesPerView: 3,
      spaceBetween: 24,
  	},
	1251: {
      slidesPerView: 2,
      spaceBetween: 24,
  	},
  }
});

initSliderNumberPagination(desSliderTop, '.des__pagin-top .pagin__number');

const desSliderBot = new Swiper('.des__slider-bot', {
  speed: 800,
  spaceBetween: 24,
  slidesPerView: 1,
  modules: [Navigation],
  loop: true,
  initialSlide: 0,

  autoplay: {
    delay: 2500,
    stopOnLastSlide: false,
    disableOnIteration: false,
  },

  navigation: {
    prevEl: ".des-bot__btn-prev",
    nextEl: ".des-bot__btn-next"
  },
  breakpoints: {
	576: {
      slidesPerView: 2,
      spaceBetween: 24,
  	},
    851: {
      slidesPerView: 3,
      spaceBetween: 24,
  	},
	1251: {
      slidesPerView: 4,
      spaceBetween: 24,
  	},
  }

});

initSliderNumberPagination(desSliderBot, '.des__pagin-bot .pagin__number');



const procLSlider = new Swiper('.proc-l__slider', {
	speed: 800,
	spaceBetween: 24,
	slidesPerView: 1,
	modules: [EffectFade],
	loop: false,
	initialSlide: 0,
	allowTouchMove: false,
	watchSlidesProgress: true,
	effect: 'fade',
	fadeEffect: {
		crossFade: true,
	},
});

const procRSlider = new Swiper('.proc-r__slider', {
	speed: 1200,
	spaceBetween: 24,
	slidesPerView: 'auto',
	modules: [Navigation, Autoplay, Thumbs],
	loop: true,
	initialSlide: 0,

	autoplay: {
		delay: 2500,
		stopOnLastSlide: false,
		disableOnIteration: false,
	},

	navigation: {
		prevEl: ".proc-l-bot__btn-prev",
		nextEl: ".proc-l-bot__btn-next"
	},

	thumbs: {
		swiper: procLSlider,
	},

	// breakpoints: {
	// 676: {
	// 	spaceBetween: 24,
	// 	},
	// }
});

initSliderNumberPagination(procRSlider, '.proc-l__pagin .pagin__number');





const examSlider = new Swiper('.exam__slider', {
  speed: 800,
  spaceBetween: 0,
  slidesPerView: 'auto',
  modules: [Navigation],
  initialSlide: 0,

  navigation: {
    prevEl: ".exam__btn-prev",
    nextEl: ".exam__btn-next"
  },
//   breakpoints: {
// 	576: {
//       slidesPerView: 2,
//       spaceBetween: 24,
//   	},
//     851: {
//       slidesPerView: 3,
//       spaceBetween: 24,
//   	},
// 	1251: {
//       slidesPerView: 4,
//       spaceBetween: 24,
//   	},
//   }
});

initSliderNumberPagination(examSlider, '.exam__pagin .pagin__number');



const gratSlider = new Swiper('.grat__slider', {
  speed: 800,
  spaceBetween: 16,
  slidesPerView: 2,
  modules: [Navigation],
  initialSlide: 0,
  loop: true,

  navigation: {
    prevEl: ".grat__btn-prev",
    nextEl: ".grat__btn-next"
  },
  breakpoints: {
	576: {
      slidesPerView: 2,
      spaceBetween: 24,
  	},
	751: {
      slidesPerView: 1,
      spaceBetween: 24,
  	},
	1025: {
      slidesPerView: 2,
      spaceBetween: 24,
  	},
	
  }
});

initSliderNumberPagination(gratSlider, '.grat__pagin .pagin__number');


const catSlider = new Swiper('.cat__slider', {
  speed: 800,
  spaceBetween: 0,
  slidesPerView: 'auto',
  modules: [Navigation],
  initialSlide: 0,

  navigation: {
    prevEl: ".exam__btn-prev",
    nextEl: ".exam__btn-next"
  },
//   breakpoints: {
// 	576: {
//       slidesPerView: 2,
//       spaceBetween: 24,
//   	},
//     851: {
//       slidesPerView: 3,
//       spaceBetween: 24,
//   	},
// 	1251: {
//       slidesPerView: 4,
//       spaceBetween: 24,
//   	},
//   }
});

initSliderNumberPagination(examSlider, '.cat__slider .pagin__number');



const swiperRecArt = new Swiper('.rec-art__slider', {
  speed: 800,
  spaceBetween: 24,
  slidesPerView: 1,
  modules: [ Navigation],
  loop: true,
  initialSlide: 0,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },
  navigation: {
    prevEl: ".rec-art__btn-prev",
    nextEl: ".rec-art__btn-next"
  },
  breakpoints: {
	576: {
      slidesPerView: 2,
      spaceBetween: 24,
  	},
    1025: {
      slidesPerView: 3,
      spaceBetween: 24,
  	},
	1441: {
      slidesPerView: 4,
      spaceBetween: 24,
  	},
  },
});

initSliderNumberPagination(swiperServ, '.rec-art .pagin__number');






initExamTabs();
initExamLoadMore();


// const swiper = new Swiper('.swiper', {
//   speed: 800,
//   spaceBetween: 16,
//   slidesPerView: 1.4,
//   modules: [Autoplay, Navigation, Pagination],
//   loop: true,
//   initialSlide: 1,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },
//   navigation: {
//     prevEl: ".reviews__button-slider-prev",
//     nextEl: ".reviews__button-slider-next"
//   },
//   pagination: {
//     el: ".card-slider__pagination",
//     dynamicBullets: true,
//     clickable: true,
//   },
//   breakpoints: {
//     1400: {
//       slidesPerView: 4,
//       spaceBetween: 24,
//   	},
//     1650: {
//         slidesPerView: 4,
//         spaceBetween: 48,
//     }
//   },
// });


/* Валидация формы ======================================================================================
* В константу записывает нужную форму
* В переменную formNAME передаем форму
* В переменную popupTranks передаем окно благодарности
* Добавить класс _email на input type='mail'
* Добавить класс tel на input type='tel'
* Добавить каласс _req на input которые нужно проверить 
* Добавить каласс _obligat на input которые обязательны для заполнения
* Добавить класс .popup-thanks для модального окна спасибо
  Раскоментировать для использования
*/ 
import { sendForm, validForm } from './modules/validFrom.js'
import { initAutoplayVideo } from './modules/autoplayVideo.js';
// const popupTranks = document.querySelector('.popup-thanks')
const forms = document.querySelectorAll('form');


//==== валидация/отправка ====
forms.forEach(form => {
	validForm(form)
	// sendForm(form)
});

//==== валидация ====

//==== валидация ====

//==== валидация ====

//==== валидация ====
// =======================================================================================================

/* Добавление класса _active родителю при клике ==========================================================
	* Вызвать функцию и передать в нее массив нужных элементов
	* При клике на элемент, у всех элементов класс удаляется
*/
// import { toggleActiveClassParent } from './modules/index.js'
// const elementAll = document.querySelectorAll('.class');
// toggleActiveClassParent(elementAll)

/* Динамический класса _active элементу при клике ========================================================
	* Вызвать функцию и передать в нее массив нужных элементов
	* При клике на элемент, у всех элементов класс удаляется
*/
// import { toggleActiveClass } from './modules/index.js'
// const elementAll = document.querySelectorAll('.class');
// toggleActiveClass(elementAll)


document.addEventListener('DOMContentLoaded', function() {
    const socPan = document.querySelector('.soc-pan');
    const btn = socPan ? socPan.querySelector('.soc-pan__btn') : null;
    
    if (!socPan || !btn) return;
    
    // Функция закрытия панели
    function closePanel() {
        socPan.classList.remove('_active');
    }
    
    // Функция открытия панели
    function openPanel() {
        socPan.classList.add('_active');
    }
    
    // Обработчик клика по кнопке: переключение класса
    btn.addEventListener('click', function(e) {
        e.stopPropagation(); // чтобы клик не всплывал на document
        if (socPan.classList.contains('_active')) {
            closePanel();
        } else {
            openPanel();
        }
    });
    
    // Обработчик клика по document: если клик вне soc-pan, закрываем
    document.addEventListener('click', function(e) {
        if (!socPan.contains(e.target)) {
            closePanel();
        }
    });
});