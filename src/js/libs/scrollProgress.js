export class ScrollProgress {
    constructor(scrollbarElement) {
        this.scrollbar = scrollbarElement;
        this.init();
    }

    init() {
        // Устанавливаем начальные стили
        this.scrollbar.style.width = '0%';
        
        // Добавляем обработчик скролла
        this.handleScroll = this.updateScrollbar.bind(this);
        window.addEventListener('scroll', this.handleScroll);
        
        // Первоначальное обновление
        this.updateScrollbar();
    }

    updateScrollbar() {
        // Вычисляем прогресс скролла
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Вычисляем процент прокрутки
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Устанавливаем ширину
        this.scrollbar.style.width = Math.min(Math.max(scrollPercent, 0), 100) + '%';
    }

    // Метод для удаления (если нужно)
    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}


export function initScrollProgress() {
    document.addEventListener('DOMContentLoaded', function() {
        const scrollbarElement = document.querySelector('.scrollbar-custom');
        if (scrollbarElement) {
            new ScrollProgress(scrollbarElement);
        }
    });
}
