/**
 * new-trends.js
 * Initialises the Slick carousel for the New Trends section.
 * Depends on: jQuery, slick-carousel (both loaded before this file).
 */
(function ($) {
  'use strict';

  $(document).ready(function () {

    var $slider = $('.new-trends-slick');

    // Guard: only run if the element exists and Slick is available
    if (!$slider.length || !$.fn.slick) return;

    $slider.slick({
      slidesToShow   : 4,      // cards visible at once on desktop
      slidesToScroll : 1,      // one card per arrow click
      infinite       : true,
      speed          : 400,
      cssEase        : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      arrows         : false,  // custom buttons used instead
      dots           : false,
      swipe          : true,
      touchThreshold : 10,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 3 }
        },
        {
          breakpoint: 900,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow  : 1,
            centerMode    : true,
            centerPadding : '32px'
          }
        }
      ]
    });

    // Wire up the custom prev / next buttons
    $('#new-trends-prev').on('click', function () {
      $slider.slick('slickPrev');
    });

    $('#new-trends-next').on('click', function () {
      $slider.slick('slickNext');
    });

  });

}(jQuery));