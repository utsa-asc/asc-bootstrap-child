$(document).ready(function(){
	$('#backToTop').click(function(event){
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, 500);
		return false;
	});
});
