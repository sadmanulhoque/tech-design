/* ============================================================
   GALLERY SLIDER — gallery.js
   Requires: jQuery, Slick Carousel
   ============================================================ */

$(function () {

  var $main   = $('.gallery-main-slider');
  var $thumbs = $('.gallery-thumbs-slider');

  /* ── Main image slider ── */
  $main.slick({
    slidesToShow:   1,
    slidesToScroll: 1,
    arrows:         false,   /* no arrows */
    dots:           false,
    fade:           true,
    cssEase:        'ease',
    autoplay:       true,    /* auto-slide */
    autoplaySpeed:  3000,
    asNavFor:       '.gallery-thumbs-slider',
  });

  /* ── Thumbnail slider (synced nav) ── */
  $thumbs.slick({
    slidesToShow:   5,
    slidesToScroll: 1,
    arrows:         false,
    dots:           false,
    focusOnSelect:  true,
    asNavFor:       '.gallery-main-slider',
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  });

  /* Pause autoplay when user manually clicks a thumb */
  $thumbs.on('click', '.thumb-item', function () {
    $main.slick('slickPause');
    setTimeout(function () { $main.slick('slickPlay'); }, 5000);
  });

});