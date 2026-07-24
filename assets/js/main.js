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
  initCookieBanner();
});

/* ── COOKIE CONSENT BANNER CONTROLLER ───────────────────────────────── */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (!banner) return;

  const consent = localStorage.getItem('cookie_consent');
  if (!consent) {
    banner.style.display = 'block';
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'accepted');
      banner.style.display = 'none';
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'declined');
      banner.style.display = 'none';
    });
  }
}

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
      }, 7000);
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
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:20px;height:20px;background:linear-gradient(135deg,#1A56DB,#F59E0B);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.5rem;font-weight:900;color:#fff;">VP</div>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">SM Mobile • IMEI Registry</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">HSN 8517 MATCH</span>
          </div>
          <div class="simulator-input-wrap" style="display:flex;gap:6px;margin-bottom:8px;">
            <input type="text" id="imei-input" class="simulator-input" value="860472019482104" placeholder="Enter IMEI / Serial..." style="font-size:0.6875rem;padding:6px 8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#fff;border-radius:6px;flex:1;">
            <button id="imei-btn" class="simulator-btn" style="font-size:0.625rem;padding:6px 10px;background:#1A56DB;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Validate</button>
          </div>
          <div style="font-size:0.6875rem;color:#94A3B8;display:flex;flex-direction:column;gap:5px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Device Model:</span><strong style="color:#fff;" id="imei-device">OnePlus 12 5G (Silky Black)</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Industry Spec:</span><span style="color:#E2E8F0;">256GB / 12GB RAM • Battery SN Verified</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Storage Bin:</span><span style="color:#E2E8F0;">Drawer B-3 (Row 2)</span></div>
            <div style="display:flex;justify-content:space-between;align-items:center;"><span style="color:#64748B;">Room DB Status:</span><span class="mock-chip" style="background:rgba(34,197,94,0.15);color:#22C55E;font-size:0.5625rem;padding:2px 6px;border-radius:4px;font-weight:700;" id="imei-status">IN STOCK (18 Units)</span></div>
          </div>
        </div>`
    },
    service: {
      title: '🔧 Technical Repair Center',
      desc: 'Job-card creation, pre/post repair check-lists, pattern/PIN lock notes, technician assignment, and customer SMS/WhatsApp estimates.',
      features: ['Digital Intake Job Sheets', 'Pre-Repair Diagnostics Checklist', 'Technician Commission & Wages', 'ESC/POS Thermal Ticket Printing'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">🛠️</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Repair Job Sheet • REP-2026-8812</span>
            </div>
            <span id="sim-status-badge" style="font-size:0.5625rem;font-weight:700;color:#F59E0B;background:rgba(245,158,11,0.15);padding:2px 6px;border-radius:4px;">DIAGNOSING</span>
          </div>
          <div style="font-size:0.6875rem;color:#94A3B8;display:flex;flex-direction:column;gap:4px;margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Device:</span><strong style="color:#fff;">iPhone 14 Pro (Screen & Battery)</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Technician:</span><span style="color:#3B82F6;font-weight:600;">Imran Khan (Commission: 30%)</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Pattern Lock Note:</span><span style="color:#F59E0B;font-family:monospace;">Pattern 'Z' recorded</span></div>
          </div>
          <div class="simulator-steps" style="display:flex;justify-content:space-between;margin-top:6px;position:relative;">
            <div class="step-node completed" style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <div class="step-dot" style="width:20px;height:20px;border-radius:50%;background:#22C55E;color:#fff;font-size:0.5625rem;font-weight:700;display:flex;align-items:center;justify-content:center;">✓</div>
              <span class="step-label" style="font-size:0.5rem;color:#fff;">Intake</span>
            </div>
            <div class="step-node active" style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <div class="step-dot" style="width:20px;height:20px;border-radius:50%;background:#1A56DB;color:#fff;font-size:0.5625rem;font-weight:700;display:flex;align-items:center;justify-content:center;">2</div>
              <span class="step-label" style="font-size:0.5rem;color:#3B82F6;font-weight:700;">Diagnostic</span>
            </div>
            <div class="step-node" style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <div class="step-dot" style="width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.1);color:#64748B;font-size:0.5625rem;display:flex;align-items:center;justify-content:center;">3</div>
              <span class="step-label" style="font-size:0.5rem;color:#64748B;">Repaired</span>
            </div>
            <div class="step-node" style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <div class="step-dot" style="width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.1);color:#64748B;font-size:0.5625rem;display:flex;align-items:center;justify-content:center;">4</div>
              <span class="step-label" style="font-size:0.5rem;color:#64748B;">Delivered</span>
            </div>
          </div>
        </div>`
    },
    garments: {
      title: '👔 Garments & Footwear',
      desc: 'Grid-Matrix inventory for Size x Color x Material variants, barcode sticker printing, exchange credits, and seasonal catalogs.',
      features: ['2D Grid Matrix Stock Entry', 'Thermal Barcode Tag Printing', 'Size & Color Substitutes Finder', 'Season Stock Performance Analytics'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">👔</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">2D Grid Matrix • HSN 6109</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#F59E0B;background:rgba(245,158,11,0.15);padding:2px 6px;border-radius:4px;">RE-ORDER WARNING</span>
          </div>
          <div style="font-size:0.625rem;display:flex;flex-direction:column;gap:6px;">
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:4px;font-weight:700;color:#8B949E;">
              <span>Color \\ Size</span><span>M</span><span>L</span><span>XL</span>
            </div>
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;color:#fff;">
              <span>Black Cotton</span><span style="color:#22C55E;font-weight:700;">12 pcs</span><span style="color:#22C55E;font-weight:700;">8 pcs</span><span style="color:#EF4444;font-weight:700;">0 pcs</span>
            </div>
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;color:#fff;">
              <span>Navy Denim</span><span style="color:#22C55E;font-weight:700;">15 pcs</span><span style="color:#22C55E;font-weight:700;">10 pcs</span><span style="color:#22C55E;font-weight:700;">5 pcs</span>
            </div>
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;color:#fff;">
              <span>Olive Linen</span><span style="color:#22C55E;font-weight:700;">4 pcs</span><span style="color:#EF4444;font-weight:700;">1 pc ⚠️</span><span style="color:#22C55E;font-weight:700;">2 pcs</span>
            </div>
            <div style="margin-top:4px;padding:5px 8px;background:rgba(245,158,11,0.1);border-radius:6px;border:1px solid rgba(245,158,11,0.2);font-size:0.5625rem;color:#F59E0B;text-align:center;font-weight:600;">
              ⚠️ Auto Alert: Olive Linen (L) below 3-unit safety buffer!
            </div>
          </div>
        </div>`
    },
    pharmacy: {
      title: '💊 Pharmacy & Medical Store',
      desc: 'Batch number & expiry date Sentinel tracking, Schedule H/H1 registers, salt composition search, and doctor prescription attachments.',
      features: ['Batch & Expiry Date Sentinel', 'Schedule H & H1 Compliance Registers', 'Medicine Composition Search', 'Margin & Discount Calculator'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">💊</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Expiry Date Sentinel • HSN 3004</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#EF4444;background:rgba(239,68,68,0.15);padding:2px 6px;border-radius:4px;">SCHEDULE H REGISTER</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:5px;font-size:0.625rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 8px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.2);border-radius:6px;">
              <div><strong style="color:#fff;">Crocin 650mg</strong><div style="font-size:0.5rem;color:#EF4444;">Batch CR-401 • Paracetamol 650mg</div></div>
              <strong style="color:#EF4444;font-size:0.5625rem;">Expires in 8 Days ⚠️</strong>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 8px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.2);border-radius:6px;">
              <div><strong style="color:#fff;">Amoxicillin 250mg</strong><div style="font-size:0.5rem;color:#F59E0B;">Batch AMX-912 • Schedule H1</div></div>
              <strong style="color:#F59E0B;font-size:0.5625rem;">Expires in 28 Days</strong>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:6px;">
              <div><strong style="color:#fff;">Azithromycin 500mg</strong><div style="font-size:0.5rem;color:#8B949E;">Batch AZI-112</div></div>
              <span style="color:#22C55E;font-weight:bold;font-size:0.5625rem;">Healthy Expiry (2028)</span>
            </div>
          </div>
        </div>`
    },
    grocery: {
      title: '🛒 Grocery & Supermarket',
      desc: 'Weight/unit selling (kg, g, L), barcode speed checkout, fast counter billing, and low-stock replenishment alerts.',
      features: ['Fast Counter Billing Mode', 'Custom Unit Conversions (kg/g/pack)', 'Loose Item Pricing', 'Restock & Velocity Warnings'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">🛒</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Express Counter POS • HSN 1006</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">BARCODE ACTIVE</span>
          </div>
          <div style="font-size:0.625rem;display:flex;flex-direction:column;gap:5px;">
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;color:#fff;">
              <span>Basmati Rice <small style="color:#64748B;">x 4.50 kg @ ₹85/kg</small></span>
              <strong style="font-family:monospace;">₹382.50</strong>
            </div>
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;color:#fff;">
              <span>Amul Gold Milk <small style="color:#64748B;">x 2 L</small></span>
              <strong style="font-family:monospace;">₹128.00</strong>
            </div>
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:3px;color:#fff;">
              <span>Fortune Soyabean Oil <small style="color:#64748B;">x 1 pack</small></span>
              <strong style="font-family:monospace;">₹145.00</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:4px;font-size:0.75rem;">
              <strong style="color:#fff;">Net Payable:</strong>
              <strong style="color:#F59E0B;font-family:monospace;">₹655.50</strong>
            </div>
          </div>
        </div>`
    },
    electronics: {
      title: '📺 Electronics & Appliances',
      desc: 'Serial number warranty validation, serial tracking for TVs, ACs, Refrigerators, and customer AMC contract logs.',
      features: ['Unit Serial & Warranty Tracking', 'AMC Service Contract Register', 'Landed Cost & Margin Calculators', 'Brand-wise Inventory Reports'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">📺</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Serial & AMC Validator • HSN 8415</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">WARRANTY ACTIVE</span>
          </div>
          <div style="font-size:0.625rem;color:#94A3B8;display:flex;flex-direction:column;gap:5px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Serial Number:</span><strong style="color:#fff;font-family:monospace;">SN-DAIKIN-15-4402</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Appliance:</span><strong style="color:#fff;">Daikin 1.5 Ton Inverter AC</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Sold Date:</span><span style="color:#E2E8F0;">10 Oct 2025</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Warranty Exp:</span><strong style="color:#22C55E;">09 Oct 2028 (3 Years Covered)</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">AMC Service:</span><span style="color:#3B82F6;">Next Service Due: Feb 2027</span></div>
          </div>
        </div>`
    },
    automotive: {
      title: '🚗 Automotive & Spare Parts',
      desc: 'Chassis & Engine number records, vehicle Km driven intake, spare parts HSN lookup, and service work orders.',
      features: ['Chassis & Engine No. Intake', 'Odometer & Fuel Status Tracking', 'Spare Part HSN Lookup', 'Work Order & Job Estimates'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">🚗</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Vehicle Job Sheet • HSN 8708</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#F59E0B;background:rgba(245,158,11,0.15);padding:2px 6px;border-radius:4px;">IN SERVICE</span>
          </div>
          <div style="font-size:0.625rem;color:#94A3B8;display:flex;flex-direction:column;gap:5px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Reg Number:</span><strong style="color:#fff;">MH-12-JP-4022 (Maruti Swift VXI)</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Chassis / Engine:</span><span style="color:#E2E8F0;font-family:monospace;">MA3F... / K12M...</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Odometer:</span><span style="color:#E2E8F0;">48,920 km • Fuel: 1/4 Tank</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Service Checklist:</span><span style="color:#22C55E;">Engine Oil Swap, Brake Pads</span></div>
          </div>
        </div>`
    },
    hardware: {
      title: '🔨 Hardware & Tools',
      desc: 'Bulk price slabs, trade discounts, MOQ reorder workbench, and construction material procurement tracking.',
      features: ['Bulk Tiered Price Slabs', 'MOQ & Reorder Workbench', 'Unit Conversions (Bags/Pcs)', 'Supplier Credit Ledger'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">🔨</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Tiered Quantity Slabs • MOQ Workbench</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">BULK DISCOUNTS</span>
          </div>
          <div style="font-size:0.625rem;display:flex;flex-direction:column;gap:5px;color:#fff;">
            <div><span style="color:#64748B;">Item:</span> <strong>ACC Cement (50kg Bag)</strong></div>
            <div style="display:flex;justify-content:space-between;background:rgba(255,255,255,0.03);padding:4px 6px;border-radius:4px;"><span>1 - 9 bags:</span><span>₹420 / bag</span></div>
            <div style="display:flex;justify-content:space-between;background:rgba(255,255,255,0.03);padding:4px 6px;border-radius:4px;"><span>10 - 49 bags:</span><span>₹395 / bag</span></div>
            <div style="display:flex;justify-content:space-between;background:rgba(34,197,94,0.1);padding:4px 6px;border-radius:4px;border:1px solid rgba(34,197,94,0.2);"><strong style="color:#22C55E;">50+ bags (Bulk Tier):</strong><strong style="color:#22C55E;">₹375 / bag</strong></div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:2px;">
              <span>Selected Qty: <strong>60 bags</strong></span>
              <span style="color:#F59E0B;font-weight:bold;font-size:0.75rem;font-family:monospace;">Total: ₹22,500.00</span>
            </div>
          </div>
        </div>`
    },
    clinic: {
      title: '🩺 Medical Clinic & Health',
      desc: 'Patient appointment records, consultation fees, medical history notes, prescription attachments, and bill receipts.',
      features: ['Patient History & Vitals Register', 'Prescription Attachment', 'Consultation Fee Invoicing', 'Appointment Log'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">🩺</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Patient Vitals & Rx Invoice</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">CONFIDENTIAL</span>
          </div>
          <div style="font-size:0.625rem;color:#94A3B8;display:flex;flex-direction:column;gap:5px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Patient:</span><strong style="color:#fff;">Ramesh Chandra (Age 54, Male)</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Blood Group:</span><span style="color:#E2E8F0;">O Positive (O+)</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">BP Vitals:</span><span style="color:#EF4444;font-weight:700;">138/88 mmHg (Slight High)</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Rx Prescription:</span><span style="color:#E2E8F0;">Tab. Telmisartan 40mg (1-0-0)</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Consultation Fee:</span><strong style="color:#F59E0B;font-family:monospace;">₹500.00</strong></div>
          </div>
        </div>`
    },
    salon: {
      title: '💇 Salon & Wellness',
      desc: 'Service booking, technician commission tracking, packaged treatments, and customer membership ledgers.',
      features: ['Service Menu & Timing', 'Stylist Commission Logs', 'Customer Ledger & Reminders', 'Package Treatments'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">💇</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Stylist Payout • Commission Ledger</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">UPDATED TODAY</span>
          </div>
          <div style="font-size:0.625rem;color:#94A3B8;display:flex;flex-direction:column;gap:5px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Senior Stylist:</span><strong style="color:#fff;">Imran Khan</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Daily Services:</span><span style="color:#E2E8F0;">Haircut (₹300) + Hair Spa (₹600)</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Commission Rate:</span><span style="color:#E2E8F0;">30% Payout Agreement</span></div>
            <div style="display:flex;justify-content:space-between;border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;"><strong style="color:#fff;">Net Stylist Payout:</strong><strong style="color:#F59E0B;font-family:monospace;font-size:0.75rem;">₹270.00</strong></div>
          </div>
        </div>`
    },
    wholesale: {
      title: '🏭 Wholesale Distribution',
      desc: 'Tiered wholesale pricing slabs, bulk invoicing, outstanding receivables aging (0-180 days), and CA GST exports.',
      features: ['Tiered Price Slabs', 'Receivables Aging Report', 'Prepared GSTR-1 & 3B CSV Export', 'Credit Limit Safeguards'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">🏭</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Receivables Aging (Udhari)</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#EF4444;background:rgba(239,68,68,0.15);padding:2px 6px;border-radius:4px;">OVERDUE AUDIT</span>
          </div>
          <div style="font-size:0.625rem;display:flex;flex-direction:column;gap:5px;color:#fff;">
            <div style="display:flex;justify-content:space-between;"><span>0 - 30 Days (Current):</span><strong style="color:#22C55E;font-family:monospace;">₹2,45,000.00</strong></div>
            <div style="display:flex;justify-content:space-between;"><span>31 - 90 Days:</span><strong style="color:#F59E0B;font-family:monospace;">₹1,12,000.00</strong></div>
            <div style="display:flex;justify-content:space-between;"><span>91 - 180+ Days (Overdue):</span><strong style="color:#EF4444;font-family:monospace;">₹42,500.00</strong></div>
            <div style="margin-top:2px;padding:4px 6px;background:rgba(239,68,68,0.1);border-radius:4px;border:1px solid rgba(239,68,68,0.2);color:#EF4444;text-align:center;font-weight:700;font-size:0.5625rem;">
              Total Receivables: ₹3,99,500.00 • GSTR-1 CSV Ready
            </div>
          </div>
        </div>`
    },
    manufacturing: {
      title: '⚙️ Manufacturing & Assembly',
      desc: 'Bill of Materials (BOM), production batch tracking, Work-In-Progress (WIP) stock, and scrap yield efficiency reports.',
      features: ['Bill of Materials (BOM)', 'Production Batch Allocation', 'WIP & Raw Material Tracking', 'Yield & Scrap Reports'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">⚙️</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Bill of Materials (BOM) • HSN 7204</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">SAVED RECIPE</span>
          </div>
          <div style="font-size:0.625rem;color:#94A3B8;display:flex;flex-direction:column;gap:4px;">
            <div><span style="color:#64748B;">Assembly Target:</span> <strong style="color:#fff;">1x Metal Stand Assembly</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>Raw Steel Sheet (2.4 kg):</span><strong style="font-family:monospace;">₹168.00</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>Mounting Screws (4 pcs):</span><strong style="font-family:monospace;">₹12.00</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>Powder Coating Paint:</span><strong style="font-family:monospace;">₹45.00</strong></div>
            <div style="display:flex;justify-content:space-between;border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;"><strong style="color:#fff;">Total BOM Recipe Cost:</strong><strong style="color:#F59E0B;font-family:monospace;font-size:0.75rem;">₹225.00</strong></div>
          </div>
        </div>`
    },
    restaurant: {
      title: '🍽️ Restaurant & Cafe',
      desc: 'Kitchen Order Tickets (KOT), Table Merge/Split, Dine-in/Takeaway toggle, item modifiers (No Onion, Extra Spicy), and shift settlement.',
      features: ['KOT Kitchen Printing', 'Table Management (Merge/Split)', 'Item Modifiers & Customizations', 'Daily Shift Settlement'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">🍽️</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Table KOT & KDS • HSN 996331</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#F59E0B;background:rgba(245,158,11,0.15);padding:2px 6px;border-radius:4px;">COOKING (KDS)</span>
          </div>
          <div style="font-size:0.625rem;color:#94A3B8;display:flex;flex-direction:column;gap:5px;">
            <div><span style="color:#64748B;">Table Number:</span> <strong style="color:#fff;">Table 4 (3 Guests • Dine-in)</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>2x Paneer Tikka <small style="color:#EF4444;">(No Onion)</small></span><strong style="color:#F59E0B;">Cooking</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>3x Butter Naan</span><strong style="color:#22C55E;">Served</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>1x Jeera Rice <small style="color:#F59E0B;">(Extra Spicy)</small></span><strong style="color:#F59E0B;">Cooking</strong></div>
          </div>
        </div>`
    },
    construction: {
      title: '🏗️ Construction & Projects',
      desc: 'Site expense tracking, contractor material procurement, client ledger estimates, and project cost breakdowns.',
      features: ['Site Expense Tracking', 'Contractor Material Procurement', 'Client Ledger & Estimates', 'Project Costing Reports'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">🏗️</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Project Site Ledger • Site #01</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">UNDER BUDGET</span>
          </div>
          <div style="font-size:0.625rem;color:#94A3B8;display:flex;flex-direction:column;gap:4px;">
            <div><span style="color:#64748B;">Site Name:</span> <strong style="color:#fff;">Vraj Heights - Phase 1</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>Cement Supplies:</span><strong style="font-family:monospace;">₹1,85,000.00</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>TMT Steel Bars:</span><strong style="font-family:monospace;">₹3,40,000.00</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>Sand & Bricks:</span><strong style="font-family:monospace;">₹92,000.00</strong></div>
            <div style="display:flex;justify-content:space-between;border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;"><strong style="color:#fff;">Total Site Expenses:</strong><strong style="color:#F59E0B;font-family:monospace;font-size:0.75rem;">₹6,17,000.00</strong></div>
          </div>
        </div>`
    },
    secondhand: {
      title: '📱 Used Mobiles (Margin Scheme)',
      desc: 'Digital buyback registers, device condition reports, seller ID photo proof, and legal shield purchase receipts.',
      features: ['Seller KYC & Document Intake', 'Margin Scheme GST Taxation', 'Used Device Buyback Workflow', 'IMEI History Audit Trail'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">📱</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Device Buyback KYC Register</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">VERIFIED KYC</span>
          </div>
          <div style="font-size:0.625rem;color:#94A3B8;display:flex;flex-direction:column;gap:5px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Used Item:</span><strong style="color:#fff;">iPhone 13 Pro (128GB Gold)</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Seller Name:</span><span style="color:#E2E8F0;">R.S. Malek (Anand)</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Identity Proof:</span><span style="color:#22C55E;">Aadhaar Uploaded ✓</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Find My iPhone:</span><span style="color:#22C55E;">DISABLED ✓</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Central IMEI Status:</span><span style="color:#22C55E;font-weight:700;">CLEAN (No Blacklist)</span></div>
          </div>
        </div>`
    },
    general: {
      title: '📦 General Retail & Trade',
      desc: 'Universal inventory, GST billing, double-entry financial ledger, expense tracking, and offline SQLCipher backup.',
      features: ['Universal Stock & Billing', 'Double-Entry Financial Ledger', 'AES-256 SQLCipher Local DB', 'Google Drive Encrypted Sync'],
      widgetHtml: `
        <div class="app-screen-mock" style="width:100%;background:#0A0A0F;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
          <div class="mock-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:6px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:0.875rem;">📦</span>
              <span style="font-size:0.6875rem;font-weight:700;color:#fff;">Universal GST Tax Invoice</span>
            </div>
            <span style="font-size:0.5625rem;font-weight:700;color:#22C55E;background:rgba(34,197,94,0.15);padding:2px 6px;border-radius:4px;">AES-256 ENCRYPTED</span>
          </div>
          <div style="font-size:0.625rem;color:#94A3B8;display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:#64748B;">Customer:</span><strong style="color:#fff;">Walk-in Retail Customer</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>General Retail Item A:</span><strong style="font-family:monospace;">₹1,200.00</strong></div>
            <div style="display:flex;justify-content:space-between;color:#fff;"><span>General Retail Item B:</span><strong style="font-family:monospace;">₹450.00</strong></div>
            <div style="display:flex;justify-content:space-between;"><span>CGST (9%) + SGST (9%):</span><span>₹297.00</span></div>
            <div style="display:flex;justify-content:space-between;border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;"><strong style="color:#fff;">Net Invoice Total:</strong><strong style="color:#F59E0B;font-family:monospace;font-size:0.75rem;">₹1,947.00</strong></div>
          </div>
        </div>`
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

      // Smoothly center the clicked chip in the horizontal scroll container
      chip.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });

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



