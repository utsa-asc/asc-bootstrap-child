$(document).ready(function() {
	/*
	$('#mobileMenuBtn').click(function() {
		console.log('foo');
		var m = $('.mobileMenuSlider');
		if (m.hasClass('hideNav')) {
			m.removeClass('hideNav');
			m.addClass('showNav');
		} else {
			m.addClass('hideNav');
		}
		/*
	    $('.mobileMenuSlider').slideToggle(300, function() {
		    if($(this).css('display') == 'none')
		    {
		    	$(this).removeClass('showNav').addClass('hideNav').removeAttr('style');
		    }
		    else
		    {
		    	$(this).removeClass('hideNav').addClass('showNav').removeAttr('style');
		    }
	    });
			*/
	//});

	/*Search Drop*/
	$('#headerSearchCTA').click(function() {
		$('.headerSearchContainer').slideToggle(300).toggleClass('activeSearch');
	});
	/*

	function collapseSearch() {
		if($('.headerSearchContainer').hasClass('activeSearch')) {
			$('.headerSearchContainer').removeClass('activeSearch').slideUp(300);
		}
	}

	function collapseMenu() {
		if($('.mobileMenuSlider').hasClass('showNav'))
		{
			$('.mobileMenuSlider').slideUp(300);
		}
	}

	$('.whiteContainer, .parallaxBanner').click(function() {
		collapseSearch();
		collapseMenu();
	});

	$('.slides-container').click(function() {
		collapseSearch();
		collapseMenu();
	});
	*/
});
