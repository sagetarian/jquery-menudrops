jQuery MenuDrops
=============

Style your menu and sub menu's without mouse over effects and use this jQuery plugin to automatically create great mouseover effects.

Note: works for WordPress style <ul> menu's.

How to use
----------

#### HTML

    <ul>
        <li>home</li>
        <li>
            about us 
            <ul class="sub-menu">
                <li>Who we are</li>
            </ul>
        </li>
        
    </ul>

#### jQuery

    jQuery(function() {

        jQuery('header #nav.menu').menudrops({'effect': 'fade'});

    });

#### Various options

    effect
    
Choose between 'fade', 'slide' and 'none'. Default: slide

    speed
    
Choose the speed of the animation. Default: 500
    
    keep_active_sub_open
    
Choose whether or not to keep the current sub menu open. Default: false
