/**
 * VeriStock Pro - 18 Specialized Operational Archetypes Architectural Hub Data
 * Decoupled data dictionary for all 18 supported business categories.
 */
window.VERTICAL_ARCHETYPES = {
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
      badge: 'UDHARI & RMA SHIELD',
      desc: 'Multi-pricing tier slabs (Retail vs Wholesale vs Super-Stockist), pack-size MOQ billing, Quality Grade badging (Original, OLED, Tested A+), Rack-Shelf-Tray bin indexing, RMA defect intake, and 0-180+ days receivables aging.',
      features: [
        'Multi-Tier Wholesale Price Slabs with MOQ gating',
        'Pack-Size Billing (Box of 10, Pack of 50, Master Carton)',
        'Quality Grade Badging (Original, OLED, Tested A+) on invoices',
        'RMA Defect Return Engine with 5-point checklist & quarantine bin',
        'Rack-Shelf-Tray location indexing for 10,000+ tiny spare parts',
        '0-180+ Days Receivables Aging Ladder (Udhari risk radar)',
        'Stock Transfer Notes (STN) for inter-department stock movement'
      ],
      schema: ['price_slab_tier', 'credit_limit_amount', 'credit_days_allowed', 'gstin_verified', 'pack_size_qty', 'quality_grade', 'storage_tray_bin'],
      terminology: [
        { standard: 'Customer', localized: 'B2B Retailer / Dealer', purpose: 'GSTIN-registered trade account' },
        { standard: 'Product', localized: 'Trade Bulk SKU / Spares', purpose: 'Pack of cartons or spare parts' },
        { standard: 'Stock Unit', localized: 'Carton / Box / Case', purpose: 'Wholesale multi-pack measures' },
        { standard: 'RMA Return', localized: 'Defect Return / 1:1 Exchange', purpose: '5-point intake checklist & quarantine' },
        { standard: 'Storage Location', localized: 'Rack-Shelf-Tray (R-S-T)', purpose: 'Physical coordinate picking' },
        { standard: 'Ledger', localized: 'Dealer Credit Ledger (Aging)', purpose: 'Tracks outstanding bill maturities' }
      ],
      widgets: [
        { id: 'RECEIVABLES_AGING', priority: 2, feature: 'REPORTS_ADVANCED', desc: '0-30d, 31-90d, 91-180d overdue totals' },
        { id: 'WHOLESALE_DISPATCH', priority: 4, feature: 'WHOLESALE_BILLING', desc: 'Pending orders ready for transport' },
        { id: 'RMA_QUARANTINE_LOCKED', priority: 5, feature: 'WHOLESALE_BILLING', desc: 'Locked capital in defective bins' },
        { id: 'CREDIT_BREACH_ALERTS', priority: 6, feature: 'WHOLESALE_BILLING', desc: 'Dealers exceeding credit limits' }
      ],
      hsnCodes: [
        { code: '996111', desc: 'Wholesale Trade Services on Fee/Contract', rate: '18% GST', rule: 'CGST 9% + SGST 9%' },
        { code: '85177090', desc: 'Mobile Display Folders & Spare Parts', rate: '18% GST', rule: 'CGST 9% + SGST 9%' },
        { code: '85044090', desc: 'Fast Chargers & Power Adapters', rate: '18% GST', rule: 'CGST 9% + SGST 9%' }
      ],
      kotlinCode: `BusinessCategory.WHOLESALE_DISTRIBUTION to CategoryDefinition(
    category = BusinessCategory.WHOLESALE_DISTRIBUTION,
    features = baseRetailFeatures + setOf(
        Feature.WHOLESALE_BILLING,
        Feature.MULTI_PRICING,
        Feature.RMA_MANAGEMENT,
        Feature.STOCK_TRANSFER_NOTE,
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
      name: 'Electronics & Consumer Appliances',
      icon: '📺',
      dna: 'TECHNICAL_SERVICE',
      mode: 'RETAIL',
      strategy: 'ELECTRONICS_SHOWROOM',
      badge: 'DUAL-SERIAL & BEE STAR',
      desc: 'Enterprise ERP for Consumer Electronics, Split ACs & Home Appliances. Split AC IDU/ODU dual-serial set tracking, BEE 1-5 Star Energy Ratings on invoices, 5-10 Year Compressor & Motor extended warranties in item notes, Customer Doorstep Delivery & Installation Tracker, Consumer EMI Finance, Auto-enforced 28% AC & 18% Washing Machine/Fridge GST, and E-Way Bill advisory.',
      features: [
        'Split AC IDU + ODU Dual-Serial Set Invariant (paired serial scanning, distinctness check & set delivery)',
        'BEE Energy Star Rating (1 to 5 Stars) auto-mapped & printed on thermal & PDF tax invoices',
        'Compressor & Motor 5-10 Year Extended Warranty tracking in invoice line item notes',
        'Customer Doorstep Delivery & Installation Tracker with shipping address capture & technician dispatch',
        'Consumer Finance & No-Cost EMI tenure tracking (Bajaj Finserv, PineLabs, HDB, Credit Card EMI)',
        'Statutory Tax Compliance: 28% GST for ACs, 18% for Washers (HSN 8450) & Fridges (HSN 8418)',
        'E-Way Bill Advisory auto-prompt for consignments exceeding ₹50,000 threshold',
        'Showroom POS Hero Quick Actions: 1-Tap Appliance Sale & Delivery Challan Dispatch',
        'Decontaminated Appliance Diagnostic QC Grid (Cabinet Dents, Gas Leakage, Compressor Hum, Cooling Coil)'
      ],
      schema: ['idu_serial', 'odu_serial', 'bee_star_rating', 'compressor_warranty_years', 'shipping_address', 'delivery_status', 'installation_technician', 'emi_tenure_months'],
      terminology: [
        { standard: 'Customer', localized: 'Appliance Owner / Buyer', purpose: 'Captures full doorstep delivery address' },
        { standard: 'Product', localized: 'Serialized Appliance (AC/TV/WM)', purpose: 'Appliance with serial sets & star rating' },
        { standard: 'Repair Job', localized: 'Installation / Demo / AMC Ticket', purpose: 'On-site engineer service & demo order' },
        { standard: 'Stock Unit', localized: 'Set / Unit (IDU + ODU)', purpose: 'Individual packed appliance set' },
        { standard: 'Serial Number', localized: 'Dual Serial (IDU + ODU)', purpose: 'Split AC indoor & outdoor serial pairing' },
        { standard: 'Delivery', localized: 'Doorstep Delivery Challan', purpose: 'Logistics dispatch & installation signoff' }
      ],
      widgets: [
        { id: 'SALES_SUMMARY', priority: 1, feature: 'POS_BILLING', desc: 'Appliance revenue, units sold & ticket size' },
        { id: 'QUICK_ACTIONS', priority: 2, feature: 'POS_BILLING', desc: 'Fast Appliance Sale, Delivery Challan, Serial Scan' },
        { id: 'PENDING_DELIVERIES', priority: 3, feature: 'DELIVERY_TRACKING', desc: 'Doorstep deliveries awaiting driver dispatch' },
        { id: 'INSTALLATION_TRACKER', priority: 4, feature: 'SERVICE_REPAIR', desc: 'Scheduled technician installations & demos' },
        { id: 'AMC_DUE_CALENDAR', priority: 5, feature: 'AMC_MANAGEMENT', desc: 'Seasonal AC & appliance preventive maintenance' },
        { id: 'WARRANTY_AUDIT', priority: 8, feature: 'WARRANTY_TRACKING', desc: 'Expiring compressor & motor warranty records' }
      ],
      hsnCodes: [
        { code: '84151010', desc: 'Window / Split Air Conditioners (Complete Set)', rate: '28% GST', rule: 'CGST 14% + SGST 14% Auto-Enforced' },
        { code: '84501100', desc: 'Household Fully-Automatic Washing Machines', rate: '18% GST', rule: 'CGST 9% + SGST 9% (HSN 8450 Compliant)' },
        { code: '84181010', desc: 'Combined Refrigerator-Freezers (Frost Free)', rate: '18% GST', rule: 'CGST 9% + SGST 9% (HSN 8418 Compliant)' },
        { code: '85287217', desc: 'Smart LED TV & Display Monitors', rate: '18% / 28% GST', rule: '18% for screen <= 32 inches; 28% for larger' }
      ],
      kotlinCode: `BusinessCategory.ELECTRONICS to CategoryDefinition(
    category = BusinessCategory.ELECTRONICS,
    features = baseRetailFeatures + setOf(
        Feature.WARRANTY_TRACKING,
        Feature.AMC_MANAGEMENT,
        Feature.SERVICE_REPAIR,
        Feature.DELIVERY_TRACKING,
        Feature.SERIAL_NUMBER_TRACKING,
        Feature.CONSUMER_EMI
    ),
    associatedMode = BusinessMode.RETAIL,
    billingStrategy = BillingStrategyType.ELECTRONICS_SHOWROOM,
    dashboardLayout = listOf(
        WidgetConfig("SALES_SUMMARY", priority = 1),
        WidgetConfig("QUICK_ACTIONS", priority = 2),
        WidgetConfig("PENDING_DELIVERIES", priority = 3),
        WidgetConfig("INSTALLATION_TRACKER", priority = 4)
    )
)`,
      renderTool: () => `
        <div class="v-tool-box">
          <div class="v-tool-header">
            <span class="v-tool-title">Split AC Dual-Serial &amp; Installation Radar</span>
            <span class="v-tool-badge success">IDU+ODU PAIRED</span>
          </div>
          <div class="v-tool-form">
            <div style="font-size:0.625rem;color:#CBD5E1;display:flex;flex-direction:column;gap:5px;">
              <div style="display:flex;justify-content:space-between;">
                <span>Appliance Model:</span>
                <strong style="color:#fff;">Voltas 1.5 Ton 5-Star Inverter Split AC</strong>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>Indoor Unit (IDU SN):</span>
                <span style="color:#ADC6FF;font-family:monospace;font-weight:700;">VOL-IDU-2026-9812</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>Outdoor Unit (ODU SN):</span>
                <span style="color:#ADC6FF;font-family:monospace;font-weight:700;">VOL-ODU-2026-4471</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>BEE Energy Star Rating:</span>
                <span style="color:#F59E0B;font-weight:800;">⭐⭐⭐⭐⭐ 5-STAR (ISEER 5.10)</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>Compressor Warranty:</span>
                <span style="color:#22C55E;font-weight:700;">10 Years Extended (Item Note)</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>Statutory GST Rate:</span>
                <span class="v-chip-code" style="color:#22C55E;background:rgba(34,197,94,0.15);">28% GST (CGST 14% + SGST 14%)</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>Doorstep Delivery:</span>
                <span style="color:#38BDF8;font-weight:700;">Challan #DC-8041 • Out for Delivery</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>Technician Installation:</span>
                <span style="color:#F59E0B;font-weight:700;">Scheduled Today, 4:00 PM</span>
              </div>
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
;
