/**
 * hero-slider.js
 * Initialises the Slick carousel for the hero banner.
 * Depends on: jQuery, slick-carousel (both loaded before this file).
 */
(function ($) {
  'use strict';

  $(document).ready(function () {

    var $slider = $('.hero-slick');

    // Guard: only run if the element and Slick are present
    if (!$slider.length || !$.fn.slick) return;

    $slider.slick({
      autoplay          : true,
      autoplaySpeed     : 5000,
      speed             : 500,
      cssEase           : 'ease',
      infinite          : true,
      arrows            : false,   // custom arrows not needed; add if wanted
      dots              : true,
      dotsClass         : 'slider-controls',   // matches existing CSS class
      customPaging      : function (slider, i) {
        // Renders numbered dots:  <span class="slider-dot">1</span>
        return '<span class="slider-dot">' + (i + 1) + '</span>';
      },
      pauseOnHover      : true,
      pauseOnFocus      : false,
      swipe             : true,
      touchThreshold    : 10,
      adaptiveHeight    : false    // height fixed by CSS aspect-ratio container
    });

  });

}(jQuery));