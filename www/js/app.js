$(document).ready(function() {
    var $header = $('header');
    var $header_container = $header.find('.header-wrap');
    var $nav = $('nav');
    var $section_links = $nav.find('a');
    var $slide = $('#slides').find('.slide');
    var $slide_row = $slide.find('.row');
    var $w = $(window);
    var $players = $('.jp-jplayer');
    
    var anchors = ['intro', 'amanda', 'juan', 'frankie', 'josh', 'melissa', 'cowbird-grid', 'notebook', 'credits'];
    var current_anchor = 0;
    var total_anchors = anchors.length;

    var header_height = $header_container.height();
    var window_height = window.innerHeight;
    var window_width = window.innerWidth;
    
    /* 
     * When the screen resizes (and on init)
     */
	function resize_slideshow() {
		window_height = window.innerHeight;
		window_width = window.innerWidth;
		header_height = $header_container.height();

        // Resize slide based on screen dimensions
		$slide_row.css('minHeight', window_height - header_height);
		
		// Add margins to the slides to offset the header
		$slide.css('paddingTop', header_height * 2);

        // Kill affix plugin for small displays
        if (window_width < 768){
            $header_container.removeAttr('data-spy');
        } else {
            // set subnav affix top position to the top position of the subnav
            $header_container.attr('data-offset-top', 0);
            console.log(window_width);
        }
	}

    /* 
     * Section jump links
     */
    function scroll_to_position(target) {
    	var target_pos = $(target).offset().top + header_height;
    	$('html, body').animate({
            scrollTop: target_pos
        }, 1000, function() {
            window.location.hash = target;
        });
        current_anchor = find_anchor_position(target);
    }

    function find_anchor_position(anchor) {
        anchor = anchor.substr(1);
        for (var i = 0; i < total_anchors; i++) {
            if (anchor == anchors[i]) {
                return i;
            }
        }
    }

    $section_links.on('click', function() {
        scroll_to_position($(this).attr('href'));
        return false;
    });

    $(document).keydown(function(ev) {
        if (ev.which == 74) {
            // go to previous slide
            if (current_anchor >= 1) {
                scroll_to_position('#' + anchors[current_anchor - 1]);
            }
            return false;
        } else if (ev.which == 75) {
            // go to next slide
            if (current_anchor < (total_anchors - 1)) {
                scroll_to_position('#' + anchors[current_anchor + 1]);
            }
            return false;
        } else if (ev.which == 32 && audio_supported) {
            // play or pause audio
            if ($player.data().jPlayer.status.paused) {
                $player.jPlayer('play');
            } else {
                $player.jPlayer('pause');
            }
            return false;
        }
        return true;
    });
	
    /*
     * Audio
     */
    function init_audio() {
        $players.each(function() {
            $(this).jPlayer({
                ready: function() {
                    $(this).jPlayer('setMedia', {
                        mp3: $(this).data('url')
                    }).jPlayer('pause');
                },
                play: function() {
                    $(this).jPlayer('pauseOthers');
                },
                swfPath: 'js',
                supplied: 'mp3',
                cssSelectorAncestor: $(this).data('selector')
            });
        });
    }

	/*
	 * Init functions
	 */
	resize_slideshow();
	$w.resize(resize_slideshow);

    init_audio();
});
