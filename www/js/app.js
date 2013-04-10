$(document).ready(function() {
    var $header = $('header');
    var $header_container = $header.find('.header-wrap');
    var $nav = $('nav');
    var $section_links = $nav.find('a');
    var $slide = $('#slides').find('.slide');
    var $slide_row = $slide.find('.row');
    var $w = $(window);
    
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

        /* 
         * Resize slide based on screen dimensions
         */
		$slide_row.css('minHeight', window_height - header_height);
		
		/*
		 * Add margins to the slides to offset the header
		 */
		$slide.css('paddingTop', header_height * 2);
//		$('#slides').find('.slide:eq(0)').css('paddingTop', header_height);

        /*
         * Kill affix plugin for small displays
         */
        if (window_width < 768){
            $header_container.removeAttr('data-spy');
        } else {
            // set subnav affix top position to the top position of the subnav
            $header_container.attr('data-offset-top', 0);
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
    }
    $section_links.on('click', function() {
        scroll_to_position($(this).attr('href'));
        return false;
    });
	

	/*
	 * Init functions
	 */
	resize_slideshow();
	$w.resize(resize_slideshow);
});