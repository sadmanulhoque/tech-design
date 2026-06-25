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
  document.querySelectorAll('[data-scroll-target]').forEach(function (button) {
    button.addEventListener('click', function () {
      var targetClass = this.getAttribute('data-scroll-target');
      var scrollEl = targetClass ? document.querySelector('.' + targetClass) : null;
      if (!scrollEl) return;

      var direction = this.getAttribute('data-direction') === 'prev' ? -1 : 1;
      var card = scrollEl.querySelector('.product-card');
      var gap = parseFloat(getComputedStyle(scrollEl).gap || '0') || 0;
      var step = card ? card.getBoundingClientRect().width + gap : 280;

      scrollEl.scrollBy({
        left: direction * step,
        behavior: 'smooth'
      });
    });
  });

  var newTrendsScroll = document.querySelector('.new-trends-scroll');

  if (newTrendsScroll) {
    var dragging = false;
    var startX = 0;
    var scrollLeft = 0;
    var activePointerId = null;

    function stopDragging() {
      dragging = false;
      activePointerId = null;
      document.body.style.userSelect = '';
      newTrendsScroll.style.cursor = 'grab';
    }

    function startDragging(pageX, pointerId) {
      dragging = true;
      activePointerId = typeof pointerId === 'number' ? pointerId : null;
      startX = pageX - newTrendsScroll.offsetLeft;
      scrollLeft = newTrendsScroll.scrollLeft;
      document.body.style.userSelect = 'none';
      newTrendsScroll.style.cursor = 'grabbing';
    }

    newTrendsScroll.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      startDragging(e.pageX, e.pointerId);
      if (newTrendsScroll.setPointerCapture) {
        newTrendsScroll.setPointerCapture(e.pointerId);
      }
    });

    newTrendsScroll.addEventListener('pointermove', function (e) {
      if (!dragging || activePointerId !== e.pointerId) return;
      e.preventDefault();
      var x = e.pageX - newTrendsScroll.offsetLeft;
      var walk = (x - startX) * 1.5;
      newTrendsScroll.scrollLeft = scrollLeft - walk;
    });

    newTrendsScroll.addEventListener('pointerup', stopDragging);
    newTrendsScroll.addEventListener('pointercancel', stopDragging);
    newTrendsScroll.addEventListener('lostpointercapture', stopDragging);

    newTrendsScroll.addEventListener('mousedown', function (e) {
      if (typeof PointerEvent !== 'undefined') return;
      if (e.button !== 0) return;
      startDragging(e.pageX);
    });

    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      e.preventDefault();
      var x = e.pageX - newTrendsScroll.offsetLeft;
      var walk = (x - startX) * 1.5;
      newTrendsScroll.scrollLeft = scrollLeft - walk;
    });

    document.addEventListener('mouseup', function () {
      if (!dragging) return;
      stopDragging();
    });

    newTrendsScroll.addEventListener('wheel', function (e) {
      var shouldScrollHorizontally = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!shouldScrollHorizontally) return;

      e.preventDefault();
      newTrendsScroll.scrollLeft += e.deltaX || e.deltaY;
    }, { passive: false });
  }

});
