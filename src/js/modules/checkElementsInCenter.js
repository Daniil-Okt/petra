function checkElementsInCenter() {
    // Отключаем на широких экранах (>768px)
    if (window.innerWidth > 550) {
        document.querySelectorAll('[data-ctr-scr]').forEach(el => {
            el.classList.remove('_scr-activ');
        });
        return;
    }

    const elements = document.querySelectorAll('[data-ctr-scr]');
    if (elements.length === 0) return;

    let activeElement = null;
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        // Получаем размер зоны из атрибута (по умолчанию 30vh)
        const zoneSize = element.dataset.ctrScr || '30vh';
        const zoneValue = parseFloat(zoneSize);
        const zoneUnit = zoneSize.replace(/[0-9.-]/g, '');

        // Вычисляем зону строго по центру экрана
        let zoneHeight;
        if (zoneUnit === 'vh') {
            zoneHeight = (zoneValue * windowHeight) / 100;
        } else if (zoneUnit === '%') {
            zoneHeight = (zoneValue * windowHeight) / 100;
        } else { // px или без единиц
            zoneHeight = zoneValue;
        }

        // Границы зоны (равноудалены от верха и низа)
        const centerZoneMin = (windowHeight - zoneHeight) / 2;
        const centerZoneMax = centerZoneMin + zoneHeight;

        // Проверяем позицию элемента
        const rect = element.getBoundingClientRect();
        const elementCenter = (rect.top + rect.bottom) / 2;

        if (elementCenter >= centerZoneMin && elementCenter <= centerZoneMax) {
            if (!activeElement || 
                Math.abs(elementCenter - windowHeight / 2) < 
                Math.abs((activeElement.getBoundingClientRect().top + activeElement.getBoundingClientRect().bottom) / 2 - windowHeight / 2)
            ) {
                activeElement = element;
            }
        }
    });

    // Обновляем классы
    elements.forEach(element => element.classList.remove('_scr-activ'));
    if (activeElement) activeElement.classList.add('_scr-activ');
}


export function initChekElementsInCenter() {
    // функция активности элемента в центре при скролле
    window.addEventListener('load', checkElementsInCenter);
    window.addEventListener('scroll', checkElementsInCenter);
    window.addEventListener('resize', checkElementsInCenter);
}

