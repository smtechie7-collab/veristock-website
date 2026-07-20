/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  VERISTOCK PRO — Official Web Interactivity Controller v1.0
  SM Technologies | Clean ES6 Vanilla JS, Zero Dependencies
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initTheme();
  initHeaderScroll();
  initMobileMenu();
  initCarousel();
  initFaqAccordion();
  initContactForms();
  initScrollReveal();
  initCategorySelector();
  initRepairSimulator();
});

/* ── 1. LIGHT & DARK THEME CONTROLLER ───────────────────────────────── */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Determine starting theme: LocalStorage -> System Config -> Light
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  // Handle click toggles
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
  });
}

/* ── 2. HEADER SCROLL GLASS EFFECT ──────────────────────────────────── */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load and scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/* ── 3. MOBILE MENU TRIGGER ─────────────────────────────────────────── */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!menuToggle) return;

  // Toggle nav state class on body
  menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    const isOpen = document.body.classList.contains('nav-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── 4. SCREENSHOTS CAROUSEL SLIDER ─────────────────────────────────── */
function initCarousel() {
  const stage = document.querySelector('.carousel-stage');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const indicatorContainer = document.querySelector('.carousel-indicators');

  if (!stage || slides.length === 0) return;

  let currentIdx = 0;
  const totalSlides = slides.length;

  // Create indicators
  indicatorContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('li');
    dot.classList.add('carousel-indicator');
    if (idx === 0) dot.classList.add('active');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    dot.addEventListener('click', () => goToSlide(idx));
    indicatorContainer.appendChild(dot);
  });

  const indicators = document.querySelectorAll('.carousel-indicator');

  const updateSlider = () => {
    stage.style.transform = `translateX(-${currentIdx * 100}%)`;
    indicators.forEach((ind, idx) => {
      ind.classList.toggle('active', idx === currentIdx);
    });
  };

  const goToSlide = (idx) => {
    currentIdx = idx;
    updateSlider();
  };

  const prevSlide = () => {
    currentIdx = (currentIdx - 1 + totalSlides) % totalSlides;
    updateSlider();
  };

  const nextSlide = () => {
    currentIdx = (currentIdx + 1) % totalSlides;
    updateSlider();
  };

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Keyboard navigation support for slider
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
  }

  // Swipe support for touchscreens
  let startX = 0;
  let endX = 0;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });
}

/* ── 5. FAQ ACCORDION ───────────────────────────────────────────────── */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    
    if (!trigger || !panel) return;

    // Accessibility roles
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', panel.id || `faq-panel-${Math.random().toString(36).substr(2, 9)}`);

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other panels (Accordion behavior)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current panel
      item.classList.toggle('active', !isActive);
      trigger.setAttribute('aria-expanded', !isActive);
    });
  });
}

/* ── 6. CONTACT & ACCOUNT DELETION FORMS ────────────────────────────── */
function initContactForms() {
  // Support Inquiry Form
  const contactForm = document.getElementById('contact-form');
  const contactAlert = document.getElementById('contact-alert');

  if (contactForm && contactAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform simple verification
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Success animation
      contactAlert.style.display = 'block';
      contactAlert.textContent = 'Thank you! Your message has been sent successfully. We will respond back within 24 hours.';
      contactForm.reset();

      setTimeout(() => {
        contactAlert.style.display = 'none';
      }, 7000);
    });
  }

  // Account Deletion Request Form
  const deletionForm = document.getElementById('deletion-form');
  const deletionAlert = document.getElementById('deletion-alert');

  if (deletionForm && deletionAlert) {
    deletionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('del-email').value.trim();
      const phone = document.getElementById('del-phone').value.trim();
      const reason = document.getElementById('del-reason').value.trim();
      const confirm = document.getElementById('del-confirm').checked;

      if (!email || !phone || !confirm) {
        alert('Please fill in all mandatory fields and check the confirmation box.');
        return;
      }

      // Mock processing
      deletionAlert.style.display = 'block';
      deletionAlert.textContent = 'Account deletion request received. A verification email has been sent to ' + email + '. Complete the instructions to schedule permanent removal within 7 business days.';
      deletionForm.reset();

      setTimeout(() => {
        deletionAlert.style.display = 'none';
      }, 10000);
    });
  }
}

