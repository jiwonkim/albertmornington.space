$(document).ready(function() {
    var pixelatedImages = $('.image--pixelated');
    $.each(pixelatedImages, function(index, elem) {
        var $image = $(elem);
        var highresSrc = $image.attr('src').replace('_pixelated.png', '.jpg');

        var highres = new Image();
        highres.onload = function() {
            $image.attr('src', highresSrc)
        };
        highres.src = highresSrc;
    });
});
