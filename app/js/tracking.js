
/* Track outbound links in Google Analytics */
$(document).ready(function(){

  "use strict";
  var paginationLR = $(".slides-navigation");
  var paginationBoxes = $(".thumbnails");
  paginationLR.on("click", function(e){
    if (typeof ga !== "function") return;
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'indexClick',
      'eventAction': 'ux',
      'eventLabel': 'leftright'
    });
  });

  paginationBoxes.on("click", function(e){
    var eventTarget = e.target;
    var buttonType = 'box';
    var borderRadius = paginationBoxes.eq(0).css("border-radius");
    var buttonValue = buttonType + '-';
    if (borderRadius == '15px') {
      buttonType = 'dot';
    }
    if (eventTarget != null) {
      buttonValue = buttonValue + eventTarget.text;
      if (typeof ga !== "function") return;
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'indexClick',
        'eventAction': 'ux',
        'eventLabel': buttonValue
      });
    }
  });

  // click event on body
  $("body").on("click", function(e) {
    // abandon if link already aborted or analytics is not available
    if (e.isDefaultPrevented() || typeof ga !== "function") {
      return
    };

    //e.preventDefault();
    // abandon if no active link or link within domain
    var link = $(e.target).closest("a");
    var linklabel = "link-";
    var linkd = link.data();
    if (linkd != null) {
      if (linkd["label"]) {
        linklabel += linkd["label"];
      }
    }
    if (link.length != 1) return;
    // cancel event and record outbound link
    e.preventDefault();
    var href = link[0].href;
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'indexClick',
      'eventAction': linklabel,
      'eventLabel': href,
      'hitCallback': clearAndLoad
    });

    // redirect after one second if recording takes too long
    var timeout = setTimeout(loadPage, 1000);

    function clearAndLoad() {
      clearTimeout(timeout);
      document.location = href;
    }

    // redirect to outbound page
    function loadPage() {
      document.location = href;
    }
  });
});
