export function running() {
    const runningContainers = document.querySelectorAll('.running');
    
    runningContainers.forEach(container => {
        // Очистка предыдущих элементов
        const existingClones = container.querySelectorAll('.running__row[data-clone]');
        existingClones.forEach(clone => clone.remove());
        
        const existingStyle = document.querySelector(`style[data-running-style="${container.id}"]`);
        if (existingStyle) existingStyle.remove();

        const originalRow = container.querySelector('.running__row');
        if (!originalRow) return;

        // Настройки анимации
        const isReverse = container.classList.contains('reverse');
        const originalContent = originalRow.innerHTML;
        const containerWidth = container.offsetWidth;
        let rowWidth = originalRow.offsetWidth;
        
        // Дублирование контента
        while (rowWidth < containerWidth * 2) {
            originalRow.innerHTML += originalContent;
            rowWidth = originalRow.offsetWidth;
        }

        // Создание клона
        const clonedRow = originalRow.cloneNode(true);
        clonedRow.setAttribute('data-clone', 'true');
        container.appendChild(clonedRow);

        const finalRowWidth = originalRow.offsetWidth;
        const speed = parseInt(container.dataset.speed) || 100;
        const animationName = `runningAnim-${Math.random().toString(36).substr(2, 8)}`;

        // Стили с анимацией
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-running-style', container.id || animationName);
        
        styleElement.textContent = `
            #${container.id || animationName} .running__row {
                display: inline-flex;
                animation: ${animationName} ${finalRowWidth / speed}s linear infinite;
                animation-play-state: running;
            }
            
            #${container.id || animationName}.paused .running__row {
                animation-play-state: paused;
                transition: all 0.3s ease-out;
            }
            
            ${isReverse ? `
                @keyframes ${animationName} {
                    0% { transform: translateX(-${finalRowWidth}px); }
                    100% { transform: translateX(0); }
                }
            ` : `
                @keyframes ${animationName} {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-${finalRowWidth}px); }
                }
            `}
        `;
        
        document.head.appendChild(styleElement);
        if (!container.id) container.id = animationName;

        // Таймер для задержки
        let hoverTimer;
        const hoverDelay = parseInt(container.dataset.hoverDelay) || 800; // Задержка в мс

        // Обработчики для мыши
        container.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                container.classList.add('paused');
            }, hoverDelay);
        });

        container.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
            container.classList.remove('paused');
        });

        // Для тач-устройств (оставляем как было)
        let pressTimer;
        container.addEventListener('touchstart', () => {
            pressTimer = setTimeout(() => {
                container.classList.add('paused');
            }, hoverDelay);
        });

        container.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
            container.classList.remove('paused');
        });
    });
}

// Инициализация (как в предыдущей версии)
export function runningAnit() {
    let previousWidth = window.innerWidth;

    function handleResize() {
        const currentWidth = window.innerWidth;
        if (currentWidth !== previousWidth) {
            setTimeout(running, 10);
            previousWidth = currentWidth;
        }
    }

    window.addEventListener('load', () => {
        setTimeout(running, 10);
    });

    window.addEventListener('resize', handleResize);
}