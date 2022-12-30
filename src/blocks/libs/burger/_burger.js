import '../overlay/_overlay.js'

document.querySelector('#burgerToggle').addEventListener("click", () => {
    document.querySelector('.burger-container').classList.toggle('burger-container_active');
    showOverlay();
});