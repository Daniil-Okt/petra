// ====== структура html ======
    // footer 
        // banner
            // banner__box
                // banner__body


function footerBanerAnimation() {
    const banner = document.querySelector('.banner');
    const bannerBox = document.querySelector('.banner__box');
    const bannerBody = document.querySelector('.banner__body');

    if (!banner || !bannerBox || !bannerBody) return null;

    // Состояние анимации
    let bannerHeight = banner.offsetHeight;
    let animationFrameId = null;
    let lastProgress = -1;
    let isScrolling = false;
    let scrollTimeout = null;
    let resizeTimeout = null;
    let resizeObserver = null;

    // Функция для обновления размеров
    const updateDimensions = () => {
        const oldHeight = bannerHeight;
        bannerHeight = banner.offsetHeight;
        
        if (oldHeight !== bannerHeight) {
            cancelAnimation();
            requestAnimation();
        }
    };

    // Применяем трансформы для лучшей производительности
    const applyTransform = (progress) => {
        const translateY = (-(1 - progress) * bannerHeight) / 2;
        
        bannerBody.style.transform = `translateY(${translateY}px)`;
        bannerBody.style.willChange = 'transform';
        bannerBox.style.height = (progress * bannerHeight) + 'px';
        bannerBox.style.willChange = 'height';
    };

    // Основная функция анимации
    const updateAnimation = () => {
        const bannerRect = banner.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        let progress = (viewportHeight - bannerRect.top) / bannerHeight;
        progress = Math.max(0, Math.min(1, progress));
        
        if (Math.abs(progress - lastProgress) > 0.001) {
            lastProgress = progress;
            applyTransform(progress);
        }
        
        if (isScrolling) {
            animationFrameId = requestAnimationFrame(updateAnimation);
        } else {
            animationFrameId = null;
        }
    };

    // Управление анимацией
    const cancelAnimation = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };

    const requestAnimation = () => {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateAnimation);
        }
    };

    // Обработчики событий
    const handleScroll = () => {
        isScrolling = true;
        requestAnimation();
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            setTimeout(() => {
                if (!isScrolling) cancelAnimation();
            }, 50);
        }, 100);
    };

    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateDimensions();
            requestAnimation();
            setTimeout(() => cancelAnimation(), 200);
        }, 150);
    };

    const handleOrientationChange = () => {
        setTimeout(() => {
            updateDimensions();
            requestAnimation();
        }, 300);
    };

    const handleVisibilityChange = () => {
        if (!document.hidden) {
            setTimeout(() => {
                updateDimensions();
                requestAnimation();
            }, 100);
        }
    };

    // Инициализация ResizeObserver
    const initResizeObserver = () => {
        if ('ResizeObserver' in window) {
            resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    if (entry.target === banner || entry.target === document.body) {
                        handleResize();
                    }
                }
            });
            
            resizeObserver.observe(banner);
            resizeObserver.observe(document.body);
        }
    };

    // Назначение обработчиков событий
    const initEventListeners = () => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);
    };

    // Удаление обработчиков событий
    const removeEventListeners = () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

    // Очистка ресурсов
    const cleanup = () => {
        cancelAnimation();
        removeEventListeners();
        
        if (resizeObserver) {
            resizeObserver.disconnect();
        }
        
        clearTimeout(scrollTimeout);
        clearTimeout(resizeTimeout);
        
        // Сбрасываем стили
        bannerBody.style.transform = '';
        bannerBody.style.willChange = '';
        bannerBox.style.height = '';
        bannerBox.style.willChange = '';
    };

    // Основная инициализация
    const init = () => {
        updateDimensions();
        initEventListeners();
        initResizeObserver();
        requestAnimation();
        
        // Автоостановка через секунду если нет активности
        setTimeout(() => {
            if (!isScrolling) cancelAnimation();
        }, 1000);
    };

    // Запускаем инициализацию
    init();

    return cleanup;
}

// Глобальное управление анимацией
let footerAnimationCleanup = null;

const initializeFooterAnimation = () => {
    // Очищаем предыдущую анимацию если есть
    if (footerAnimationCleanup) {
        footerAnimationCleanup();
    }
    
    // Инициализируем новую анимацию
    footerAnimationCleanup = footerBanerAnimation();
};

// Универсальная функция для запуска
const startFooterAnimation = () => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initializeFooterAnimation, 500);
        });
    } else {
        setTimeout(initializeFooterAnimation, 500);
    }
};


function initFooterBannerAnim() {
    // Запускаем анимацию
    startFooterAnimation();


    // Переинициализация при полной загрузке страницы
    window.addEventListener('load', initializeFooterAnimation);

}


export {
    initFooterBannerAnim
}