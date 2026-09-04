/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   VERISTOCK PRO — Interactive App Simulator v2.0 (Enterprise ERP Edition)
 *   Mirrors Android Jetpack Compose M3 Design System & Architecture:
 *   - CategoryRegistry.kt & TerminologyEngine.kt (18 Verticals & 5 DNAs)
 *   - VeriStockProTopAppBar.kt (5-State Live Sync Indicator & Shop Switcher)
 *   - CommandCentreScreen.kt (Workforce Pulse, Outbox Telemetry & CA Portal)
 *   - DASHBOARD_WIDGET_REGISTRY.md (Intelli-Audit 5-Pillar Health Score 0-100)
 *   - SYNC_UX_RELIABILITY_CONTRACT.md (Write-Ahead Outbox 30/30 Entities)
 *   - ESC/POS Thermal Receipt Engine (58mm & 80mm Bluetooth Printers)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

(function () {
  'use strict';

  // ── 1. INDUSTRY VERTICAL DEFINITIONS (7 REPRESENTATIVE PROFILES) ────
  const VERTICALS = {
    MOBILE_SHOP: {
      id: 'MOBILE_SHOP',
      name: 'Mobile & Electronics',
      icon: '📱',
      dna: 'TECHNICAL_SERVICE',
      accentColor: '#0D9488', // Dna Teal
      accentGradient: 'linear-gradient(135deg, #0D9488 0%, #1A56DB 100%)',
      shopName: 'Apex Mobile & Electronics',
      branches: ['Main Store (Bandra West)', 'Wholesale Depot (Bhiwandi)'],
      activeBranch: 'Main Store (Bandra West)',
      roleBadge: 'OWNER • Multi-Branch Hub',
      currency: '₹',
      stats: {
        todayRevenue: '₹84,250.00',
        monthRevenue: '₹6,42,800',
        growth: '▲ 14.8%',
        dues: '₹42,500.00',
        purchases: '₹18,400',
        cashInHand: '₹28,650',
        ordersCount: '38 Bills',
        avgTicket: '₹2,217',
        healthScore: 91,
        healthPillars: { cashFlow: 94, velocity: 88, compliance: 96, receivables: 85, margin: 92 }
      },
      primaryActions: [
        { id: 'pos', title: 'Counter POS', sub: 'Instant Billing', icon: '⚡', color: 'blue' },
        { id: 'invoice', title: 'Tax Invoice', sub: 'GST + Thermal', icon: '🧾', color: 'slate' }
      ],
      quickActions: [
        { icon: '🛠️', label: 'Repairs', screen: 'repairs', badge: '4 Due' },
        { icon: '🔍', label: 'IMEI Audit', screen: 'imeiLookup' },
        { icon: '📥', label: 'Buy Used', screen: 'buyUsed', badge: 'KYC' },
        { icon: '🏷️', label: 'Barcodes', screen: 'barcodePrint' },
        { icon: '📖', label: 'Day Book', screen: 'daybook' },
        { icon: '📊', label: 'P&L Report', screen: 'profitloss' },
        { icon: '🏛️', label: 'CA / GST', screen: 'caHub', badge: 'GSTR-1' },
        { icon: '📦', label: 'Inventory', screen: 'inventory' }
      ],
      contextWidget: {
        type: 'repairs',
        title: 'Active Repair Job Cards',
        badge: '4 In-Progress',
        badgeColor: 'warning',
        items: [
          { name: 'iPhone 14 Pro (128GB)', meta: 'Display Replacement • Tech: Imran', status: 'DIAGNOSING', statusType: 'warning' },
          { name: 'Samsung Galaxy S23', meta: 'Type-C Port IC Fault • Tech: Ramesh', status: 'REPAIRED', statusType: 'success' },
          { name: 'OnePlus 11R 5G', meta: 'Battery Drain Issue • Parts in transit', status: 'WAITING PARTS', statusType: 'error' }
        ]
      },
      products: [
        { name: 'OnePlus 12 5G (Silky Black, 256GB)', meta: 'IMEI Tracked • HSN: 85171300', price: '₹64,999.00', stock: 14, status: 'ok' },
        { name: 'Redmi Note 13 Pro (128GB)', meta: 'IMEI Tracked • HSN: 85171300', price: '₹21,999.00', stock: 2, status: 'low' },
        { name: '9H Tempered Glass Curved (Pack of 5)', meta: 'Compatibility: OnePlus 12 • HSN: 3926', price: '₹499.00', stock: 85, status: 'ok' },
        { name: 'Spigen Ultra Hybrid Armor Case', meta: 'Shockproof TPU • HSN: 4202', price: '₹1,299.00', stock: 22, status: 'ok' }
      ],
      recentTx: [
        { title: 'Sale: OnePlus 12 + Spigen Case', meta: 'R.S. Malek • UPI • 10:42 AM', amount: '+₹66,298', type: 'credit' },
        { title: 'PO: Gadget Hub Delhi (Parts)', meta: 'Supplier PO-412 • NEFT • 09:15 AM', amount: '−₹18,400', type: 'debit' },
        { title: 'Repair: Samsung S23 Charging Port', meta: 'Basit Shaikh • Cash • 08:30 AM', amount: '+₹3,500', type: 'credit' }
      ]
    },

    PHARMACY: {
      id: 'PHARMACY',
      name: 'Pharmacy & Healthcare',
      icon: '💊',
      dna: 'PURE_RETAIL',
      accentColor: '#1A56DB', // Veristock Cobalt
      accentGradient: 'linear-gradient(135deg, #1A56DB 0%, #2563EB 100%)',
      shopName: 'Metro Care Pharmacy & Chemists',
      branches: ['Hospital Road Branch', 'Clinic Depot (Bazaar)'],
      activeBranch: 'Hospital Road Branch',
      roleBadge: 'REGISTERED PHARMACIST',
      currency: '₹',
      stats: {
        todayRevenue: '₹52,400.00',
        monthRevenue: '₹4,86,200',
        growth: '▲ 9.2%',
        dues: '₹18,200.00',
        purchases: '₹14,200',
        cashInHand: '₹22,150',
        ordersCount: '74 Bills',
        avgTicket: '₹708',
        healthScore: 94,
        healthPillars: { cashFlow: 96, velocity: 92, compliance: 99, receivables: 90, margin: 93 }
      },
      primaryActions: [
        { id: 'pos', title: 'Quick Dispense', sub: 'Barcode / Salt Scan', icon: '⚡', color: 'blue' },
        { id: 'invoice', title: 'Rx Invoice', sub: 'GST + Schedule H', icon: '🧾', color: 'slate' }
      ],
      quickActions: [
        { icon: '⏳', label: 'Expiry Sentinel', screen: 'expiry', badge: '3 Expiring' },
        { icon: '📜', label: 'Schedule H1', screen: 'schH1Register' },
        { icon: '🧪', label: 'Salt Search', screen: 'saltSearch' },
        { icon: '📦', label: 'Quarantine', screen: 'quarantine' },
        { icon: '📖', label: 'Day Book', screen: 'daybook' },
        { icon: '📊', label: 'P&L Report', screen: 'profitloss' },
        { icon: '🏛️', label: 'CA / GST', screen: 'caHub', badge: 'GSTR-1' },
        { icon: '👥', label: 'Doctor / Rx', screen: 'customers' }
      ],
      contextWidget: {
        type: 'expiry',
        title: 'Expiry Sentinel (Batches Near Expiry)',
        badge: '3 Critical Alerts',
        badgeColor: 'error',
        items: [
          { name: 'Augmentin 625 Duo (Batch #AUG-882)', meta: 'Exp: 18 Days • 40 Strips • Locked Cabinet', status: 'EXPIRING SOON', statusType: 'error' },
          { name: 'Pan-D 40mg (Batch #PAN-410)', meta: 'Exp: 42 Days • 65 Strips • Return Available', status: 'SUPPLIER RETURN', statusType: 'warning' },
          { name: 'Azithral 500mg (Batch #AZI-102)', meta: 'Exp: 90 Days • 18 Strips • Schedule H1', status: 'MONITORING', statusType: 'success' }
        ]
      },
      products: [
        { name: 'Augmentin 625 Duo (Amoxycillin+Clav)', meta: 'Batch: AUG-882 • HSN: 30049099 • Sch H', price: '₹223.50', stock: 40, status: 'low' },
        { name: 'Pan-D Capsule (Pantoprazole + Domp)', meta: 'Batch: PAN-410 • HSN: 30049099', price: '₹198.00', stock: 120, status: 'ok' },
        { name: 'Azithral 500mg Tablet (Azithromycin)', meta: 'Batch: AZI-102 • HSN: 30049099 • Sch H1', price: '₹132.00', stock: 18, status: 'ok' },
        { name: 'Dolo 650mg Paracetamol Tablets', meta: 'Batch: DOL-991 • HSN: 30049099 • OTC', price: '₹34.50', stock: 240, status: 'ok' }
      ],
      recentTx: [
        { title: 'Dispense: Augmentin + Pan-D (Rx: Dr. Shah)', meta: 'Mohsin Pathan • UPI • 11:15 AM', amount: '+₹421.50', type: 'credit' },
        { title: 'PO: Sun Pharma Distributor Ltd', meta: 'Supplier Invoice #SN-902 • NEFT', amount: '−₹14,200', type: 'debit' },
        { title: 'Dispense: Dolo 650 + Bandage Kit', meta: 'Walk-in Cash • 10:50 AM', amount: '+₹115.00', type: 'credit' }
      ]
    },

    RESTAURANT: {
      id: 'RESTAURANT',
      name: 'Restaurant & Cafe',
      icon: '🍽️',
      dna: 'PURE_RETAIL',
      accentColor: '#E11D48', // Crimson Food
      accentGradient: 'linear-gradient(135deg, #E11D48 0%, #1A56DB 100%)',
      shopName: 'The Spice Route Kitchen & Cafe',
      branches: ['Dine-In Main Floor', 'Express Cloud Kitchen'],
      activeBranch: 'Dine-In Main Floor',
      roleBadge: 'CAPTAIN / FLOOR MGR',
      currency: '₹',
      stats: {
        todayRevenue: '₹38,750.00',
        monthRevenue: '₹3,95,000',
        growth: '▲ 18.4%',
        dues: '₹0.00',
        purchases: '₹12,100',
        cashInHand: '₹19,800',
        ordersCount: '52 Tables',
        avgTicket: '₹745',
        healthScore: 90,
        healthPillars: { cashFlow: 95, velocity: 90, compliance: 92, receivables: 99, margin: 84 }
      },
      primaryActions: [
        { id: 'tables', title: 'Table Layout', sub: 'Occupancy & Split', icon: '🪑', color: 'blue' },
        { id: 'pos', title: 'KOT Billing', sub: 'Direct Thermal KOT', icon: '🧾', color: 'slate' }
      ],
      quickActions: [
        { icon: '🪑', label: 'Table Map', screen: 'tables', badge: '6 Active' },
        { icon: '🍳', label: 'KDS Live', screen: 'kdsOrders', badge: '3 Prep' },
        { icon: '🖨️', label: 'Print KOT', screen: 'kotPrint' },
        { icon: '🍕', label: 'Menu Master', screen: 'inventory' },
        { icon: '📖', label: 'Day Book', screen: 'daybook' },
        { icon: '📊', label: 'Shift Close', screen: 'shiftSummary' },
        { icon: '🏛️', label: 'CA / GST 5%', screen: 'caHub' },
        { icon: '💸', label: 'Expenses', screen: 'expenses' }
      ],
      contextWidget: {
        type: 'tables',
        title: 'Floor Occupancy & Live Orders',
        badge: '6 / 10 Tables Active',
        badgeColor: 'success',
        items: [
          { name: 'Table 3 (Family Booth - 4 Pax)', meta: 'Paneer Sizzler, Dal Makhani • Running KOT #42', status: 'SERVED', statusType: 'success' },
          { name: 'Table 7 (Window - 2 Pax)', meta: 'Dum Biryani, Extra Raita • KOT #44', status: 'PREPARING', statusType: 'warning' },
          { name: 'Table 2 (Couple Table - 2 Pax)', meta: 'Cold Coffee, Garlic Bread • Bill Requested', status: 'PAYMENT DUE', statusType: 'error' }
        ]
      },
      products: [
        { name: 'Paneer Tikka Sizzler (Tandoor)', meta: 'HSN: 996331 • 5% GST • Kitchen Unit 1', price: '₹349.00', stock: 'Fresh', status: 'ok' },
        { name: 'Dal Makhani Royal Bukhara', meta: 'HSN: 996331 • 5% GST • Kitchen Unit 2', price: '₹280.00', stock: 'Fresh', status: 'ok' },
        { name: 'Hyderabadi Dum Biryani (Clay Pot)', meta: 'HSN: 996331 • Modifiers: Extra Salan', price: '₹390.00', stock: '8 Left', status: 'low' },
        { name: 'Butter Garlic Naan (Tandoori)', meta: 'HSN: 996331 • Side Order', price: '₹55.00', stock: 'Fresh', status: 'ok' }
      ],
      recentTx: [
        { title: 'Table 5 Final Bill (UPI)', meta: 'Invoice #KOT-802 • UPI Payment', amount: '+₹1,485.00', type: 'credit' },
        { title: 'Kitchen Vegetable Procurement', meta: 'Vashi APMC Market • Cash Voucher', amount: '−₹3,200.00', type: 'debit' },
        { title: 'Takeaway: 2x Dum Biryani Pot', meta: 'Zomato/Direct • Swiped POS', amount: '+₹780.00', type: 'credit' }
      ]
    },

    GARMENTS: {
      id: 'GARMENTS',
      name: 'Garments & Apparel',
      icon: '👔',
      dna: 'PURE_RETAIL',
      accentColor: '#8B5CF6', // Dna Purple
      accentGradient: 'linear-gradient(135deg, #8B5CF6 0%, #1A56DB 100%)',
      shopName: 'Signature Apparel & Couture',
      branches: ['Flagship Retail Store', 'Central Karigar Warehouse'],
      activeBranch: 'Flagship Retail Store',
      roleBadge: 'STORE PROPRIETOR',
      currency: '₹',
      stats: {
        todayRevenue: '₹96,800.00',
        monthRevenue: '₹8,15,400',
        growth: '▲ 22.1%',
        dues: '₹34,000.00',
        purchases: '₹32,500',
        cashInHand: '₹38,200',
        ordersCount: '29 Bills',
        avgTicket: '₹3,337',
        healthScore: 88,
        healthPillars: { cashFlow: 92, velocity: 84, compliance: 95, receivables: 82, margin: 89 }
      },
      primaryActions: [
        { id: 'pos', title: 'Barcode POS', sub: 'Size-Color Matrix', icon: '⚡', color: 'blue' },
        { id: 'invoice', title: 'Retail Invoice', sub: 'Exchange Credit Note', icon: '🧾', color: 'slate' }
      ],
      quickActions: [
        { icon: '📐', label: 'Size Matrix', screen: 'matrix', badge: 'Grid' },
        { icon: '🏷️', label: 'Barcode Print', screen: 'barcodePrint' },
        { icon: '🧵', label: 'Job Work', screen: 'jobWork', badge: 'Outsource' },
        { icon: '🔄', label: 'Exchanges', screen: 'exchange' },
        { icon: '📖', label: 'Day Book', screen: 'daybook' },
        { icon: '📊', label: 'P&L Report', screen: 'profitloss' },
        { icon: '🏛️', label: 'CA / GST 5/12%', screen: 'caHub' },
        { icon: '👥', label: 'Customers', screen: 'customers' }
      ],
      contextWidget: {
        type: 'matrix',
        title: 'Stock by Size × Color Matrix',
        badge: 'Fast-Moving Styles',
        badgeColor: 'success',
        items: [
          { name: 'Slim-Fit Linen Shirt (Navy Blue)', meta: 'Sizes: M (12), L (8), XL (4), XXL (0)', status: 'XXL OUT OF STOCK', statusType: 'error' },
          { name: 'Raw Selvedge Denim Jeans (Indigo)', meta: 'Waist: 30 (6), 32 (14), 34 (11), 36 (2)', status: 'RE-ORDER DUE', statusType: 'warning' },
          { name: 'Silk Nehru Festive Jacket (Maroon)', meta: 'Sizes: 38 (5), 40 (7), 42 (9), 44 (3)', status: 'OPTIMAL STOCK', statusType: 'success' }
        ]
      },
      products: [
        { name: 'Slim-Fit Linen Formal Shirt', meta: 'Matrix: M/L/XL • HSN: 61091000 • 5% GST', price: '₹1,899.00', stock: 24, status: 'ok' },
        { name: 'Raw Selvedge Denim Jeans (Indigo)', meta: 'Matrix: 30-36 • HSN: 62034200 • 12% GST', price: '₹2,999.00', stock: 33, status: 'ok' },
        { name: 'Pure Silk Bandhgala Jacket', meta: 'Color: Maroon • Handcrafted • HSN: 6201', price: '₹4,499.00', stock: 4, status: 'low' },
        { name: 'Stretch Cotton Chino Trousers', meta: 'Color: Khaki • HSN: 62034200', price: '₹1,499.00', stock: 19, status: 'ok' }
      ],
      recentTx: [
        { title: 'Retail Sale: 2x Linen Shirt + Chino', meta: 'Arjun Mehta • UPI • 12:45 PM', amount: '+₹5,297.00', type: 'credit' },
        { title: 'Job Work Challan: Surat Dyeing Mill', meta: 'Challan #JW-912 • 120 Mtrs fabric', amount: '−₹8,400.00', type: 'debit' },
        { title: 'Exchange Note: Denim Jeans (Size 34)', meta: 'Credit Note #CR-089 issued', amount: '₹0.00', type: 'credit' }
      ]
    },

    MANUFACTURING: {
      id: 'MANUFACTURING',
      name: 'Manufacturing & Industrial',
      icon: '🏭',
      dna: 'INDUSTRIAL_TRADE',
      accentColor: '#F59E0B', // Dna Amber
      accentGradient: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)',
      shopName: 'Precision Engineering & Forgings',
      branches: ['Industrial Plant 1 (Bhiwandi)', 'Distribution Yard (Thane)'],
      activeBranch: 'Industrial Plant 1 (Bhiwandi)',
      roleBadge: 'HEAD OF OPERATIONS',
      currency: '₹',
      stats: {
        todayRevenue: '₹3,45,000.00',
        monthRevenue: '₹24,80,000',
        growth: '▲ 16.5%',
        dues: '₹2,10,000.00',
        purchases: '₹1,45,000',
        cashInHand: '₹94,000',
        ordersCount: '8 Shipments',
        avgTicket: '₹43,125',
        healthScore: 92,
        healthPillars: { cashFlow: 94, velocity: 90, compliance: 95, receivables: 88, margin: 93 }
      },
      primaryActions: [
        { id: 'bom', title: 'BOM Production', sub: 'Assembly Orders', icon: '⚙️', color: 'blue' },
        { id: 'invoice', title: 'Tax Invoice', sub: 'B2B Wholesale / E-Way', icon: '🧾', color: 'slate' }
      ],
      quickActions: [
        { icon: '📋', label: 'BOM Recipe', screen: 'bom', badge: 'Editor' },
        { icon: '🏭', label: 'Production', screen: 'productionOrders', badge: '2 Active' },
        { icon: '📦', label: 'Raw Stock', screen: 'rawMaterials' },
        { icon: '🗑️', label: 'Scrap Report', screen: 'scrapReport' },
        { icon: '📖', label: 'Day Book', screen: 'daybook' },
        { icon: '📊', label: 'P&L Report', screen: 'profitloss' },
        { icon: '🏛️', label: 'CA / GST 18%', screen: 'caHub' },
        { icon: '🚚', label: 'Purchase PO', screen: 'purchases' }
      ],
      contextWidget: {
        type: 'production',
        title: 'Active Production Orders (WIP)',
        badge: '2 Batches Running',
        badgeColor: 'warning',
        items: [
          { name: 'SS304 Flange Assembly (Batch #BOM-901)', meta: 'Target: 500 Pcs • Stage: CNC Milling (80%)', status: 'ON SCHEDULE', statusType: 'success' },
          { name: 'Precision Brass Bushing (Batch #BOM-812)', meta: 'Target: 1,200 Pcs • Raw Material Shortage (12%)', status: 'MATERIAL SHORTAGE', statusType: 'error' }
        ]
      },
      products: [
        { name: 'SS304 Industrial Flange Assembly', meta: 'BOM #BOM-901 • HSN: 72042190 • 18% GST', price: '₹4,850.00', stock: 120, status: 'ok' },
        { name: 'Precision Turned MS Bushing 45mm', meta: 'BOM #BOM-812 • HSN: 7318', price: '₹320.00', stock: 450, status: 'ok' },
        { name: 'SS304 Raw Ingot Billet (Raw Material)', meta: 'Unit: KG • Re-order: 250 Kg', price: '₹195.00/kg', stock: 180, status: 'low' },
        { name: 'Industrial Lathe Insert TNMG (Consumable)', meta: 'Tooling Box of 10 • HSN: 8205', price: '₹650.00', stock: 18, status: 'ok' }
      ],
      recentTx: [
        { title: 'Commercial Sale: Bharat Heavy Piping Ltd', meta: 'Invoice #MFG-410 • 50 Pcs Flanges • NEFT', amount: '+₹2,42,500', type: 'credit' },
        { title: 'Raw Material PO: Jindal Steel Strips', meta: 'PO #PO-902 • 1,500 KG SS Billets', amount: '−₹1,45,000', type: 'debit' },
        { title: 'Industrial Scrap Recovery Sale', meta: 'Brass Boring Scrap (85 KG) • Cash Voucher', amount: '+₹38,250', type: 'credit' }
      ]
    },

    CRYSTAL_AGATE: {
      id: 'CRYSTAL_AGATE',
      name: 'Lapidary, Agate & Gems',
      icon: '💎',
      dna: 'INDUSTRIAL_TRADE',
      accentColor: '#D97706', // Agate Amber
      accentGradient: 'linear-gradient(135deg, #D97706 0%, #0D9488 100%)',
      shopName: 'Shreeji Agate & Lapidary Exports',
      branches: ['Khambhat Gem Cutting Unit', 'Navrangpura Showroom'],
      activeBranch: 'Khambhat Gem Cutting Unit',
      roleBadge: 'EXPORT DIRECTOR',
      currency: '₹',
      stats: {
        todayRevenue: '₹1,82,500.00',
        monthRevenue: '₹14,20,000',
        growth: '▲ 24.6%',
        dues: '₹85,000.00',
        purchases: '₹64,000',
        cashInHand: '₹42,800',
        ordersCount: '11 Consignments',
        avgTicket: '₹16,590',
        healthScore: 89,
        healthPillars: { cashFlow: 92, velocity: 86, compliance: 98, receivables: 80, margin: 90 }
      },
      primaryActions: [
        { id: 'lapidary', title: 'Rough Lot Intake', sub: 'Ghisat Loss Calc', icon: '💎', color: 'blue' },
        { id: 'invoice', title: 'Export Invoice', sub: 'LUT 0% IGST / USD', icon: '🧾', color: 'slate' }
      ],
      quickActions: [
        { icon: '🪨', label: 'Rough Lot', screen: 'lapidary', badge: 'Lot Intake' },
        { icon: '⚙️', label: 'Karigar Challan', screen: 'jobWork', badge: 'Ghanti' },
        { icon: '📉', label: 'Ghisat Loss %', screen: 'ghisatCalc' },
        { icon: '🌐', label: 'LUT Export', screen: 'lutExport', badge: '0% IGST' },
        { icon: '📖', label: 'Day Book', screen: 'daybook' },
        { icon: '⚖️', label: 'Dual Pricing', screen: 'dualPricing' },
        { icon: '🏛️', label: 'CA / Export Audit', screen: 'caHub' },
        { icon: '📦', label: 'Gem Stock', screen: 'inventory' }
      ],
      contextWidget: {
        type: 'lapidary',
        title: 'Karigar Ghanti & Ghisat Loss Tracking',
        badge: 'Rough-to-Polish Cycle',
        badgeColor: 'warning',
        items: [
          { name: 'Moss Agate Rough Lot (Batch #LOT-412)', meta: 'Input: 50.0 Kg • Expected Yield: 34.0 Kg (32% Loss)', status: 'GHANTI POLISHING', statusType: 'warning' },
          { name: '7-Chakra Orgone Pyramid Lot', meta: 'Output: 250 Finished Pcs • QC Passed for Export', status: 'READY FOR PACKING', statusType: 'success' },
          { name: 'Natural Amethyst Geode Raw', meta: 'Vendor Lot #AM-88 • Karigar: Salim Bhai', status: 'SLABBING & SAWING', statusType: 'warning' }
        ]
      },
      products: [
        { name: 'Polished Moss Agate Coasters (Set of 4)', meta: 'HSN: 71162090 • Dual Unit: 480 Grams / Set', price: '₹450.00', stock: 120, status: 'ok' },
        { name: '7-Chakra Orgone Energy Healing Pyramid', meta: 'HSN: 71179000 • Resin + Crystal Chips', price: '₹280.00', stock: 240, status: 'ok' },
        { name: 'Raw Natural Agate Mineral Rock (Grade A)', meta: 'HSN: 7103 • Unworked Lapidary Rough', price: '₹180.00/kg', stock: 45, status: 'low' },
        { name: 'Amethyst Crystal Cluster (Brazil Origin)', meta: 'HSN: 71039900 • Deep Purple Specimen', price: '₹1,250.00', stock: 18, status: 'ok' }
      ],
      recentTx: [
        { title: 'Export Consignment: UK Crystal Importers', meta: 'LUT Export Invoice #EXP-082 • 0% IGST', amount: '+₹1,18,500', type: 'credit' },
        { title: 'Karigar Job Work Settlement: Salim Bhai', meta: 'Ghanti Polishing 45 Kg Moss Agate', amount: '−₹9,800', type: 'debit' },
        { title: 'Domestic Sale: Jaipur Gemstone Showroom', meta: 'Tax Invoice #VS-702 • 18% GST', amount: '+₹24,500', type: 'credit' }
      ]
    },

    TRUST_INSTITUTE: {
      id: 'TRUST_INSTITUTE',
      name: 'Trust & Non-Profit',
      icon: '🏛️',
      dna: 'HEALTH_WELLNESS',
      accentColor: '#7C3AED', // Deep Violet
      accentGradient: 'linear-gradient(135deg, #7C3AED 0%, #1A56DB 100%)',
      shopName: 'Al-Hikmah Educational & Relief Trust',
      branches: ['Central Admin Office (Ahmedabad)', 'District Relief Camp'],
      activeBranch: 'Central Admin Office (Ahmedabad)',
      roleBadge: 'TRUST SECRETARY',
      currency: '₹',
      stats: {
        todayRevenue: '₹1,25,000.00',
        monthRevenue: '₹9,45,000',
        growth: '▲ 31.0%',
        dues: '₹0.00',
        purchases: '₹48,000',
        cashInHand: '₹18,500',
        ordersCount: '24 Receipts',
        avgTicket: '₹5,208',
        healthScore: 96,
        healthPillars: { cashFlow: 98, velocity: 92, compliance: 99, receivables: 96, margin: 95 }
      },
      primaryActions: [
        { id: 'trust', title: '80G Donation', sub: 'Section 12AB/80G', icon: '📜', color: 'blue' },
        { id: 'invoice', title: 'Term Fee Voucher', sub: 'Form 10BD / 10BE', icon: '🧾', color: 'slate' }
      ],
      quickActions: [
        { icon: '📜', label: '80G Receipt', screen: 'trust', badge: 'Tax Shield' },
        { icon: '🛡️', label: '₹2K Cash Guard', screen: 'cashGuard' },
        { icon: '🎓', label: 'Student Fees', screen: 'studentFees' },
        { icon: '📦', label: 'Relief Kits', screen: 'inventory' },
        { icon: '📖', label: 'Day Book', screen: 'daybook' },
        { icon: '📊', label: 'Form 10BD', screen: 'form10BD', badge: 'ITR Audit' },
        { icon: '🏛️', label: 'Audit Hub', screen: 'caHub' },
        { icon: '👥', label: 'Donor Directory', screen: 'customers' }
      ],
      contextWidget: {
        type: 'trust',
        title: 'Section 80G Receipts & Compliance Guard',
        badge: '₹2,000 Cash Limit Active',
        badgeColor: 'success',
        items: [
          { name: 'Donor: Haji Abdul Sattar (PAN: AAAPA1234F)', meta: '₹25,000 via RTGS • 80G Tax Exemption URN Issued', status: 'FORM 10BD READY', statusType: 'success' },
          { name: 'Relief Dispatch: Flood Affected Area 4', meta: '150 Ration Kits dispatched • Stock Deducted', status: 'DISPATCHED', statusType: 'success' },
          { name: 'Cash Donation Guard Check', meta: '₹1,500 Walk-in Cash Donation • Valid (< ₹2,000 limit)', status: 'COMPLIANT', statusType: 'success' }
        ]
      },
      products: [
        { name: 'Section 80G General Relief Donation', meta: 'URN: AAATA1234F21 • 0% GST Exempt', price: '₹5,000.00', stock: 'Unlimited', status: 'ok' },
        { name: 'Student Education Scholarship Fund', meta: 'Term Fee Assistance Program • Non-Profit', price: '₹12,500.00', stock: 'Ongoing', status: 'ok' },
        { name: 'Emergency Family Ration Food Kit', meta: 'Flour, Rice, Oil, Lentils • Relief Dispatch', price: '₹1,200.00', stock: 140, status: 'ok' },
        { name: 'Medical Diagnostic Camp Voucher', meta: 'Free Consultation & Basic Diagnostics', price: '₹500.00', stock: 80, status: 'ok' }
      ],
      recentTx: [
        { title: '80G Donation: Zakat & Relief Corpus', meta: 'Donor: Dr. Farooq Merchant • Net Banking', amount: '+₹50,000.00', type: 'credit' },
        { title: 'Relief Procurement: 200 Blankets', meta: 'Surat Textile Wholesale • Check #CH-401', amount: '−₹48,000.00', type: 'debit' },
        { title: 'Student Semester Fee: Computer Course', meta: 'Student: Salman Ansari • UPI Receipt', amount: '+₹4,500.00', type: 'credit' }
      ]
    }
  };

  // ── 2. SUB-SCREEN RENDERERS ─────────────────────────────────────────
  const SUB_SCREENS = {
    // 1. Standard GST Invoice Screen (with Thermal Print Preview toggle)
    invoice: {
      title: 'Standard Tax Invoice',
      badge: '#VT-2026-089',
      render: (v) => {
        const p1 = v.products[0];
        const p2 = v.products[1] || v.products[0];
        const isTrust = v.id === 'TRUST_INSTITUTE';
        return `
          <div class="sim-sub-screen-content">
            <div class="sim-customer-row">
              <div class="sim-customer-details">
                <span class="sim-label">${isTrust ? 'Donor / Beneficiary:' : 'Billed To (Customer):'}</span>
                <strong>${isTrust ? 'Haji Abdul Sattar (PAN: AAAPA1234F)' : 'R.S. Malek (GSTIN: 24AABCS1234P1Z5)'}</strong>
                <span class="sim-item-meta">Anand, Gujarat • POS Cashier: Imran K.</span>
              </div>
              <span class="sim-chip sim-chip-active">B2B INVOICE</span>
            </div>

            <div class="sim-cart-list">
              <div class="sim-cart-item">
                <div class="sim-cart-item-info">
                  <div class="sim-item-name">${p1.name}</div>
                  <div class="sim-item-meta">${p1.meta} • Qty: 1</div>
                </div>
                <strong class="sim-cart-item-price">${p1.price}</strong>
              </div>
              <div class="sim-cart-item">
                <div class="sim-cart-item-info">
                  <div class="sim-item-name">${p2.name}</div>
                  <div class="sim-item-meta">${p2.meta} • Qty: 1</div>
                </div>
                <strong class="sim-cart-item-price">${p2.price}</strong>
              </div>
            </div>

            <div class="sim-totals">
              <div class="sim-total-row"><span>Taxable Subtotal:</span><span>₹64,999.00</span></div>
              <div class="sim-total-row"><span>CGST (9.0%):</span><span>₹5,849.91</span></div>
              <div class="sim-total-row"><span>SGST (9.0%):</span><span>₹5,849.91</span></div>
              <div class="sim-total-row"><span>Round Off:</span><span>+₹0.18</span></div>
              <div class="sim-total-row sim-total-grand">
                <span>Net Payable (Paise math):</span>
                <span class="sim-success-text">₹76,699.00</span>
              </div>
              <div class="sim-payment-modes">
                <span class="sim-chip sim-chip-active">UPI / QR</span>
                <span class="sim-chip">Cash</span>
                <span class="sim-chip">Split Pay</span>
                <span class="sim-chip">Khata Due</span>
              </div>
              <button class="sim-complete-btn" data-action="complete-sale">
                ✓ POST SALE &amp; QUEUE OUTBOX SYNC
              </button>
              <button class="sim-thermal-btn" data-screen="thermalReceipt">
                🖨️ View ESC/POS Thermal Receipt Preview
              </button>
            </div>
          </div>`;
      }
    },

    // 2. ESC/POS 58mm / 80mm Thermal Receipt Preview
    thermalReceipt: {
      title: 'ESC/POS Thermal Receipt',
      badge: '58mm / 80mm ESC/POS',
      badgeColor: 'success',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-thermal-paper">
            <div class="sim-thermal-header">
              <div class="sim-thermal-title">${v.shopName.toUpperCase()}</div>
              <div class="sim-thermal-meta">${v.activeBranch}</div>
              <div class="sim-thermal-meta">Phone: +91 99258 11505 • GSTIN: 24AABCS1234P1Z5</div>
              <div class="sim-thermal-divider">--------------------------------</div>
              <div class="sim-thermal-inv-row">
                <span>INV: VT-2026-089</span>
                <span>${new Date().toLocaleDateString('en-IN')}</span>
              </div>
              <div class="sim-thermal-inv-row">
                <span>Customer: R.S. Malek</span>
                <span>POS: Counter #1</span>
              </div>
              <div class="sim-thermal-divider">--------------------------------</div>
            </div>

            <div class="sim-thermal-items">
              <div class="sim-thermal-row">
                <span>1x ${v.products[0].name.substring(0, 20)}</span>
                <strong>${v.products[0].price}</strong>
              </div>
              <div class="sim-thermal-row">
                <span>1x ${v.products[1] ? v.products[1].name.substring(0, 20) : 'Accessory Care'}</span>
                <strong>${v.products[1] ? v.products[1].price : '₹499.00'}</strong>
              </div>
            </div>

            <div class="sim-thermal-divider">--------------------------------</div>
            <div class="sim-thermal-totals">
              <div class="sim-thermal-row"><span>SUBTOTAL</span><span>₹64,999.00</span></div>
              <div class="sim-thermal-row"><span>CGST 9%</span><span>₹5,849.91</span></div>
              <div class="sim-thermal-row"><span>SGST 9%</span><span>₹5,849.91</span></div>
              <div class="sim-thermal-row sim-thermal-grand"><span>GRAND TOTAL</span><span>₹76,699.00</span></div>
              <div class="sim-thermal-row"><span>PAID VIA:</span><span>UPI (TXN: 9481)</span></div>
            </div>

            <div class="sim-thermal-divider">--------------------------------</div>
            <div class="sim-thermal-footer">
              <div class="sim-thermal-barcode">||| | |||| | |||||| || | |||| ||</div>
              <div>* VERISTOCK PRO CLOUD ERP *</div>
              <div>Run Your Business. Not Your Problems.</div>
            </div>
          </div>
          <button class="sim-complete-btn" data-action="back">← RETURN TO BILLING</button>
        </div>`
    },

    // 3. Command Centre Management Hub
    commandCentre: {
      title: 'Command Centre',
      badge: 'Executive Hub',
      badgeColor: 'warning',
      render: (v) => `
        <div class="sim-sub-screen-content sim-cc-container">
          <!-- Area 1: Workforce Pulse -->
          <div class="sim-cc-card">
            <div class="sim-cc-header">
              <span class="sim-cc-title">👥 Workforce Pulse (3 Active)</span>
              <span class="sim-chip sim-chip-active">All On-Duty</span>
            </div>
            <div class="sim-staff-list">
              <div class="sim-staff-row">
                <div class="sim-avatar" style="background:#1A56DB;">IK</div>
                <div class="sim-staff-info">
                  <div class="sim-item-name">Imran Khan <span class="sim-role-tag">TECHNICIAN</span></div>
                  <div class="sim-item-meta">In-Store • Repairing Job #812 • GPS Verified</div>
                </div>
                <span class="sim-status-chip sim-status-success">ACTIVE</span>
              </div>
              <div class="sim-staff-row">
                <div class="sim-avatar" style="background:#0D9488;">RM</div>
                <div class="sim-staff-info">
                  <div class="sim-item-name">Ramesh M. <span class="sim-role-tag">BILLER</span></div>
                  <div class="sim-item-meta">Counter #1 • 38 Bills Posted Today</div>
                </div>
                <span class="sim-status-chip sim-status-success">IN-STORE</span>
              </div>
              <div class="sim-staff-row">
                <div class="sim-avatar" style="background:#F59E0B;">SY</div>
                <div class="sim-staff-info">
                  <div class="sim-item-name">Saiyed Y. <span class="sim-role-tag">MANAGER</span></div>
                  <div class="sim-item-meta">Warehouse Yard • PO Intake Audit</div>
                </div>
                <span class="sim-status-chip sim-status-warning">FIELD</span>
              </div>
            </div>
          </div>

          <!-- Area 2: Cloud Sync Outbox Telemetry -->
          <div class="sim-cc-card">
            <div class="sim-cc-header">
              <span class="sim-cc-title">☁️ Write-Ahead Outbox Sync Engine</span>
              <span class="sim-status-chip sim-status-success">HEALTHY</span>
            </div>
            <div class="sim-sync-meters">
              <div class="sim-meter-row">
                <span>Synced Entity Families:</span>
                <strong>30 / 30 Synced</strong>
              </div>
              <div class="sim-meter-row">
                <span>Local Outbox Backlog:</span>
                <strong class="sim-success-text">0 Pending (Sub-second)</strong>
              </div>
              <div class="sim-meter-row">
                <span>Local Database Cipher:</span>
                <span>SQLCipher 256-Bit AES</span>
              </div>
              <div class="sim-meter-row">
                <span>Cloud Multi-Tenant Path:</span>
                <span class="sim-mono-code">businesses/biz_88/shops/sh_01/*</span>
              </div>
            </div>
          </div>

          <!-- Area 3: CA Web Portal Connector -->
          <div class="sim-cc-card sim-ca-portal-card">
            <div class="sim-cc-header">
              <span class="sim-cc-title">🏛️ CA Web Portal Bridge</span>
              <span class="sim-chip">Live Link</span>
            </div>
            <p class="sim-item-meta">Chartered Accountant audit portal with real-time GSTR-1, GSTR-3B tax liabilities and P&L ledger export.</p>
            <div class="sim-portal-link">
              <span class="sim-link-icon">🔗</span>
              <span class="sim-mono-code">https://veristock-ad58d.web.app</span>
            </div>
          </div>
        </div>`
    },

    // 4. Repairs Sub-Screen (Mobile Shop)
    repairs: {
      title: 'Repair Job Cards',
      badge: '4 Due',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-filters">
            <span class="sim-chip sim-chip-active">All (12)</span>
            <span class="sim-chip">Diagnosing (5)</span>
            <span class="sim-chip">Ready (4)</span>
            <span class="sim-chip">Waiting Parts (3)</span>
          </div>
          <div class="sim-repair-list">
            <div class="sim-repair-card">
              <div>
                <div class="sim-item-name">iPhone 14 Pro <small class="sim-muted">(#REP-2026-0812)</small></div>
                <div class="sim-item-meta">Issue: Screen Replacement • Tech: Imran Khan</div>
                <div class="sim-item-meta">10-Point Checklist: Screen Touch [OK], FaceID [OK]</div>
              </div>
              <span class="sim-status-chip sim-status-warning">DIAGNOSING</span>
            </div>
            <div class="sim-repair-card">
              <div>
                <div class="sim-item-name">Samsung Galaxy S23 <small class="sim-muted">(#REP-2026-0799)</small></div>
                <div class="sim-item-meta">Issue: Charging Port Replacement • Tech: Ramesh</div>
                <div class="sim-item-meta">Customer: Basit Shaikh • Estimate: ₹3,500</div>
              </div>
              <span class="sim-status-chip sim-status-success">REPAIRED</span>
            </div>
            <div class="sim-repair-card">
              <div>
                <div class="sim-item-name">OnePlus 11R 5G <small class="sim-muted">(#REP-2026-0781)</small></div>
                <div class="sim-item-meta">Issue: Motherboard PMIC Repair • ETA: 2 Days</div>
              </div>
              <span class="sim-status-chip sim-status-error">AWAITING PARTS</span>
            </div>
          </div>
        </div>`
    },

    // 5. Expiry Sentinel Sub-Screen (Pharmacy)
    expiry: {
      title: 'Expiry Sentinel',
      badge: '3 Critical',
      badgeColor: 'error',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-gst-alert" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#EF4444;">
            ⚠️ 3 Batches near expiry date. Quarantine to Locked Cabinet before sale.
          </div>
          <div class="sim-repair-list">
            <div class="sim-repair-card">
              <div>
                <div class="sim-item-name">Augmentin 625 Duo <small class="sim-muted">(Batch: AUG-882)</small></div>
                <div class="sim-item-meta">Stock: 40 Strips • Expiry: 18 Days • Locked in Cabinet</div>
              </div>
              <span class="sim-status-chip sim-status-error">RETURN SUPPLIER</span>
            </div>
            <div class="sim-repair-card">
              <div>
                <div class="sim-item-name">Pan-D 40mg Capsule <small class="sim-muted">(Batch: PAN-410)</small></div>
                <div class="sim-item-meta">Stock: 65 Strips • Expiry: 42 Days • Return Window Open</div>
              </div>
              <span class="sim-status-chip sim-status-warning">CLAIM DUE</span>
            </div>
          </div>
        </div>`
    },

    // 6. Restaurant Table Map
    tables: {
      title: 'Restaurant Table Map',
      badge: '6 Occupied',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-table-grid">
            <div class="sim-table-box sim-table-occupied">
              <span class="sim-table-no">T-1</span>
              <span class="sim-table-pax">2 Pax</span>
              <span class="sim-table-status">KOT Active</span>
            </div>
            <div class="sim-table-box sim-table-occupied">
              <span class="sim-table-no">T-2</span>
              <span class="sim-table-pax">4 Pax</span>
              <span class="sim-table-status">Billing</span>
            </div>
            <div class="sim-table-box sim-table-free">
              <span class="sim-table-no">T-3</span>
              <span class="sim-table-pax">4 Pax</span>
              <span class="sim-table-status">VACANT</span>
            </div>
            <div class="sim-table-box sim-table-occupied">
              <span class="sim-table-no">T-4</span>
              <span class="sim-table-pax">6 Pax</span>
              <span class="sim-table-status">Served</span>
            </div>
            <div class="sim-table-box sim-table-free">
              <span class="sim-table-no">T-5</span>
              <span class="sim-table-pax">2 Pax</span>
              <span class="sim-table-status">VACANT</span>
            </div>
            <div class="sim-table-box sim-table-occupied">
              <span class="sim-table-no">T-6</span>
              <span class="sim-table-pax">8 Pax</span>
              <span class="sim-table-status">KOT #45</span>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:10px;">+ NEW TABLE OCCUPANCY / FAST KOT</button>
        </div>`
    },

    // 7. Manufacturing Bill of Materials (BOM)
    bom: {
      title: 'Bill of Materials (BOM)',
      badge: '#BOM-901',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-customer-row">
            <div>
              <span class="sim-label">Finished Assembly:</span>
              <strong>SS304 Industrial Flange (150mm)</strong>
              <span class="sim-item-meta">Standard Batch Size: 100 Pcs • Target Scrap: 1.8%</span>
            </div>
            <span class="sim-chip sim-chip-active">ACTIVE RECIPE</span>
          </div>
          <div class="sim-cart-list">
            <div class="sim-cart-item">
              <div><div class="sim-item-name">Raw SS304 Billet Ingot</div><div class="sim-item-meta">Qty: 250 KG @ ₹195/kg</div></div>
              <strong>₹48,750</strong>
            </div>
            <div class="sim-cart-item">
              <div><div class="sim-item-name">CNC Machine Tooling Cost</div><div class="sim-item-meta">Labor: 8.5 Machine Hours</div></div>
              <strong>₹8,500</strong>
            </div>
            <div class="sim-cart-item">
              <div><div class="sim-item-name">Zinc Dichromate Surface Coat</div><div class="sim-item-meta">Chemical Finishing @ ₹25/pc</div></div>
              <strong>₹2,500</strong>
            </div>
          </div>
          <div class="sim-totals">
            <div class="sim-total-row"><span>Gross Production Cost:</span><span>₹59,750.00</span></div>
            <div class="sim-total-row"><span>Unit Cost per Flange:</span><span class="sim-success-text">₹597.50 / Pc</span></div>
            <button class="sim-complete-btn" style="margin-top:6px;">🚀 DISPATCH PRODUCTION ORDER TO FLOOR</button>
          </div>
        </div>`
    },

    // 8. Day Book Screen (Paise Double-Entry Ledger)
    daybook: {
      title: 'Day Book (Atomic Ledger)',
      badge: 'Today',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-daybook-summary">
            <div class="sim-daybook-box sim-daybook-credit">
              <span>Total Inflow (Cr)</span>
              <strong class="sim-success-text">${v.stats.todayRevenue}</strong>
            </div>
            <div class="sim-daybook-box sim-daybook-debit">
              <span>Total Outflow (Dr)</span>
              <strong class="sim-error-text">${v.stats.purchases}</strong>
            </div>
          </div>
          <div class="sim-repair-list">
            ${v.recentTx.map(tx => `
              <div class="sim-daybook-entry">
                <div class="sim-daybook-icon ${tx.type === 'credit' ? 'sim-bg-green' : 'sim-bg-red'}">
                  ${tx.type === 'credit' ? '↓' : '↑'}
                </div>
                <div>
                  <div class="sim-item-name">${tx.title}</div>
                  <div class="sim-item-meta">${tx.meta}</div>
                </div>
                <strong class="${tx.type === 'credit' ? 'sim-success-text' : 'sim-error-text'}">${tx.amount}</strong>
              </div>
            `).join('')}
          </div>
        </div>`
    },

    // 9. Profit & Loss Sub-Screen
    profitloss: {
      title: 'Profit & Loss Statement',
      badge: 'This Month',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-pl-hero">
            <span>Net Enterprise Profit</span>
            <strong class="sim-success-text" style="font-size:1.3rem;">₹1,68,750.00</strong>
            <span class="sim-item-meta">▲ 21.4% vs Previous Month</span>
          </div>
          <div class="sim-pl-rows">
            <div class="sim-pl-row"><span>Gross Sales Revenue:</span><strong>${v.stats.monthRevenue}</strong></div>
            <div class="sim-pl-row"><span>Cost of Goods Sold (COGS):</span><strong class="sim-error-text">−₹3,80,000</strong></div>
            <div class="sim-pl-row sim-pl-subtotal"><span>Gross Profit Margin:</span><strong>₹2,62,800</strong></div>
            <div class="sim-pl-row"><span>Staff Salary &amp; Advances:</span><strong class="sim-error-text">−₹48,000</strong></div>
            <div class="sim-pl-row"><span>Shop Rent &amp; Utilities:</span><strong class="sim-error-text">−₹26,050</strong></div>
            <div class="sim-pl-row sim-pl-subtotal"><span>Net Operating Profit:</span><strong class="sim-success-text">₹1,68,750</strong></div>
          </div>
        </div>`
    },

    // 10. CA & GST Hub
    caHub: {
      title: 'CA & GST Audit Hub',
      badge: 'GSTR-1 Ready',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-gst-alert">⚠️ GSTR-1 outward supplies for current filing window ready for 1-tap export.</div>
          <div class="sim-repair-list">
            <div class="sim-daybook-entry">
              <div class="sim-daybook-icon" style="background:rgba(26,86,219,0.1);color:#1A56DB;">📄</div>
              <div><div class="sim-item-name">GSTR-1 Outward CSV</div><div class="sim-item-meta">B2B, B2CL, B2CS &amp; HSN Summary</div></div>
              <span class="sim-chip sim-chip-active">EXPORT</span>
            </div>
            <div class="sim-daybook-entry">
              <div class="sim-daybook-icon" style="background:rgba(99,102,241,0.1);color:#6366F1;">📊</div>
              <div><div class="sim-item-name">GSTR-3B Tax Liability</div><div class="sim-item-meta">Net ITC vs Output GST breakdown</div></div>
              <span class="sim-chip">VIEW</span>
            </div>
            <div class="sim-daybook-entry">
              <div class="sim-daybook-icon" style="background:rgba(245,158,11,0.1);color:#F59E0B;">🏛️</div>
              <div><div class="sim-item-name">CA Web Portal Access</div><div class="sim-item-meta">Auditor read-only cloud dashboard</div></div>
              <span class="sim-chip">PORTAL</span>
            </div>
          </div>
        </div>`
    },

    // 11. Quick POS Billing Counter Mode
    pos: {
      title: 'Quick Counter POS',
      badge: 'Express Mode',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-pos-search">
            <div class="sim-search-bar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Scan barcode or tap item below...</span>
            </div>
          </div>
          <div class="sim-pos-items">
            ${v.products.map(p => `
              <div class="sim-pos-item">
                <div class="sim-pos-item-icon" style="background:rgba(26,86,219,0.1);color:#1A56DB;">${v.icon}</div>
                <div>
                  <div class="sim-item-name">${p.name}</div>
                  <div class="sim-item-meta">${p.price} • Stock: ${p.stock}</div>
                </div>
                <div class="sim-pos-qty">+</div>
              </div>
            `).join('')}
          </div>
          <div class="sim-pos-footer">
            <div class="sim-pos-total">
              <span>Cart (1 item)</span>
              <strong>${v.products[0].price}</strong>
            </div>
            <button class="sim-complete-btn" style="margin-top:6px;" data-screen="invoice">
              PROCEED TO CHECKOUT →
            </button>
          </div>
        </div>`
    },

    // 12. Items & Inventory Master Screen
    inventory: {
      title: 'Items & Inventory Master',
      badge: 'Catalog',
      badgeColor: 'success',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-pos-search">
            <div class="sim-search-bar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Search products, barcodes, HSN...</span>
            </div>
          </div>
          <div class="sim-product-categories">
            <span class="sim-chip sim-chip-active">All Items (${v.products.length})</span>
            <span class="sim-chip">In Stock</span>
            <span class="sim-chip">Low Stock Alerts</span>
          </div>
          <div class="sim-customer-list">
            ${v.products.map(p => `
              <div class="sim-customer-card">
                <div class="sim-avatar" style="background:rgba(26,86,219,0.15);color:#1A56DB;font-size:14px;">${v.icon}</div>
                <div class="sim-customer-info">
                  <div class="sim-item-name">${p.name}</div>
                  <div class="sim-item-meta">${p.meta} • Stock: ${p.stock}</div>
                </div>
                <strong class="sim-product-price">${p.price}</strong>
              </div>
            `).join('')}
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;">+ ADD NEW ITEM / SCAN BARCODE</button>
        </div>`
    },

    // 13. Enterprise Settings Screen
    settings: {
      title: 'Enterprise Settings',
      badge: 'Configuration',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-settings-profile">
            <div class="sim-avatar" style="background:${v.accentGradient};width:38px;height:38px;font-size:16px;">${v.icon}</div>
            <div>
              <div class="sim-item-name">${v.shopName}</div>
              <div class="sim-item-meta">smtechie7@gmail.com • Enterprise Channel License</div>
            </div>
          </div>
          <div class="sim-settings-list">
            <div class="sim-settings-item"><span>🏪</span><span>Shop Profile &amp; GSTIN</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item"><span>🖨️</span><span>ESC/POS Bluetooth Printers (58mm/80mm)</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item"><span>🔒</span><span>SQLCipher 256-Bit Database Lock</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item"><span>☁️</span><span>Write-Ahead Outbox Cloud Backup</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item"><span>👥</span><span>Staff Roles &amp; Biometric Auth</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item"><span>🏛️</span><span>CA Web Portal Bridge</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item"><span>📲</span><span>Smart Clone Device Migration</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item"><span>ℹ️</span><span>About VeriStock Pro (v2.7)</span><span class="sim-muted">›</span></div>
          </div>
        </div>`
    },

    // 14. IntelliAudit 5-Pillar Health Score Screen
    intelliAudit: {
      title: 'IntelliAudit Governance',
      badge: 'Score: 91/100',
      badgeColor: 'success',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-audit-hero">
            <div class="sim-audit-score-circle">
              <span class="sim-audit-score-val">${v.stats.healthScore}</span>
              <span class="sim-audit-score-max">/100</span>
            </div>
            <div class="sim-audit-meta">
              <strong>IntelliAudit Health Score</strong>
              <span>Constitutional ERP Health: EXCELLENT</span>
              <small class="sim-success-text">● All 5 Governance Pillars Verified</small>
            </div>
          </div>

          <div class="sim-section-label">5 Governance Pillars</div>
          <div class="sim-pillar-list">
            <div class="sim-pillar-item">
              <div class="sim-pillar-header"><span>1. Cash Flow &amp; Liquidity</span><strong>${v.stats.healthPillars.cashFlow}%</strong></div>
              <div class="sim-pillar-bar"><div class="sim-pillar-fill" style="width:${v.stats.healthPillars.cashFlow}%;"></div></div>
            </div>
            <div class="sim-pillar-item">
              <div class="sim-pillar-header"><span>2. Stock Velocity &amp; Ageing</span><strong>${v.stats.healthPillars.velocity}%</strong></div>
              <div class="sim-pillar-bar"><div class="sim-pillar-fill" style="width:${v.stats.healthPillars.velocity}%;"></div></div>
            </div>
            <div class="sim-pillar-item">
              <div class="sim-pillar-header"><span>3. GST &amp; Regulatory Shield</span><strong>${v.stats.healthPillars.compliance}%</strong></div>
              <div class="sim-pillar-bar"><div class="sim-pillar-fill" style="width:${v.stats.healthPillars.compliance}%;"></div></div>
            </div>
            <div class="sim-pillar-item">
              <div class="sim-pillar-header"><span>4. Receivables Health (0-30d)</span><strong>${v.stats.healthPillars.receivables}%</strong></div>
              <div class="sim-pillar-bar"><div class="sim-pillar-fill" style="width:${v.stats.healthPillars.receivables}%;"></div></div>
            </div>
            <div class="sim-pillar-item">
              <div class="sim-pillar-header"><span>5. Gross &amp; Net Margin</span><strong>${v.stats.healthPillars.margin}%</strong></div>
              <div class="sim-pillar-bar"><div class="sim-pillar-fill" style="width:${v.stats.healthPillars.margin}%;"></div></div>
            </div>
          </div>

          <div class="sim-section-label" style="margin-top:10px;">Financial Ratios &amp; SLA</div>
          <div class="sim-dash-metrics">
            <div class="sim-dash-metric"><span class="sim-dash-metric-label">Cash Conversion Cycle</span><strong>18 Days</strong></div>
            <div class="sim-dash-metric"><span class="sim-dash-metric-label">Inventory Turnover</span><strong>4.8x</strong></div>
            <div class="sim-dash-metric"><span class="sim-dash-metric-label">Gross Margin</span><strong>36.4%</strong></div>
            <div class="sim-dash-metric"><span class="sim-dash-metric-label">Collection SLA</span><strong>94.2%</strong></div>
          </div>
        </div>`
    },

    // 15. Fallback feature preview
    _featurePreview: (icon, title, desc) => `
      <div class="sim-sub-screen-content" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 16px;">
        <div class="sim-feature-preview-icon" style="font-size:2rem;margin-bottom:8px;">${icon}</div>
        <h3 class="sim-feature-preview-title" style="font-size:0.9rem;font-weight:700;margin-bottom:6px;color:#fff;">${title}</h3>
        <p class="sim-feature-preview-desc" style="font-size:0.6875rem;color:#94A3B8;line-height:1.4;margin-bottom:14px;">${desc}</p>
        <div class="sim-feature-cta" style="font-size:0.625rem;background:#1A56DB;color:#fff;padding:6px 12px;border-radius:6px;font-weight:700;">Included in Pro License</div>
      </div>`
  };

  SUB_SCREENS.products = SUB_SCREENS.inventory;

  // ── 3. SIMULATOR CLASS ──────────────────────────────────────────────
  class AppSimulator {
    constructor(containerEl) {
      this.container = containerEl;
      this.currentVerticalKey = 'MOBILE_SHOP';
      this.screenStack = [];
      this.isSyncing = false;
      this.isFabExpanded = false;
      this.init();
    }

    get activeVertical() {
      return VERTICALS[this.currentVerticalKey] || VERTICALS.MOBILE_SHOP;
    }

    init() {
      this.render();
      this.bindEvents();
      // Status bar live clock
      setInterval(() => {
        const timeEl = this.container.querySelector('.sim-status-time');
        if (timeEl) {
          const now = new Date();
          timeEl.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
        }
      }, 60000);
    }

    // ── RENDER ROOT SHELL ───────────────────────────────────────────
    render() {
      const v = this.activeVertical;
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

      this.container.innerHTML = `
        <div class="sim-phone-shell" style="--v-accent: ${v.accentColor};">
          <div class="sim-notch"></div>
          
          <div class="sim-screen">
            <!-- 1. Android Status Bar -->
            <div class="sim-status-bar">
              <span class="sim-status-time">${timeStr}</span>
              <div class="sim-status-icons">
                <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.34C7 21.4 7.6 22 8.33 22h7.34c.73 0 1.33-.6 1.33-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
              </div>
            </div>

            <!-- 2. VeriStockProTopAppBar (Mirrors VeriStockProTopAppBar.kt) -->
            <div class="sim-app-bar-container">
              ${this.renderTopBar()}
            </div>

            <!-- 3. Dynamic Scrollable Content Area -->
            <div class="sim-content-area">
              <div class="sim-screen-layer sim-screen-active" data-layer="main">
                ${this.renderTabContent()}
              </div>
            </div>

            <!-- 4. Floating Action Button (Expandable HomeExpandableFab) -->
            <div class="sim-fab-wrapper ${this.isFabExpanded ? 'sim-fab-expanded' : ''}">
              <div class="sim-fab-menu">
                <button class="sim-fab-mini-btn" data-screen="pos" title="Fast POS"><span>⚡</span> Fast POS</button>
                <button class="sim-fab-mini-btn" data-screen="invoice" title="New Invoice"><span>🧾</span> Tax Invoice</button>
                <button class="sim-fab-mini-btn" data-screen="daybook" title="Day Book"><span>📖</span> Day Book</button>
              </div>
              <button class="sim-fab" id="sim-main-fab" aria-label="Quick Actions Floating Menu">
                <span>+</span>
              </button>
            </div>

            <!-- 5. Android Gesture Home Indicator (No bottom nav in real Android Scaffold) -->
            <div class="sim-home-indicator" aria-hidden="true"></div>

            <!-- Simulated Toast -->
            <div class="sim-toast" id="sim-toast"></div>
          </div>
        </div>`;
    }

    // ── RENDER TOP APP BAR ──────────────────────────────────────────
    renderTopBar() {
      const v = this.activeVertical;
      if (this.screenStack.length > 0) {
        const currentScreenId = this.screenStack[this.screenStack.length - 1];
        const screenDef = SUB_SCREENS[currentScreenId] || { title: 'Back', badge: '' };
        return `
          <div class="sim-top-bar">
            <div class="sim-top-bar-left">
              <button class="sim-back-btn" data-action="back" aria-label="Go Back">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <span class="sim-top-bar-title">${screenDef.title}</span>
            </div>
            <div class="sim-top-bar-right">
              ${screenDef.badge ? `<span class="sim-top-badge ${screenDef.badgeColor === 'warning' ? 'sim-badge-warning' : screenDef.badgeColor === 'error' ? 'sim-badge-error' : 'sim-badge-success'}">${screenDef.badge}</span>` : ''}
            </div>
          </div>`;
      }

      return `
        <div class="sim-top-bar sim-top-bar-home">
          <div class="sim-top-bar-left">
            <div class="sim-shop-avatar" style="background:${v.accentGradient}">${v.icon}</div>
            <div class="sim-shop-info">
              <div class="sim-shop-name-row">
                <span class="sim-shop-name">${v.shopName}</span>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="opacity:0.6;"><path d="M7 10l5 5 5-5z"/></svg>
              </div>
              <div class="sim-shop-subline">
                <span class="sim-role-pill">${v.roleBadge}</span>
              </div>
            </div>
          </div>

          <div class="sim-top-bar-right">
            <!-- 1. 5-State Live Sync Indicator (SYNC_UX_RELIABILITY_CONTRACT.md) -->
            <button class="sim-sync-btn ${this.isSyncing ? 'sim-sync-spinning' : ''}" id="sim-manual-sync" title="Cloud Sync Status: Sub-second Outbox Active" aria-label="Manual Cloud Sync">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                <polyline points="12 11 12 15 14 13"></polyline>
              </svg>
              <span class="sim-sync-dot"></span>
            </button>

            <!-- 2. Command Centre Shield Button (AdminPanelSettings) -->
            <button class="sim-icon-btn" data-screen="commandCentre" title="Open Command Centre" aria-label="Command Centre">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#F59E0B" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </button>

            <!-- 3. Search Icon (VeriStockProTopAppBar onSearchClick) -->
            <button class="sim-icon-btn" data-screen="pos" title="Search Catalog & POS" aria-label="Search">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>
            </button>

            <!-- 4. Badged Notifications -->
            <div class="sim-notif-wrap" data-screen="daybook" title="Notifications & Audit Logs" aria-label="Notifications" style="cursor:pointer;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span class="sim-notif-badge">2</span>
            </div>

            <!-- 5. Settings Gear Icon (VeriStockProTopAppBar onProfileClick) -->
            <button class="sim-icon-btn" data-screen="settings" title="Settings & Shop Setup" aria-label="Settings">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09"></path></svg>
            </button>
          </div>
        </div>`;
    }

    // ── RENDER HOME CONTENT (Mirrors HomeScreen.kt in veristockpro-android) ──
    renderTabContent() {
      const v = this.activeVertical;

      return `
        <!-- 1. Revenue Overview Card -->
        <div class="sim-revenue-card" style="background:${v.accentGradient}">
          <div class="sim-revenue-header">
            <span class="sim-revenue-label">Today's Revenue</span>
            <span class="sim-revenue-month-badge">Month: ${v.stats.monthRevenue}</span>
          </div>
          <div class="sim-revenue-amount-row">
            <span class="sim-revenue-amount">${v.stats.todayRevenue}</span>
            <span class="sim-revenue-growth">${v.stats.growth}</span>
          </div>
          <div class="sim-revenue-dues" data-screen="customers" style="cursor:pointer;" title="Customer Accounts & Dues Ledger">
            <div class="sim-dues-left">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#FFCDD2" stroke-width="3"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              <span>Total Customer Dues: ${v.stats.dues}</span>
            </div>
            <span class="sim-dues-arrow">›</span>
          </div>
        </div>

        <!-- 2. Mini KPI Counters -->
        <div class="sim-mini-stats">
          <div class="sim-mini-card" data-screen="purchases">
            <div class="sim-mini-icon" style="background:rgba(245,158,11,0.1);color:#F59E0B;">🚚</div>
            <div><span class="sim-mini-label">PURCHASES</span><span class="sim-mini-value">${v.stats.purchases}</span></div>
          </div>
          <div class="sim-mini-card" data-screen="daybook">
            <div class="sim-mini-icon" style="background:rgba(16,185,129,0.1);color:#10B981;">💵</div>
            <div><span class="sim-mini-label">CASH IN HAND</span><span class="sim-mini-value">${v.stats.cashInHand}</span></div>
          </div>
        </div>
        <div class="sim-mini-stats">
          <div class="sim-mini-card" data-screen="pos">
            <div class="sim-mini-icon" style="background:rgba(99,102,241,0.1);color:#6366F1;">🧾</div>
            <div><span class="sim-mini-label">TODAY BILLS</span><span class="sim-mini-value">${v.stats.ordersCount}</span></div>
          </div>
          <div class="sim-mini-card" data-screen="profitloss">
            <div class="sim-mini-icon" style="background:rgba(139,92,246,0.1);color:#8B5CF6;">📈</div>
            <div><span class="sim-mini-label">AVG TICKET</span><span class="sim-mini-value">${v.stats.avgTicket}</span></div>
          </div>
        </div>

        <!-- 3. Primary Action Buttons -->
        <div class="sim-primary-actions">
          ${v.primaryActions.map(a => `
            <button class="sim-primary-btn ${a.color === 'blue' ? 'sim-primary-btn-blue' : 'sim-primary-btn-slate'}" data-screen="${a.id}">
              <span class="sim-primary-btn-icon">${a.icon}</span>
              <div>
                <span class="sim-primary-btn-title">${a.title}</span>
                <span class="sim-primary-btn-sub">${a.sub}</span>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- 4. Dynamic Context-Aware Vertical Widget (DASHBOARD_WIDGET_REGISTRY.md) -->
        <div class="sim-qa-section">
          <div class="sim-section-label" style="display:flex;justify-content:space-between;align-items:center;">
            ${v.contextWidget.title}
            <span class="sim-top-badge ${v.contextWidget.badgeColor === 'error' ? 'sim-badge-error' : v.contextWidget.badgeColor === 'warning' ? 'sim-badge-warning' : 'sim-badge-success'}">${v.contextWidget.badge}</span>
          </div>
          <div class="sim-repair-list">
            ${v.contextWidget.items.map(item => `
              <div class="sim-repair-card">
                <div>
                  <div class="sim-item-name">${item.name}</div>
                  <div class="sim-item-meta">${item.meta}</div>
                </div>
                <span class="sim-status-chip ${item.statusType === 'error' ? 'sim-status-error' : item.statusType === 'warning' ? 'sim-status-warning' : 'sim-status-success'}">${item.status}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 5. IntelliAudit 5-Pillar Health Score (Priority 10 per DASHBOARD_WIDGET_REGISTRY.md) -->
        <div class="sim-qa-section">
          <div class="sim-section-label" style="display:flex;justify-content:space-between;align-items:center;">
            IntelliAudit Governance
            <span class="sim-view-all" data-screen="intelliAudit">Full Audit ›</span>
          </div>
          <div class="sim-audit-home-card" data-screen="intelliAudit" style="cursor:pointer;" title="Tap to view 5 Governance Pillars & Audit Analysis">
            <div class="sim-audit-score-circle" style="width:42px;height:42px;flex-shrink:0;">
              <span class="sim-audit-score-val" style="font-size:1rem;">${v.stats.healthScore}</span>
              <span class="sim-audit-score-max" style="font-size:0.5rem;">/100</span>
            </div>
            <div class="sim-audit-home-meta" style="flex:1;min-width:0;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <strong style="font-size:0.75rem;color:#fff;">Constitutional ERP Health</strong>
                <span class="sim-top-badge sim-badge-success" style="font-size:0.5rem;">EXCELLENT</span>
              </div>
              <div style="font-size:0.5625rem;color:#94A3B8;margin-top:2px;">5 Governance Pillars Verified • Zero Fiscal Drift</div>
              <div class="sim-mini-pillars" style="display:flex;gap:3px;margin-top:5px;">
                <div style="flex:1;height:3px;background:#22C55E;border-radius:2px;" title="Cash Flow: ${v.stats.healthPillars.cashFlow}%"></div>
                <div style="flex:1;height:3px;background:#22C55E;border-radius:2px;" title="Velocity: ${v.stats.healthPillars.velocity}%"></div>
                <div style="flex:1;height:3px;background:#22C55E;border-radius:2px;" title="Compliance: ${v.stats.healthPillars.compliance}%"></div>
                <div style="flex:1;height:3px;background:#22C55E;border-radius:2px;" title="Receivables: ${v.stats.healthPillars.receivables}%"></div>
                <div style="flex:1;height:3px;background:#22C55E;border-radius:2px;" title="Margin: ${v.stats.healthPillars.margin}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Quick Actions Grid -->
        <div class="sim-qa-section">
          <div class="sim-section-label">Quick Actions</div>
          <div class="sim-qa-grid">
            ${v.quickActions.map(qa => `
              <button class="sim-qa-item" data-screen="${qa.screen}">
                <span class="sim-qa-icon">${qa.icon}</span>
                <span class="sim-qa-label">${qa.label}</span>
                ${qa.badge ? `<span class="sim-qa-badge">${qa.badge}</span>` : ''}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 7. Recent Operations -->
        <div class="sim-qa-section">
          <div class="sim-section-label" style="display:flex;justify-content:space-between;align-items:center;">
            Recent Operations
            <span class="sim-view-all" data-screen="daybook">View Day Book ›</span>
          </div>
          <div class="sim-recent-list">
            ${v.recentTx.map(tx => `
              <div class="sim-recent-item">
                <div class="sim-recent-icon ${tx.type === 'credit' ? 'sim-bg-green' : 'sim-bg-red'}">
                  ${tx.type === 'credit' ? '↓' : '↑'}
                </div>
                <div class="sim-recent-info">
                  <div class="sim-item-name">${tx.title}</div>
                  <div class="sim-item-meta">${tx.meta}</div>
                </div>
                <strong class="${tx.type === 'credit' ? 'sim-success-text' : 'sim-error-text'}">${tx.amount}</strong>
              </div>
            `).join('')}
          </div>
        </div>`;
    }

    // ── EVENT BINDINGS ──────────────────────────────────────────────
    bindEvents() {
      // Global listener for industry vertical pills
      document.addEventListener('click', (e) => {
        const vBtn = e.target.closest('[data-vertical]');
        if (vBtn) {
          const newKey = vBtn.dataset.vertical;
          if (VERTICALS[newKey] && newKey !== this.currentVerticalKey) {
            this.currentVerticalKey = newKey;
            this.screenStack = [];
            this.isFabExpanded = false;
            this.render();
            // Sync active class on all pills on page
            document.querySelectorAll('[data-vertical]').forEach(b => {
              b.classList.toggle('sim-vt-pill-active', b.dataset.vertical === newKey);
            });
            this.showToast(`Switched vertical to: ${VERTICALS[newKey].name}`);
          }
        }
      });

      this.container.addEventListener('click', (e) => {
        // 1. Back button
        const backBtn = e.target.closest('[data-action="back"]');
        if (backBtn) {
          this.goBack();
          return;
        }

        // 2. Complete sale action (in invoice screen)
        const completeBtn = e.target.closest('[data-action="complete-sale"]');
        if (completeBtn) {
          this.triggerCloudSync(true);
          return;
        }

        // 3. Manual sync button
        const syncBtn = e.target.closest('#sim-manual-sync');
        if (syncBtn) {
          this.triggerCloudSync(false);
          return;
        }

        // 4. Main FAB button
        const fabBtn = e.target.closest('#sim-main-fab');
        if (fabBtn) {
          this.isFabExpanded = !this.isFabExpanded;
          const wrapper = this.container.querySelector('.sim-fab-wrapper');
          if (wrapper) wrapper.classList.toggle('sim-fab-expanded', this.isFabExpanded);
          return;
        }

        // 5. Screen navigation (Quick actions, buttons, mini cards, top bar icons)
        const screenBtn = e.target.closest('[data-screen]');
        if (screenBtn) {
          const screenId = screenBtn.dataset.screen;
          this.openScreen(screenId);
          return;
        }
      });
    }

    // ── NAVIGATION CONTROLLER ───────────────────────────────────────
    openScreen(screenId) {
      this.screenStack.push(screenId);
      this.isFabExpanded = false;
      this.updateScreenContent();
    }

    goBack() {
      if (this.screenStack.length > 0) {
        this.screenStack.pop();
        this.updateScreenContent();
      }
    }

    updateScreenContent() {
      const appBarContainer = this.container.querySelector('.sim-app-bar-container');
      const contentArea = this.container.querySelector('.sim-content-area');
      const fabWrapper = this.container.querySelector('.sim-fab-wrapper');

      if (appBarContainer) appBarContainer.innerHTML = this.renderTopBar();

      // Determine content to render
      let contentHtml = '';
      if (this.screenStack.length > 0) {
        const currentScreenId = this.screenStack[this.screenStack.length - 1];
        const screenDef = SUB_SCREENS[currentScreenId] || (currentScreenId === 'products' ? SUB_SCREENS.inventory : null);
        if (screenDef) {
          contentHtml = screenDef.render(this.activeVertical);
        } else {
          contentHtml = SUB_SCREENS._featurePreview('⚡', currentScreenId, 'Enterprise ERP feature registered in Feature.kt');
        }
        if (fabWrapper) fabWrapper.style.display = 'none';
      } else {
        contentHtml = this.renderTabContent();
        if (fabWrapper) fabWrapper.style.display = 'block';
      }

      if (contentArea) {
        contentArea.innerHTML = `<div class="sim-screen-layer sim-screen-active" data-layer="main">${contentHtml}</div>`;
      }
    }

    // ── WRITE-AHEAD OUTBOX CLOUD SYNC SIMULATION ────────────────────
    triggerCloudSync(isSale) {
      if (this.isSyncing) return;
      this.isSyncing = true;
      const syncBtn = this.container.querySelector('#sim-manual-sync');
      if (syncBtn) syncBtn.classList.add('sim-sync-spinning');

      this.showToast(isSale ? 'Posting to Room DB (AES-256) & uploading outbox...' : 'Checking Firestore outbox mutations...');

      setTimeout(() => {
        this.isSyncing = false;
        if (syncBtn) syncBtn.classList.remove('sim-sync-spinning');
        this.showToast(isSale ? '✓ Sale posted! Synced to Firestore in 140ms (AES-256)' : '✓ Cloud Synced: 0 pending mutations (sub-second)');
        if (isSale) {
          setTimeout(() => this.goBack(), 400);
        }
      }, 750);
    }

    showToast(message) {
      const toastEl = this.container.querySelector('#sim-toast');
      if (!toastEl) return;
      toastEl.textContent = message;
      toastEl.classList.add('sim-toast-show');
      clearTimeout(this._toastTimeout);
      this._toastTimeout = setTimeout(() => {
        toastEl.classList.remove('sim-toast-show');
      }, 3000);
    }
  }

  // ── PUBLIC INITIALIZER ────────────────────────────────────────────
  window.VeriStockSimulator = {
    init: function (selector) {
      const el = document.querySelector(selector);
      if (el) {
        return new AppSimulator(el);
      }
      console.warn('[VeriStockSimulator] Target element not found:', selector);
      return null;
    }
  };
})();
