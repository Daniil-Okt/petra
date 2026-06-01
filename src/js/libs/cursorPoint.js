

/* html ====== <div class="cursor-follower"></div> ====== html */

export function cursorPoint() {
    const follower = document.querySelector('.cursor-follower');
    if (!follower) return;

    follower.style.position = 'fixed';
    follower.style.pointerEvents = 'none';
    follower.style.transform = 'translate(-50%, 0%)';
    follower.style.opacity = '0';
    follower.style.whiteSpace = 'normal';
    follower.style.textAlign = 'center';

    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    let mouseX = posX;
    let mouseY = posY;

    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.opacity = '1';
    });

    function insertLineBreak(content) {
        const temp = document.createElement('div');
        temp.innerHTML = content;

        const walker = document.createTreeWalker(temp, NodeFilter.SHOW_TEXT, null, false);
        let firstTextNode = walker.nextNode();

        if (firstTextNode && firstTextNode.nodeValue.trim()) {
            const text = firstTextNode.nodeValue;
            const words = text.split(/(\s+)/);

            if (words.length > 1) {
                const fragment = document.createDocumentFragment();
                fragment.appendChild(document.createTextNode(words[0]));
                if (words[1]) {
                    fragment.appendChild(document.createTextNode(words[1]));
                }
                fragment.appendChild(document.createElement('br'));
                if (words.length > 2) {
                    fragment.appendChild(document.createTextNode(words.slice(2).join('')));
                }
                firstTextNode.parentNode.replaceChild(fragment, firstTextNode);
            }
        }

        return temp.innerHTML;
    }

    // data-cursor-hover
    const hoverElements = Array.from(document.querySelectorAll('[data-cursor-hover]'));


    function updateHoverContent() {
        const el = document.elementFromPoint(mouseX, mouseY);
        if (!el) return;
    
        const hoverTarget = el.closest('[data-cursor-hover]');
        if (hoverTarget) {
            const hoverContent = hoverTarget.dataset.cursorHover;
            if (hoverContent && follower.innerHTML !== hoverContent) {
                follower.classList.add('hover-effect');
                follower.innerHTML = insertLineBreak(hoverContent);
            }
        } else if (follower.classList.contains('hover-effect')) {
            follower.classList.remove('hover-effect');
            follower.innerHTML = '';
        }
    }

    
    // data-cursor-white
    const whiteElements = document.querySelectorAll('[data-cursor-white]');
    let lastWhiteElement = null;
    let whiteCheckActive = false;

    // data-cursor-black
    const blackElements = document.querySelectorAll('[data-cursor-black]');
    let lastBlackElement = null;
    let blackCheckActive = false;

    function checkCursorOverlap() {
        if (!follower) return;

        if (lastWhiteElement) {
            const followerRect = follower.getBoundingClientRect();
            const elementRect = lastWhiteElement.getBoundingClientRect();

            const intersectionLeft = Math.max(followerRect.left, elementRect.left);
            const intersectionRight = Math.min(followerRect.right, elementRect.right);
            const intersectionTop = Math.max(followerRect.top, elementRect.top);
            const intersectionBottom = Math.min(followerRect.bottom, elementRect.bottom);

            const intersectionWidth = Math.max(0, intersectionRight - intersectionLeft);
            const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);
            const intersectionArea = intersectionWidth * intersectionHeight;

            const followerArea = followerRect.width * followerRect.height;
            const overlapRatio = intersectionArea / followerArea;

            if (overlapRatio >= 0.5 && !lastBlackElement) {
                follower.classList.add('white');
                follower.classList.remove('black');
            } else {
                follower.classList.remove('white');
            }
        }

        if (lastBlackElement) {
            const followerRect = follower.getBoundingClientRect();
            const elementRect = lastBlackElement.getBoundingClientRect();

            const intersectionLeft = Math.max(followerRect.left, elementRect.left);
            const intersectionRight = Math.min(followerRect.right, elementRect.right);
            const intersectionTop = Math.max(followerRect.top, elementRect.top);
            const intersectionBottom = Math.min(followerRect.bottom, elementRect.bottom);

            const intersectionWidth = Math.max(0, intersectionRight - intersectionLeft);
            const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);
            const intersectionArea = intersectionWidth * intersectionHeight;

            const followerArea = followerRect.width * followerRect.height;
            const overlapRatio = intersectionArea / followerArea;

            if (overlapRatio >= 0.5 && !lastWhiteElement) {
                follower.classList.add('black');
                follower.classList.remove('white');
            } else {
                follower.classList.remove('black');
            }
        }
    }

    whiteElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            lastWhiteElement = el;
            whiteCheckActive = true;
        });
        el.addEventListener('mouseleave', () => {
            if (lastWhiteElement === el) {
                lastWhiteElement = null;
                whiteCheckActive = false;
                follower?.classList.remove('white');
            }
        });
    });

    blackElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            lastBlackElement = el;
            blackCheckActive = true;
        });
        el.addEventListener('mouseleave', () => {
            if (lastBlackElement === el) {
                lastBlackElement = null;
                blackCheckActive = false;
                follower?.classList.remove('black');
            }
        });
    });

    // data-cursor-str
    const svgNext = `
    <svg width="26" height="23" style="position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.65 12.4503C25.2358 11.8645 25.2358 10.9148 24.65 10.329L15.1041 0.783047C14.5183 0.19726 13.5685 0.19726 12.9827 0.783047C12.3969 1.36883 12.3969 2.31858 12.9827 2.90437L21.468 11.3896L12.9827 19.8749C12.3969 20.4607 12.3969 21.4105 12.9827 21.9963C13.5685 22.582 14.5183 22.582 15.104 21.9963L24.65 12.4503ZM0.961914 12.8896L23.5893 12.8896L23.5893 9.88965L0.961914 9.88965L0.961914 12.8896Z" fill="white" />
    </svg>`;
    const svgPrev = svgNext.replace('<svg', '<svg style="position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%) rotate(180deg);"');

    const arrowElements = document.querySelectorAll('[data-cursor-str]');
    arrowElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover-effect');
            document.body.style.cursor = 'none';
            follower.style.transform = 'translate(-50%, -50%)';

            if (el.hasAttribute('data-cursor-str-prev')) {
                follower.innerHTML = svgPrev;
            } else if (el.hasAttribute('data-cursor-str-next')) {
                follower.innerHTML = svgNext;
            }
        });

        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover-effect');
            follower.innerHTML = '';
            document.body.style.cursor = '';
            follower.style.transform = 'translate(-50%, 0%)';
        });
    });

    // Анимация курсора
    function animate() {
        const smoothness = 0.09;
        posX += (mouseX - posX) * smoothness;
        posY += (mouseY - posY) * smoothness;

        follower.style.left = `${posX}px`;
        follower.style.top = `${posY}px`;

        updateHoverContent();

        if ((whiteCheckActive && lastWhiteElement) || (blackCheckActive && lastBlackElement)) {
            checkCursorOverlap();
        }

        requestAnimationFrame(animate);
    }

    animate();
}
