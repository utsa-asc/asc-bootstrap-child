$(document).ready(function() {
  var observerOptions = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  };
  var observer = new IntersectionObserver(observeForAnimation, observerOptions);
  observer.POLL_INTERVAL = 100; // Time in milliseconds.
  $('.delayedAnimation').each(function(idx, targetEl) {
    observer.observe(targetEl);
  })

  //replace image content with video content on the bottom strip
  $('.video-pre-image').one('click', function(e) {
    e.preventDefault();
    console.log('foo');
    var tar = this;
    var ytid = $(this).data('video'); //youtube video id in the data-video attr
    var imageContentDiv = $(this).find('.image-content');
    var videoContentDiv = $(this).find('.video-content');
    var containerTintDiv = $(imageContentDiv).find('.container-tint');
    var iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "false");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + ytid + "?rel=0&showinfo=0&autoplay=1");
    iframe.setAttribute("height", "100%");
    iframe.setAttribute("class", "embed-responsive-item allowfullscreen");
    $(imageContentDiv).fadeOut(450, function() {
      $(videoContentDiv).append(iframe);
      $(videoContentDiv).removeClass('d-none');
    });
    //targetVideoDiv.show();
    return true;
  });
});
