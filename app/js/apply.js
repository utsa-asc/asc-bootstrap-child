/* handle UTSA Apply Select interactions */
$(document).ready(function(){
  $('#majors').select2({
    theme: 'utsa',
    minimumResultsForSearch: Infinity,
  });

  $('#majors').on('change', function(e) {
    var selectHREF = $(e.target).val();
    window.location = selectHREF;
  });
});
