$(document).ready(() => {
    $('.image-tile').mouseenter(function(e) {
        const $overlay = $(this).find('.image-tile_overlay');
        $overlay.removeClass('h-hidden');
        $overlay.addClass('h-flex');
        $overlay.fadeIn(200);
    })
    .mouseleave(function(e) {
        const $overlay = $(this).find('.image-tile_overlay');
        $overlay.fadeOut(200, () => {
            $overlay.removeClass('h-flex');
        });
    });

});
