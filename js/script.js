document.addEventListener('DOMContentLoaded', function () {

  /* ============================
     MOBILE TOGGLE (Side Menu)
  ============================ */
  var mobileToggle = document.querySelector('.mobile-toggle');
  var catNav = document.querySelector('.cat-nav');
  var navOverlay = document.querySelector('.nav-overlay');

  if (mobileToggle && catNav) {
    mobileToggle.addEventListener('click', function () {
      catNav.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('show');
      var icon = this.querySelector('i');
      if (catNav.classList.contains('open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', function () {
        catNav.classList.remove('open');
        navOverlay.classList.remove('show');
        var icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    }

    document.addEventListener('click', function (e) {
      if (!catNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        catNav.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('show');
        var icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  /* ============================
     MOBILE MEGA MENU ACCORDION
  ============================ */
  document.querySelectorAll('.cat-nav-item > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var mega = this.parentElement.querySelector('.cat-nav-dropdown');
      if (!mega) return;

      var icon = this.querySelector('.fa-chevron-down, .fa-chevron-up');
      if (icon) {
        e.preventDefault();
        this.parentElement.classList.toggle('open');
        icon.className = this.parentElement.classList.contains('open')
          ? 'fas fa-chevron-up'
          : 'fas fa-chevron-down';
      }
    });
  });

  /* ============================
     HERO SLIDER
  ============================ */
  var track = document.querySelector('.slider-track');
  var slides = track ? track.querySelectorAll('.slider-slide') : [];
  var dots = document.querySelectorAll('.slider-dot');
  var currentSlide = 0;
  var slideInterval;
  var isDragging = false;
  var startPos = 0;
  var currentTranslate = 0;

  function goToSlide(index) {
    if (!track || slides.length === 0) return;
    currentSlide = index;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach(function (d, i) {
      d.className = 'slider-dot ' + (i === index ? 'active' : 'inactive');
    });
  }

  function nextSlide() {
    if (slides.length === 0) return;
    goToSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    if (slides.length === 0) return;
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function startSlider() {
    if (slides.length > 1) {
      stopSlider();
      slideInterval = setInterval(nextSlide, 5000);
    }
  }

  function stopSlider() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (slides.length && track) {
    track.style.display = 'flex';
    track.style.transition = 'transform 0.5s ease';

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        if (!isNaN(idx)) {
          stopSlider();
          goToSlide(idx);
          startSlider();
        }
      });
    });

    goToSlide(0);
    startSlider();
  }

  /* ============================
     TABS SYSTEM
  ============================ */
  function initTabs(btnSelector, contentSelector, activeClass) {
    var btns = document.querySelectorAll(btnSelector);
    var contents = document.querySelectorAll(contentSelector);

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = this.getAttribute('data-tab');

        btns.forEach(function (b) { b.classList.remove(activeClass); });
        this.classList.add(activeClass);

        contents.forEach(function (c) {
          c.classList.toggle(activeClass, c.id === target);
        });
      });
    });
  }

  initTabs('.tab-btn', '.tab-content', 'active');
  initTabs('.brand-tab', '.brand-content', 'active');
  initTabs('.appliance-tab', '.appliance-content', 'active');
  initTabs('.new-arrival-tab', '.new-arrival-content', 'active');

  /* ============================
     HEADER SCROLL EFFECT
  ============================ */
  // scroll effect placeholder (no .scrolled CSS defined yet)

  /* ============================
     PRODUCT HORIZONTAL SCROLL
       (keyboard / arrow nav optional)
  ============================ */
  document.querySelectorAll('.product-scroll').forEach(function (scrollEl) {
    var isDown = false;
    var startX;
    var scrollLeft;

    scrollEl.addEventListener('mousedown', function (e) {
      isDown = true;
      startX = e.pageX - scrollEl.offsetLeft;
      scrollLeft = scrollEl.scrollLeft;
      scrollEl.style.cursor = 'grabbing';
    });

    scrollEl.addEventListener('mouseleave', function () {
      isDown = false;
      scrollEl.style.cursor = 'grab';
    });

    scrollEl.addEventListener('mouseup', function () {
      isDown = false;
      scrollEl.style.cursor = 'grab';
    });

    scrollEl.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - scrollEl.offsetLeft;
      var walk = (x - startX) * 1.5;
      scrollEl.scrollLeft = scrollLeft - walk;
    });
  });

});
