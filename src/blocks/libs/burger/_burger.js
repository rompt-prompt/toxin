$('#burgerToggle').on('click', function() {
	$('.burger-container').toggleClass('burger-container_active');
    $('.burger-overlay').toggleClass('burger-overlay_active');
    $('body').toggleClass('hidden-overflow');
});