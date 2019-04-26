/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/
;(function( $, window, document, undefined ) {
	$.fn.doubleTapToGo = function( params ) {
		if( !( 'ontouchstart' in window ) &&
			!navigator.msMaxTouchPoints &&
			!navigator.userAgent.toLowerCase().match( /windows phone os 7/i ) ) return false;
		this.each( function() {
			var curItem = false;
			$( this ).on( 'click', function( e ) {
				var item = $( this );
				if( item[ 0 ] != curItem[ 0 ] ) {
					e.preventDefault();
					curItem = item;
				}
			});

			$( document ).on( 'click touchstart MSPointerDown', function( e ) {
				var resetItem = true,
					parents	  = $( e.target ).parents();
				for( var i = 0; i < parents.length; i++ )
					if( parents[ i ] == curItem[ 0 ] )
						resetItem = false;
				if( resetItem )
					curItem = false;
			});
		});
		return this;
	};
})( jQuery, window, document );


$(document).ready(function(){
  $('#site-navigation').doubleTapToGo();

  $('#backToTop').click(function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, 500);
    return false;
  });

  /*Search Drop*/
  $('#headerSearchCTA').click(function() {
    $('.headerSearchContainer').slideToggle(300).toggleClass('activeSearch');
  });

  function collapseSearch() {
    if($('.headerSearchContainer').hasClass('activeSearch')) {
      $('.headerSearchContainer').removeClass('activeSearch').slideUp(300);
    }
  }

  $('.whiteContainer, .parallaxBanner').click(function(){
    collapseSearch();
  });

  $('.slides-container').click(function(){
    collapseSearch();
  });
});

$(document).ready(function(){
	$('.programsDropDown').click(function(e){
	    e.stopPropagation();
	    $(this).children('.programsContent').slideToggle('fast').toggleClass('programActive');
	    if($(this).children('.programsContent').hasClass('programActive')) {
	        $(this).find('i').removeClass('fa-arrow-circle-down').addClass('fa-arrow-circle-up');
	    } else {
	        $(this).find('i').removeClass('fa-arrow-circle-up').addClass('fa-arrow-circle-down');
	    }
	});
});


$.event.special.touchstart = {
    setup: function( _, ns, handle ){
        if ( ns.includes("noPreventDefault") ) {
            this.addEventListener("touchstart", handle, { passive: false });
        } else {
            this.addEventListener("touchstart", handle, { passive: true });
        }
    }
};

//use intersection observer browser api to add delayed animation based on
//a target element's entry into the browser window
function observeForAnimation(entries, thisObserver) {
	entries.forEach(function(entry) {
		var el = entry.target;
		var animationClass = el.getAttribute('data-animation');
		var classString = el.className;
		var newClassString = classString.concat(" " + animationClass);
		if (entry.isIntersecting) {
			el.className = newClassString;
			thisObserver.unobserve(el); //only animate once! stop observing
		}
	});
};
