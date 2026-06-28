/* ============================================================
   GALLERY SLIDER — gallery.js
   Requires: jQuery, Slick Carousel
   ============================================================ */

$(function () {

  /* ── Main image slider ── */
  var $main = $('.gallery-main-slider');
  var $thumbs = $('.gallery-thumbs-slider');

  $main.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button class="gallery-arrow gallery-arrow-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="gallery-arrow gallery-arrow-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>',
    dots: false,
    fade: true,
    cssEase: 'ease',
    asNavFor: '.gallery-thumbs-slider',
    lazyLoad: 'ondemand',
  });

  /* ── Thumbnail slider (synced nav) ── */
  $thumbs.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    asNavFor: '.gallery-main-slider',
    responsive: [
      {
        breakpoint: 480,
        settings: { slidesToShow: 3 }
      }
    ]
  });

});