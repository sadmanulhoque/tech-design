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
      icon.className = catNav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
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

  initTabs('.tab-btn',          '.tab-content',          'active');
  initTabs('.brand-tab',        '.brand-content',        'active');
  initTabs('.appliance-tab',    '.appliance-content',    'active');
  initTabs('.new-arrival-tab',  '.new-arrival-content',  'active');

});