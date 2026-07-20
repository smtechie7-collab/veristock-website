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
      features: ['Dual IMEI & Serial Tracking', 'Pre-loaded HSN Code Dictionary (8517, 8544)', 'Accessories & Spare Parts Bundling', 'Used Mobile Buyback & KYC Record']
    },
    service: {
      title: '🔧 Technical Repair Center',
      desc: 'Job-card creation, pre/post repair check-lists, pattern/PIN lock notes, technician assignment, and customer SMS/WhatsApp estimates.',
      features: ['Digital Intake Job Sheets', 'Pre-Repair Diagnostics Checklist', 'Technician Commission & Wages', 'ESC/POS Thermal Ticket Printing']
    },
    garments: {
      title: '👔 Garments & Footwear',
      desc: 'Grid-Matrix inventory for Size x Color x Material variants, barcode sticker printing, exchange credits, and seasonal catalogs.',
      features: ['2D Grid Matrix Stock Entry', 'Thermal Barcode Tag Printing', 'Size & Color Substitutes Finder', 'Season Stock Performance Analytics']
    },
    pharmacy: {
      title: '💊 Pharmacy & Medical Store',
      desc: 'Batch number & expiry date Sentinel tracking, Schedule H/H1 registers, salt composition search, and doctor prescription attachments.',
      features: ['Batch & Expiry Date Sentinel', 'Schedule H & H1 Compliance Registers', 'Medicine Composition Search', 'Margin & Discount Calculator']
    },
    grocery: {
      title: '🛒 Grocery & Supermarket',
      desc: 'Weight/unit selling (kg, g, L), barcode speed checkout, fast counter billing, and low-stock replenishment alerts.',
      features: ['Fast Counter Billing Mode', 'Custom Unit Conversions (kg/g/pack)', 'Loose Item Pricing', 'Restock & Velocity Warnings']
    },
    electronics: {
      title: '📺 Electronics & Appliances',
      desc: 'Serial number warranty validation, serial tracking for TVs, ACs, Refrigerators, and customer AMC contract logs.',
      features: ['Unit Serial & Warranty Tracking', 'AMC Service Contract Register', 'Landed Cost & Margin Calculators', 'Brand-wise Inventory Reports']
    },
    automotive: {
      title: '🚗 Automotive & Spare Parts',
      desc: 'Chassis & Engine number records, vehicle Km driven intake, spare parts HSN lookup, and service work orders.',
      features: ['Chassis & Engine No. Intake', 'Odometer & Fuel Status Tracking', 'Spare Part HSN Lookup', 'Work Order & Job Estimates']
    },
    hardware: {
      title: '🔨 Hardware & Tools',
      desc: 'Bulk price slabs, trade discounts, MOQ reorder workbench, and construction material procurement tracking.',
      features: ['Bulk Tiered Price Slabs', 'MOQ & Reorder Workbench', 'Unit Conversions (Bags/Pcs)', 'Supplier Credit Ledger']
    },
    clinic: {
      title: '🩺 Medical Clinic & Health',
      desc: 'Patient appointment records, consultation fees, medical history notes, prescription attachments, and bill receipts.',
      features: ['Patient History & Vitals Register', 'Prescription Attachment', 'Consultation Fee Invoicing', 'Appointment Log']
    },
    salon: {
      title: '💇 Salon & Wellness',
      desc: 'Service booking, technician commission tracking, packaged treatments, and customer membership ledgers.',
      features: ['Service Menu & Timing', 'Stylist Commission Logs', 'Customer Ledger & Reminders', 'Package Treatments']
    },
    wholesale: {
      title: '🏭 Wholesale Distribution',
      desc: 'Tiered wholesale pricing slabs, bulk invoicing, outstanding receivables aging (0-180 days), and CA GST exports.',
      features: ['Tiered Price Slabs', 'Receivables Aging Report', 'Prepared GSTR-1 & 3B CSV Export', 'Credit Limit Safeguards']
    },
    manufacturing: {
      title: '⚙️ Manufacturing & Assembly',
      desc: 'Bill of Materials (BOM), production batch tracking, Work-In-Progress (WIP) stock, and scrap yield efficiency reports.',
      features: ['Bill of Materials (BOM)', 'Production Batch Allocation', 'WIP & Raw Material Tracking', 'Yield & Scrap Reports']
    },
    restaurant: {
      title: '🍽️ Restaurant & Cafe',
      desc: 'Kitchen Order Tickets (KOT), Table Merge/Split, Dine-in/Takeaway toggle, item modifiers (No Onion, Extra Spicy), and shift settlement.',
      features: ['KOT Kitchen Printing', 'Table Management (Merge/Split)', 'Item Modifiers & Customizations', 'Daily Shift Settlement']
    },
    construction: {
      title: '🏗️ Construction & Projects',
      desc: 'Site expense tracking, contractor material procurement, client ledger estimates, and project cost breakdowns.',
      features: ['Site Expense Tracking', 'Contractor Material Procurement', 'Client Ledger & Estimates', 'Project Costing Reports']
    },
    secondhand: {
      title: '📱 Second-Hand Mobile Buyback',
      desc: 'Digital buyback registers, device condition reports, seller ID photo proof, and legal shield purchase receipts.',
      features: ['Seller KYC & ID Document Storage', 'Device Physical Condition Audit', 'Acquisition Cost & Margin Calc', 'Legal Purchase Receipt']
    },
    general: {
      title: '📦 General Retail & Trade',
      desc: 'Universal inventory, GST billing, double-entry financial ledger, expense tracking, and offline SQLCipher backup.',
      features: ['Universal Stock & Billing', 'Double-Entry Financial Ledger', 'AES-256 SQLCipher Local DB', 'Google Drive Encrypted Sync']
    }
  };

  const chips = document.querySelectorAll('.category-chip-btn');
  const titleEl = document.getElementById('cat-detail-title');
  const descEl = document.getElementById('cat-detail-desc');
  const listEl = document.getElementById('cat-feature-list');

  if (!chips.length || !titleEl || !descEl || !listEl) return;

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
    });
  });
}

/* ── 9. INTERACTIVE REPAIR TRACKER SIMULATOR ─────────────────────────── */
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
