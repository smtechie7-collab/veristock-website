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
  initVerticalsArchitectureHub();
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

/* ── 8. 18 SPECIALIZED OPERATIONAL ARCHETYPES ARCHITECTURAL HUB ─────── */
function initVerticalsArchitectureHub() {
  const VERTICAL_ARCHETYPES = {
    MOBILE_SHOP: {
      id: 'MOBILE_SHOP',
      name: 'Mobile Shop & Accessories',
      icon: '📱',
      dna: 'TECHNICAL_SERVICE',
      mode: 'RETAIL',
      strategy: 'MOBILE',
      badge: 'HSN 8517',
      desc: 'Complete dual IMEI tracking, battery serials, tempered glass stock, Bluetooth accessories bundling, and device buyback KYC legal shield registers.',
      features: [
        'Dual IMEI1/IMEI2 Validation with checksum & blacklist audit',
        'Pre-loaded HSN Code Dictionary (85171300, 8544, 8518, 3926)',
        'Battery serial numbers & tempered glass matrix grouping',
        'Counter POS with instant ESC/POS 58mm/80mm Bluetooth printing'
      ],
      schema: ['imei_primary', 'imei_secondary', 'battery_serial', 'storage_bin', 'color_variant', 'brand_id'],
      terminology: [
        { standard: 'Customer', localized: 'Customer / Buyer', purpose: 'Standard B2C & B2B retail buyers' },
        { standard: 'Product', localized: 'Mobile Device / Accessory', purpose: 'IMEI-serialized or barcode stock' },
        { standard: 'Stock Unit', localized: 'Piece (Pcs)', purpose: 'Unit of individual handset sales' },
        { standard: 'Repair Job', localized: 'Repair Job Card', purpose: '10-point intake hardware diagnostic' },
        { standard: 'Ledger', localized: 'Customer Khata (Udhari)', purpose: 'Receivables & credit dues tracking' }
      ],
      widgets: [
        { id: 'SALES_SUMMARY', priority: 1, feature: 'POS_BILLING', desc: "Today's revenue, ticket count, and growth" },
        { id: 'QUICK_ACTIONS', priority: 2, feature: 'POS_BILLING', desc: 'Fast POS, New Job Card, Day Book, IMEI search' },
        { id: 'RECENT_TRANSACTIONS', priority: 4, feature: 'SALES', desc: 'Real-time outbox sync mutations' },
        { id: 'ACTIVE_REPAIR_JOBS', priority: 6, feature: 'SERVICE_REPAIR', desc: 'Jobs in Diagnose, Repaired, Waiting Parts' },
        { id: 'INTELLI_AUDIT', priority: 10, feature: 'REPORTS_BASIC', desc: '5-Pillar Constitutional Health Score (0-100)' },
        { id: 'IMEI_AUDIT_LOG', priority: 12, feature: 'IMEI_TRACKING', desc: 'Historical buyback & sale tracking' }
      ],
      hsnCodes: [
        { code: '85171300', desc: 'Smartphones (Cellular Networks)', rate: '18% GST', rule: 'CGST 9% + SGST 9%' },
        { code: '85183000', desc: 'Headphones, Earphones & TWS', rate: '18% GST', rule: 'CGST 9% + SGST 9%' },
        { code: '85444299', desc: 'USB Type-C & Lightning Cables', rate: '18% GST', rule: 'CGST 9% + SGST 9%' },
        { code: '39269099', desc: 'TPU Shockproof Mobile Cases', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.MOBILE_SHOP to CategoryDefinition(
    category = BusinessCategory.MOBILE_SHOP,
    features = baseRetailFeatures + setOf(Feature.IMEI_TRACKING, Feature.SERVICE_REPAIR, Feature.DEVICE_BUYBACK),
    terminology = mapOf(
        TermKey.PRODUCT to R.string.term_mobile_phone,
        TermKey.STOCK_UNIT to R.string.term_piece,
        TermKey.REPAIR_JOB to R.string.term_repair_job,
        TermKey.SERIAL_NUMBER to R.string.term_imei
    ),
    dashboardLayout = listOf(
        WidgetConfig("SALES_SUMMARY", priority = 1),
        WidgetConfig("ACTIVE_REPAIRS", priority = 6),
        WidgetConfig("INTELLI_AUDIT", priority = 10)
    ),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.MOBILE,
    identityRule = IdentityRule.MobileImei
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">IMEI Hardware Verification Workbench</span>
            <span class="v-tool-badge success">ROOM DB AES-256</span>
          </div>
          <div class="v-tool-form">
            <label class="v-tool-label">Enter 15-Digit IMEI / Serial Number:</label>
            <div style="display:flex;gap:6px;">
              <input type="text" id="v-imei-input" class="v-tool-input" value="860472019482104" placeholder="860...">
              <button id="v-imei-btn" class="v-tool-btn">Validate</button>
            </div>
            <div class="v-tool-result" id="v-imei-result" style="margin-top:10px;">
              <div style="display:flex;justify-content:space-between;"><span>Device Model:</span><strong style="color:#fff;" id="v-imei-model">OnePlus 12 5G (Silky Black, 256GB)</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Battery Serial:</span><span style="color:#ADC6FF;font-family:monospace;">BAT-OP12-98442</span></div>
              <div style="display:flex;justify-content:space-between;"><span>Warehouse Bin:</span><span style="color:#CBD5E1;">Drawer B-3 (Row 2)</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;"><span>Status:</span><span class="v-chip-code" style="color:#22C55E;background:rgba(34,197,94,0.15);" id="v-imei-status">IN STOCK • VERIFIED (14 Units)</span></div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {
        const btn = document.getElementById('v-imei-btn');
        const input = document.getElementById('v-imei-input');
        const status = document.getElementById('v-imei-status');
        const model = document.getElementById('v-imei-model');
        if (btn && input && status && model) {
          btn.addEventListener('click', () => {
            const val = input.value.trim();
            status.textContent = 'Auditing database...';
            status.style.color = '#F59E0B';
            setTimeout(() => {
              if (val.length < 8) {
                status.textContent = 'INVALID IMEI / SERIAL';
                status.style.color = '#EF4444';
                model.textContent = 'No matching asset found in Room DB';
              } else {
                status.textContent = 'IN STOCK • VERIFIED';
                status.style.color = '#22C55E';
                model.textContent = val.startsWith('86') ? 'OnePlus 12 5G (256GB)' : 'Samsung Galaxy S24 Ultra (512GB)';
              }
            }, 350);
          });
        }
      }
    },

    SECOND_HAND_MOBILE: {
      id: 'SECOND_HAND_MOBILE',
      name: 'Used Mobiles (Margin Scheme)',
      icon: '♻️',
      dna: 'TECHNICAL_SERVICE',
      mode: 'RETAIL',
      strategy: 'SECOND_HAND_MARGIN',
      badge: 'GST RULE 32(5)',
      desc: 'Statutory GST Rule 32(5) second-hand trade-in valuation, digital legal shield KYC documentation, Aadhaar/ID capture, and negative margin protection.',
      features: [
        'GST Rule 32(5) Valuation (Tax payable strictly on profit margin)',
        'Legal Shield Seller KYC (Photo ID, Signature & Declaration)',
        'IMEI History Audit Trail & Police anti-theft verification checklist',
        'Refurbishment cost addition with automatic margin recalibration'
      ],
      schema: ['device_condition', 'battery_health_pct', 'seller_aadhaar', 'seller_declaration_signed', 'original_box_available'],
      terminology: [
        { standard: 'Product', localized: 'Pre-Owned Device', purpose: 'Second-hand graded stock (Grade A/B/C)' },
        { standard: 'Invoice', localized: 'Rule 32(5) Margin Bill', purpose: 'Discloses tax only on value addition' },
        { standard: 'Supplier', localized: 'Device Seller (Individual)', purpose: 'Unregistered seller intake with KYC' },
        { standard: 'Customer', localized: 'Certified Buyer', purpose: 'Receives warranty test certificate' }
      ],
      widgets: [
        { id: 'SALES_SUMMARY', priority: 1, feature: 'POS_BILLING', desc: 'Margin vs standard revenue' },
        { id: 'MARGIN_SCHEME_AUDIT', priority: 5, feature: 'MARGIN_SCHEME_TAX', desc: 'Gross margin tax audit & savings' },
        { id: 'KYC_PENDING_QUEUE', priority: 7, feature: 'KYC_COMPLIANCE', desc: 'Pending seller ID and sign intake' },
        { id: 'DEVICE_VALUATION', priority: 8, feature: 'DEVICE_BUYBACK', desc: 'Algorithmic trade-in price quotes' }
      ],
      hsnCodes: [
        { code: '85171300', desc: 'Second-Hand Smart Handsets', rate: '18% on Margin Only', rule: 'GST Rule 32(5) Margin Scheme' },
        { code: '998713', desc: 'Refurbishment / Testing Labor', rate: '18% GST', rule: 'Added to Procurement Cost Basis' }
      ],
      kotlinCode: `BusinessCategory.SECOND_HAND_MOBILE to CategoryDefinition(
    category = BusinessCategory.SECOND_HAND_MOBILE,
    features = baseRetailFeatures + setOf(
        Feature.MARGIN_SCHEME_TAX,
        Feature.KYC_COMPLIANCE,
        Feature.DEVICE_BUYBACK,
        Feature.IMEI_HISTORY_AUDIT
    ),
    supportedKycTypes = setOf(KycRecordType.SECOND_HAND_PURCHASE),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.SECOND_HAND_MARGIN
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">GST Rule 32(5) Margin Tax Calculator</span>
            <span class="v-tool-badge warning">LEGAL COMPLIANCE</span>
          </div>
          <div class="v-tool-form">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div>
                <label class="v-tool-label">Buyback Price (₹):</label>
                <input type="number" id="v-margin-buy" class="v-tool-input" value="15000">
              </div>
              <div>
                <label class="v-tool-label">Resale Price (₹):</label>
                <input type="number" id="v-margin-sell" class="v-tool-input" value="18500">
              </div>
            </div>
            <div class="v-tool-result" style="margin-top:10px;">
              <div style="display:flex;justify-content:space-between;"><span>Taxable Profit Margin:</span><strong style="color:#22C55E;font-family:monospace;" id="v-margin-val">₹3,500.00</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Rule 32(5) GST (18% on Margin):</span><strong style="color:#F59E0B;font-family:monospace;" id="v-margin-tax">₹533.90</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Standard GST (18% on Full ₹18.5k):</span><span style="color:#EF4444;text-decoration:line-through;" id="v-margin-std">₹2,822.03</span></div>
              <div style="margin-top:4px;padding:6px;background:rgba(34,197,94,0.12);border-radius:6px;border:1px solid rgba(34,197,94,0.3);text-align:center;">
                <strong style="color:#22C55E;font-size:0.75rem;" id="v-margin-saved">✓ Legally Saved ₹2,288.13 in Tax!</strong>
              </div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {
        const buyInput = document.getElementById('v-margin-buy');
        const sellInput = document.getElementById('v-margin-sell');
        const marginVal = document.getElementById('v-margin-val');
        const marginTax = document.getElementById('v-margin-tax');
        const marginStd = document.getElementById('v-margin-std');
        const marginSaved = document.getElementById('v-margin-saved');

        const update = () => {
          if (!buyInput || !sellInput) return;
          const buy = parseFloat(buyInput.value) || 0;
          const sell = parseFloat(sellInput.value) || 0;
          const margin = Math.max(0, sell - buy);
          // Rule 32(5) tax is 18% inclusive on the margin: Margin * 18 / 118
          const tax32 = (margin * 18) / 118;
          // Standard GST would be on full sale: Sell * 18 / 118
          const taxStd = (sell * 18) / 118;
          const saved = Math.max(0, taxStd - tax32);

          marginVal.textContent = `₹${margin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          marginTax.textContent = `₹${tax32.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          marginStd.textContent = `₹${taxStd.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          marginSaved.textContent = `✓ Legally Saved ₹${saved.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in Tax!`;
        };

        if (buyInput && sellInput) {
          buyInput.addEventListener('input', update);
          sellInput.addEventListener('input', update);
        }
      }
    },

    PHARMACY: {
      id: 'PHARMACY',
      name: 'Pharmacy & Healthcare',
      icon: '💊',
      dna: 'PURE_RETAIL',
      mode: 'RETAIL',
      strategy: 'PHARMACY',
      badge: 'SCH H / H1',
      desc: 'Batch number tracking, Expiry Sentinel automated quarantines, Schedule H/H1 registers, generic salt composition lookup, and doctor prescription intake.',
      features: [
        'Expiry Sentinel (30-day countdown, near-expiry alerts & supplier returns)',
        'Schedule H & H1 Compliance Registers with Dr. Name & Patient Reg',
        'Generic Salt Composition Substitute Engine',
        'Strip/Pack conversions with loose tablet billing precision'
      ],
      schema: ['batch_number', 'expiry_date', 'composition', 'manufacturer', 'schedule_type', 'is_schedule_h', 'dr_reg_number'],
      terminology: [
        { standard: 'Customer', localized: 'Patient', purpose: 'Stores age, gender, medical history & vitals' },
        { standard: 'Product', localized: 'Medicine / Formulation', purpose: 'Tracks chemical composition & drug strength' },
        { standard: 'Stock Unit', localized: 'Strip / Pack / Bottle', purpose: 'Supports sub-unit blister tablet sales' },
        { standard: 'Repair Job', localized: 'Prescription (Rx)', purpose: 'Doctor prescription attachment & refills' }
      ],
      widgets: [
        { id: 'SALES_SUMMARY', priority: 1, feature: 'POS_BILLING', desc: 'Daily pharmacy dispensing summary' },
        { id: 'EXPIRY_ALERTS', priority: 11, feature: 'EXPIRY_TRACKING', desc: 'Batches expiring within 30-90 days' },
        { id: 'PHARMACY_H1_REGISTER', priority: 13, feature: 'PHARMACY_COMPLIANCE_REPORT', desc: 'Schedule H1 audited dispensing log' },
        { id: 'LOCKED_CABINET', priority: 14, feature: 'EXPIRY_TRACKING', desc: 'Quarantined expired stock value' }
      ],
      hsnCodes: [
        { code: '30049099', desc: 'Allopathic Formulations & Tablets', rate: '12% GST', rule: 'CGST 6% + SGST 6%' },
        { code: '30049011', desc: 'Ayurvedic Medicaments', rate: '12% GST', rule: 'CGST 6% + SGST 6%' },
        { code: '30059090', desc: 'Surgical Dressings & Bandages', rate: '12% GST', rule: 'CGST 6% + SGST 6%' }
      ],
      kotlinCode: `BusinessCategory.PHARMACY to CategoryDefinition(
    category = BusinessCategory.PHARMACY,
    features = baseRetailFeatures + setOf(Feature.EXPIRY_TRACKING, Feature.PHARMACY_COMPLIANCE_REPORT),
    terminology = mapOf(
        TermKey.PRODUCT to R.string.term_medicine,
        TermKey.STOCK_UNIT to R.string.term_strip_pack,
        TermKey.BATCH_NUMBER to R.string.term_batch_no,
        TermKey.EXPIRY_DATE to R.string.term_expiry_date,
        TermKey.CUSTOMER to R.string.term_patient
    ),
    dashboardLayout = listOf(
        WidgetConfig("SALES_SUMMARY", priority = 1),
        WidgetConfig("EXPIRY_ALERTS", priority = 11),
        WidgetConfig("PHARMACY_H1_REGISTER", priority = 13)
    ),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.PHARMACY
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Expiry Sentinel &amp; Schedule H1 Guard</span>
            <span class="v-tool-badge error">DRUG COMPLIANCE</span>
          </div>
          <div class="v-tool-form">
            <div style="display:flex;flex-direction:column;gap:6px;">
              <div style="padding:6px 8px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);border-radius:6px;display:flex;justify-content:space-between;align-items:center;">
                <div><strong style="color:#fff;font-size:0.75rem;">Augmentin 625 Duo</strong><div style="font-size:0.5625rem;color:#EF4444;">Batch #AUG-882 • 40 Strips in Stock</div></div>
                <span class="v-chip-code" style="color:#EF4444;background:rgba(239,68,68,0.2);">EXP: 18 DAYS ⚠️</span>
              </div>
              <div style="padding:6px 8px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.25);border-radius:6px;display:flex;justify-content:space-between;align-items:center;">
                <div><strong style="color:#fff;font-size:0.75rem;">Pan-D Capsules</strong><div style="font-size:0.5625rem;color:#F59E0B;">Batch #PAN-410 • 120 Strips</div></div>
                <span class="v-chip-code" style="color:#F59E0B;background:rgba(245,158,11,0.2);">EXP: 42 DAYS</span>
              </div>
            </div>
            <div style="margin-top:10px;display:flex;gap:6px;">
              <input type="text" id="v-pharma-salt" class="v-tool-input" value="Amoxycillin + Clavulanic Acid" placeholder="Search chemical salt...">
              <button id="v-pharma-btn" class="v-tool-btn">Find Salt</button>
            </div>
            <div id="v-pharma-result" style="margin-top:6px;font-size:0.625rem;color:#22C55E;">✓ 3 Generic Equivalents Available in Formulary</div>
          </div>
        </div>`,
      bindEvents: () => {
        const btn = document.getElementById('v-pharma-btn');
        const result = document.getElementById('v-pharma-result');
        if (btn && result) {
          btn.addEventListener('click', () => {
            result.textContent = 'Found: Moxikind-CV 625 (₹198) • Clavam 625 (₹210)';
          });
        }
      }
    },

    RESTAURANT: {
      id: 'RESTAURANT',
      name: 'Restaurant & Cafe',
      icon: '🍽️',
      dna: 'PURE_RETAIL',
      mode: 'RETAIL',
      strategy: 'RESTAURANT',
      badge: 'KDS & KOT',
      desc: 'Visual Table Occupancy Map (Tables 1-8, split/merge), live Kitchen Order Ticket (KOT) printing, Kitchen Display System (KDS), item modifiers, and shift settlement.',
      features: [
        'Interactive Table Floor Map with Split/Merge Bill capabilities',
        'Wireless ESC/POS Kitchen Order Ticket (KOT) routing',
        'Kitchen Display System (KDS) live order status (Pending / Cooking / Served)',
        'Item Modifiers & Customizations (No Onion, Extra Cheese, Spicy)'
      ],
      schema: ['table_number', 'guest_count', 'order_type_dinein_takeaway', 'kot_number', 'modifiers_list'],
      terminology: [
        { standard: 'Customer', localized: 'Diner / Table Guest', purpose: 'Identifies table party & captain' },
        { standard: 'Product', localized: 'Menu Dish', purpose: 'Item categorized by Course / Starters' },
        { standard: 'Repair Job', localized: 'Kitchen Ticket (KOT)', purpose: 'Cook station production order' },
        { standard: 'Ledger', localized: 'Captain Shift Settlement', purpose: 'Cash drawer & daily food reconciliation' }
      ],
      widgets: [
        { id: 'TABLE_OCCUPANCY', priority: 3, feature: 'REST_TABLE_MANAGEMENT', desc: 'Live visual table layout (Occupied/Free)' },
        { id: 'KDS_LIVE_FEED', priority: 5, feature: 'KITCHEN_DISPLAY_SYSTEM', desc: 'Tickets waiting in chef kitchen queue' },
        { id: 'TOP_SELLING_DISHES', priority: 8, feature: 'REPORTS_BASIC', desc: 'Highest velocity menu items' }
      ],
      hsnCodes: [
        { code: '996331', desc: 'Restaurant & Cafe Dining Services', rate: '5% GST', rule: 'CGST 2.5% + SGST 2.5% (No ITC)' }
      ],
      kotlinCode: `BusinessCategory.RESTAURANT to CategoryDefinition(
    category = BusinessCategory.RESTAURANT,
    features = baseRetailFeatures + setOf(
        Feature.KOT_PRINTING,
        Feature.ITEM_MODIFIERS,
        Feature.REST_TABLE_MANAGEMENT,
        Feature.KITCHEN_DISPLAY_SYSTEM
    ),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.RESTAURANT
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Table Floor Map &amp; KDS Live Ticket</span>
            <span class="v-tool-badge success">TABLE 4 ACTIVE</span>
          </div>
          <div class="v-tool-form">
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px;" id="v-table-grid">
              <button class="v-chip-btn" data-tbl="1" style="justify-content:center;padding:6px;">T-1 (Free)</button>
              <button class="v-chip-btn" data-tbl="2" style="justify-content:center;padding:6px;background:rgba(239,68,68,0.2);color:#EF4444;border-color:#EF4444;">T-2 (Bill)</button>
              <button class="v-chip-btn" data-tbl="3" style="justify-content:center;padding:6px;">T-3 (Free)</button>
              <button class="v-chip-btn active" data-tbl="4" style="justify-content:center;padding:6px;">T-4 (Dine)</button>
            </div>
            <div class="v-tool-result">
              <div style="display:flex;justify-content:space-between;color:#fff;font-weight:700;"><span>KOT #104 (Table 4 • 3 Guests)</span><span style="color:#F59E0B;" id="v-kds-status">● COOKING</span></div>
              <div style="display:flex;justify-content:space-between;margin-top:4px;"><span>2x Paneer Tikka <small style="color:#EF4444;">(No Onion)</small></span><strong>₹440</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>3x Butter Naan</span><strong>₹150</strong></div>
              <div style="margin-top:6px;display:flex;gap:6px;">
                <button id="v-btn-kds-served" class="v-tool-btn" style="flex:1;background:#16A34A;">Mark KDS Served ✓</button>
              </div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {
        const btn = document.getElementById('v-btn-kds-served');
        const status = document.getElementById('v-kds-status');
        if (btn && status) {
          btn.addEventListener('click', () => {
            status.textContent = '✓ SERVED TO TABLE';
            status.style.color = '#22C55E';
          });
        }
      }
    },

    GARMENTS: {
      id: 'GARMENTS',
      name: 'Garments & Apparel',
      icon: '👔',
      dna: 'PURE_RETAIL',
      mode: 'RETAIL',
      strategy: 'STANDARD',
      badge: '2D MATRIX',
      desc: '2D Grid Matrix stock management across Size × Color × Fabric variants, barcode sticker printing, exchange credit notes, and seasonal collection velocity tracking.',
      features: [
        '2D Grid Matrix Stock Entry (Sizes 28-44 | Colors | Cuts)',
        'Customer Tailoring Naap Vault (Measurements, Fit & Alteration History)',
        'Garment Costing Engine (Fabric, Buttons, Majuri & Production Costing)',
        'Wholesale Ratio Packs (Pre-bundled Size/Color B2B Distributions)',
        'Job-Work Outsource Challans for dyeing and stitching',
        'Thermal Barcode Tag Generator & Store Exchange Credit Notes'
      ],
      schema: ['size_code', 'color_shade', 'fabric_composition', 'season_collection', 'fit_style'],
      terminology: [
        { standard: 'Product', localized: 'Apparel Article', purpose: 'Multi-variant SKU parent' },
        { standard: 'Stock Unit', localized: 'Piece / Set', purpose: 'Individual item or suit set' },
        { standard: 'Repair Job', localized: 'Tailoring & Alteration', purpose: 'Fitting and hem adjustment ticket' },
        { standard: 'Invoice', localized: 'Retail Apparel Tax Invoice', purpose: 'Supports exchange credit deduction' }
      ],
      widgets: [
        { id: 'SALES_SUMMARY', priority: 1, feature: 'POS_BILLING', desc: 'Article sales breakdown' },
        { id: 'VARIANT_GRID_MATRIX', priority: 4, feature: 'PRODUCT_VARIANTS', desc: 'Size × Color inventory level radar' },
        { id: 'EXCHANGE_REGISTER', priority: 7, feature: 'EXCHANGE_MANAGEMENT', desc: 'Credit notes issued and redeemed' }
      ],
      hsnCodes: [
        { code: '61091000', desc: 'Cotton T-Shirts & Knitted Wear', rate: '5% / 12% GST', rule: '5% below ₹1,000; 12% above ₹1,000' },
        { code: '62034200', desc: 'Men’s Denim Trousers & Jeans', rate: '12% GST', rule: 'CGST 6% + SGST 6%' }
      ],
      kotlinCode: `BusinessCategory.GARMENTS to CategoryDefinition(
    category = BusinessCategory.GARMENTS,
    features = baseRetailFeatures + setOf(
        Feature.PRODUCT_VARIANTS,
        Feature.EXCHANGE_MANAGEMENT,
        Feature.JOB_WORK_TRACKING
    ),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.STANDARD
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">2D Size × Color Variant Matrix</span>
            <span class="v-tool-badge warning">BUFFER RADAR</span>
          </div>
          <div class="v-tool-form">
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;font-size:0.625rem;gap:4px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:4px;font-weight:700;color:#94A3B8;">
              <span>Color \\ Size</span><span>M</span><span>L</span><span>XL</span>
            </div>
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;font-size:0.6875rem;padding:4px 0;color:#fff;">
              <span>Navy Denim</span><span style="color:#22C55E;">12 pcs</span><span style="color:#22C55E;">8 pcs</span><span style="color:#EF4444;font-weight:700;">0 pcs ⚠️</span>
            </div>
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;font-size:0.6875rem;padding:4px 0;color:#fff;">
              <span>Olive Linen</span><span style="color:#22C55E;">5 pcs</span><span style="color:#F59E0B;font-weight:700;" id="v-garment-count">1 pc</span><span style="color:#22C55E;">3 pcs</span>
            </div>
            <div style="margin-top:8px;padding:6px;background:rgba(245,158,11,0.1);border-radius:6px;border:1px solid rgba(245,158,11,0.25);font-size:0.625rem;color:#F59E0B;">
              ⚠️ Auto-Alert: Navy Denim (XL) Stockout! Olive Linen (L) below 3-unit safety threshold.
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    MANUFACTURING: {
      id: 'MANUFACTURING',
      name: 'Manufacturing & Industrial',
      icon: '⚙️',
      dna: 'INDUSTRIAL_TRADE',
      mode: 'MANUFACTURING',
      strategy: 'MANUFACTURING',
      badge: 'BOM 7204',
      desc: 'Bill of Materials (BOM) multi-level recipes, production orders, Work-In-Progress (WIP) stock staging, scrap yield calculation, and job-work challans.',
      features: [
        'Multi-Tier Bill of Materials (BOM) Recipe Engine',
        'Production Batch Allocation with Raw Material Auto-Deduction',
        'Scrap Yield & Wastage Efficiency Analytics',
        'Outsource Job Work Delivery Challans (Section 143 GST)'
      ],
      schema: ['bom_code', 'batch_lot_number', 'wip_stage', 'scrap_weight_kg', 'target_assembly_sku'],
      terminology: [
        { standard: 'Product', localized: 'Finished Goods Assembly', purpose: 'Target manufactured output' },
        { standard: 'Supplier', localized: 'Raw Material Vendor', purpose: 'Ingot, sheet & chemical suppliers' },
        { standard: 'Stock Unit', localized: 'Kg / Ton / Units', purpose: 'Multi-scale industrial measures' },
        { standard: 'Repair Job', localized: 'Job Work Challan', purpose: 'Outsource annealing/plating order' }
      ],
      widgets: [
        { id: 'PRODUCTION_ORDERS_ACTIVE', priority: 2, feature: 'PRODUCTION_ORDERS', desc: 'Batches currently on shop floor' },
        { id: 'BOM_RECIPE_BUILDER', priority: 5, feature: 'BOM', desc: 'Component recipe formula workbench' },
        { id: 'SCRAP_YIELD_REPORT', priority: 8, feature: 'MANUFACTURING', desc: 'Material efficiency percentage' }
      ],
      hsnCodes: [
        { code: '72042190', desc: 'Finished Stainless Steel Assemblies', rate: '18% GST', rule: 'CGST 9% + SGST 9%' },
        { code: '73181500', desc: 'Fasteners & Mounting Screws', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.MANUFACTURING to CategoryDefinition(
    category = BusinessCategory.MANUFACTURING,
    features = baseRetailFeatures + setOf(
        Feature.MANUFACTURING,
        Feature.PRODUCTION_ORDERS,
        Feature.BOM,
        Feature.JOB_WORK_TRACKING
    ),
    associatedMode = BusinessMode.MANUFACTURING,
    billingStrategy = BillingStrategyType.MANUFACTURING
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Bill of Materials (BOM) Costing</span>
            <span class="v-tool-badge success">RECIPE CALCULATOR</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.6875rem;color:#fff;margin-bottom:6px;"><strong>Target: 1x Industrial Bracket Assembly</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:0.625rem;color:#CBD5E1;"><span>Steel Sheet (2.4 kg):</span><strong>₹168.00</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:0.625rem;color:#CBD5E1;"><span>Fasteners (4 pcs):</span><strong>₹12.00</strong></div>
            <div style="display:flex;justify-content:space-between;font-size:0.625rem;color:#CBD5E1;"><span>Labor &amp; Powder Coat:</span><strong>₹45.00</strong></div>
            <div style="border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;display:flex;justify-content:space-between;color:#fff;font-weight:700;margin-top:4px;">
              <span>Total Production Unit Cost:</span><strong style="color:#F59E0B;font-family:monospace;">₹225.00</strong>
            </div>
            <div style="margin-top:6px;font-size:0.5625rem;color:#22C55E;">✓ Auto-Deducts Raw Components on Batch Release</div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    WHOLESALE_DISTRIBUTION: {
      id: 'WHOLESALE_DISTRIBUTION',
      name: 'Wholesale & B2B Distribution',
      icon: '🏭',
      dna: 'INDUSTRIAL_TRADE',
      mode: 'WHOLESALE',
      strategy: 'WHOLESALE',
      badge: 'UDHARI AGING',
      desc: 'Multi-pricing tier slabs (Retail vs Wholesale vs Super-Stockist), bulk packaging MOQ controls, credit limit safeguards, and 0-180+ days receivables aging.',
      features: [
        'Multi-Tier Wholesale Price Slabs with MOQ gating',
        '0-180+ Days Receivables Aging Ladder (Udhari risk radar)',
        'Customer Credit Limit Locks (Blocks new invoices when exceeded)',
        'One-Click GSTR-1 CSV B2B Sales Exports'
      ],
      schema: ['price_slab_tier', 'credit_limit_amount', 'credit_days_allowed', 'gstin_verified', 'transport_transporter_id'],
      terminology: [
        { standard: 'Customer', localized: 'B2B Retailer / Dealer', purpose: 'GSTIN-registered trade account' },
        { standard: 'Product', localized: 'Trade Bulk SKU', purpose: 'Pack of cartons or master boxes' },
        { standard: 'Stock Unit', localized: 'Carton / Box / Case', purpose: 'Wholesale multi-pack measures' },
        { standard: 'Ledger', localized: 'Dealer Credit Ledger (Aging)', purpose: 'Tracks outstanding bill maturities' }
      ],
      widgets: [
        { id: 'RECEIVABLES_AGING', priority: 2, feature: 'REPORTS_ADVANCED', desc: '0-30d, 31-90d, 91-180d overdue totals' },
        { id: 'WHOLESALE_DISPATCH', priority: 4, feature: 'WHOLESALE_BILLING', desc: 'Pending orders ready for transport' },
        { id: 'CREDIT_BREACH_ALERTS', priority: 6, feature: 'WHOLESALE_BILLING', desc: 'Dealers exceeding credit limits' }
      ],
      hsnCodes: [
        { code: '996111', desc: 'Wholesale Trade Services on Fee/Contract', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.WHOLESALE_DISTRIBUTION to CategoryDefinition(
    category = BusinessCategory.WHOLESALE_DISTRIBUTION,
    features = baseRetailFeatures + setOf(
        Feature.WHOLESALE_BILLING,
        Feature.MULTI_PRICING,
        Feature.REPORTS_ADVANCED
    ),
    associatedMode = BusinessMode.WHOLESALE,
    billingStrategy = BillingStrategyType.WHOLESALE
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Receivables Aging &amp; Credit Shield</span>
            <span class="v-tool-badge error">UDHARI AUDIT</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:space-between;"><span>0-30 Days (Current):</span><strong style="color:#22C55E;font-family:monospace;">₹2,45,000.00</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>31-90 Days:</span><strong style="color:#F59E0B;font-family:monospace;">₹1,12,000.00</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>91-180+ Days (Overdue):</span><strong style="color:#EF4444;font-family:monospace;">₹42,500.00</strong></div>
            </div>
            <div style="margin-top:8px;padding:6px;background:rgba(239,68,68,0.12);border-radius:6px;border:1px solid rgba(239,68,68,0.25);font-size:0.625rem;color:#EF4444;display:flex;justify-content:space-between;">
              <span>Dealer: Krishna Mobile Hub</span><strong>LIMIT EXCEEDED (₹3.99L)</strong>
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    CRYSTAL_AGATE: {
      id: 'CRYSTAL_AGATE',
      name: 'Crystals, Lapidary & Agate',
      icon: '💎',
      dna: 'INDUSTRIAL_TRADE',
      mode: 'MANUFACTURING',
      strategy: 'MANUFACTURING',
      badge: 'GHISAT LOSS %',
      desc: 'Khambhat Agate raw mineral lot procurement, 20%-50% Ghisat lapidary loss calculations, artisan Karigar job-work challans, and foreign currency export invoices with 0% LUT IGST.',
      features: [
        'Rough Mineral Lot to Polished Batching Workflow',
        'Lapidary Ghisat (Sawing & Polishing Loss %) Calculator',
        'Artisan Karigar / Ghanti Job-Work Delivery Challans',
        'USD/EUR Foreign Currency Exports with 0% LUT IGST'
      ],
      schema: ['rough_mineral_type', 'karigar_artisan_id', 'ghisat_loss_pct', 'carat_gram_weight', 'lut_arn_number'],
      terminology: [
        { standard: 'Product', localized: 'Mineral Lot / Carved Item', purpose: 'Rough, tumbled, or orgone artifact' },
        { standard: 'Stock Unit', localized: 'Carat / Gram / Kg', purpose: 'Dual weight-price vs piece pricing' },
        { standard: 'Repair Job', localized: 'Karigar Artisan Challan', purpose: 'Raw stone issue & polished receipt' },
        { standard: 'Invoice', localized: 'Export LUT / Domestic Bill', purpose: 'Zero-rated export or domestic gemstone' }
      ],
      widgets: [
        { id: 'AGATE_LOT_INTAKE', priority: 3, feature: 'MANUFACTURING', desc: 'Raw lot weight vs polished output' },
        { id: 'GHISAT_EFFICIENCY', priority: 6, feature: 'REPORTS_ADVANCED', desc: 'Artisan stone cutting loss ledger' },
        { id: 'EXPORT_ORDERS_QUEUE', priority: 7, feature: 'SALES', desc: 'Pending USD export dispatches' }
      ],
      hsnCodes: [
        { code: '7103', desc: 'Semi-Precious Stones (Rough / Unworked)', rate: '0.25% / 3% GST', rule: 'Precious Stones GST Slab' },
        { code: '71162090', desc: 'Articles of Precious / Semi-Precious Stone', rate: '3% GST', rule: 'Finished Lapidary Jewelry' },
        { code: '9601', desc: 'Worked Agate & Carved Stone Handicrafts', rate: '0% / 12% GST', rule: '0% under LUT Export Bond' }
      ],
      kotlinCode: `BusinessCategory.CRYSTAL_AGATE to CategoryDefinition(
    category = BusinessCategory.CRYSTAL_AGATE,
    features = baseRetailFeatures + setOf(
        Feature.MANUFACTURING,
        Feature.JOB_WORK_TRACKING,
        Feature.WHOLESALE_BILLING,
        Feature.REPORTS_ADVANCED
    ),
    associatedMode = BusinessMode.MANUFACTURING,
    billingStrategy = BillingStrategyType.MANUFACTURING
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Ghisat (Lapidary Loss) Calculator</span>
            <span class="v-tool-badge warning">KHAMBHAT AGATE</span>
          </div>
          <div class="v-tool-form">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div>
                <label class="v-tool-label">Rough Lot Issued (Kg):</label>
                <input type="number" id="v-agate-rough" class="v-tool-input" value="50">
              </div>
              <div>
                <label class="v-tool-label">Polished Received (Kg):</label>
                <input type="number" id="v-agate-polished" class="v-tool-input" value="32">
              </div>
            </div>
            <div class="v-tool-result" style="margin-top:10px;">
              <div style="display:flex;justify-content:space-between;"><span>Ghisat (Loss Weight):</span><strong style="color:#F59E0B;font-family:monospace;" id="v-agate-loss">18.0 kg (36.0%)</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Artisan Status:</span><span style="color:#22C55E;" id="v-agate-status">Normal Tolerance (20-40%)</span></div>
              <div style="display:flex;justify-content:space-between;"><span>Export Market Price:</span><span style="color:#60A5FA;font-family:monospace;">USD $18.50 / kg • LUT 0% IGST</span></div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {
        const rough = document.getElementById('v-agate-rough');
        const polished = document.getElementById('v-agate-polished');
        const lossEl = document.getElementById('v-agate-loss');
        const statusEl = document.getElementById('v-agate-status');

        const update = () => {
          if (!rough || !polished) return;
          const r = parseFloat(rough.value) || 0;
          const p = parseFloat(polished.value) || 0;
          const loss = Math.max(0, r - p);
          const pct = r > 0 ? ((loss / r) * 100).toFixed(1) : '0.0';

          lossEl.textContent = `${loss.toFixed(1)} kg (${pct}%)`;
          if (pct > 50) {
            statusEl.textContent = 'Excess Wastage Alert!';
            statusEl.style.color = '#EF4444';
          } else {
            statusEl.textContent = 'Normal Tolerance (20-40%)';
            statusEl.style.color = '#22C55E';
          }
        };

        if (rough && polished) {
          rough.addEventListener('input', update);
          polished.addEventListener('input', update);
        }
      }
    },

    TRUST_INSTITUTE: {
      id: 'TRUST_INSTITUTE',
      name: 'Charitable Trust & Education',
      icon: '🏛️',
      dna: 'HEALTH_WELLNESS',
      mode: 'RETAIL',
      strategy: 'STANDARD',
      badge: 'SEC 80G CEILING',
      desc: 'Section 80G donation tax receipts with statutory ₹2,000 cash ceiling, Section 12AB URN verification, CBDT Form 10BD/10BE donor reporting, and relief dispatch ledgers.',
      features: [
        'Section 80G Tax Exemption Receipts with 12AB URN Verification',
        'Strict ₹2,000 Cash Ceiling Guard (Section 80G(5D) compliance)',
        'CBDT Form 10BD & Form 10BE Donor Return Export',
        'Multi-Term Student Fee Schedules & Relief In-Kind Dispatches'
      ],
      schema: ['donor_pan', 'donor_aadhaar', 'donation_purpose_corpus', 'section_12ab_urn', 'form_10bd_id'],
      terminology: [
        { standard: 'Customer', localized: 'Donor / Student', purpose: 'Philanthropist, contributor or scholar' },
        { standard: 'Product', localized: 'Donation Head / Fee Term', purpose: 'Corpus, General, or Term Tuition' },
        { standard: 'Stock Unit', localized: 'Voucher Unit / Pack', purpose: 'Relief kit or contribution unit' },
        { standard: 'Invoice', localized: '80G Tax Donation Receipt', purpose: 'Official certificate for income tax relief' }
      ],
      widgets: [
        { id: 'DONATION_FLOW', priority: 1, feature: 'SALES', desc: 'Corpus vs General donor receipts' },
        { id: 'FORM_10BD_QUEUE', priority: 4, feature: 'REPORTS_ADVANCED', desc: 'Annual CBDT donor certificates queue' },
        { id: 'RELIEF_DISPATCH_LEDGER', priority: 7, feature: 'INVENTORY', desc: 'Grains, kits & education aid' }
      ],
      hsnCodes: [
        { code: '999293', desc: 'Commercial Training & Educational Services', rate: '18% GST', rule: 'Subject to 12AA/12AB Exemption' },
        { code: '999511', desc: 'Religious & Charitable Services', rate: '0% GST Exempt', rule: 'Statutory Section 12AB Exemption' }
      ],
      kotlinCode: `BusinessCategory.TRUST_INSTITUTE to CategoryDefinition(
    category = BusinessCategory.TRUST_INSTITUTE,
    features = baseRetailFeatures + setOf(Feature.REPORTS_ADVANCED),
    supportedKycTypes = setOf(KycRecordType.DONATION_RECEIPT_80G),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.STANDARD
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Section 80G Statutory Cash Ceiling Guard</span>
            <span class="v-tool-badge success">CBDT RULE 10BD</span>
          </div>
          <div class="v-tool-form">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div>
                <label class="v-tool-label">Payment Mode:</label>
                <select id="v-trust-mode" class="v-tool-input" style="background:#111118;">
                  <option value="bank">UPI / Cheque / NEFT</option>
                  <option value="cash">Cash Currency</option>
                </select>
              </div>
              <div>
                <label class="v-tool-label">Amount (₹):</label>
                <input type="number" id="v-trust-amt" class="v-tool-input" value="5000">
              </div>
            </div>
            <div class="v-tool-result" id="v-trust-alert" style="margin-top:10px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:6px;padding:8px;">
              <strong style="color:#22C55E;font-size:0.75rem;" id="v-trust-status">✓ 80G Tax Exemption Valid (50% Deduction)</strong>
              <div style="font-size:0.5625rem;color:#CBD5E1;margin-top:2px;">Donor PAN Verified • Automatically Queued for Form 10BD</div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {
        const mode = document.getElementById('v-trust-mode');
        const amt = document.getElementById('v-trust-amt');
        const alertBox = document.getElementById('v-trust-alert');
        const statusText = document.getElementById('v-trust-status');

        const update = () => {
          if (!mode || !amt || !alertBox || !statusText) return;
          const isCash = mode.value === 'cash';
          const a = parseFloat(amt.value) || 0;

          if (isCash && a > 2000) {
            alertBox.style.background = 'rgba(239,68,68,0.15)';
            alertBox.style.borderColor = 'rgba(239,68,68,0.35)';
            statusText.textContent = '⚠ VIOLATION: Cash > ₹2,000 Ineligible for 80G Deduction (Sec 80G(5D))';
            statusText.style.color = '#EF4444';
          } else {
            alertBox.style.background = 'rgba(34,197,94,0.1)';
            alertBox.style.borderColor = 'rgba(34,197,94,0.3)';
            statusText.textContent = '✓ 80G Tax Exemption Valid (50% Deduction)';
            statusText.style.color = '#22C55E';
          }
        };

        if (mode && amt) {
          mode.addEventListener('change', update);
          amt.addEventListener('input', update);
        }
      }
    },

    ELECTRONICS: {
      id: 'ELECTRONICS',
      name: 'Electronics & Appliances',
      icon: '📺',
      dna: 'TECHNICAL_SERVICE',
      mode: 'RETAIL',
      strategy: 'STANDARD',
      badge: 'SERIAL & AMC',
      desc: 'Serial number and warranty verification for consumer electronics, Annual Maintenance Contracts (AMC), installation logs, and brand service dispatches.',
      features: ['Individual Unit Serial & Warranty Tracking', 'AMC Recurring Service Contract Manager', 'Brand-wise inventory and landed cost calculators', 'Installation & Demo service work orders'],
      schema: ['serial_number', 'warranty_months', 'amc_contract_id', 'power_rating_star', 'installation_due_date'],
      terminology: [
        { standard: 'Customer', localized: 'Appliance Owner', purpose: 'Tracks address for on-site technician' },
        { standard: 'Product', localized: 'Electronic Appliance', purpose: 'Serialized AC, Refrigerator, TV unit' },
        { standard: 'Repair Job', localized: 'Installation / Service Ticket', purpose: 'On-site engineer service order' },
        { standard: 'Stock Unit', localized: 'Unit / Set', purpose: 'Individual packed appliance' }
      ],
      widgets: [
        { id: 'SALES_SUMMARY', priority: 1, feature: 'POS_BILLING', desc: 'Appliance turnover' },
        { id: 'AMC_DUE_CALENDAR', priority: 5, feature: 'AMC_MANAGEMENT', desc: 'Upcoming seasonal maintenance visits' },
        { id: 'WARRANTY_AUDIT', priority: 8, feature: 'WARRANTY_TRACKING', desc: 'Expiring manufacturer warranties' }
      ],
      hsnCodes: [
        { code: '85287217', desc: 'Color Television Sets', rate: '18% / 28% GST', rule: '18% for screen <= 32"; 28% above' },
        { code: '84151010', desc: 'Window / Split Air Conditioners', rate: '28% GST', rule: 'CGST 14% + SGST 14%' },
        { code: '84181010', desc: 'Combined Refrigerator-Freezers', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.ELECTRONICS to CategoryDefinition(
    category = BusinessCategory.ELECTRONICS,
    features = baseRetailFeatures + setOf(Feature.WARRANTY_TRACKING, Feature.AMC_MANAGEMENT, Feature.SERVICE_REPAIR),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.STANDARD
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Serial Warranty &amp; AMC Status Radar</span>
            <span class="v-tool-badge success">VALID WARRANTY</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;color:#CBD5E1;display:flex;flex-direction:column;gap:4px;">
              <div>Serial: <strong style="color:#fff;font-family:monospace;">SN-DAIKIN-15-4402</strong></div>
              <div>Device: <strong style="color:#fff;">Daikin 1.5 Ton 5-Star Inverter Split AC</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Warranty Status:</span><span style="color:#22C55E;font-weight:700;">ACTIVE (2.4 Years Remaining)</span></div>
              <div style="display:flex;justify-content:space-between;"><span>AMC Scheduled:</span><span style="color:#F59E0B;">Summer Service Due in 45 Days</span></div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    AUTOMOTIVE: {
      id: 'AUTOMOTIVE',
      name: 'Automotive: Sales, Spares & Garage',
      icon: '🚗',
      dna: 'TECHNICAL_SERVICE',
      mode: 'RETAIL / HYBRID',
      strategy: 'AUTOMOTIVE_GARAGE / RETAIL_POS',
      badge: 'GST RULE 32(5) & 28%',
      desc: 'Complete ERP for Pre-Owned Car/Bike Dealerships, Auto Spare Parts Traders, and Multi-Brand Garages. GST Rule 32(5) Margin Scheme on vehicle resale, Digital KYC Legal Shield with Chassis/VIN verification, 28% HSN 8708 auto parts catalog, and 10,000 km PMS Garage Job Cards.',
      features: [
        'Used Vehicle Sales & Buyback with GST Rule 32(5) Margin Tax (Tax on Margin Only)',
        'Legal Shield KYC for Vehicle Buyback (Previous Owner Aadhaar, Photo & Chassis/VIN)',
        'Auto Spare Parts Catalog with OEM Part Numbers & 28% GST Auto-Taxation',
        'Bulk Lubricant Barrels (HSN 2710 @ 18%) with Fractional Litre Dispensing',
        'Multi-Bay Garage Job Cards with Mechanic Allocation & 10,000 km Service Intervals'
      ],
      schema: ['chassis_number_vin', 'engine_number', 'vehicle_reg_no', 'odometer_km', 'oe_part_number', 'fuel_type'],
      terminology: [
        { standard: 'Customer', localized: 'Vehicle Owner / Buyer', purpose: 'Stores vehicle history, KYC & contact' },
        { standard: 'Product', localized: 'Auto Spare / Vehicle', purpose: 'OEM part or serial/chassis-tracked vehicle' },
        { standard: 'Stock Unit', localized: 'Piece / Litre / Unit', purpose: 'Parts, lubricants or vehicle inventory' },
        { standard: 'Repair Job', localized: 'Garage Job Card', purpose: 'PMS inspection, running repair & bay work' },
        { standard: 'Invoice', localized: 'Tax Invoice / Margin Bill', purpose: 'Supports GST Rule 32(5) or 28% parts' },
        { standard: 'Buyback', localized: 'Vehicle Buyback (KYC)', purpose: 'Used car/bike purchase with legal contract' }
      ],
      widgets: [
        { id: 'SALES_SUMMARY', priority: 1, feature: 'POS_BILLING', desc: 'Vehicle & spare parts turnover' },
        { id: 'QUICK_ACTIONS', priority: 2, feature: 'POS_BILLING', desc: 'New Sale, Job Card, Vehicle Buyback' },
        { id: 'RECENT_TRANSACTIONS', priority: 4, feature: 'SALES', desc: 'Real-time outbox sync mutations' },
        { id: 'VEHICLE_HISTORY', priority: 13, feature: 'KYC_COMPLIANCE', desc: 'Chassis & previous owner audit logs' },
        { id: 'GARAGE_BAY_STATUS', priority: 11, feature: 'REPAIRS', desc: 'Vehicles currently on service ramps' },
        { id: 'AMC_SUMMARY', priority: 12, feature: 'AMC_MANAGEMENT', desc: 'Annual vehicle maintenance contracts' }
      ],
      hsnCodes: [
        { code: '8708', desc: 'Automotive Spare Parts & Accessories', rate: '28% GST', rule: 'CGST 14% + SGST 14%' },
        { code: '8703 / 8711', desc: 'Used Motor Cars / Two-Wheelers', rate: 'Rule 32(5) Margin', rule: 'Tax on (Sale - Purchase) Margin' },
        { code: '2710', desc: 'Engine Oils, Greases & Lubricants', rate: '18% GST', rule: 'CGST 9% + SGST 9%' },
        { code: '8507', desc: 'Automotive Batteries (Lead-Acid)', rate: '28% GST', rule: 'CGST 14% + SGST 14%' },
        { code: '9987', desc: 'Garage Labor & Periodic Maintenance', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.AUTOMOTIVE to CategoryDefinition(
    category = BusinessCategory.AUTOMOTIVE,
    features = baseRetailFeatures + setOf(
        Feature.WARRANTY_TRACKING,
        Feature.KYC_COMPLIANCE,
        Feature.SERIAL_NUMBER_TRACKING,
        Feature.REPAIRS,
        Feature.JOB_CARDS,
        Feature.AMC_MANAGEMENT
    ),
    terminology = mapOf(
        TermKey.PRODUCT to R.string.term_spares_parts,
        TermKey.SERIAL_NUMBER to R.string.term_vehicle_no,
        TermKey.KYC_BUY_USED to R.string.term_vehicle_buyback,
        TermKey.KYC_SELL_USED to R.string.term_vehicle_resale,
        TermKey.DEVICE_INFO to R.string.term_vehicle_info,
        TermKey.IMEI_NUMBER to R.string.term_engine_chassis_no
    ),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.SERVICE // Dynamically adapts to RETAIL for Sales-Only Focus
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Automobile Sales, Buyback &amp; Margin Tax</span>
            <span class="v-tool-badge success">RULE 32(5) &amp; CHASSIS KYC</span>
          </div>
          <div class="v-tool-form">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <div>
                <label class="v-tool-label">Vehicle Inward / Buyback (₹):</label>
                <input type="number" id="v-auto-buy" class="v-tool-input" value="300000">
              </div>
              <div>
                <label class="v-tool-label">Vehicle Resale Price (₹):</label>
                <input type="number" id="v-auto-sell" class="v-tool-input" value="350000">
              </div>
            </div>
            <div class="v-tool-result" style="margin-top:10px;">
              <div style="display:flex;justify-content:space-between;"><span>Chassis / VIN:</span><span style="color:#ADC6FF;font-family:monospace;">MA3EYD21S0091823</span></div>
              <div style="display:flex;justify-content:space-between;"><span>Profit Margin:</span><strong style="color:#22C55E;font-family:monospace;" id="v-auto-margin">₹50,000.00</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Rule 32(5) GST (18% on Margin):</span><strong style="color:#F59E0B;font-family:monospace;" id="v-auto-tax">₹7,627.12</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Standard GST (28% on ₹3.5L):</span><span style="color:#EF4444;text-decoration:line-through;" id="v-auto-std">₹76,562.50</span></div>
              <div style="margin-top:4px;padding:6px;background:rgba(34,197,94,0.12);border-radius:6px;border:1px solid rgba(34,197,94,0.3);text-align:center;">
                <strong style="color:#22C55E;font-size:0.75rem;" id="v-auto-saved">✓ Legally Saved ₹68,935.38 in Vehicle Resale Tax!</strong>
              </div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {
        const buyInput = document.getElementById('v-auto-buy');
        const sellInput = document.getElementById('v-auto-sell');
        const marginEl = document.getElementById('v-auto-margin');
        const taxEl = document.getElementById('v-auto-tax');
        const stdEl = document.getElementById('v-auto-std');
        const savedEl = document.getElementById('v-auto-saved');

        const update = () => {
          if (!buyInput || !sellInput) return;
          const buy = parseFloat(buyInput.value) || 0;
          const sell = parseFloat(sellInput.value) || 0;
          const margin = Math.max(0, sell - buy);
          const tax = (margin * 18) / 118;
          const stdTax = (sell * 28) / 128;
          const saved = Math.max(0, stdTax - tax);

          marginEl.textContent = `₹${margin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          taxEl.textContent = `₹${tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          stdEl.textContent = `₹${stdTax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          savedEl.textContent = `✓ Legally Saved ₹${saved.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in Vehicle Resale Tax!`;
        };

        if (buyInput && sellInput) {
          buyInput.addEventListener('input', update);
          sellInput.addEventListener('input', update);
        }
      }
    },

    CLINIC: {
      id: 'CLINIC',
      name: 'Medical Clinic & OPD',
      icon: '🩺',
      dna: 'HEALTH_WELLNESS',
      mode: 'SERVICE',
      strategy: 'STANDARD',
      badge: '0% GST HEALTH',
      desc: 'Patient appointment management, medical consultation billing (0% GST Healthcare exemption), vitals logs, and electronic prescription generation.',
      features: ['Patient Medical History & Vitals (BP, Pulse, Blood Group)', '0% GST Exempt Healthcare Invoicing (SAC 999312)', 'Electronic Prescription & Diagnostic Test Attachments', 'OPD Doctor Consultation Fee Ledgers'],
      schema: ['blood_group', 'bp_systolic_diastolic', 'pulse_rate', 'patient_age_gender', 'symptoms_chief_complaint'],
      terminology: [
        { standard: 'Customer', localized: 'Patient', purpose: 'Confidential clinical health profile' },
        { standard: 'Product', localized: 'Consultation / Medical Procedure', purpose: 'OPD visit, ECG, dressing service' },
        { standard: 'Repair Job', localized: 'Treatment Plan / Prescription', purpose: 'Clinical follow-up and medicine course' },
        { standard: 'Invoice', localized: 'Healthcare Consultation Bill', purpose: 'Exempt from GST under SAC 9993' }
      ],
      widgets: [
        { id: 'PATIENT_QUEUE_TODAY', priority: 1, feature: 'SERVICE_REPAIR', desc: 'OPD waiting room token status' },
        { id: 'CLINICAL_REVENUE', priority: 5, feature: 'SALES', desc: 'Consultation fees & procedures' }
      ],
      hsnCodes: [
        { code: '999312', desc: 'General Healthcare & Medical Consultation', rate: '0% GST Exempt', rule: 'Notification 12/2017 Central Tax' },
        { code: '999319', desc: 'Diagnostic & Pathology Services', rate: '0% GST Exempt', rule: 'Statutory Health Care Service' }
      ],
      kotlinCode: `BusinessCategory.CLINIC to CategoryDefinition(
    category = BusinessCategory.CLINIC,
    features = baseRetailFeatures + setOf(Feature.SERVICE_REPAIR),
    associatedMode = BusinessMode.SERVICE,
    billingStrategy = BillingStrategyType.STANDARD
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Patient Vitals &amp; 0% GST Bill Generator</span>
            <span class="v-tool-badge success">SAC 9993 EXEMPT</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;color:#CBD5E1;display:flex;flex-direction:column;gap:4px;">
              <div>Patient: <strong style="color:#fff;">Ramesh Chandra (54 Yrs, Male)</strong></div>
              <div>Vitals: <span style="color:#EF4444;font-weight:700;">BP: 138/88 mmHg</span> • <span style="color:#22C55E;">Pulse: 74 bpm</span> • O+</div>
              <div style="display:flex;justify-content:space-between;"><span>Consultation Fee:</span><strong style="color:#F59E0B;font-family:monospace;">₹500.00</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>GST Tax (SAC 999312):</span><strong style="color:#22C55E;">₹0.00 (Exempt)</strong></div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    SERVICE_REPAIR: {
      id: 'SERVICE_REPAIR',
      name: 'Technical Repair Workshop',
      icon: '🔧',
      dna: 'TECHNICAL_SERVICE',
      mode: 'SERVICE',
      strategy: 'STANDARD',
      badge: 'JOB CARDS',
      desc: 'Digital job sheet intake, diagnostic hardware checklists, pattern lock records, technician commission splits, and customer WhatsApp estimates.',
      features: ['Digital Repair Job Sheet with Pattern Lock recording', 'Pre-Repair and Post-Repair diagnostic checklists', 'Technician commission & labor wage calculator', 'Thermal claim ticket printing with disclaimer'],
      schema: ['device_brand_model', 'reported_defect', 'pattern_pin_note', 'assigned_technician_id', 'estimated_cost'],
      terminology: [
        { standard: 'Customer', localized: 'Client / Device Owner', purpose: 'Intake point of contact' },
        { standard: 'Product', localized: 'Spare Part / Service Labor', purpose: 'Hardware component used in fix' },
        { standard: 'Repair Job', localized: 'Repair Job Card', purpose: 'Multi-stage diagnostic repair order' },
        { standard: 'Invoice', localized: 'Repair Delivery Bill', purpose: 'Itemizes spare part + repair labor' }
      ],
      widgets: [
        { id: 'WORKSHOP_JOBS_QUEUE', priority: 1, feature: 'SERVICE_REPAIR', desc: 'Intake, In-Progress, Repaired, Ready' },
        { id: 'TECHNICIAN_PRODUCTIVITY', priority: 6, feature: 'SERVICE_REPAIR', desc: 'Commission splits per technician' }
      ],
      hsnCodes: [
        { code: '998713', desc: 'Repair Services of Computers & Telecoms', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.SERVICE_REPAIR to CategoryDefinition(
    category = BusinessCategory.SERVICE_REPAIR,
    features = baseRetailFeatures + setOf(Feature.SERVICE_REPAIR),
    associatedMode = BusinessMode.SERVICE,
    billingStrategy = BillingStrategyType.STANDARD
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">4-Stage Workshop Job Card Tracker</span>
            <span class="v-tool-badge warning">REP-8812</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;color:#CBD5E1;display:flex;flex-direction:column;gap:4px;">
              <div>Device: <strong style="color:#fff;">iPhone 14 Pro (Display + Battery)</strong></div>
              <div>Technician: <span style="color:#3B82F6;">Imran Khan (Split 30%)</span></div>
              <div style="display:flex;justify-content:space-between;margin-top:4px;">
                <span class="v-chip-code" style="color:#22C55E;">1. Intake ✓</span>
                <span class="v-chip-code" style="color:#F59E0B;background:rgba(245,158,11,0.2);">2. Diagnose ●</span>
                <span class="v-chip-code">3. Repaired</span>
                <span class="v-chip-code">4. Delivered</span>
              </div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    SALON: {
      id: 'SALON',
      name: 'Salon & Spa Wellness',
      icon: '💇',
      dna: 'HEALTH_WELLNESS',
      mode: 'SERVICE',
      strategy: 'STANDARD',
      badge: 'STYLIST SPLIT',
      desc: 'Stylist service menu, commission splits (e.g. 30%), packaged beauty treatment courses, membership wallets, and appointment logs.',
      features: ['Stylist Commission & Daily Payout Ledger', 'Service Packages & Treatment Bundling (Hair Spa, Facial)', 'Customer Membership Credit Balances', 'SAC 999721 Standard 18% GST Invoicing'],
      schema: ['stylist_staff_id', 'commission_rate_pct', 'service_duration_min', 'package_membership_id'],
      terminology: [
        { standard: 'Customer', localized: 'Client / Guest', purpose: 'Membership balance and stylist preferences' },
        { standard: 'Product', localized: 'Salon Service / Cosmetic Kit', purpose: 'Haircut, facial, organic shampoo' },
        { standard: 'Repair Job', localized: 'Service Appointment', purpose: 'Chair booking slot' },
        { standard: 'Ledger', localized: 'Stylist Commission Ledger', purpose: 'Calculates daily employee cut' }
      ],
      widgets: [
        { id: 'DAILY_APPOINTMENTS', priority: 2, feature: 'SERVICE_REPAIR', desc: 'Upcoming chair reservations' },
        { id: 'STYLIST_COMMISSIONS', priority: 6, feature: 'SALES', desc: 'Real-time stylist payout earnings' }
      ],
      hsnCodes: [
        { code: '999721', desc: 'Hairdressing & Barbershop Services', rate: '18% GST', rule: 'CGST 9% + SGST 9%' },
        { code: '999722', desc: 'Beauty Treatment & Facial Services', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.SALON to CategoryDefinition(
    category = BusinessCategory.SALON,
    features = baseRetailFeatures + setOf(Feature.SERVICE_REPAIR),
    associatedMode = BusinessMode.SERVICE,
    billingStrategy = BillingStrategyType.STANDARD
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Stylist Commission Split Calculator</span>
            <span class="v-tool-badge success">PAYOUT LEDGER</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;color:#CBD5E1;display:flex;flex-direction:column;gap:4px;">
              <div>Senior Stylist: <strong style="color:#fff;">Imran Khan (30% Commission)</strong></div>
              <div>Today Services: <span style="color:#fff;">Haircut (₹300) + Hair Spa (₹600) = ₹900</span></div>
              <div style="border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;display:flex;justify-content:space-between;color:#fff;font-weight:700;">
                <span>Net Stylist Payout:</span><strong style="color:#F59E0B;font-family:monospace;font-size:0.75rem;">₹270.00</strong>
              </div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    HARDWARE_TOOLS: {
      id: 'HARDWARE_TOOLS',
      name: 'Hardware & Industrial Tools',
      icon: '🔨',
      dna: 'TECHNICAL_SERVICE',
      mode: 'RETAIL',
      strategy: 'WHOLESALE',
      badge: 'TIERED SLABS',
      desc: 'Bulk tiered price slabs, MOQ reorder workbench, bagged cement vs piece conversions, and builder contractor credit accounts.',
      features: ['Tiered Quantity Price Slabs (1-9, 10-49, 50+ bags)', 'MOQ & Automatic Reorder Workbench', 'Unit conversion between Bags, Metric Tons, and Pieces', 'Supplier Credit Ledger & Payment Reminders'],
      schema: ['price_slab_min_qty', 'moq_units', 'metric_ton_conversion', 'contractor_discount_rate'],
      terminology: [
        { standard: 'Customer', localized: 'Contractor / Builder', purpose: 'Tracks site credit and bulk rates' },
        { standard: 'Product', localized: 'Hardware Tool / Material', purpose: 'Cement, drill bits, fasteners' },
        { standard: 'Stock Unit', localized: 'Bag / Metric Ton / Pcs', purpose: 'Dual packaging conversion' },
        { standard: 'Ledger', localized: 'Contractor Khata', purpose: 'Tracks ongoing construction credit' }
      ],
      widgets: [
        { id: 'TIER_SLAB_WORKBENCH', priority: 3, feature: 'MULTI_PRICING', desc: 'Automated volume discount rates' },
        { id: 'MOQ_REORDER_ALERT', priority: 6, feature: 'INVENTORY', desc: 'Fasteners & consumables low stock' }
      ],
      hsnCodes: [
        { code: '68101110', desc: 'Cement Building Bricks & Blocks', rate: '28% GST', rule: 'CGST 14% + SGST 14%' },
        { code: '82055900', desc: 'Hand Tools (Hammers, Screwdrivers)', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.HARDWARE_TOOLS to CategoryDefinition(
    category = BusinessCategory.HARDWARE_TOOLS,
    features = baseRetailFeatures + setOf(Feature.MULTI_PRICING, Feature.WHOLESALE_BILLING),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.WHOLESALE
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">MOQ &amp; Bulk Price Slab Calculator</span>
            <span class="v-tool-badge success">BULK DISCOUNT</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;color:#CBD5E1;display:flex;flex-direction:column;gap:4px;">
              <div>Product: <strong style="color:#fff;">Ultratech Cement (50kg Bag)</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>1 - 9 Bags:</span><span>₹420 / bag</span></div>
              <div style="display:flex;justify-content:space-between;"><span>10 - 49 Bags:</span><span>₹395 / bag</span></div>
              <div style="display:flex;justify-content:space-between;"><span style="color:#22C55E;font-weight:700;">50+ Bags (Bulk):</span><strong style="color:#22C55E;">₹375 / bag</strong></div>
              <div style="border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;display:flex;justify-content:space-between;color:#fff;font-weight:700;">
                <span>Total for 60 Bags:</span><strong style="color:#F59E0B;font-family:monospace;font-size:0.75rem;">₹22,500.00</strong>
              </div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    GROCERY: {
      id: 'GROCERY',
      name: 'Grocery & Supermarket',
      icon: '🛒',
      dna: 'PURE_RETAIL',
      mode: 'RETAIL',
      strategy: 'STANDARD',
      badge: 'WEIGHT SCALE',
      desc: 'Fast barcode checkout, weight-scale conversions (kg, g, loose items), FMCG expiry alerts, and high-velocity stock replenishments.',
      features: ['Express Counter POS with sub-second barcode intake', 'Electronic Weight Scale decimal conversions (e.g. 1.345 kg)', 'Loose grain vs Sealed packaged item identity handling', 'Low-margin high-velocity replenishment alerts'],
      schema: ['is_loose_item', 'weight_decimal_places', 'shelf_aisle_number', 'mrp_max_retail_price'],
      terminology: [
        { standard: 'Customer', localized: 'Shopper / Walk-in', purpose: 'Quick counter retail customer' },
        { standard: 'Product', localized: 'Grocery Item / FMCG', purpose: 'Barcoded or scale item' },
        { standard: 'Stock Unit', localized: 'Kg / Gram / Litre / Pkt', purpose: 'Flexible metric units' },
        { standard: 'Invoice', localized: 'Counter Retail Cash Bill', purpose: 'Speedy thermal bill' }
      ],
      widgets: [
        { id: 'FAST_POS_COUNTER', priority: 1, feature: 'POS_BILLING', desc: 'Sub-second thermal receipt dispatch' },
        { id: 'RESTOCK_VELOCITY', priority: 5, feature: 'INVENTORY', desc: 'FMCG daily consumption forecast' }
      ],
      hsnCodes: [
        { code: '10063010', desc: 'Rice & Basmati Grains (Packaged)', rate: '5% GST', rule: 'Nil if loose; 5% if pre-packaged' },
        { code: '04012000', desc: 'Milk & Dairy Items', rate: '0% / 5% GST', rule: 'Fresh milk exempt' }
      ],
      kotlinCode: `BusinessCategory.GROCERY to CategoryDefinition(
    category = BusinessCategory.GROCERY,
    features = baseRetailFeatures + setOf(Feature.INVENTORY),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.STANDARD
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Weight Decimal &amp; Speed Checkout</span>
            <span class="v-tool-badge success">EXPRESS POS</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;color:#CBD5E1;display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:space-between;"><span>Basmati Rice (4.50 kg @ ₹85):</span><strong style="color:#fff;font-family:monospace;">₹382.50</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Amul Gold Milk (2 Litres):</span><strong style="color:#fff;font-family:monospace;">₹128.00</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Fortune Sunflower Oil (1 Pkt):</span><strong style="color:#fff;font-family:monospace;">₹145.00</strong></div>
              <div style="border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;display:flex;justify-content:space-between;color:#fff;font-weight:700;">
                <span>Total Net Payable:</span><strong style="color:#F59E0B;font-family:monospace;font-size:0.75rem;">₹655.50</strong>
              </div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    CONSTRUCTION: {
      id: 'CONSTRUCTION',
      name: 'Construction & Projects',
      icon: '🏗️',
      dna: 'INDUSTRIAL_TRADE',
      mode: 'SERVICE',
      strategy: 'STANDARD',
      badge: 'SITE EXPENSES',
      desc: 'Site-by-site expense tracking, contractor material procurement, client stage billing estimates, and project budget overrun alerts.',
      features: ['Multi-Site Expense Allocation (Cement, TMT Steel, Sand)', 'Sub-Contractor Labor Work Orders & Advances', 'Project Budget Overrun & Burn Rate Gauges', 'Client Milestone Stage Billing Invoices'],
      schema: ['site_project_id', 'contractor_firm_name', 'site_supervisor_id', 'milestone_pct'],
      terminology: [
        { standard: 'Customer', localized: 'Property Owner / Client', purpose: 'Project owner billing party' },
        { standard: 'Product', localized: 'Building Material / Work Stage', purpose: 'Steel, concrete, labor stage' },
        { standard: 'Repair Job', localized: 'Site Work Order', purpose: 'Subcontractor phase task' },
        { standard: 'Ledger', localized: 'Site Expense Ledger', purpose: 'Tracks cost vs budget' }
      ],
      widgets: [
        { id: 'SITE_BUDGET_BURN', priority: 2, feature: 'PROJECT_EXPENSES', desc: 'Real-time expenditure vs budget' },
        { id: 'CONTRACTOR_ADVANCES', priority: 5, feature: 'SALES', desc: 'Subcontractor wage settlements' }
      ],
      hsnCodes: [
        { code: '995411', desc: 'Construction Services of Residential Buildings', rate: '1% / 5% GST', rule: 'Affordable (1%) vs Regular (5%)' }
      ],
      kotlinCode: `BusinessCategory.CONSTRUCTION to CategoryDefinition(
    category = BusinessCategory.CONSTRUCTION,
    features = baseRetailFeatures + setOf(Feature.PROJECT_EXPENSES, Feature.JOB_WORK_TRACKING),
    associatedMode = BusinessMode.SERVICE,
    billingStrategy = BillingStrategyType.STANDARD
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Site Expense Ledger &amp; Budget Gauge</span>
            <span class="v-tool-badge success">UNDER BUDGET</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;color:#CBD5E1;display:flex;flex-direction:column;gap:4px;">
              <div>Site: <strong style="color:#fff;">Vraj Heights - Phase 1 (Plot 402)</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Cement &amp; Aggregates:</span><strong style="color:#fff;font-family:monospace;">₹1,85,000.00</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>TMT Steel Bars:</span><strong style="color:#fff;font-family:monospace;">₹3,40,000.00</strong></div>
              <div style="border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;display:flex;justify-content:space-between;color:#fff;font-weight:700;">
                <span>Total Site Outflow:</span><strong style="color:#F59E0B;font-family:monospace;font-size:0.75rem;">₹5,25,000.00</strong>
              </div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    },

    GENERAL: {
      id: 'GENERAL',
      name: 'General Retail & FMCG',
      icon: '📦',
      dna: 'GENERAL_TRADE',
      mode: 'GENERAL',
      strategy: 'STANDARD',
      badge: 'UNIVERSAL ERP',
      desc: 'Universal point-of-sale billing, double-entry financial ledger, expense tracking, local SQLCipher 256-bit AES database encryption, and cloud sync.',
      features: ['Universal Stock & Barcode Billing', 'Double-Entry Accounting & Financial Day Book', 'Local SQLCipher 256-Bit AES Database Lock', 'Real-time Write-Ahead Outbox Cloud Synchronization'],
      schema: ['generic_barcode', 'hsn_code', 'tax_rate_pct', 'mrp_selling_price'],
      terminology: [
        { standard: 'Customer', localized: 'Customer / Buyer', purpose: 'Standard retail consumer' },
        { standard: 'Product', localized: 'Item / Merchandise', purpose: 'Universal inventory stock' },
        { standard: 'Repair Job', localized: 'Service Task', purpose: 'General client task' },
        { standard: 'Invoice', localized: 'GST Tax Invoice', purpose: 'Standard CGST+SGST tax invoice' }
      ],
      widgets: [
        { id: 'SALES_SUMMARY', priority: 1, feature: 'POS_BILLING', desc: 'Universal daily sales count' },
        { id: 'INTELLI_AUDIT', priority: 10, feature: 'REPORTS_BASIC', desc: '5-Pillar Health Score 0-100' }
      ],
      hsnCodes: [
        { code: '999999', desc: 'General Goods & Merchandise', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.GENERAL to CategoryDefinition(
    category = BusinessCategory.GENERAL,
    features = baseRetailFeatures,
    associatedMode = BusinessMode.GENERAL,
    billingStrategy = BillingStrategyType.STANDARD
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Universal GST Split &amp; Day Book</span>
            <span class="v-tool-badge success">AES-256 ROOM</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;color:#CBD5E1;display:flex;flex-direction:column;gap:4px;">
              <div>Customer: <strong style="color:#fff;">Walk-in Retail Buyer</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>Taxable Value:</span><strong style="color:#fff;font-family:monospace;">₹1,650.00</strong></div>
              <div style="display:flex;justify-content:space-between;"><span>CGST (9%) + SGST (9%):</span><strong style="color:#F59E0B;font-family:monospace;">₹297.00</strong></div>
              <div style="border-top:1px dashed rgba(255,255,255,0.1);padding-top:4px;display:flex;justify-content:space-between;color:#fff;font-weight:700;">
                <span>Total Invoice Value:</span><strong style="color:#22C55E;font-family:monospace;font-size:0.75rem;">₹1,947.00</strong>
              </div>
            </div>
          </div>
        </div>`,
      bindEvents: () => {}
    }
  };

  const chipsContainer = document.getElementById('v-chips-container');
  const dnaPills = document.querySelectorAll('.v-dna-pill');
  const tabBtns = document.querySelectorAll('.v-tab-btn');
  const tabPanes = document.querySelectorAll('.v-tab-pane');

  const deckName = document.getElementById('v-deck-name');
  const deckIcon = document.getElementById('v-deck-icon');
  const deckDna = document.getElementById('v-deck-dna');
  const deckMode = document.getElementById('v-deck-mode');
  const deckStrategy = document.getElementById('v-deck-strategy');
  const deckDesc = document.getElementById('v-deck-desc');
  const deckFeatures = document.getElementById('v-deck-features');
  const deckSchema = document.getElementById('v-deck-schema');
  const deckTool = document.getElementById('v-deck-tool');
  const deckTermBody = document.getElementById('v-deck-term-body');
  const deckWidgets = document.getElementById('v-deck-widgets');
  const deckHsnBody = document.getElementById('v-deck-hsn-body');
  const deckCode = document.getElementById('v-deck-code');
  const launchMockupBtn = document.getElementById('v-launch-mockup-btn');

  if (!chipsContainer || !deckName) return;

  let activeVerticalKey = 'MOBILE_SHOP';
  let activeDnaFilter = 'ALL';

  // 1. Render all 18 vertical chips
  function renderChips() {
    chipsContainer.innerHTML = '';
    Object.values(VERTICAL_ARCHETYPES).forEach(v => {
      const isVisible = activeDnaFilter === 'ALL' || v.dna === activeDnaFilter;
      const chip = document.createElement('button');
      chip.className = `v-chip-btn ${v.id === activeVerticalKey ? 'active' : ''}`;
      chip.style.display = isVisible ? 'inline-flex' : 'none';
      chip.dataset.vkey = v.id;
      chip.setAttribute('role', 'tab');
      chip.setAttribute('aria-selected', v.id === activeVerticalKey);
      chip.innerHTML = `<span>${v.icon}</span> <span>${v.name}</span> <span class="v-chip-code">${v.badge}</span>`;
      chip.addEventListener('click', () => selectVertical(v.id));
      chipsContainer.appendChild(chip);
    });
  }

  // 2. Select & Render a vertical into the 5-tab Explorer Deck
  function selectVertical(key) {
    const v = VERTICAL_ARCHETYPES[key];
    if (!v) return;
    activeVerticalKey = key;

    // Update active chip styling & scroll into center view
    document.querySelectorAll('.v-chip-btn').forEach(btn => {
      const isActive = btn.dataset.vkey === key;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
      if (isActive) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    // Update Deck Header
    if (deckName) deckName.textContent = v.name;
    if (deckIcon) deckIcon.textContent = v.icon;
    if (deckDna) deckDna.textContent = v.dna;
    if (deckMode) deckMode.textContent = `MODE: ${v.mode}`;
    if (deckStrategy) deckStrategy.textContent = `STRATEGY: ${v.strategy}`;
    if (deckDesc) deckDesc.textContent = v.desc;

    // Tab 1: Features & Schema & Tool
    if (deckFeatures) {
      deckFeatures.innerHTML = v.features.map(f => `
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${f}</span>
        </li>
      `).join('');
    }

    if (deckSchema) {
      deckSchema.innerHTML = `
        <div class="v-schema-title">Active IndustrySchema Fields (Room DB Entity)</div>
        <div class="v-schema-tags">
          ${v.schema.map(s => `<span class="v-schema-tag">${s}</span>`).join('')}
        </div>
      `;
    }

    if (deckTool) {
      deckTool.innerHTML = v.renderTool();
      v.bindEvents();
    }

    // Tab 2: Terminology Table
    if (deckTermBody) {
      deckTermBody.innerHTML = v.terminology.map(t => `
        <tr>
          <td class="v-term-old">${t.standard}</td>
          <td class="v-term-arrow">→</td>
          <td class="v-term-new">${t.localized}</td>
          <td>${t.purpose}</td>
        </tr>
      `).join('');
    }

    // Tab 3: Dashboard Widgets Grid
    if (deckWidgets) {
      deckWidgets.innerHTML = v.widgets.map(w => `
        <div class="v-widget-card">
          <div class="v-widget-header">
            <span class="v-widget-id">${w.id}</span>
            <span class="v-widget-priority">Priority ${w.priority}</span>
          </div>
          <span class="v-widget-feature">Gate: Feature.${w.feature}</span>
          <p class="v-widget-desc">${w.desc}</p>
        </div>
      `).join('');
    }

    // Tab 4: Statutory HSN Codes
    if (deckHsnBody) {
      deckHsnBody.innerHTML = v.hsnCodes.map(h => `
        <tr>
          <td class="v-hsn-code">${h.code}</td>
          <td>${h.desc}</td>
          <td class="v-hsn-rate">${h.rate}</td>
          <td>${h.rule}</td>
        </tr>
      `).join('');
    }

    // Tab 5: Kotlin Architecture Code
    if (deckCode) {
      deckCode.textContent = v.kotlinCode;
    }
  }

  // 3. DNA Filter Pills handling
  dnaPills.forEach(pill => {
    pill.addEventListener('click', () => {
      dnaPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeDnaFilter = pill.dataset.dna;
      renderChips();

      // If active vertical is now hidden by DNA filter, switch to first visible vertical
      const firstVisible = Object.values(VERTICAL_ARCHETYPES).find(v => activeDnaFilter === 'ALL' || v.dna === activeDnaFilter);
      if (firstVisible && (activeDnaFilter !== 'ALL' && VERTICAL_ARCHETYPES[activeVerticalKey].dna !== activeDnaFilter)) {
        selectVertical(firstVisible.id);
      }
    });
  });

  // 4. 5-Tab Navigation Buttons handling
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.vtab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanes.forEach(pane => {
        pane.classList.toggle('active', pane.id === `v-pane-${targetTab}`);
      });
    });
  });

  // 5. "📱 Test in Phone Mockup ↑" Bridge
  if (launchMockupBtn) {
    launchMockupBtn.addEventListener('click', () => {
      // Map vertical archetype to hero phone simulator pill key
      const heroPill = document.querySelector(`[data-vertical="${activeVerticalKey}"]`);
      if (heroPill) {
        heroPill.click();
      }
      // Smoothly scroll to phone mockup
      const heroPhone = document.getElementById('app-simulator-root') || document.querySelector('.hero-mockup-wrapper');
      if (heroPhone) {
        heroPhone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Initialize
  renderChips();
  selectVertical('MOBILE_SHOP');
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

/* ══════════════════════════════════════════════════════════════════════
   PHASE 1 UPGRADES — VeriStock Pro JS Controller v2.0
   ══════════════════════════════════════════════════════════════════════ */

/* ── SCROLL PROGRESS BAR ─────────────────────────────────────────────── */
(function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(100, progress) + '%';
  }, { passive: true });
})();

/* ── BACK TO TOP BUTTON ──────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── HERO STAT PILL COUNTER ANIMATION ────────────────────────────────── */
(function initStatCounters() {
  function animateCount(el, from, to, duration, suffix) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // Observe the hero live stats section
  const heroStats = document.querySelector('.hero-live-stats');
  if (!heroStats) return;

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      const pills = heroStats.querySelectorAll('.pill-val');
      pills.forEach(pill => {
        const text = pill.textContent.trim();
        // Only animate pure numeric values
        if (text === '18') animateCount(pill, 0, 18, 800, '');
        if (text === '78') animateCount(pill, 0, 78, 1000, '');
      });
    }
  }, { threshold: 0.5 });

  observer.observe(heroStats);
})();

/* ── "HOW IT WORKS" STEP CARD STAGGER ANIMATION ─────────────────────── */
(function initHowStepsAnimation() {
  const steps = document.querySelectorAll('.how-step-card');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each card reveal by 120ms
        const index = Array.from(steps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(24px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(step);
  });
})();

/* ── UPDATE DOMContentLoaded INITIALIZER ─────────────────────────────── */
// Add "How It Works" nav link if not already present
document.addEventListener('DOMContentLoaded', () => {
  // Update the nav links to include "How It Works"
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    const existingLinks = Array.from(navMenu.querySelectorAll('a')).map(a => a.getAttribute('href'));
    if (!existingLinks.includes('#how-it-works')) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#how-it-works';
      a.className = 'nav-link';
      a.textContent = 'How It Works';
      li.appendChild(a);
      // Insert after first "Features" link
      const featuresLi = navMenu.querySelector('li:first-child');
      if (featuresLi && featuresLi.nextSibling) {
        navMenu.insertBefore(li, featuresLi.nextSibling);
      }
    }
  }
});
