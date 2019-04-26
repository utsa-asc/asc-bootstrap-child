/* handle Engineering select2 interactions */
$(document).ready(function(){
  $('#megaEng').select2({
    theme: 'utsa',
    minimumResultsForSearch: Infinity
  });

  $('#megaEng').on('change', function(e) {
    var selectHREF = $(e.target).val();
    window.location = selectHREF;
  });
});
