/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   VERISTOCK PRO — Interactive App Simulator v1.0
 *   Renders a fully interactive Android app mockup inside the website
 *   Mirrors: HomeScreen.kt, QuickActions.kt, BusinessOverview.kt
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

(function () {
  'use strict';

  // ── SCREEN DEFINITIONS ─────────────────────────────────────────────
  const SUB_SCREENS = {
    invoice: {
      title: 'Standard Tax Invoice',
      badge: '#VT-2026-089',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-customer-row">
            <span class="sim-label">Customer:</span>
            <strong>R.S. Malek (Anand)</strong>
          </div>
          <div class="sim-cart-list">
            <div class="sim-cart-item">
              <div><div class="sim-item-name">OnePlus 12 5G (Silky Black)</div><div class="sim-item-meta">Qty: 1 × ₹64,999.00</div></div>
              <strong>₹64,999.00</strong>
            </div>
            <div class="sim-cart-item">
              <div><div class="sim-item-name">9H Tempered Glass Protector</div><div class="sim-item-meta">Qty: 2 × ₹499.00</div></div>
              <strong>₹998.00</strong>
            </div>
            <div class="sim-cart-item">
              <div><div class="sim-item-name">Spigen Case (Clear)</div><div class="sim-item-meta">Qty: 1 × ₹1,299.00</div></div>
              <strong>₹1,299.00</strong>
            </div>
          </div>
          <div class="sim-totals">
            <div class="sim-total-row"><span>Subtotal:</span><span>₹67,296.00</span></div>
            <div class="sim-total-row"><span>CGST (9%) + SGST (9%):</span><span>₹11,879.46</span></div>
            <div class="sim-total-row sim-total-grand"><span>Net Payable:</span><span class="sim-success-text">₹67,296.00</span></div>
            <div class="sim-complete-btn">✓ COMPLETE SALE (PAYMENT: UPI)</div>
          </div>
        </div>`
    },
    pos: {
      title: 'Quick POS Billing',
      badge: 'Counter Mode',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-pos-search">
            <div class="sim-search-bar"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><span>Scan barcode or search product...</span></div>
          </div>
          <div class="sim-pos-items">
            <div class="sim-pos-item"><div class="sim-pos-item-icon" style="background:rgba(99,102,241,0.1);color:#6366F1;">📱</div><div><div class="sim-item-name">Redmi Note 13 Pro</div><div class="sim-item-meta">₹22,999 • Stock: 8</div></div><div class="sim-pos-qty">+</div></div>
            <div class="sim-pos-item"><div class="sim-pos-item-icon" style="background:rgba(245,158,11,0.1);color:#F59E0B;">🔌</div><div><div class="sim-item-name">Type-C Cable (1m)</div><div class="sim-item-meta">₹299 • Stock: 45</div></div><div class="sim-pos-qty">+</div></div>
            <div class="sim-pos-item"><div class="sim-pos-item-icon" style="background:rgba(16,185,129,0.1);color:#10B981;">🎧</div><div><div class="sim-item-name">Bluetooth Earbuds Pro</div><div class="sim-item-meta">₹1,499 • Stock: 12</div></div><div class="sim-pos-qty">+</div></div>
          </div>
          <div class="sim-pos-footer">
            <div class="sim-pos-total"><span>Cart (0 items)</span><strong>₹0.00</strong></div>
            <div class="sim-complete-btn" style="margin-top:6px;">PROCEED TO CHECKOUT →</div>
          </div>
        </div>`
    },
    repairs: {
      title: 'Repair Job Cards',
      badge: 'Ready (4)',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-filters"><span class="sim-chip sim-chip-active">All (12)</span><span class="sim-chip">Active (5)</span><span class="sim-chip">Ready (4)</span><span class="sim-chip">Pending (3)</span></div>
          <div class="sim-repair-list">
            <div class="sim-repair-card">
              <div><div class="sim-item-name">iPhone 14 Pro <small class="sim-muted">(REP-2026-0812)</small></div><div class="sim-item-meta">Issue: Screen replacement | Tech: Imran Khan</div></div>
              <span class="sim-status-chip sim-status-warning">DIAGNOSING</span>
            </div>
            <div class="sim-repair-card">
              <div><div class="sim-item-name">Samsung S23 Ultra <small class="sim-muted">(REP-2026-0799)</small></div><div class="sim-item-meta">Issue: Charging port fault | Tech: Ramesh</div></div>
              <span class="sim-status-chip sim-status-success">REPAIRED</span>
            </div>
            <div class="sim-repair-card">
              <div><div class="sim-item-name">Realme Narzo 60 <small class="sim-muted">(REP-2026-0781)</small></div><div class="sim-item-meta">Issue: Battery Swelling | Due: 2 Days</div></div>
              <span class="sim-status-chip sim-status-error">AWAITING PARTS</span>
            </div>
            <div class="sim-repair-card">
              <div><div class="sim-item-name">Vivo V30 Pro <small class="sim-muted">(REP-2026-0775)</small></div><div class="sim-item-meta">Issue: Software crash | Tech: Imran Khan</div></div>
              <span class="sim-status-chip sim-status-success">READY</span>
            </div>
          </div>
        </div>`
    },
    inventory: {
      title: 'Inventory Ledger',
      badge: 'Low Stock (3)',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-stock-header"><span class="sim-stock-col-name">Product / Variant</span><span class="sim-stock-col-qty">Stock</span><span class="sim-stock-col-min">Min</span></div>
          <div class="sim-stock-list">
            <div class="sim-stock-row"><span class="sim-stock-col-name">OnePlus 12R (Blue, 256GB)</span><span class="sim-stock-col-qty sim-success-text">18</span><span class="sim-stock-col-min">5</span></div>
            <div class="sim-stock-row sim-stock-low"><span class="sim-stock-col-name">Redmi Note 13 Pro (128GB)</span><span class="sim-stock-col-qty sim-error-text">2</span><span class="sim-stock-col-min">5</span></div>
            <div class="sim-stock-row"><span class="sim-stock-col-name">Vivo V30 (Peach, 256GB)</span><span class="sim-stock-col-qty sim-success-text">11</span><span class="sim-stock-col-min">3</span></div>
            <div class="sim-stock-row sim-stock-low"><span class="sim-stock-col-name">iPhone 15 (Blue, 128GB)</span><span class="sim-stock-col-qty sim-error-text">1</span><span class="sim-stock-col-min">3</span></div>
            <div class="sim-stock-row"><span class="sim-stock-col-name">Samsung A54 (Lime, 128GB)</span><span class="sim-stock-col-qty sim-success-text">24</span><span class="sim-stock-col-min">5</span></div>
            <div class="sim-stock-row sim-stock-low"><span class="sim-stock-col-name">Realme GT Neo 5 (256GB)</span><span class="sim-stock-col-qty sim-error-text">0</span><span class="sim-stock-col-min">3</span></div>
          </div>
        </div>`
    },
    purchases: {
      title: 'Purchase Orders',
      badge: '3 Pending',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-list">
            <div class="sim-repair-card">
              <div><div class="sim-item-name">PO-2026-0412 <small class="sim-muted">• Sunrise Distributors</small></div><div class="sim-item-meta">15 items • ₹2,45,000.00</div></div>
              <span class="sim-status-chip sim-status-success">RECEIVED</span>
            </div>
            <div class="sim-repair-card">
              <div><div class="sim-item-name">PO-2026-0411 <small class="sim-muted">• MobiParts India</small></div><div class="sim-item-meta">8 items • ₹78,500.00</div></div>
              <span class="sim-status-chip sim-status-warning">IN TRANSIT</span>
            </div>
            <div class="sim-repair-card">
              <div><div class="sim-item-name">PO-2026-0410 <small class="sim-muted">• Gadget Hub Delhi</small></div><div class="sim-item-meta">22 items • ₹4,12,800.00</div></div>
              <span class="sim-status-chip sim-status-success">RECEIVED</span>
            </div>
          </div>
        </div>`
    },
    daybook: {
      title: 'Day Book',
      badge: 'Today',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-daybook-summary">
            <div class="sim-daybook-box sim-daybook-credit"><span>Total Credit</span><strong class="sim-success-text">₹48,250.00</strong></div>
            <div class="sim-daybook-box sim-daybook-debit"><span>Total Debit</span><strong class="sim-error-text">₹12,450.00</strong></div>
          </div>
          <div class="sim-repair-list">
            <div class="sim-daybook-entry"><div class="sim-daybook-icon sim-bg-green">↓</div><div><div class="sim-item-name">Sale #VT-089</div><div class="sim-item-meta">UPI • R.S. Malek</div></div><strong class="sim-success-text">+₹64,999</strong></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon sim-bg-red">↑</div><div><div class="sim-item-name">Purchase #PO-411</div><div class="sim-item-meta">Bank Transfer • MobiParts</div></div><strong class="sim-error-text">−₹12,450</strong></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon sim-bg-green">↓</div><div><div class="sim-item-name">Sale #VT-088</div><div class="sim-item-meta">Cash • Walk-in</div></div><strong class="sim-success-text">+₹2,499</strong></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon sim-bg-green">↓</div><div><div class="sim-item-name">Repair #REP-0799</div><div class="sim-item-meta">UPI • Basit Shaikh</div></div><strong class="sim-success-text">+₹3,500</strong></div>
          </div>
        </div>`
    },
    customers: {
      title: 'Customer Directory',
      badge: '156 Total',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-pos-search"><div class="sim-search-bar"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><span>Search customer...</span></div></div>
          <div class="sim-customer-list">
            <div class="sim-customer-card"><div class="sim-avatar" style="background:#6366F1;">RM</div><div class="sim-customer-info"><div class="sim-item-name">R.S. Malek</div><div class="sim-item-meta">+91 98765 43210</div></div><div class="sim-customer-bal sim-success-text">₹0</div></div>
            <div class="sim-customer-card"><div class="sim-avatar" style="background:#F59E0B;">BS</div><div class="sim-customer-info"><div class="sim-item-name">Basit Shaikh</div><div class="sim-item-meta">+91 87654 32109</div></div><div class="sim-customer-bal sim-error-text">₹12,500</div></div>
            <div class="sim-customer-card"><div class="sim-avatar" style="background:#10B981;">MD</div><div class="sim-customer-info"><div class="sim-item-name">Moin Dosa</div><div class="sim-item-meta">+91 76543 21098</div></div><div class="sim-customer-bal sim-success-text">₹0</div></div>
            <div class="sim-customer-card"><div class="sim-avatar" style="background:#EC4899;">AK</div><div class="sim-customer-info"><div class="sim-item-name">Arjun Kumar</div><div class="sim-item-meta">+91 65432 10987</div></div><div class="sim-customer-bal sim-error-text">₹30,000</div></div>
          </div>
        </div>`
    },
    profitloss: {
      title: 'Profit & Loss',
      badge: 'This Month',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-pl-hero"><span>Net Profit</span><strong class="sim-success-text" style="font-size:1.3rem;">₹1,28,750</strong><span class="sim-item-meta">▲ 18.2% from last month</span></div>
          <div class="sim-pl-rows">
            <div class="sim-pl-row"><span>Total Revenue</span><strong>₹4,12,500</strong></div>
            <div class="sim-pl-row"><span>Cost of Goods Sold</span><strong class="sim-error-text">−₹2,45,000</strong></div>
            <div class="sim-pl-row sim-pl-subtotal"><span>Gross Profit</span><strong>₹1,67,500</strong></div>
            <div class="sim-pl-row"><span>Operating Expenses</span><strong class="sim-error-text">−₹28,750</strong></div>
            <div class="sim-pl-row"><span>Repair Income</span><strong class="sim-success-text">+₹15,000</strong></div>
            <div class="sim-pl-row"><span>Other Expenses</span><strong class="sim-error-text">−₹25,000</strong></div>
          </div>
        </div>`
    },
    expenses: {
      title: 'Expenses',
      badge: '₹28,750',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-list">
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(239,68,68,0.1);color:#EF4444;">🏪</div><div><div class="sim-item-name">Shop Rent</div><div class="sim-item-meta">Monthly • Jun 2026</div></div><strong>₹15,000</strong></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(245,158,11,0.1);color:#F59E0B;">⚡</div><div><div class="sim-item-name">Electricity Bill</div><div class="sim-item-meta">Monthly • Jun 2026</div></div><strong>₹4,500</strong></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(99,102,241,0.1);color:#6366F1;">👤</div><div><div class="sim-item-name">Staff Salary</div><div class="sim-item-meta">Monthly • Imran Khan</div></div><strong>₹8,000</strong></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(16,185,129,0.1);color:#10B981;">🧹</div><div><div class="sim-item-name">Maintenance</div><div class="sim-item-meta">Quarterly</div></div><strong>₹1,250</strong></div>
          </div>
        </div>`
    },
    trialbalance: {
      title: 'Trial Balance',
      badge: 'FY 2026-27',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-stock-header"><span class="sim-stock-col-name">Account</span><span class="sim-stock-col-qty">Debit</span><span class="sim-stock-col-min">Credit</span></div>
          <div class="sim-stock-list">
            <div class="sim-stock-row"><span class="sim-stock-col-name">Cash in Hand</span><span class="sim-stock-col-qty">₹18,500</span><span class="sim-stock-col-min">—</span></div>
            <div class="sim-stock-row"><span class="sim-stock-col-name">Bank Account</span><span class="sim-stock-col-qty">₹1,45,000</span><span class="sim-stock-col-min">—</span></div>
            <div class="sim-stock-row"><span class="sim-stock-col-name">Sales Revenue</span><span class="sim-stock-col-qty">—</span><span class="sim-stock-col-min">₹4,12,500</span></div>
            <div class="sim-stock-row"><span class="sim-stock-col-name">Purchase A/c</span><span class="sim-stock-col-qty">₹2,45,000</span><span class="sim-stock-col-min">—</span></div>
            <div class="sim-stock-row"><span class="sim-stock-col-name">Sundry Debtors</span><span class="sim-stock-col-qty">₹42,500</span><span class="sim-stock-col-min">—</span></div>
          </div>
          <div class="sim-stock-footer"><span>Total</span><span>₹4,51,000</span><span>₹4,51,000</span></div>
        </div>`
    },
    caHub: {
      title: 'CA & GST Hub',
      badge: 'GSTR-1 Due',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-gst-alert">⚠️ GSTR-1 filing due on 11th Aug 2026</div>
          <div class="sim-repair-list">
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(26,86,219,0.1);color:#1A56DB;">📄</div><div><div class="sim-item-name">GSTR-1 Report</div><div class="sim-item-meta">Export outward supplies CSV</div></div><span class="sim-chip">Export</span></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(99,102,241,0.1);color:#6366F1;">📊</div><div><div class="sim-item-name">GSTR-3B Summary</div><div class="sim-item-meta">Monthly tax liability</div></div><span class="sim-chip">View</span></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(245,158,11,0.1);color:#F59E0B;">📋</div><div><div class="sim-item-name">HSN Summary</div><div class="sim-item-meta">Product-wise HSN report</div></div><span class="sim-chip">Export</span></div>
          </div>
        </div>`
    },
    collections: {
      title: 'Collections',
      badge: '₹42,500 Due',
      badgeColor: 'error',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-list">
            <div class="sim-repair-card">
              <div><div class="sim-item-name">Basit Shaikh</div><div class="sim-item-meta">Due: ₹12,500 • Overdue 15 days</div></div>
              <span class="sim-status-chip sim-status-error">OVERDUE</span>
            </div>
            <div class="sim-repair-card">
              <div><div class="sim-item-name">Arjun Kumar</div><div class="sim-item-meta">Due: ₹30,000 • Due in 5 days</div></div>
              <span class="sim-status-chip sim-status-warning">PENDING</span>
            </div>
          </div>
        </div>`
    },
    suppliers: {
      title: 'Supplier Directory',
      badge: '24 Total',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-customer-list">
            <div class="sim-customer-card"><div class="sim-avatar" style="background:#1A56DB;">SD</div><div class="sim-customer-info"><div class="sim-item-name">Sunrise Distributors</div><div class="sim-item-meta">Mumbai • GST: 27AABCS1234P1Z5</div></div><div class="sim-customer-bal">₹0</div></div>
            <div class="sim-customer-card"><div class="sim-avatar" style="background:#F59E0B;">MP</div><div class="sim-customer-info"><div class="sim-item-name">MobiParts India</div><div class="sim-item-meta">Delhi • GST: 07BBCPM5678Q2Z8</div></div><div class="sim-customer-bal sim-error-text">₹78,500</div></div>
            <div class="sim-customer-card"><div class="sim-avatar" style="background:#10B981;">GH</div><div class="sim-customer-info"><div class="sim-item-name">Gadget Hub Delhi</div><div class="sim-item-meta">Delhi • GST: 07CCDGH9012R3Z1</div></div><div class="sim-customer-bal">₹0</div></div>
          </div>
        </div>`
    },
    reports: {
      title: 'Reports Center',
      badge: '12 Reports',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-list">
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(26,86,219,0.1);color:#1A56DB;">📊</div><div><div class="sim-item-name">Sales Report</div><div class="sim-item-meta">Daily / Weekly / Monthly</div></div><span class="sim-chip">→</span></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(245,158,11,0.1);color:#F59E0B;">📦</div><div><div class="sim-item-name">Stock Report</div><div class="sim-item-meta">Current inventory levels</div></div><span class="sim-chip">→</span></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(16,185,129,0.1);color:#10B981;">💰</div><div><div class="sim-item-name">GST Report</div><div class="sim-item-meta">GSTR-1 / GSTR-3B exports</div></div><span class="sim-chip">→</span></div>
            <div class="sim-daybook-entry"><div class="sim-daybook-icon" style="background:rgba(139,92,246,0.1);color:#8B5CF6;">🔧</div><div><div class="sim-item-name">Repair Report</div><div class="sim-item-meta">Job card history & stats</div></div><span class="sim-chip">→</span></div>
          </div>
        </div>`
    },
    // Feature preview cards for items without full sub-screens
    _featurePreview: (icon, title, desc) => `
      <div class="sim-sub-screen-content" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 16px;">
        <div class="sim-feature-preview-icon">${icon}</div>
        <h3 class="sim-feature-preview-title">${title}</h3>
        <p class="sim-feature-preview-desc">${desc}</p>
        <div class="sim-feature-cta">Download App to Access →</div>
      </div>`
  };

  // Feature previews for Quick Actions without full screens
  const FEATURE_PREVIEWS = {
    purchaseHistory: { icon: '📋', title: 'Purchase History', desc: 'View all past purchase orders, supplier invoices, and GRN records with date filtering.' },
    mediaVault: { icon: '📸', title: 'Media Vault', desc: 'Securely store product photos, invoice scans, and repair evidence images linked to transactions.' },
    imeiLookup: { icon: '🔍', title: 'IMEI Lookup', desc: 'Instantly search device IMEI/serial numbers across your entire sales, purchase, and repair history.' },
    barcodePrint: { icon: '🏷️', title: 'Barcode Labels', desc: 'Generate and print barcode/QR labels for products. Supports thermal and standard printers.' },
    salesHistory: { icon: '🧾', title: 'Sales History', desc: 'Complete history of all sales invoices with customer, amount, payment mode, and GST details.' },
    warranty: { icon: '🛡️', title: 'Warranty Lookup', desc: 'Track warranty status for sold devices. Auto-validate warranty claims by IMEI or serial number.' },
    emi: { icon: '💳', title: 'EMI Dashboard', desc: 'Track EMI installments, due dates, and overdue payments. Send reminders via WhatsApp.' },
    fieldService: { icon: '🔧', title: 'Field Service / AMC', desc: 'Manage Annual Maintenance Contracts, on-site service visits, and recurring service schedules.' },
    refurbish: { icon: '♻️', title: 'Refurbishment', desc: 'Track refurbishment pipeline — grading, testing, and re-listing used/returned devices.' },
    simKyc: { icon: '📱', title: 'SIM KYC Register', desc: 'Digital register for SIM card sales with customer ID proof, signature, and Aadhaar linkage.' },
    buyUsed: { icon: '📥', title: 'Buy Used Device KYC', desc: 'Record KYC details when purchasing used/second-hand devices from walk-in customers.' },
    sellUsed: { icon: '📤', title: 'Sell Used Device KYC', desc: 'KYC tracking for selling refurbished/used devices with buyer ID verification.' },
    allKyc: { icon: '📑', title: 'All KYC Records', desc: 'Unified view of all compliance registers — SIM sales, device buy/sell KYC records.' },
  };

  // ── DASHBOARD TAB CONTENT ─────────────────────────────────────────
  const DASHBOARD_TAB = {
    title: 'Business Dashboard',
    render: () => `
      <div class="sim-dashboard-tab">
        <div class="sim-dash-hero-card">
          <div class="sim-dash-score"><span class="sim-dash-score-num">87</span><span class="sim-dash-score-label">Health Score</span></div>
          <div class="sim-dash-score-bar"><div class="sim-dash-score-fill" style="width:87%;"></div></div>
        </div>
        <div class="sim-section-label">Monthly Trends</div>
        <div class="sim-dash-chart">
          <div class="sim-chart-bars">
            <div class="sim-chart-bar" style="height:45%;"><span>Jan</span></div>
            <div class="sim-chart-bar" style="height:62%;"><span>Feb</span></div>
            <div class="sim-chart-bar" style="height:55%;"><span>Mar</span></div>
            <div class="sim-chart-bar" style="height:78%;"><span>Apr</span></div>
            <div class="sim-chart-bar" style="height:85%;"><span>May</span></div>
            <div class="sim-chart-bar sim-chart-bar-active" style="height:92%;"><span>Jun</span></div>
          </div>
        </div>
        <div class="sim-section-label">Key Metrics</div>
        <div class="sim-dash-metrics">
          <div class="sim-dash-metric"><span class="sim-dash-metric-label">Inventory Turnover</span><strong>4.2x</strong></div>
          <div class="sim-dash-metric"><span class="sim-dash-metric-label">Gross Margin</span><strong>38.5%</strong></div>
          <div class="sim-dash-metric"><span class="sim-dash-metric-label">Collection Rate</span><strong>91.2%</strong></div>
          <div class="sim-dash-metric"><span class="sim-dash-metric-label">Avg. Repair TAT</span><strong>2.1 days</strong></div>
        </div>
      </div>`
  };

  const PRODUCTS_TAB = {
    title: 'Products',
    render: () => `
      <div class="sim-sub-screen-content">
        <div class="sim-pos-search"><div class="sim-search-bar"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><span>Search 248 products...</span></div></div>
        <div class="sim-product-categories"><span class="sim-chip sim-chip-active">All</span><span class="sim-chip">Phones</span><span class="sim-chip">Accessories</span><span class="sim-chip">Spare Parts</span></div>
        <div class="sim-customer-list">
          <div class="sim-customer-card"><div class="sim-avatar" style="background:rgba(99,102,241,0.15);color:#6366F1;font-size:14px;">📱</div><div class="sim-customer-info"><div class="sim-item-name">OnePlus 12 5G</div><div class="sim-item-meta">₹64,999 • Stock: 18</div></div><div class="sim-customer-bal sim-success-text">●</div></div>
          <div class="sim-customer-card"><div class="sim-avatar" style="background:rgba(239,68,68,0.15);color:#EF4444;font-size:14px;">📱</div><div class="sim-customer-info"><div class="sim-item-name">Redmi Note 13 Pro</div><div class="sim-item-meta">₹22,999 • Stock: 2</div></div><div class="sim-customer-bal sim-error-text">⚠</div></div>
          <div class="sim-customer-card"><div class="sim-avatar" style="background:rgba(16,185,129,0.15);color:#10B981;font-size:14px;">🎧</div><div class="sim-customer-info"><div class="sim-item-name">Bluetooth Earbuds Pro</div><div class="sim-item-meta">₹1,499 • Stock: 12</div></div><div class="sim-customer-bal sim-success-text">●</div></div>
          <div class="sim-customer-card"><div class="sim-avatar" style="background:rgba(245,158,11,0.15);color:#F59E0B;font-size:14px;">🔌</div><div class="sim-customer-info"><div class="sim-item-name">Type-C Cables (Bulk)</div><div class="sim-item-meta">₹299 • Stock: 45</div></div><div class="sim-customer-bal sim-success-text">●</div></div>
        </div>
      </div>`
  };

  const SETTINGS_TAB = {
    title: 'Settings',
    render: () => `
      <div class="sim-sub-screen-content">
        <div class="sim-settings-profile">
          <div class="sim-avatar" style="background:linear-gradient(135deg,#1A56DB,#F59E0B);width:40px;height:40px;font-size:14px;">SM</div>
          <div><div class="sim-item-name">SM Mobile, Mumbai</div><div class="sim-item-meta">smtechie7@gmail.com • Pro License</div></div>
        </div>
        <div class="sim-settings-list">
          <div class="sim-settings-item"><span>🏪</span><span>Shop Profile & GST</span><span class="sim-muted">›</span></div>
          <div class="sim-settings-item"><span>🖨️</span><span>Printer Setup</span><span class="sim-muted">›</span></div>
          <div class="sim-settings-item"><span>🔒</span><span>Security & App Lock</span><span class="sim-muted">›</span></div>
          <div class="sim-settings-item"><span>☁️</span><span>Backup & Sync</span><span class="sim-muted">›</span></div>
          <div class="sim-settings-item"><span>📲</span><span>Smart Clone (Device Transfer)</span><span class="sim-muted">›</span></div>
          <div class="sim-settings-item"><span>🎨</span><span>Theme & Display</span><span class="sim-muted">›</span></div>
          <div class="sim-settings-item"><span>📞</span><span>WhatsApp Support</span><span class="sim-muted">›</span></div>
          <div class="sim-settings-item"><span>ℹ️</span><span>About VeriStock Pro</span><span class="sim-muted">›</span></div>
        </div>
      </div>`
  };

  // ── QUICK ACTION DEFINITIONS ──────────────────────────────────────
  const QUICK_ACTION_SECTIONS = [
    {
      title: 'Daily Operations',
      items: [
        { icon: '🚚', label: 'Purchases', screen: 'purchases' },
        { icon: '📋', label: 'Purch. Hist', screen: 'purchaseHistory' },
        { icon: '💸', label: 'Expenses', screen: 'expenses' },
        { icon: '📸', label: 'Media', screen: 'mediaVault' },
        { icon: '🔍', label: 'IMEI', screen: 'imeiLookup' },
        { icon: '🏷️', label: 'Barcode', screen: 'barcodePrint' },
        { icon: '🧾', label: 'Sales Hist', screen: 'salesHistory' },
        { icon: '🛡️', label: 'Warranty', screen: 'warranty' },
      ]
    },
    {
      title: 'Accounting & GST',
      items: [
        { icon: '📖', label: 'Day Book', screen: 'daybook' },
        { icon: '📊', label: 'P&L', screen: 'profitloss' },
        { icon: '⚖️', label: 'Trial Bal.', screen: 'trialbalance' },
        { icon: '🏛️', label: 'CA/GST Hub', screen: 'caHub' },
      ]
    },
    {
      title: 'Services & Compliance',
      items: [
        { icon: '🔧', label: 'Field Svc', screen: 'fieldService' },
        { icon: '🛠️', label: 'Repairs', screen: 'repairs' },
        { icon: '♻️', label: 'Refurbish', screen: 'refurbish' },
        { icon: '💰', label: 'Collections', screen: 'collections' },
      ]
    },
    {
      title: 'Digital KYC Registers',
      items: [
        { icon: '📱', label: 'SIM KYC', screen: 'simKyc' },
        { icon: '📥', label: 'Buy Used', screen: 'buyUsed' },
        { icon: '📤', label: 'Sell Used', screen: 'sellUsed' },
        { icon: '📑', label: 'All KYC', screen: 'allKyc' },
      ]
    },
    {
      title: 'Management & Analytics',
      items: [
        { icon: '📦', label: 'Inventory', screen: 'inventory' },
        { icon: '👥', label: 'Customers', screen: 'customers' },
        { icon: '🏢', label: 'Suppliers', screen: 'suppliers' },
        { icon: '📈', label: 'Reports', screen: 'reports' },
      ]
    }
  ];

  // ── RENDER FUNCTIONS ──────────────────────────────────────────────

  function renderStatusBar() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `
      <div class="sim-status-bar">
        <span class="sim-status-time">${timeStr}</span>
        <div class="sim-status-icons">
          <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
          <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.34C7 21.4 7.6 22 8.33 22h7.34c.73 0 1.33-.6 1.33-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>`;
  }

  function renderTopBar(title, showBack) {
    if (showBack) {
      return `
        <div class="sim-top-bar">
          <div class="sim-top-bar-left">
            <button class="sim-back-btn" data-action="back"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <span class="sim-top-bar-title">${title}</span>
          </div>
          <div class="sim-top-bar-right">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          </div>
        </div>`;
    }
    return `
      <div class="sim-top-bar sim-top-bar-home">
        <div class="sim-top-bar-left">
          <div class="sim-shop-avatar">VP</div>
          <div class="sim-shop-info">
            <span class="sim-shop-name">SM Mobile, Mumbai</span>
            <span class="sim-shop-status"><span class="sim-online-dot"></span>Offline ERP Active</span>
          </div>
        </div>
        <div class="sim-top-bar-right">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <div class="sim-notif-wrap"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg><span class="sim-notif-dot"></span></div>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
      </div>`;
  }

  function renderBottomNav(activeTab) {
    const tabs = [
      { id: 'home', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>', label: 'Home' },
      { id: 'dashboard', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>', label: 'Dashboard' },
      { id: 'products', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>', label: 'Products' },
      { id: 'settings', icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09"></path></svg>', label: 'Settings' },
    ];
    return `
      <div class="sim-bottom-nav">
        ${tabs.map(t => `<button class="sim-nav-tab ${activeTab === t.id ? 'sim-nav-tab-active' : ''}" data-tab="${t.id}">${t.icon}<span>${t.label}</span></button>`).join('')}
      </div>`;
  }

  function renderBusinessOverview() {
    return `
      <div class="sim-revenue-card">
        <div class="sim-revenue-header">
          <span class="sim-revenue-label">Today's Revenue</span>
          <span class="sim-revenue-month-badge">Month: ₹4,12,500</span>
        </div>
        <div class="sim-revenue-amount-row">
          <span class="sim-revenue-amount">₹48,250<small>.00</small></span>
          <span class="sim-revenue-growth">▲ 12.4%</span>
        </div>
        <div class="sim-revenue-sub">Up 8.4% from last month</div>
        <div class="sim-revenue-dues">
          <div class="sim-dues-left"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#FFCDD2" stroke-width="3"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg><span>Total Dues: ₹42,500.00</span></div>
          <span class="sim-dues-arrow">›</span>
        </div>
      </div>
      <div class="sim-mini-stats">
        <div class="sim-mini-card" data-screen="purchases"><div class="sim-mini-icon" style="background:rgba(245,158,11,0.1);color:#F59E0B;">🚚</div><div><span class="sim-mini-label">PURCHASES</span><span class="sim-mini-value">₹12,450</span></div></div>
        <div class="sim-mini-card" data-screen="daybook"><div class="sim-mini-icon" style="background:rgba(16,185,129,0.1);color:#10B981;">💵</div><div><span class="sim-mini-label">CASH</span><span class="sim-mini-value">₹18,500</span></div></div>
      </div>
      <div class="sim-mini-stats">
        <div class="sim-mini-card" data-screen="salesHistory"><div class="sim-mini-icon" style="background:rgba(99,102,241,0.1);color:#6366F1;">📄</div><div><span class="sim-mini-label">ORDERS</span><span class="sim-mini-value">32 Bills</span></div></div>
        <div class="sim-mini-card"><div class="sim-mini-icon" style="background:rgba(139,92,246,0.1);color:#8B5CF6;">📈</div><div><span class="sim-mini-label">AVG. TICKET</span><span class="sim-mini-value">₹1,508</span></div></div>
      </div>`;
  }

  function renderPrimaryActions() {
    return `
      <div class="sim-primary-actions">
        <button class="sim-primary-btn sim-primary-btn-blue" data-screen="pos"><span class="sim-primary-btn-icon">⚡</span><div><span class="sim-primary-btn-title">Fast Billing</span><span class="sim-primary-btn-sub">Counter Sale</span></div></button>
        <button class="sim-primary-btn sim-primary-btn-slate" data-screen="invoice"><span class="sim-primary-btn-icon">🧾</span><div><span class="sim-primary-btn-title">New Invoice</span><span class="sim-primary-btn-sub">Standard GST</span></div></button>
      </div>`;
  }

  function renderQuickActionSection(section) {
    return `
      <div class="sim-qa-section">
        <div class="sim-section-label">${section.title}</div>
        <div class="sim-qa-grid">
          ${section.items.map(item => `
            <button class="sim-qa-item" data-screen="${item.screen}">
              <span class="sim-qa-icon">${item.icon}</span>
              <span class="sim-qa-label">${item.label}</span>
            </button>
          `).join('')}
        </div>
      </div>`;
  }

  function renderRecentTransactions() {
    return `
      <div class="sim-qa-section">
        <div class="sim-section-label" style="display:flex;justify-content:space-between;align-items:center;">Recent Transactions <span class="sim-view-all" data-screen="salesHistory">View All ›</span></div>
        <div class="sim-recent-list">
          <div class="sim-recent-item">
            <div class="sim-recent-icon sim-bg-green">↓</div>
            <div class="sim-recent-info"><div class="sim-item-name">OnePlus 12 5G Sale</div><div class="sim-item-meta">R.S. Malek • UPI • 10:42 AM</div></div>
            <strong class="sim-success-text">+₹64,999</strong>
          </div>
          <div class="sim-recent-item">
            <div class="sim-recent-icon sim-bg-red">↑</div>
            <div class="sim-recent-info"><div class="sim-item-name">MobiParts Purchase</div><div class="sim-item-meta">Supplier • Bank • 09:15 AM</div></div>
            <strong class="sim-error-text">−₹12,450</strong>
          </div>
          <div class="sim-recent-item">
            <div class="sim-recent-icon sim-bg-green">↓</div>
            <div class="sim-recent-info"><div class="sim-item-name">Repair: Samsung S23</div><div class="sim-item-meta">Basit Shaikh • Cash • 08:30 AM</div></div>
            <strong class="sim-success-text">+₹3,500</strong>
          </div>
        </div>
      </div>`;
  }

  function renderHomeContent() {
    let html = renderBusinessOverview();
    html += renderPrimaryActions();
    QUICK_ACTION_SECTIONS.forEach(s => { html += renderQuickActionSection(s); });
    html += renderRecentTransactions();
    return html;
  }

  // ── SIMULATOR ENGINE ──────────────────────────────────────────────

  class AppSimulator {
    constructor(containerEl) {
      this.container = containerEl;
      this.currentTab = 'home';
      this.screenStack = []; // navigation history
      this.isAnimating = false;
      this.init();
    }

    init() {
      this.render();
      this.bindEvents();
      // Update time every minute
      setInterval(() => {
        const timeEl = this.container.querySelector('.sim-status-time');
        if (timeEl) {
          const now = new Date();
          timeEl.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
        }
      }, 60000);
    }

    render() {
      this.container.innerHTML = `
        <div class="sim-phone-shell">
          <div class="sim-notch"></div>
          <div class="sim-screen">
            ${renderStatusBar()}
            <div class="sim-app-bar-container">
              ${renderTopBar(null, false)}
            </div>
            <div class="sim-content-area">
              <div class="sim-screen-layer sim-screen-active" data-layer="main">
                ${renderHomeContent()}
              </div>
            </div>
            ${renderBottomNav('home')}
          </div>
        </div>`;
    }

    bindEvents() {
      // Event delegation
      this.container.addEventListener('click', (e) => {
        if (this.isAnimating) return;

        // Back button
        const backBtn = e.target.closest('[data-action="back"]');
        if (backBtn) { this.goBack(); return; }

        // Bottom nav tabs
        const tabBtn = e.target.closest('[data-tab]');
        if (tabBtn) { this.switchTab(tabBtn.dataset.tab); return; }

        // Screen navigation (Quick Actions, mini cards, etc.)
        const screenBtn = e.target.closest('[data-screen]');
        if (screenBtn) { this.openScreen(screenBtn.dataset.screen); return; }
      });
    }

    switchTab(tabId) {
      if (tabId === this.currentTab && this.screenStack.length === 0) return;
      this.currentTab = tabId;
      this.screenStack = [];
      
      const appBar = this.container.querySelector('.sim-app-bar-container');
      const contentArea = this.container.querySelector('.sim-content-area');
      const bottomNav = this.container.querySelector('.sim-bottom-nav');

      let content, title;
      switch (tabId) {
        case 'home':
          appBar.innerHTML = renderTopBar(null, false);
          content = renderHomeContent();
          break;
        case 'dashboard':
          title = DASHBOARD_TAB.title;
          appBar.innerHTML = renderTopBar(title, false);
          // Replace top bar with the dashboard-style one (no back)
          appBar.innerHTML = `<div class="sim-top-bar sim-top-bar-home"><div class="sim-top-bar-left"><span class="sim-top-bar-title" style="font-size:0.8125rem;font-weight:700;">${title}</span></div><div class="sim-top-bar-right"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></div></div>`;
          content = DASHBOARD_TAB.render();
          break;
        case 'products':
          title = PRODUCTS_TAB.title;
          appBar.innerHTML = `<div class="sim-top-bar sim-top-bar-home"><div class="sim-top-bar-left"><span class="sim-top-bar-title" style="font-size:0.8125rem;font-weight:700;">${title}</span></div><div class="sim-top-bar-right"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div></div>`;
          content = PRODUCTS_TAB.render();
          break;
        case 'settings':
          title = SETTINGS_TAB.title;
          appBar.innerHTML = `<div class="sim-top-bar sim-top-bar-home"><div class="sim-top-bar-left"><span class="sim-top-bar-title" style="font-size:0.8125rem;font-weight:700;">${title}</span></div><div class="sim-top-bar-right"></div></div>`;
          content = SETTINGS_TAB.render();
          break;
      }

      contentArea.innerHTML = `<div class="sim-screen-layer sim-screen-active" data-layer="main">${content}</div>`;
      // Update bottom nav active state
      if (bottomNav) {
        bottomNav.querySelectorAll('.sim-nav-tab').forEach(t => {
          t.classList.toggle('sim-nav-tab-active', t.dataset.tab === tabId);
        });
      }
    }

    openScreen(screenId) {
      const screenDef = SUB_SCREENS[screenId];
      const previewDef = FEATURE_PREVIEWS[screenId];
      
      let title, badge, badgeColor, content;

      if (screenDef) {
        title = screenDef.title;
        badge = screenDef.badge;
        badgeColor = screenDef.badgeColor || '';
        content = screenDef.render();
      } else if (previewDef) {
        title = previewDef.title;
        badge = '';
        content = SUB_SCREENS._featurePreview(previewDef.icon, previewDef.title, previewDef.desc);
      } else {
        return;
      }

      this.screenStack.push(screenId);
      this.isAnimating = true;

      const appBar = this.container.querySelector('.sim-app-bar-container');
      const contentArea = this.container.querySelector('.sim-content-area');

      // Render badge in top bar
      let badgeHtml = '';
      if (badge) {
        const colorClass = badgeColor === 'success' ? 'sim-badge-success' : badgeColor === 'error' ? 'sim-badge-error' : badgeColor === 'warning' ? 'sim-badge-warning' : 'sim-badge-default';
        badgeHtml = `<span class="sim-top-badge ${colorClass}">${badge}</span>`;
      }

      appBar.innerHTML = `
        <div class="sim-top-bar">
          <div class="sim-top-bar-left">
            <button class="sim-back-btn" data-action="back"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <span class="sim-top-bar-title">${title}</span>
          </div>
          <div class="sim-top-bar-right">${badgeHtml}</div>
        </div>`;

      // Slide in new screen
      const newLayer = document.createElement('div');
      newLayer.className = 'sim-screen-layer sim-screen-enter';
      newLayer.dataset.layer = 'sub-' + screenId;
      newLayer.innerHTML = content;
      contentArea.appendChild(newLayer);

      const mainLayer = contentArea.querySelector('.sim-screen-active');

      // Trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newLayer.classList.remove('sim-screen-enter');
          newLayer.classList.add('sim-screen-active');
          if (mainLayer && mainLayer !== newLayer) {
            mainLayer.classList.remove('sim-screen-active');
            mainLayer.classList.add('sim-screen-exit');
          }
          setTimeout(() => {
            if (mainLayer && mainLayer !== newLayer && mainLayer.classList.contains('sim-screen-exit')) {
              mainLayer.style.display = 'none';
            }
            this.isAnimating = false;
          }, 300);
        });
      });
    }

    goBack() {
      if (this.screenStack.length === 0) return;
      this.isAnimating = true;
      const prevScreen = this.screenStack.pop();

      const appBar = this.container.querySelector('.sim-app-bar-container');
      const contentArea = this.container.querySelector('.sim-content-area');

      // Restore app bar
      if (this.screenStack.length === 0) {
        if (this.currentTab === 'home') {
          appBar.innerHTML = renderTopBar(null, false);
        } else {
          // Restore tab-appropriate app bar
          this.switchTab(this.currentTab);
          this.isAnimating = false;
          return;
        }
      } else {
        // Go to previous sub-screen
        const parentId = this.screenStack[this.screenStack.length - 1];
        const parentDef = SUB_SCREENS[parentId] || { title: 'Back' };
        appBar.innerHTML = renderTopBar(parentDef.title, true);
      }

      // Slide out current sub-screen back to the right
      const currentLayer = contentArea.querySelector('.sim-screen-active');
      const prevLayer = contentArea.querySelector('.sim-screen-exit') || contentArea.querySelector('[data-layer="main"]');

      if (prevLayer) {
        prevLayer.style.display = 'block';
        prevLayer.classList.remove('sim-screen-exit');
        prevLayer.classList.add('sim-screen-active');
      }

      if (currentLayer) {
        currentLayer.classList.remove('sim-screen-active');
        currentLayer.classList.add('sim-screen-enter');
      }

      setTimeout(() => {
        if (currentLayer) currentLayer.remove();
        this.isAnimating = false;
      }, 300);
    }
  }

  // ── PUBLIC INITIALIZER ────────────────────────────────────────────
  window.VeriStockSimulator = {
    init: function (selector) {
      const el = document.querySelector(selector);
      if (el) {
        return new AppSimulator(el);
      }
      console.warn('[VeriStockSimulator] Container not found:', selector);
      return null;
    }
  };
})();
