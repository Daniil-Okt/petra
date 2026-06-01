export function fixVHUnitsOnMobile() {
    if (window.innerWidth > 550) return;
  
    const vhElements = document.querySelectorAll('.fix-vh-mob');
  
    vhElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const elementHeight = element.offsetHeight;

        element.style.height = `${elementHeight}px`; 
        element.style.minHeight = `${elementHeight}px`; 
    });
}