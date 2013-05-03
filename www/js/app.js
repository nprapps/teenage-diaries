$(document).ready(function() {
    var $header = $('header');
    var $header_container = $header.find('.header-wrap');
    var $nav = $('nav');
    var $section_links = $nav.find('a');
    var $slide = $('#slides').find('.slide');
    var $slide_row = $slide.find('.row');
    var $w = $(window);
    var $players = $('.jp-jplayer');
    var $persons = $('.person');
    
    var anchors = [];
    var current_anchor = 0;
    var total_anchors;

    var header_height = $header_container.height();
    var window_height = window.innerHeight;
    var window_width = window.innerWidth;
    

    /*
     * Populate list of anchors
     */
    function get_anchor_list() {
        $.each($section_links, function(v,k) {
            var link = k.href.split('#');
            anchors.push(link[1]);
        });
        total_anchors = anchors.length;
    }

    
    /* 
     * When the screen resizes (and on init)
     */
    function resize_slideshow() {
        // Resize slide based on screen and header dimensions -- but only for larger screens
        window_height = window.innerHeight;
        window_width = window.innerWidth;
        header_height = $header_container.height();
        max_height = 780; // 1170 width @ 3:2 radio
//        max_height = 525; // 1170 width @ 4:3 radio
        slide_height = window_height;
        if (slide_height > max_height) {
            slide_height = max_height;
        }

        // Kill affix plugin for small displays
        if (window_width < 768){
            $header_container.removeAttr('data-spy');
        } else {
            // set subnav affix top position to the top position of the subnav
            $header_container.attr('data-offset-top', 0);
            
            // set min height of each slide
            $slide_row.css('minHeight', slide_height - header_height);
            $slide.css('paddingTop', header_height);
            $slide.css('marginBottom', -header_height);
        }
    }

    /* 
     * Section jump links
     */
    function scroll_to_position(target) {
    	var target_pos = $(target).offset().top;
    	$('html, body').animate({
            scrollTop: target_pos
        }, 1000, function() {
            window.location.hash = target;
        });
        current_anchor = find_anchor_position(target);
    }

    /*
     * Needed for j/k links - identify where in sequence you are
     */
    function find_anchor_position(anchor) {
        anchor = anchor.substr(1);
        for (var i = 0; i < total_anchors; i++) {
            if (anchor == anchors[i]) {
                return i;
            }
        }
    }
    
    /*
     * if there's a location hash onload, set current_anchor appropriately
     */
    function check_initial_hash() {
        if (window.location.hash) {
            var anchor_position = find_anchor_position(window.location.hash);
            if (anchor_position != undefined) {
                current_anchor = anchor_position;
            }
        }
    }

    $section_links.on('click', function() {
        scroll_to_position($(this).attr('href'));
        return false;
    });
    
    /*
     * j/k key navigation
     */
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
     * Background images
	*/
    function init_profile_photos() {
        if (window.innerWidth > 480) { 
            $persons.each(function() {
                var id = $(this).attr('id');
                var $row = $(this).find('.row');
                var img_url = $row.css('background-image');

                img_url = img_url.replace('480', '980');

                $row.css('background-image', img_url);
            });
            }
    }

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
                preload: "none",
                swfPath: 'js',
                solution: 'flash, html',
                supplied: 'mp3',
                cssSelectorAncestor: $(this).data('selector')
            });
        });
    }


	/*
	 * Init functions
	 */
    get_anchor_list();
	resize_slideshow();
	$w.resize(resize_slideshow);
    init_profile_photos();
	check_initial_hash();
    init_audio();
});
