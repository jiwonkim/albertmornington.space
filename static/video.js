/**
 * TODO currently this assumes only 1 video per page
 */
$(document).ready(function() {
    var $overlay = $('.post-video_overlay');
    var $playIcon = $overlay.children('.play-icon');
    var $pauseIcon = $overlay.children('.pause-icon');
    var $video = $('video');
    var video = $video.get(0);

    $('.post-video')
        .click(function(evt) {
            if (video.paused) {
                video.play();

                $overlay.hide();
                $playIcon.hide();
                $pauseIcon.show();
            } else {
                video.pause();
                $playIcon.show();
                $pauseIcon.hide();
            }
        })
        .mouseenter(function(evt) {
            $overlay.show();
        })
        .mouseleave(function(evt) {
            if (!video.paused) {
                $overlay.hide();
            }
        });

    $video.bind('ended', function() {
        $playIcon.show();
        $pauseIcon.hide();
        $overlay.show();
    });
});
