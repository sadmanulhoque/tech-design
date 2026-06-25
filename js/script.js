document.addEventListener('DOMContentLoaded', function () {

  var mobileToggle = document.querySelector('.mobile-toggle');
  var catNav       = document.querySelector('.cat-nav');
  var navOverlay   = document.querySelector('.nav-overlay');
  var catNavClose  = document.querySelector('.cat-nav-close');

  /* ── Open / Close helpers ── */
  function openDrawer() {
    catNav.classList.add('open');
    navOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    var icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-times';
  }

  function closeDrawer() {
    catNav.classList.remove('open');
    navOverlay.classList.remove('show');
    document.body.style.overflow = '';
    var icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
  }

  /* ── Hamburger ── */
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      catNav.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }

  /* ── Drawer close button ── */
  if (catNavClose) {
    catNavClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeDrawer();
    });
  }

  /* ── Overlay click ── */
  if (navOverlay) {
    navOverlay.addEventListener('click', closeDrawer);
  }

  /* ── Stop all clicks inside drawer bubbling to document ── */
  if (catNav) {
    catNav.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  /* ── Document click: close if truly outside ── */
  document.addEventListener('click', function (e) {
    if (!catNav || !catNav.classList.contains('open')) return;
    closeDrawer();
  });

  /* ── Accordion: top-level category items ── */
  document.querySelectorAll('.cat-nav-item > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth >= 1024) return; // desktop: CSS hover handles it

      var dropdown = this.parentElement.querySelector('.cat-nav-dropdown');
      if (!dropdown) return; // no submenu — let the link navigate normally

      e.preventDefault();
      e.stopPropagation();

      var parentItem = this.parentElement;
      var isOpen = parentItem.classList.contains('open');

      // Close all other open top-level items
      document.querySelectorAll('.cat-nav-item.open').forEach(function (item) {
        if (item !== parentItem) item.classList.remove('open');
      });

      // Toggle this one
      if (isOpen) {
        parentItem.classList.remove('open');
      } else {
        parentItem.classList.add('open');
      }
    });
  });

  /* ── Tabs ── */
  function initTabs(btnSel, contentSel, active) {
    var btns     = document.querySelectorAll(btnSel);
    var contents = document.querySelectorAll(contentSel);
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = this.getAttribute('data-tab');
        btns.forEach(function (b) { b.classList.remove(active); });
        this.classList.add(active);
        contents.forEach(function (c) {
          c.classList.toggle(active, c.id === target);
        });
      });
    });
  }

  initTabs('.tab-btn',         '.tab-content',         'active');
  initTabs('.brand-tab',       '.brand-content',       'active');
  initTabs('.appliance-tab',   '.appliance-content',   'active');
  initTabs('.new-arrival-tab', '.new-arrival-content', 'active');
});