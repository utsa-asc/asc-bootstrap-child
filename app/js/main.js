$(document).ready(function(){
  //var tag = document.createElement('script');
  //var firstScriptTag = document.getElementsByTagName('script')[0];

  var prevHtml = '<button type="button" data-role="none" class="sslick-prev slick-arrow" aria-label="Previous" role="button" style=""></button>';
  var nextHtml = '<button type="button" data-role="none" class="sslick-next slick-arrow" aria-label="Next" role="button" style=""></button>';
  var autoplay = false;
  var slickPlaying = true;
  var manualPause = true;
  var s = $('#slides');
  var t = $('a.thumbnails');
  var p = $('a.pause');
  var hoverSpot = $('.slideRow');
  var control = $('#pausePlayControl');

  s.slick({
    accessibility: true,
    arrows: true,
    autoplay: autoplay,
    autoplaySpeed: 15000, //15 seconds
    prevArrow: prevHtml,
    nextArrow: nextHtml,
    pauseOnHover: false,
    speed: 500,
    cssEase: 'linear',
    fade: true
  });
  /*
  ,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        infinite: false,
        dots: true,
        prevArrow: prevHtml,
        nextArrow: nextHtml,
        arrows: true
      }
    }
  ]

  */

  /*
  hoverSpot.mouseenter(function () {
    if (slickPlaying) {
      s.slick('slickPause');
      control.removeClass('glyphicons-pause');
      control.addClass('glyphicons-play');
      slickPlaying = false;
    }
  }).mouseleave(function (eventData) {
    var mouseX = eventData.pageX;
    var mouseY = eventData.pageY;
    var header = $("#globalHeaderContainer");
    var slides = $(".slidesContainer");
    var maxHeight = slides.height() - header.height();
    var minHeight = header.height();
    var minWidth = 0;
    var maxWidth = header.width();
    if (!slickPlaying && !manualPause) {
      if (((mouseX + 25) >= maxWidth) || ((mouseX - 25) <= minWidth) || ((mouseY + 75) >= maxHeight) || ((mouseY - 75)<= minHeight)) {
        control.removeClass('glyphicons-play');
        s.slick('slickPlay');
        //s.slick('slickNext');
        control.addClass('glyphicons-pause');
        slickPlaying = true;
      }
    }
  });
  */

  s.on('afterChange', function(event, slick, currentSlide) {
    t.removeClass('current');
    $(t[currentSlide]).addClass('current');
  });

  t.click(function(e) {
    var slideIdx = $(this).index();
    s.slick('slickGoTo', slideIdx);
    t.removeClass('current');
    $(this).addClass('current');
  });

  p.on('slide:pause', function(event) {
    control.removeClass('fa-pause');
    s.slick('slickPause');
    control.addClass('fa-play');
    slickPlaying = false;
    manualPause = true;
  });

  p.on('slide:play', function(event) {
    control.removeClass('fa-play');
    s.slick('slickPlay');
    //s.slick('slickNext');
    control.addClass('fa-pause');
    slickPlaying = true;
    manualPause = false;
    /*
    if (player) {
      try {
        player.pauseVideo();
      } catch (e) {
        //do nothing
      }
    }
    */
  });

  p.on('slide:toggle', function(event) {
    if (slickPlaying) {
      p.trigger("slide:pause");
    } else {
      p.trigger("slide:play");
    }
  });

  p.on('slide:justPause', function(event) {
    if (slickPlaying) {
      p.trigger("slide:pause");
    }
  });

  p.click(function(e) {
    p.trigger("slide:toggle");
  });
});
