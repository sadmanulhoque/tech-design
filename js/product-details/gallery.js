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
    arrows:         false,
    dots:           false,
    fade:           false,
    infinite:       true,
    rtl:            false,
    autoplay:       true,
    autoplaySpeed:  1500,
    speed:          500,
    cssEase:        'linear',
    asNavFor:       '.gallery-thumbs-slider',
    useTransform:   false,       /* prevents reverse-slide glitch */
  });

  /* ── Thumbnail slider (synced nav) ── */
  $thumbs.slick({
    slidesToShow:   5,
    slidesToScroll: 1,
    arrows:         false,
    dots:           false,
    infinite:       true,
    rtl:            false,
    focusOnSelect:  true,
    asNavFor:       '.gallery-main-slider',
    useTransform:   false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  });

  /* Pause on thumb click, resume after 4s */
  $thumbs.on('click', '.thumb-item', function () {
    $main.slick('slickPause');
    setTimeout(function () { $main.slick('slickPlay'); }, 4000);
  });

});