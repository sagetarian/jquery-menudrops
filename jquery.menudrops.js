
(function($) {
$.fn.menudrops = function( options ) {

    var defaults = {
        speed : 500,
        effect : 'slide',    // supports slide, fade, none,
        keep_active_sub_open : false,
        show_active_sub : function() {}
    };
    
    options = $.extend({}, defaults, options);
    
    $('ul.sub-menu').not('ul.sub-menu ul.sub-menu').show();

    if(options.keep_active_sub_open) {
        $('.current-menu-ancestor .sub-menu').addClass('menudrop-keepopen');
        
        options.show_active_sub = function() {
            var ul = $('.current-menu-ancestor .sub-menu.menudrop-keepopen');
            if( !ul.length ) return;
            
            var to_height = ul[0].height != undefined ? ul[0].height : 'auto';
            ul.show().css({
                'opacity' : 1,
                'height': to_height
            });
        }
    }
    
    if( !options.effect_hide )
        options.effect_hide = options.effect;
        
    if( !options.effect_show )
        options.effect_show = options.effect;
    
    /* Slide effect */
    var slide_show = function( ul ) {
        ul.css({'overflow':'hidden'});
            
        if( ul.height() && !ul[0].height )
            ul[0].height = ul.height();
            
        if( !ul.is(':visible') ) {
            ul.css({'height':0});
            ul.show();
        }
            
        ul.stop(true).animate( {'height': ul[0].height}, options.speed ); 
    };
    
    var slide_hide = function( ul ) {
        ul.stop(true).animate( {'height':0}, options.speed, function() {
        
	        $(this).css({'overflow':'hidden'});
	        $(this).hide();
	        options.show_active_sub();
	    });
    }
    
    /* Fade effect */
    var fade_show = function( ul ) {
        ul.css({'overflow':'inherit'});
        
            
        var margin_top = parseInt(ul.css('margin-top').replace('px',''));
        
        if( !isNaN(parseInt(margin_top)) && !ul[0].has_margin_top ) {
            ul[0].margin_top = margin_top;
            ul[0].has_margin_top = true;
        }
        
            
        if( !ul.is(':visible') ) {
            ul.css({
                'opacity' : 0,
                'margin-top' : parseInt(margin_top - 10) + 'px'
            });
            ul.show();
        }
            
        ul.stop(true).animate( {
            'opacity': 1,
            'margin-top': ul[0].margin_top
        }, options.speed ); 
    };
    
    var fade_hide = function( ul ) {
        ul.stop(true).animate( {
            'opacity': 0,
                'margin-top' : parseInt(ul[0].margin_top - 10) + 'px'
            }, options.speed, function() {
        
	            $(this).css({'overflow':'hidden'});
	            $(this).hide();
	            options.show_active_sub();
	        
	    });
    }

    return this.each(function() {
    
        var links = $(this).find('ul.sub-menu').prev();
        
        links.each(function() {
            var link = $(this);
            if( !link.find('.arrow').length ) {
                link.html( '<span class="arrow"></span>' + link.html() );
            }
            
            link.parent().addClass( 'hassubmenu' );
        });        

        function set_widths( submenu, level ) {
            

            submenu.each(function() {
                var $this = $(this);
                $this.attr('menudrop-setup', true);
                var position = $this.css('position');
                $this.css( {
                    'position': 'relative',
                    'display':'block'
                });

                var not = 'ul.sub-menu ul.sub-menu ';
                var i = level;
                while(i--)
                    not += 'ul.sub-menu ';

                var subs = $this.find('ul.sub-menu').not( not );
                
                if(subs.length)
                    set_widths( subs, level + 1 );
                

                $this.css( 'width', 'auto' );
                
                
                if($('body').hasClass('ie9')) {
                    $this.css({
                        display: "none",
                        width: $this.outerWidth() + 7
                    });
                } else {
                    $this.css({
                        display: "none",
                        width: $this.outerWidth() + 20
                    });
                }
                
                $this.css('position', position);
                $this.attr('menudrop-setup', false);
            });

        }
        
        $(this).find('ul.sub-menu').not('ul.sub-menu ul.sub-menu').hide();
        set_widths( $(this).find('ul.sub-menu').not('ul.sub-menu ul.sub-menu'), 0 );
        
        $('.current-menu-ancestor .sub-menu.menudrop-keepopen').show();
        
        $(this).find("li").unbind('mouseenter').unbind('mouseleave').unbind('mouseout').unbind('mouseover');
        
        $(this).find("li").hover(function(){ 
            
            if( !$(this).find('ul:first').length || 
                $(this).find('ul:first').attr('menudrop-setup') == "true" ||
                $(this).find('ul:first').hasClass('menudrop-keepopen') ) return;
            
            $('.current-menu-ancestor .sub-menu.menudrop-keepopen').hide();
            
            if( options.effect_show == 'slide' )
                slide_show( $(this).find('ul:first') );
            if( options.effect_show == 'fade' )
                fade_show( $(this).find('ul:first') );
            if( options.effect_show == 'none' )
                $(this).find('ul:first').show();
		    
		}, function() { 
		
            if( !$(this).find('ul:first').length || 
                $(this).find('ul:first').attr('menudrop-setup') == "true" ||
                $(this).find('ul:first').hasClass('menudrop-keepopen') ) return;
                
		    if( options.effect_hide == 'slide' )
                slide_hide( $(this).find('ul:first') );
		    if( options.effect_hide == 'fade' )
                fade_hide( $(this).find('ul:first') );
            if( options.effect_hide == 'none' )
                $(this).find('ul:first').hide();
                
		    
		}).trigger("mouseleave"); 
		
    
		
    });
    
}
})(jQuery);
