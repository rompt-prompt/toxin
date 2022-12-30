import '../../overlay/_overlay.js';

document.querySelector('#showFiltersBtn').addEventListener('click', () => {
    document.querySelector('.filters__container').classList.toggle('filters__container_active');
    document.querySelector('#showFiltersBtn').classList.toggle('show-filters-btn_opened');
});