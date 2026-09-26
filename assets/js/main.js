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

  let ticking = false;
  const handleScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  };

  // Run on load and scroll with rAF
  handleScroll();
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });
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

  // Close menu when a destination link is clicked (excluding dropdown-toggle)
  const navActionLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item, .dropdown-footer-link');
  navActionLinks.forEach(link => {
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
      contactAlert.textContent = 'Thank you! Your message has been sent successfully. '
        + 'We will respond back within 24 hours.';
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
      deletionAlert.textContent = 'Account deletion request received. A verification email has been sent to '
        + email + '. Complete the instructions to schedule permanent removal within 7 business days.';
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
  const VERTICAL_ARCHETYPES = window.VERTICAL_ARCHETYPES || {};

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
      chip.addEventListener('click', () => selectVertical(v.id, true));
      chipsContainer.appendChild(chip);
    });
  }

  // 2. Select & Render a vertical into the 5-tab Explorer Deck
  function selectVertical(key, shouldScroll = false) {
    const v = VERTICAL_ARCHETYPES[key];
    if (!v) return;
    activeVerticalKey = key;

    // Update active chip styling & scroll chip into center horizontally only inside chipsContainer
    document.querySelectorAll('.v-chip-btn').forEach(btn => {
      const isActive = btn.dataset.vkey === key;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
      if (isActive && shouldScroll && chipsContainer) {
        const offset = btn.offsetLeft - (chipsContainer.clientWidth / 2) + (btn.clientWidth / 2);
        chipsContainer.scrollTo({ left: offset, behavior: 'smooth' });
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
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
      const firstVisible = Object.values(VERTICAL_ARCHETYPES)
        .find(v => activeDnaFilter === 'ALL' || v.dna === activeDnaFilter);
      if (firstVisible && (activeDnaFilter !== 'ALL' &&
          VERTICAL_ARCHETYPES[activeVerticalKey].dna !== activeDnaFilter)) {
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
  selectVertical('MOBILE_SHOP', false);
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

  let ticking = false;
  const updateBar = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateBar);
      ticking = true;
    }
  }, { passive: true });
  updateBar();
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