/* ── 7. INTERSECTION OBSERVER FOR SCROLL REVEAL ──────────────────────── */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if browser does not support IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* ── 8. 16 BUSINESS CATEGORIES SELECTOR ─────────────────────────────── */
function initCategorySelector() {
  const categoryData = {
    mobile: {
      title: '📱 Mobile Shop & Accessories',
      desc: 'Complete IMEI tracking, battery serials, tempered glass stock, Bluetooth accessories, and device buyback KYC registers.',
      features: ['Dual IMEI & Serial Tracking', 'Pre-loaded HSN Code Dictionary (8517, 8544)', 'Accessories & Spare Parts Bundling', 'Used Mobile Buyback & KYC Record'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            IMEI STOCK CHECKER
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);" id="imei-status">ACTIVE</span>
        </div>
        <div class="simulator-input-wrap">
          <input type="text" id="imei-input" class="simulator-input" value="860472019482104" placeholder="Enter IMEI / Serial...">
          <button id="imei-btn" class="simulator-btn">Search</button>
        </div>
        <div style="font-size: 0.8125rem; color: #94A3B8; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Device:</span><strong style="color: #fff;" id="imei-device">OnePlus 12 5G (Silky Black)</strong></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Specs:</span><span style="color: #E2E8F0;">256GB Storage, 12GB RAM</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Location:</span><span style="color: #E2E8F0;">Aisle B, Drawer 3</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Status:</span><span class="mock-chip" style="background-color: rgba(34, 197, 94, 0.15); color: var(--success); font-size: 0.6875rem;">IN STOCK</span></div>
        </div>
      `
    },
    service: {
      title: '🔧 Technical Repair Center',
      desc: 'Job-card creation, pre/post repair check-lists, pattern/PIN lock notes, technician assignment, and customer SMS/WhatsApp estimates.',
      features: ['Digital Intake Job Sheets', 'Pre-Repair Diagnostics Checklist', 'Technician Commission & Wages', 'ESC/POS Thermal Ticket Printing'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            REPAIR TICKET LIVE SIMULATOR
          </span>
          <span id="sim-status-badge" style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">IN DIAGNOSTICS</span>
        </div>
        <div class="simulator-input-wrap">
          <input type="text" id="sim-job-id" class="simulator-input" value="REP-2026-8812" placeholder="Enter Job ID...">
          <button id="sim-search-btn" class="simulator-btn">Track Job</button>
        </div>
        <div class="simulator-steps">
          <div class="step-node completed">
            <div class="step-dot">1</div>
            <span class="step-label">Intake</span>
          </div>
          <div class="step-node active">
            <div class="step-dot">2</div>
            <span class="step-label">Diagnostics</span>
          </div>
          <div class="step-node">
            <div class="step-dot">3</div>
            <span class="step-label">Repaired</span>
          </div>
          <div class="step-node">
            <div class="step-dot">4</div>
            <span class="step-label">Delivered</span>
          </div>
        </div>
      `
    },
    garments: {
      title: '👔 Garments & Footwear',
      desc: 'Grid-Matrix inventory for Size x Color x Material variants, barcode sticker printing, exchange credits, and seasonal catalogs.',
      features: ['2D Grid Matrix Stock Entry', 'Thermal Barcode Tag Printing', 'Size & Color Substitutes Finder', 'Season Stock Performance Analytics'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
            2D GRID STOCK MATRIX
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: #F59E0B;">ACTIVE SHIRT SLOTS</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px; font-weight: 700; color: #8B949E;">
            <span>Color \\ Size</span><span>M</span><span>L</span><span>XL</span>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;">
            <span>Black</span><strong>12 pcs</strong><strong>8 pcs</strong><strong>0 pcs</strong>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;">
            <span>Navy Blue</span><strong>15 pcs</strong><strong>10 pcs</strong><strong>5 pcs</strong>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;">
            <span>Olive Green</span><strong>4 pcs</strong><strong>1 pc</strong><strong>2 pcs</strong>
          </div>
          <div style="margin-top: 10px; padding: 8px; background: rgba(245,158,11,0.08); border-radius: 4px; border: 1px solid rgba(245,158,11,0.18); font-size: 0.75rem; color: #F59E0B; text-align: center;">
            ⚠️ Low Stock Alert: Olive Green (L) is under re-order limit!
          </div>
        </div>
      `
    },
    pharmacy: {
      title: '💊 Pharmacy & Medical Store',
      desc: 'Batch number & expiry date Sentinel tracking, Schedule H/H1 registers, salt composition search, and doctor prescription attachments.',
      features: ['Batch & Expiry Date Sentinel', 'Schedule H & H1 Compliance Registers', 'Medicine Composition Search', 'Margin & Discount Calculator'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            EXPIRY DATE SENTINEL
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--error);">2 ALERTS</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.8125rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.2); border-radius: 4px;">
            <div>
              <strong>Crocin 650mg</strong>
              <div style="font-size: 0.6875rem; color: #EF4444;">Batch CR-401</div>
            </div>
            <strong style="color: #EF4444;">Expires in 8 Days</strong>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.2); border-radius: 4px;">
            <div>
              <strong>Amoxicillin 250mg</strong>
              <div style="font-size: 0.6875rem; color: #F59E0B;">Batch AMX-912</div>
            </div>
            <strong style="color: #F59E0B;">Expires in 28 Days</strong>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px;">
            <div>
              <strong>Paracetamol 500mg</strong>
              <div style="font-size: 0.6875rem; color: #8B949E;">Batch PAR-112</div>
            </div>
            <span style="color: var(--success); font-weight: bold;">Healthy Expiry (2028)</span>
          </div>
        </div>
      `
    },
    grocery: {
      title: '🛒 Grocery & Supermarket',
      desc: 'Weight/unit selling (kg, g, L), barcode speed checkout, fast counter billing, and low-stock replenishment alerts.',
      features: ['Fast Counter Billing Mode', 'Custom Unit Conversions (kg/g/pack)', 'Loose Item Pricing', 'Restock & Velocity Warnings'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"></path></svg>
            QUICK COUNTER POS
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">READY TO BILL</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px;">
            <span>Basmati Rice (Premium) <small style="color: #64748B;">x 4.50 kg</small></span>
            <strong>₹382.50</strong>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px;">
            <span>Amul Gold Milk <small style="color: #64748B;">x 2 L</small></span>
            <strong>₹128.00</strong>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px;">
            <span>Fortune Soyabean Oil <small style="color: #64748B;">x 1 pack</small></span>
            <strong>₹145.00</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.9375rem;">
            <strong style="color: #fff;">Total (3 Items):</strong>
            <strong style="color: var(--accent);">₹655.50</strong>
          </div>
          <button class="simulator-btn" style="width: 100%; margin-top: 8px;">Print Thermal Receipt</button>
        </div>
      `
    },
    electronics: {
      title: '📺 Electronics & Appliances',
      desc: 'Serial number warranty validation, serial tracking for TVs, ACs, Refrigerators, and customer AMC contract logs.',
      features: ['Unit Serial & Warranty Tracking', 'AMC Service Contract Register', 'Landed Cost & Margin Calculators', 'Brand-wise Inventory Reports'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            WARRANTY &amp; AMC SELECTOR
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">ACTIVE</span>
        </div>
        <div class="simulator-input-wrap">
          <input type="text" class="simulator-input" value="SN-DAIKIN-15-4402" readonly>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Appliance:</span><strong style="color: #fff;">Daikin 1.5 Ton Split AC</strong></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Sold Date:</span><span style="color: #E2E8F0;">10 Oct 2025</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Warranty Exp:</span><strong style="color: var(--success);">09 Oct 2028 (Active)</strong></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">AMC Service:</span><span style="color: #E2E8F0;">Covered (Next Due: Feb 2027)</span></div>
        </div>
      `
    },
    automotive: {
      title: '🚗 Automotive & Spare Parts',
      desc: 'Chassis & Engine number records, vehicle Km driven intake, spare parts HSN lookup, and service work orders.',
      features: ['Chassis & Engine No. Intake', 'Odometer & Fuel Status Tracking', 'Spare Part HSN Lookup', 'Work Order & Job Estimates'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            VEHICLE JOB CARD
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: #F59E0B;">PENDING SERVICE</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Vehicle:</span><strong style="color: #fff;">Maruti Swift VXI (MH-12-JP-4022)</strong></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Odometer:</span><span style="color: #E2E8F0;">48,920 km</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Fuel Level:</span><span style="color: #E2E8F0;">1/4 Tank Checked</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Services:</span><span style="color: #E2E8F0;">Engine Oil Swap, Brake Pads replacement</span></div>
        </div>
      `
    },
    hardware: {
      title: '🔨 Hardware & Tools',
      desc: 'Bulk price slabs, trade discounts, MOQ reorder workbench, and construction material procurement tracking.',
      features: ['Bulk Tiered Price Slabs', 'MOQ & Reorder Workbench', 'Unit Conversions (Bags/Pcs)', 'Supplier Credit Ledger'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            QUANTITY SLAB CALCULATOR
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">CALCULATING</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 8px;">
          <div>
            <span style="color: #8B949E;">Item:</span> <strong style="color: #fff;">ACC Cement (50kg Bag)</strong>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px; background: rgba(255,255,255,0.03); padding: 8px; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between;"><span>1 - 9 bags:</span><span>₹420 / bag</span></div>
            <div style="display: flex; justify-content: space-between;"><span>10 - 49 bags:</span><span>₹395 / bag</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: bold; color: var(--success);"><span>50+ bags (Bulk):</span><span>₹375 / bag</span></div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
            <span>Enter Qty:</span>
            <input type="number" id="slab-qty" style="width: 70px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 4px; border-radius: 4px; text-align: center;" value="60">
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9375rem; font-weight: bold; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
            <span>Total Value:</span>
            <span style="color: var(--accent);" id="slab-total">₹22,500.00</span>
          </div>
        </div>
      `
    },
    clinic: {
      title: '🩺 Medical Clinic & Health',
      desc: 'Patient appointment records, consultation fees, medical history notes, prescription attachments, and bill receipts.',
      features: ['Patient History & Vitals Register', 'Prescription Attachment', 'Consultation Fee Invoicing', 'Appointment Log'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            PATIENT VITALS SHEET
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">VITAL HEALTH</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Patient:</span><strong style="color: #fff;">Ramesh Chandra (Age 54)</strong></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Blood Group:</span><span style="color: #E2E8F0;">O Positive (O+)</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">BP:</span><span style="color: #EF4444; font-weight: bold;">138/88 mmHg (Slight High)</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Rx Prescription:</span><span style="color: #E2E8F0;">Tab. Telmisartan 40mg (1-0-0)</span></div>
        </div>
      `
    },
    salon: {
      title: '💇 Salon & Wellness',
      desc: 'Service booking, technician commission tracking, packaged treatments, and customer membership ledgers.',
      features: ['Service Menu & Timing', 'Stylist Commission Logs', 'Customer Ledger & Reminders', 'Package Treatments'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            COMMISSION STATEMENT
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">UPDATED TODAY</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Stylist Barber:</span><strong style="color: #fff;">Imran Khan (Senior Tech)</strong></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Daily Services:</span><span style="color: #E2E8F0;">Haircut (₹300) + Hair Spa (₹600)</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Commission Rate:</span><span style="color: #E2E8F0;">30% standard payout</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9375rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;"><span style="color: #fff; font-weight: bold;">Payout Commission:</span><strong style="color: var(--accent);">₹270.00</strong></div>
        </div>
      `
    },
    wholesale: {
      title: '🏭 Wholesale Distribution',
      desc: 'Tiered wholesale pricing slabs, bulk invoicing, outstanding receivables aging (0-180 days), and CA GST exports.',
      features: ['Tiered Price Slabs', 'Receivables Aging Report', 'Prepared GSTR-1 & 3B CSV Export', 'Credit Limit Safeguards'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            RECEIVABLES AGING (Udhari)
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--error);">OVERDUE WARNING</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between;"><span>0 - 30 Days (Current):</span><strong style="color: var(--success);">₹2,45,000.00</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>31 - 90 Days:</span><strong style="color: #F59E0B;">₹1,12,000.00</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>91 - 180 Days:</span><strong style="color: #EF4444;">₹42,500.00</strong></div>
          <div style="padding: 6px; background: rgba(239,68,68,0.1); border-radius: 4px; font-size: 0.75rem; color: #EF4444; text-align: center; border: 1px solid rgba(239,68,68,0.15);">
            ⚠️ Total Pending Receivables: ₹3,99,500.00
          </div>
        </div>
      `
    },
    manufacturing: {
      title: '⚙️ Manufacturing & Assembly',
      desc: 'Bill of Materials (BOM), production batch tracking, Work-In-Progress (WIP) stock, and scrap yield efficiency reports.',
      features: ['Bill of Materials (BOM)', 'Production Batch Allocation', 'WIP & Raw Material Tracking', 'Yield & Scrap Reports'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            BILL OF MATERIALS (BOM)
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">SAVED BOM</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
          <div><span style="color: #64748B;">Assembly Target:</span> <strong style="color: #fff;">1x Metal Stand</strong></div>
          <div style="border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 4px; margin-bottom: 4px; color: #8B949E; font-weight: bold;">Raw Material Recipe:</div>
          <div style="display: flex; justify-content: space-between;"><span>Raw Steel Sheet (2.4 kg):</span><strong>₹168.00</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>Mounting Screws (4 pcs):</span><strong>₹12.00</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>Powder Coating paint:</span><strong>₹45.00</strong></div>
          <div style="display: flex; justify-content: space-between; font-weight: bold; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;"><span>Total BOM Material Cost:</span><span style="color: var(--accent);">₹225.00</span></div>
        </div>
      `
    },
    restaurant: {
      title: '🍽️ Restaurant & Cafe',
      desc: 'Kitchen Order Tickets (KOT), Table Merge/Split, Dine-in/Takeaway toggle, item modifiers (No Onion, Extra Spicy), and shift settlement.',
      features: ['KOT Kitchen Printing', 'Table Management (Merge/Split)', 'Item Modifiers & Customizations', 'Daily Shift Settlement'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            LIVE TABLE KOT TRACKER
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: #F59E0B;" id="kot-status">COOKING</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
          <div><span style="color: #64748B;">Table:</span> <strong style="color: #fff;">Table No. 4 (3 Guests)</strong></div>
          <div style="border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 4px; margin-bottom: 4px; color: #8B949E; font-weight: bold;">Items in Production:</div>
          <div style="display: flex; justify-content: space-between;"><span>2x Paneer Tikka Masala <small style="color: #EF4444;">(No Onion)</small></span><strong>Pending</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>3x Butter Naan</span><strong>Delivered</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>1x Jeera Rice <small style="color: var(--accent);">(Extra Spicy)</small></span><strong>Cooking</strong></div>
        </div>
      `
    },
    construction: {
      title: '🏗️ Construction & Projects',
      desc: 'Site expense tracking, contractor material procurement, client ledger estimates, and project cost breakdowns.',
      features: ['Site Expense Tracking', 'Contractor Material Procurement', 'Client Ledger & Estimates', 'Project Costing Reports'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM9 9h6v6H9z"></path></svg>
            PROJECT SITE ACCOUNTING
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">UNDER BUDGET</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
          <div><span style="color: #64748B;">Site Project:</span> <strong style="color: #fff;">Vraj Heights - Phase 1</strong></div>
          <div style="border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 4px; margin-bottom: 4px; color: #8B949E; font-weight: bold;">Material Costs Recorded:</div>
          <div style="display: flex; justify-content: space-between;"><span>Cement Procurement:</span><strong>₹1,85,000.00</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>TMT Steel Bars:</span><strong>₹3,40,000.00</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>Bricks &amp; Sand supplies:</span><strong>₹92,000.00</strong></div>
          <div style="display: flex; justify-content: space-between; font-weight: bold; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;"><span>Total Site Expenses:</span><span style="color: var(--accent);">₹6,17,000.00</span></div>
        </div>
      `
    },
    secondhand: {
      title: '📱 Used Mobiles (Margin Scheme)',
      desc: 'Digital buyback registers, device condition reports, seller ID photo proof, and legal shield purchase receipts.',
      features: ['Seller KYC & Document Intake', 'Margin Scheme GST Taxation', 'Used Device Buyback Workflow', 'IMEI History Audit Trail'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            BUYBACK KYC CHECKLIST
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">PASSED KYC</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Device:</span><strong style="color: #fff;">iPhone 13 Pro (128GB Gold)</strong></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Seller:</span><span style="color: #E2E8F0;">R.S. Malek (Anand)</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Document:</span><span style="color: #E2E8F0;">Aadhaar card uploaded (Verified)</span></div>
          <div style="display: flex; justify-content: space-between; align-items: center;"><span style="color: #64748B;">Find My iPhone:</span><span class="mock-chip" style="background-color: rgba(34, 197, 94, 0.15); color: var(--success); font-size: 0.6875rem;">DISABLED ✅</span></div>
          <div style="display: flex; justify-content: space-between; align-items: center;"><span style="color: #64748B;">Central IMEI Status:</span><span class="mock-chip" style="background-color: rgba(34, 197, 94, 0.15); color: var(--success); font-size: 0.6875rem;">CLEAN (No Blacklist)</span></div>
        </div>
      `
    },
    general: {
      title: '📦 General Retail & Trade',
      desc: 'Universal inventory, GST billing, double-entry financial ledger, expense tracking, and offline SQLCipher backup.',
      features: ['Universal Stock & Billing', 'Double-Entry Financial Ledger', 'AES-256 SQLCipher Local DB', 'Google Drive Encrypted Sync'],
      widgetHtml: `
        <div class="simulator-header">
          <span class="simulator-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            UNIVERSAL SALE INVOICE
          </span>
          <span style="font-size: 0.6875rem; font-weight: 700; color: var(--success);">COMPLETED</span>
        </div>
        <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Customer:</span><strong style="color: #fff;">Walk-in General Customer</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>Retail Item Pack A:</span><strong>₹1,200.00</strong></div>
          <div style="display: flex; justify-content: space-between;"><span>Retail Item Pack B:</span><strong>₹450.00</strong></div>
          <div style="display: flex; justify-content: space-between; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4px;"><span>Subtotal:</span><span>₹1,650.00</span></div>
          <div style="display: flex; justify-content: space-between;"><span>GST Tax (18%):</span><span>₹297.00</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9375rem; font-weight: bold; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4px;"><span>Total Bill Due:</span><span style="color: var(--accent);">₹1,947.00</span></div>
        </div>
      `
    }
  };

  const chips = document.querySelectorAll('.category-chip-btn');
  const titleEl = document.getElementById('cat-detail-title');
  const descEl = document.getElementById('cat-detail-desc');
  const listEl = document.getElementById('cat-feature-list');
  const simContainer = document.getElementById('cat-simulator-container');
 
  if (!chips.length || !titleEl || !descEl || !listEl || !simContainer) return;

  // Render default (mobile) on load
  const loadDefault = () => {
    const defaultData = categoryData['mobile'];
    titleEl.innerHTML = defaultData.title;
    descEl.textContent = defaultData.desc;
    listEl.innerHTML = defaultData.features.map(feat => `
      <li class="category-feature-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${feat}</span>
      </li>
    `).join('');
    simContainer.innerHTML = defaultData.widgetHtml;
    bindWidgetEvents('mobile');
  };
  loadDefault();

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const catKey = chip.getAttribute('data-cat');
      const data = categoryData[catKey];

      if (!data) return;

      // Active state on chips
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      // Update content with smooth transition
      titleEl.innerHTML = data.title;
      descEl.textContent = data.desc;

      listEl.innerHTML = data.features.map(feat => `
        <li class="category-feature-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${feat}</span>
        </li>
      `).join('');

      simContainer.innerHTML = data.widgetHtml;
      bindWidgetEvents(catKey);
    });
  });
}

/* ── 9. DYNAMIC WIDGET EVENTS BINDINGS ──────────────────────────────── */
function bindWidgetEvents(catKey) {
  if (catKey === 'service') {
    // Re-initialize the repair tracker simulator dynamically
    initRepairSimulator();
  } else if (catKey === 'mobile') {
    const btn = document.getElementById('imei-btn');
    const input = document.getElementById('imei-input');
    const status = document.getElementById('imei-status');
    const device = document.getElementById('imei-device');

    if (btn && input && status && device) {
      btn.addEventListener('click', () => {
        const query = input.value.trim();
        status.textContent = 'Verifying...';
        status.style.color = '#F59E0B';

        setTimeout(() => {
          if (query.length < 8) {
            status.textContent = 'INVALID SERIAL';
            status.style.color = '#EF4444';
            device.textContent = 'No matching device found';
          } else {
            status.textContent = 'VERIFIED';
            status.style.color = '#16A34A';
            device.textContent = query.startsWith('86') ? 'OnePlus 12 5G (Silky Black)' : 'Samsung Galaxy S24 Ultra';
          }
        }, 500);
      });
    }
  } else if (catKey === 'hardware') {
    const qtyInput = document.getElementById('slab-qty');
    const totalEl = document.getElementById('slab-total');

    if (qtyInput && totalEl) {
      qtyInput.addEventListener('input', () => {
        const qty = parseInt(qtyInput.value) || 0;
        let rate = 420;
        if (qty >= 10 && qty < 50) rate = 395;
        else if (qty >= 50) rate = 375;

        const total = qty * rate;
        totalEl.textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      });
    }
  }
}

/* ── 10. INTERACTIVE REPAIR TRACKER SIMULATOR ─────────────────────────── */
function initRepairSimulator() {
  const btn = document.getElementById('sim-search-btn');
  const input = document.getElementById('sim-job-id');
  const steps = document.querySelectorAll('.step-node');
  const statusBadge = document.getElementById('sim-status-badge');

  if (!btn || !input || !steps.length || !statusBadge) return;

  btn.addEventListener('click', () => {
    const query = input.value.trim() || 'REP-2026-8812';
    input.value = query;

    // Simulate progress check
    statusBadge.textContent = 'Searching...';
    statusBadge.style.color = '#F59E0B';

    setTimeout(() => {
      // Pick simulated status step
      const stepIndex = Math.floor(Math.random() * 4); // 0: Intake, 1: Diagnosing, 2: Repairing, 3: Ready
      const statusNames = ['INTAKE RECORDED', 'IN DIAGNOSTICS', 'PARTS REPLACED', 'READY FOR PICKUP'];
      const statusColors = ['#ADC6FF', '#F59E0B', '#1A56DB', '#16A34A'];

      steps.forEach((node, idx) => {
        node.classList.remove('active', 'completed');
        if (idx < stepIndex) {
          node.classList.add('completed');
        } else if (idx === stepIndex) {
          node.classList.add('active');
        }
      });

      statusBadge.textContent = statusNames[stepIndex];
      statusBadge.style.color = statusColors[stepIndex];
    }, 600);
  });
}



