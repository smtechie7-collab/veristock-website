/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   VERISTOCK PRO — Interactive App Simulator v2.1 (Enterprise ERP Edition)
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

  // ── DYNAMIC VERTICAL RESOLVER (Supports all 18 Verticals from verticals-data.js) ──
  function getVerticalData(key) {
    if (VERTICALS[key]) return VERTICALS[key];
    if (window.VERTICAL_ARCHETYPES && window.VERTICAL_ARCHETYPES[key]) {
      const arch = window.VERTICAL_ARCHETYPES[key];
      return {
        id: arch.id,
        name: arch.name,
        icon: arch.icon,
        dna: arch.dna || 'PURE_RETAIL',
        accentColor: '#1A56DB',
        accentGradient: 'linear-gradient(135deg, #1A56DB 0%, #0D9488 100%)',
        shopName: arch.name + ' Enterprise',
        branches: ['Main Hub Unit', 'Secondary Depot'],
        activeBranch: 'Main Hub Unit',
        roleBadge: arch.badge || 'PROPRIETOR',
        currency: '₹',
        stats: {
          todayRevenue: '₹62,400.00',
          monthRevenue: '₹5,18,000',
          growth: '▲ 15.2%',
          dues: '₹22,500.00',
          purchases: '₹16,800',
          cashInHand: '₹24,300',
          ordersCount: '34 Bills',
          avgTicket: '₹1,835',
          healthScore: 92,
          healthPillars: { cashFlow: 94, velocity: 88, compliance: 96, receivables: 89, margin: 91 }
        },
        primaryActions: [
          { id: 'pos', title: 'Counter POS', sub: 'Instant Billing', icon: '⚡', color: 'blue' },
          { id: 'invoice', title: 'Tax Invoice', sub: 'GST + Thermal', icon: '🧾', color: 'slate' }
        ],
        quickActions: [
          { icon: '⚡', label: 'Counter POS', screen: 'pos' },
          { icon: '📦', label: 'Inventory', screen: 'inventory' },
          { icon: '🏷️', label: 'Barcodes', screen: 'barcodePrint' },
          { icon: '📖', label: 'Day Book', screen: 'daybook' },
          { icon: '📊', label: 'P&L Report', screen: 'profitloss' },
          { icon: '🏛️', label: 'CA / GST', screen: 'caHub' },
          { icon: '👥', label: 'Ledger', screen: 'customers' },
          { icon: '⚙️', label: 'Settings', screen: 'settings' }
        ],
        contextWidget: {
          type: 'standard',
          title: arch.name + ' Operations',
          badge: arch.badge || 'Active',
          badgeColor: 'success',
          items: [
            { name: (arch.features && arch.features[0]) || 'Operational Batch', meta: 'Compliant with ' + (arch.badge || 'GST Standards'), status: 'ACTIVE', statusType: 'success' },
            { name: (arch.features && arch.features[1]) || 'Daily Cycle Check', meta: 'Logged into Room Database (AES-256)', status: 'VERIFIED', statusType: 'success' }
          ]
        },
        products: [
          { name: (arch.features && arch.features[0]) ? arch.features[0].substring(0, 32) : 'Standard Product Pack', meta: (arch.hsnCodes && arch.hsnCodes[0]) ? ('HSN: ' + arch.hsnCodes[0].code) : 'Standard SKU', price: '₹1,499.00', stock: 45, status: 'ok' },
          { name: (arch.features && arch.features[1]) ? arch.features[1].substring(0, 32) : 'Premium Specialty Pack', meta: (arch.hsnCodes && arch.hsnCodes[1]) ? ('HSN: ' + arch.hsnCodes[1].code) : 'Specialty SKU', price: '₹2,850.00', stock: 18, status: 'ok' },
          { name: 'Commercial Grade Consumable', meta: 'Fast Moving Item', price: '₹499.00', stock: 80, status: 'ok' }
        ],
        recentTx: [
          { title: 'Tax Invoice Sale #VT-801', meta: 'B2B Client • UPI Payment • 11:20 AM', amount: '+₹4,349.00', type: 'credit' },
          { title: 'Supplier PO Inward Intake', meta: 'Supplier #SP-102 • Bank RTGS', amount: '−₹12,400.00', type: 'debit' }
        ]
      };
    }
    return VERTICALS.MOBILE_SHOP;
  }

  // ── 100% MATHEMATICAL CALCULATION HELPER (Paise-Exact Double Entry) ──
  function calculateCartTotals(vertical) {
    const p1 = vertical.products[0];
    const p2 = vertical.products[1] || vertical.products[0];

    function parseVal(str) {
      if (!str) return 0;
      const cleaned = str.replace(/[^0-9.]/g, '');
      const v = parseFloat(cleaned);
      return isNaN(v) ? 0 : v;
    }

    const val1 = parseVal(p1.price);
    const val2 = parseVal(p2.price);
    const taxableSubtotal = val1 + val2;

    let gstRate = 18;
    if (vertical.id === 'TRUST_INSTITUTE') {
      gstRate = 0;
    } else if (vertical.id === 'RESTAURANT' || vertical.id === 'GARMENTS') {
      gstRate = 5;
    } else if (vertical.id === 'PHARMACY') {
      gstRate = 12;
    }

    const cgstRate = gstRate / 2;
    const sgstRate = gstRate / 2;
    const cgst = (taxableSubtotal * cgstRate) / 100;
    const sgst = (taxableSubtotal * sgstRate) / 100;
    const totalBeforeRound = taxableSubtotal + cgst + sgst;
    const grandTotal = Math.round(totalBeforeRound);
    const roundOff = grandTotal - totalBeforeRound;

    function fmt(n) {
      return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    return {
      p1,
      p2,
      gstRate,
      cgstRate,
      sgstRate,
      taxableSubtotal,
      cgst,
      sgst,
      grandTotal,
      roundOff,
      roundOffFormatted: (roundOff >= 0 ? '+' : '−') + fmt(Math.abs(roundOff)),
      subtotalFormatted: fmt(taxableSubtotal),
      cgstFormatted: fmt(cgst),
      sgstFormatted: fmt(sgst),
      grandTotalFormatted: fmt(grandTotal)
    };
  }

  // ── 2. SUB-SCREEN RENDERERS ─────────────────────────────────────────
  const SUB_SCREENS = {
    // 1. Standard GST Invoice Screen (with Dynamic Math)
    invoice: {
      title: 'Standard Tax Invoice',
      badge: '#VT-2026-089',
      render: (v) => {
        const t = calculateCartTotals(v);
        const isTrust = v.id === 'TRUST_INSTITUTE';
        return `
          <div class="sim-sub-screen-content">
            <div class="sim-customer-row">
              <div class="sim-customer-details">
                <span class="sim-label">${isTrust ? 'Donor / Beneficiary:' : 'Billed To (Customer):'}</span>
                <strong>${isTrust ? 'Haji Abdul Sattar (PAN: AAAPA1234F)' : 'R.S. Malek (GSTIN: 24AABCS1234P1Z5)'}</strong>
                <span class="sim-item-meta">Anand, Gujarat • POS Cashier: Imran K.</span>
              </div>
              <span class="sim-chip sim-chip-active">${isTrust ? '80G RECEIPT' : 'B2B INVOICE'}</span>
            </div>

            <div class="sim-cart-list">
              <div class="sim-cart-item">
                <div class="sim-cart-item-info">
                  <div class="sim-item-name">${t.p1.name}</div>
                  <div class="sim-item-meta">${t.p1.meta} • Qty: 1</div>
                </div>
                <strong class="sim-cart-item-price">${t.p1.price}</strong>
              </div>
              <div class="sim-cart-item">
                <div class="sim-cart-item-info">
                  <div class="sim-item-name">${t.p2.name}</div>
                  <div class="sim-item-meta">${t.p2.meta} • Qty: 1</div>
                </div>
                <strong class="sim-cart-item-price">${t.p2.price}</strong>
              </div>
            </div>

            <div class="sim-totals">
              <div class="sim-total-row"><span>Taxable Subtotal:</span><span>${t.subtotalFormatted}</span></div>
              ${t.gstRate > 0 ? `
                <div class="sim-total-row"><span>CGST (${t.cgstRate.toFixed(1)}%):</span><span>${t.cgstFormatted}</span></div>
                <div class="sim-total-row"><span>SGST (${t.sgstRate.toFixed(1)}%):</span><span>${t.sgstFormatted}</span></div>
                <div class="sim-total-row"><span>Round Off:</span><span>${t.roundOffFormatted}</span></div>
              ` : `
                <div class="sim-total-row"><span>GST Rate (Section 80G Exempt):</span><span class="sim-success-text">0.0% Exempt</span></div>
              `}
              <div class="sim-total-row sim-total-grand">
                <span>Net Payable (Paise math):</span>
                <span class="sim-success-text">${t.grandTotalFormatted}</span>
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

    // 2. ESC/POS 58mm / 80mm Thermal Receipt Preview (with Dynamic Math)
    thermalReceipt: {
      title: 'ESC/POS Thermal Receipt',
      badge: '58mm / 80mm ESC/POS',
      badgeColor: 'success',
      render: (v) => {
        const t = calculateCartTotals(v);
        return `
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
                <span>1x ${t.p1.name.substring(0, 20)}</span>
                <strong>${t.p1.price}</strong>
              </div>
              <div class="sim-thermal-row">
                <span>1x ${t.p2.name.substring(0, 20)}</span>
                <strong>${t.p2.price}</strong>
              </div>
            </div>

            <div class="sim-thermal-divider">--------------------------------</div>
            <div class="sim-thermal-totals">
              <div class="sim-thermal-row"><span>SUBTOTAL</span><span>${t.subtotalFormatted}</span></div>
              ${t.gstRate > 0 ? `
                <div class="sim-thermal-row"><span>CGST ${t.cgstRate.toFixed(1)}%</span><span>${t.cgstFormatted}</span></div>
                <div class="sim-thermal-row"><span>SGST ${t.sgstRate.toFixed(1)}%</span><span>${t.sgstFormatted}</span></div>
              ` : `
                <div class="sim-thermal-row"><span>GST EXEMPT</span><span>₹0.00</span></div>
              `}
              <div class="sim-thermal-row sim-thermal-grand"><span>GRAND TOTAL</span><span>${t.grandTotalFormatted}</span></div>
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
        </div>`;
      }
    },

    // 3. Command Centre Management Hub
    commandCentre: {
      title: 'Command Centre',
      badge: 'Executive Hub',
      badgeColor: 'warning',
      render: (v) => `
        <div class="sim-sub-screen-content sim-cc-container">
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
          <button class="sim-complete-btn" style="margin-top:10px;" data-action="toast" data-msg="✓ New 10-point repair intake job card generated">
            + CREATE REPAIR INTAKE JOB CARD
          </button>
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
          <button class="sim-complete-btn" style="margin-top:10px;" data-action="toast" data-msg="✓ Supplier debit note initiated for expiring batches">
            📋 DISPATCH SUPPLIER RETURN CLAIM
          </button>
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
          <button class="sim-complete-btn" style="margin-top:10px;" data-action="toast" data-msg="✓ Table T-3 seated: Captain Ramesh assigned">
            + NEW TABLE OCCUPANCY / FAST KOT
          </button>
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
            <button class="sim-complete-btn" style="margin-top:6px;" data-action="dispatch-po">
              🚀 DISPATCH PRODUCTION ORDER TO FLOOR
            </button>
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
              <button class="sim-chip sim-chip-active" data-action="export-ca">EXPORT</button>
            </div>
            <div class="sim-daybook-entry">
              <div class="sim-daybook-icon" style="background:rgba(99,102,241,0.1);color:#6366F1;">📊</div>
              <div><div class="sim-item-name">GSTR-3B Tax Liability</div><div class="sim-item-meta">Net ITC vs Output GST breakdown</div></div>
              <button class="sim-chip" data-action="toast" data-msg="✓ GSTR-3B liability calculated: ₹14,250 payable">VIEW</button>
            </div>
            <div class="sim-daybook-entry">
              <div class="sim-daybook-icon" style="background:rgba(245,158,11,0.1);color:#F59E0B;">🏛️</div>
              <div><div class="sim-item-name">CA Web Portal Access</div><div class="sim-item-meta">Auditor read-only cloud dashboard</div></div>
              <button class="sim-chip" data-action="toast" data-msg="✓ CA bridge active: https://veristock-ad58d.web.app">PORTAL</button>
            </div>
          </div>
        </div>`
    },

    // Customer Khata & Udhaar Ledger Screen
    customers: {
      title: 'Customer Khata & Udhaar',
      badge: 'Active Ledger',
      badgeColor: 'warning',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-daybook-summary">
            <div class="sim-daybook-box sim-daybook-debit">
              <span>Total Market Udhaar</span>
              <strong class="sim-error-text">${v.stats.dues}</strong>
            </div>
            <div class="sim-daybook-box sim-daybook-credit">
              <span>Today Collected</span>
              <strong class="sim-success-text">₹12,450.00</strong>
            </div>
          </div>
          <div class="sim-customer-list" style="margin-top:6px;">
            <div class="sim-customer-card">
              <div class="sim-avatar" style="background:#1A56DB;">RM</div>
              <div class="sim-customer-info">
                <div class="sim-item-name">R.S. Malek <span class="sim-chip sim-chip-active">GSTIN Verified</span></div>
                <div class="sim-item-meta">Anand • Last payment 2 days ago</div>
              </div>
              <div style="text-align:right;">
                <strong class="sim-error-text" style="font-size:0.75rem;">₹18,500 Due</strong>
                <button class="sim-chip" style="margin-top:2px;" data-action="toast" data-msg="✓ WhatsApp payment reminder sent with UPI link">💬 WhatsApp</button>
              </div>
            </div>
            <div class="sim-customer-card">
              <div class="sim-avatar" style="background:#0D9488;">BS</div>
              <div class="sim-customer-info">
                <div class="sim-item-name">Basit Shaikh</div>
                <div class="sim-item-meta">Retail Walk-in • Phone: 98251...</div>
              </div>
              <div style="text-align:right;">
                <strong class="sim-error-text" style="font-size:0.75rem;">₹4,200 Due</strong>
                <button class="sim-chip" style="margin-top:2px;" data-action="toast" data-msg="✓ WhatsApp payment reminder sent with UPI link">💬 WhatsApp</button>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:6px;" data-action="add-customer">
            + ADD NEW CUSTOMER / RECORD PAYMENT
          </button>
        </div>`
    },

    // VeriStock Connect P2P Discovery Sub-Screen
    connect: {
      title: 'VeriStock Connect B2B',
      badge: 'Verified Peers',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-connect-banner">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:1.1rem;">🤝</span>
              <div>
                <strong style="font-size:0.7rem;color:#fff;">P2P Wholesale Network</strong>
                <div class="sim-item-meta">Zero Commissions • Direct UPI/Bank Settlement</div>
              </div>
            </div>
            <span class="sim-top-badge sim-badge-success">LIVE RADAR</span>
          </div>
          <div class="sim-customer-list" style="margin-top:6px;">
            <div class="sim-customer-card">
              <div class="sim-avatar" style="background:#1A56DB;">ND</div>
              <div class="sim-customer-info">
                <div class="sim-item-name">National Electronics Hub <span class="sim-top-badge sim-badge-success">KYC VERIFIED</span></div>
                <div class="sim-item-meta">Lamington Road (1.2 km away) • 420 Items Listed</div>
              </div>
              <button class="sim-chip sim-chip-active" data-action="toast" data-msg="✓ Connected with National Electronics via encrypted P2P channel">Chat / PO</button>
            </div>
            <div class="sim-customer-card">
              <div class="sim-avatar" style="background:#0D9488;">SP</div>
              <div class="sim-customer-info">
                <div class="sim-item-name">Shreeji Spare Parts Depot <span class="sim-top-badge sim-badge-success">KYC VERIFIED</span></div>
                <div class="sim-item-meta">GIDC Phase 2 (3.8 km away) • Displays &amp; ICs</div>
              </div>
              <button class="sim-chip sim-chip-active" data-action="toast" data-msg="✓ Connected with Shreeji Spare Parts via encrypted P2P channel">Chat / PO</button>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:6px;" data-action="toast" data-msg="✓ Radar scan refreshed: 14 verified wholesalers found within 10 km">
            🌐 DISCOVER NEARBY WHOLESALERS
          </button>
        </div>`
    },

    // All ERP Modules Hub Screen
    moreHubs: {
      title: 'All ERP Modules & Hubs',
      badge: 'Enterprise Suite',
      badgeColor: 'warning',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-section-label">Core Operations</div>
          <div class="sim-qa-grid">
            <button class="sim-qa-item" data-screen="pos"><span class="sim-qa-icon">⚡</span><span class="sim-qa-label">Counter POS</span></button>
            <button class="sim-qa-item" data-screen="invoice"><span class="sim-qa-icon">🧾</span><span class="sim-qa-label">Tax Invoice</span></button>
            <button class="sim-qa-item" data-screen="inventory"><span class="sim-qa-icon">📦</span><span class="sim-qa-label">Inventory</span></button>
            <button class="sim-qa-item" data-screen="customers"><span class="sim-qa-icon">👥</span><span class="sim-qa-label">Khata Udhaar</span></button>
            <button class="sim-qa-item" data-screen="daybook"><span class="sim-qa-icon">📖</span><span class="sim-qa-label">Day Book</span></button>
            <button class="sim-qa-item" data-screen="profitloss"><span class="sim-qa-icon">📊</span><span class="sim-qa-label">P&L Report</span></button>
            <button class="sim-qa-item" data-screen="caHub"><span class="sim-qa-icon">🏛️</span><span class="sim-qa-label">CA &amp; GST Hub</span></button>
            <button class="sim-qa-item" data-screen="commandCentre"><span class="sim-qa-icon">🛡️</span><span class="sim-qa-label">Command Hub</span></button>
            <button class="sim-qa-item" data-screen="connect"><span class="sim-qa-icon">🤝</span><span class="sim-qa-label">B2B Connect</span></button>
            <button class="sim-qa-item" data-screen="intelliAudit"><span class="sim-qa-icon">🎖️</span><span class="sim-qa-label">IntelliAudit</span></button>
            <button class="sim-qa-item" data-screen="settings"><span class="sim-qa-icon">⚙️</span><span class="sim-qa-label">Settings</span></button>
            <button class="sim-qa-item" data-screen="${v.primaryActions[0] ? v.primaryActions[0].id : 'pos'}"><span class="sim-qa-icon">${v.icon}</span><span class="sim-qa-label">${v.name.split(' ')[0]}</span></button>
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
              <div class="sim-pos-item" data-action="toast" data-msg="✓ Added ${p.name.substring(0, 24)} to POS Cart" style="cursor:pointer;">
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
              <span>Cart (2 items)</span>
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
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="add-stock">
            + ADD NEW ITEM / SCAN BARCODE
          </button>
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
            <div class="sim-settings-item" data-action="toast" data-msg="✓ Shop Profile & GSTIN verified (Active)"><span>🏪</span><span>Shop Profile &amp; GSTIN</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item" data-action="toast" data-msg="✓ ESC/POS Bluetooth paired: RP-80 (203 DPI)"><span>🖨️</span><span>ESC/POS Bluetooth Printers (58mm/80mm)</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item" data-action="toast" data-msg="✓ SQLCipher 256-Bit AES hardware key active"><span>🔒</span><span>SQLCipher 256-Bit Database Lock</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item" data-action="toast" data-msg="✓ Outbox sync active: 0 pending mutations"><span>☁️</span><span>Write-Ahead Outbox Cloud Backup</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item" data-action="toast" data-msg="✓ Biometric Auth active: Imran Khan (Operator)"><span>👥</span><span>Staff Roles &amp; Biometric Auth</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item" data-action="toast" data-msg="✓ CA Web Portal connected: veristock-ad58d.web.app"><span>🏛️</span><span>CA Web Portal Bridge</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item" data-action="toast" data-msg="✓ Smart Clone ready: Peer Wi-Fi direct transfer"><span>📲</span><span>Smart Clone Device Migration</span><span class="sim-muted">›</span></div>
            <div class="sim-settings-item" data-action="toast" data-msg="✓ VeriStock Pro v2.7 (Build 2026.10) Enterprise"><span>ℹ️</span><span>About VeriStock Pro (v2.7)</span><span class="sim-muted">›</span></div>
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

    // ── NEW DEDICATED VERTICAL SUB-SCREENS ──────────────────────────

    // 16. IMEI Lookup & Hardware Audit Screen (Mobile Shop)
    imeiLookup: {
      title: 'Dual IMEI Hardware Audit',
      badge: '15-Digit Checksum',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-pos-search">
            <div class="sim-search-bar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Scan or enter 15-digit IMEI...</span>
            </div>
          </div>
          <div class="sim-repair-card" style="margin-top:6px;">
            <div style="width:100%;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <strong style="color:#fff;font-size:0.8rem;">OnePlus 12 5G (Silky Black, 256GB)</strong>
                <span class="sim-status-chip sim-status-success">IN STOCK</span>
              </div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>IMEI 1 (Luhn Valid):</span>
                <span class="sim-mono-code">864912061849201</span>
              </div>
              <div class="sim-meter-row">
                <span>IMEI 2 (Dual SIM):</span>
                <span class="sim-mono-code">864912061849202</span>
              </div>
              <div class="sim-meter-row">
                <span>Storage Location:</span>
                <span>Rack: A-04 • Shelf: 2 • Tray: 11</span>
              </div>
              <div class="sim-meter-row">
                <span>Warranty Status:</span>
                <span class="sim-success-text">Brand Active (11 Mo Remaining)</span>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:6px;margin-top:8px;">
            <button class="sim-complete-btn" style="flex:1;" data-action="print-barcode">🖨️ PRINT BARCODE TAG</button>
            <button class="sim-chip sim-chip-active" style="padding:0 12px;" data-action="toast" data-msg="✓ Full lifecycle audit: Inward on 12 Oct • Supplier: Apex Dist">AUDIT TRAIL</button>
          </div>
        </div>`
    },

    // 17. Second-Hand Device Buyback & KYC Legal Shield (Mobile Shop)
    buyUsed: {
      title: 'Device Buyback KYC Shield',
      badge: 'Rule 32(5) Margin',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-gst-alert" style="background:rgba(22,163,74,0.12);border-color:rgba(22,163,74,0.25);color:#22C55E;">
            🛡️ GST Rule 32(5) Active: Margin tax applies strictly on sale margin (Selling Price − Buyback Price).
          </div>
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">iPhone 13 128GB (Starlight Blue)</div>
              <div class="sim-item-meta">IMEI: 354891021481092 • Seller: Basit Shaikh</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Aadhaar Verhoeff KYC:</span>
                <span class="sim-success-text">✓ Verified (UID: **** 4210)</span>
              </div>
              <div class="sim-meter-row">
                <span>10-Point Hardware QC:</span>
                <span class="sim-success-text">Battery 89% • FaceID [OK] • TrueTone [OK]</span>
              </div>
              <div class="sim-meter-row">
                <span>Assessed Buyback Payout:</span>
                <strong class="sim-success-text" style="font-size:0.85rem;">₹27,500.00</strong>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Digital Legal Shield generated: Customer signature & ID attached">
            ✍️ CAPTURE SIGNATURE &amp; ISSUE VOUCHER
          </button>
        </div>`
    },

    // 18. ESC/POS Thermal Barcode Engine (50x30mm)
    barcodePrint: {
      title: 'Thermal Barcode Print',
      badge: '50×30mm Tag',
      badgeColor: 'success',
      render: (v) => `
        <div class="sim-sub-screen-content">
          <div class="sim-thermal-paper" style="padding:14px 10px;text-align:center;">
            <div style="font-size:0.65rem;font-weight:700;color:#000;">${v.shopName.toUpperCase()}</div>
            <div style="font-size:0.75rem;font-weight:800;color:#000;margin:4px 0;">${v.products[0].name.substring(0, 24)}</div>
            <div style="font-size:0.85rem;font-family:'JetBrains Mono',monospace;letter-spacing:3px;margin:6px 0;font-weight:900;color:#000;">
              ||| | |||| | |||||| || | ||
            </div>
            <div style="font-size:0.55rem;font-family:'JetBrains Mono',monospace;color:#333;">VT-8517-948120</div>
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;font-weight:700;margin-top:4px;color:#000;">
              <span>MRP: ${v.products[0].price}</span>
              <span>INCL. ALL TAXES</span>
            </div>
          </div>
          <div style="display:flex;gap:6px;margin-top:8px;">
            <button class="sim-complete-btn" style="flex:1;" data-action="print-barcode">🖨️ PRINT LABEL BATCH</button>
            <button class="sim-chip" data-action="toast" data-msg="✓ Printer format: 50x30mm 2-across thermal sticker">FORMAT</button>
          </div>
        </div>`
    },

    // 19. Schedule H / H1 Register (Pharmacy)
    schH1Register: {
      title: 'Schedule H1 Drug Register',
      badge: 'Drugs Act 65',
      badgeColor: 'error',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-gst-alert" style="background:rgba(239,68,68,0.12);border-color:rgba(239,68,68,0.25);color:#EF4444;">
            📜 Mandatory Drug Rules compliance: Doctor registration number &amp; patient signature logged.
          </div>
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div style="display:flex;justify-content:space-between;">
                <strong>Azithral 500mg (Azithromycin)</strong>
                <span class="sim-top-badge sim-badge-error">SCHEDULE H1</span>
              </div>
              <div class="sim-meter-row" style="margin-top:4px;">
                <span>Patient Name:</span>
                <span>Mohsin Pathan (Age: 34)</span>
              </div>
              <div class="sim-meter-row">
                <span>Prescribing Doctor:</span>
                <span>Dr. A.K. Shah (Reg: G-28491)</span>
              </div>
              <div class="sim-meter-row">
                <span>Batch &amp; Qty Dispensed:</span>
                <span>Batch #AZI-102 • 6 Tablets</span>
              </div>
              <div class="sim-meter-row">
                <span>Date &amp; Bill Ref:</span>
                <span>Today 11:15 AM • VT-2026-088</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="export-sch-h1">
            📥 EXPORT FORM 35 COMPLIANCE REGISTER (PDF)
          </button>
        </div>`
    },

    // 20. Salt Search & Generic Substitute Finder (Pharmacy)
    saltSearch: {
      title: 'Generic Salt Finder',
      badge: 'Salt Matrix',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-pos-search">
            <div class="sim-search-bar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Active Salt: Paracetamol 650mg</span>
            </div>
          </div>
          <div class="sim-customer-list" style="margin-top:6px;">
            <div class="sim-customer-card">
              <div class="sim-customer-info">
                <div class="sim-item-name">Dolo 650mg (Micro Labs)</div>
                <div class="sim-item-meta">In Stock: 240 Strips • Margin: 28%</div>
              </div>
              <div style="text-align:right;">
                <strong>₹34.50</strong>
                <span class="sim-chip" style="margin-top:2px;">BRANDED</span>
              </div>
            </div>
            <div class="sim-customer-card">
              <div class="sim-customer-info">
                <div class="sim-item-name">P-650 (Apex Laboratories)</div>
                <div class="sim-item-meta">In Stock: 150 Strips • Margin: 44%</div>
              </div>
              <div style="text-align:right;">
                <strong class="sim-success-text">₹31.00</strong>
                <button class="sim-chip sim-chip-active" style="margin-top:2px;" data-action="substitute-salt">+16% MARGIN</button>
              </div>
            </div>
          </div>
        </div>`
    },

    // 21. Pharmacy Quarantine & Locked Cabinet
    quarantine: {
      title: 'Quarantine Drug Cabinet',
      badge: 'Cabinet Lock',
      badgeColor: 'error',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-gst-alert" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#EF4444;">
            🔒 Locked Physical Quarantine: Items here are blocked from POS counter billing.
          </div>
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Augmentin 625 Duo (Batch: AUG-882)</div>
              <div class="sim-item-meta">Quarantined on 22 Oct • Expiry: 18 Days</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Physical Cabinet Location:</span>
                <span>Lock Box #3 (Rear Dispensary)</span>
              </div>
              <div class="sim-meter-row">
                <span>Supplier Debit Note:</span>
                <span class="sim-warning-text">Pending Sun Pharma Credit Note</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Quarantine audit certificate issued with Pharmacist biometric stamp">
            📋 CONFIRM PHYSICAL CABINET AUDIT
          </button>
        </div>`
    },

    // 22. Kitchen Display System (Restaurant)
    kdsOrders: {
      title: 'Kitchen Display System (KDS)',
      badge: 'Live Prep Queue',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-list">
            <div class="sim-repair-card">
              <div style="width:100%;">
                <div style="display:flex;justify-content:space-between;">
                  <strong>Table 7 • KOT #44</strong>
                  <span class="sim-status-chip sim-status-warning">PREPARING (4m)</span>
                </div>
                <div class="sim-item-meta" style="margin-top:4px;">1x Dum Biryani (Clay Pot) • Extra Salan</div>
                <div class="sim-item-meta">2x Butter Garlic Naan (Crispy)</div>
                <button class="sim-complete-btn" style="margin-top:6px;" data-action="kds-serve">✓ MARK PREPARED / NOTIFY WAITER</button>
              </div>
            </div>
            <div class="sim-repair-card">
              <div style="width:100%;">
                <div style="display:flex;justify-content:space-between;">
                  <strong>Table 6 • KOT #45</strong>
                  <span class="sim-status-chip sim-status-error">NEW ORDER (1m)</span>
                </div>
                <div class="sim-item-meta" style="margin-top:4px;">2x Dal Makhani Royal Bukhara (Mild)</div>
              </div>
            </div>
          </div>
        </div>`
    },

    // 23. KOT Thermal Ticket Preview (Restaurant)
    kotPrint: {
      title: 'Kitchen Order Ticket (KOT)',
      badge: '58mm Thermal',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-thermal-paper">
            <div style="text-align:center;font-weight:900;font-size:0.8rem;color:#000;">** KITCHEN ORDER TICKET **</div>
            <div style="text-align:center;font-size:0.65rem;color:#000;">TABLE: T-6 • PAX: 4 • KOT: #45</div>
            <div style="text-align:center;font-size:0.65rem;color:#000;">Captain: Ramesh • Time: 12:45 PM</div>
            <div class="sim-thermal-divider">--------------------------------</div>
            <div style="font-weight:800;font-size:0.75rem;color:#000;">
              <div>[ ] 2x DAL MAKHANI ROYAL BUKHARA</div>
              <div style="font-size:0.65rem;font-style:italic;padding-left:12px;">-> Instruction: Mild Spicy, Extra Cream</div>
              <div style="margin-top:4px;">[ ] 4x BUTTER GARLIC NAAN</div>
            </div>
            <div class="sim-thermal-divider">--------------------------------</div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="🖨️ KOT dispatched to Kitchen Printer (Kitchen Unit 1)">
            🖨️ DISPATCH KOT TO KITCHEN PRINTER
          </button>
        </div>`
    },

    // 24. Restaurant Shift Close & X-Report
    shiftSummary: {
      title: 'Shift Close & Cash Drawer',
      badge: 'Zero Negative Guard',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Lunch Service Shift (11:00 AM - 04:00 PM)</div>
              <div class="sim-item-meta">Cashier: Ramesh M. • Counter #1</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Cash Payments Collected:</span>
                <strong>₹18,450.00</strong>
              </div>
              <div class="sim-meter-row">
                <span>UPI / QR Settlements:</span>
                <strong>₹20,300.00</strong>
              </div>
              <div class="sim-meter-row">
                <span>Starting Float Cash:</span>
                <span>₹5,000.00</span>
              </div>
              <div class="sim-meter-row">
                <span>Expected Drawer Cash:</span>
                <strong class="sim-success-text">₹23,450.00</strong>
              </div>
              <div class="sim-meter-row">
                <span>Cash Drawer Variance:</span>
                <span class="sim-success-text">₹0.00 (Zero Discrepancy)</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Shift locked: X-Report printed and synced to Cloud Portal">
            🔒 LOCK SHIFT &amp; PRINT X-REPORT
          </button>
        </div>`
    },

    // 25. Daily Expenses & Till Outflow (Restaurant / Retail)
    expenses: {
      title: 'Store Expenses & Petty Cash',
      badge: 'Drawer Guard',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-list">
            <div class="sim-daybook-entry">
              <div class="sim-daybook-icon sim-bg-red">↑</div>
              <div><div class="sim-item-name">Kitchen Vegetable Intake</div><div class="sim-item-meta">Vashi APMC • Paid via Drawer Cash</div></div>
              <strong class="sim-error-text">−₹3,200.00</strong>
            </div>
            <div class="sim-daybook-entry">
              <div class="sim-daybook-icon sim-bg-red">↑</div>
              <div><div class="sim-item-name">Staff Refreshment &amp; Tea</div><div class="sim-item-meta">Daily Allowance Voucher</div></div>
              <strong class="sim-error-text">−₹350.00</strong>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="record-expense">
            + RECORD NEW PETTY CASH EXPENSE
          </button>
        </div>`
    },

    // 26. Garments Size x Color Grid Matrix
    matrix: {
      title: 'Size × Color Variant Grid',
      badge: '2D Inventory',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <strong>Slim-Fit Linen Shirt (Formal)</strong>
              <div class="sim-item-meta">HSN: 61091000 • 5% GST • Base: ₹1,899</div>
              <div style="margin-top:8px;font-size:0.65rem;">
                <div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                  <span>Navy Blue:</span>
                  <span>M(12) • L(8) • XL(4) • <strong class="sim-error-text">XXL(0)</strong></span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                  <span>Pure White:</span>
                  <span>M(15) • L(14) • XL(9) • XXL(2)</span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:3px 0;">
                  <span>Olive Green:</span>
                  <span>M(8) • L(6) • <strong class="sim-error-text">XL(0)</strong> • XXL(1)</span>
                </div>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="print-barcode">
            🏷️ PRINT MATRIX BARCODE LABELS
          </button>
        </div>`
    },

    // 27. Job Work Challan (Garments / Lapidary)
    jobWork: {
      title: 'Job Work Outsource Challan',
      badge: 'Challan #JW-912',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Surat Dyeing &amp; Embroidery Mill</div>
              <div class="sim-item-meta">Challan Ref: #JW-912 • Dispatched 3 Days Ago</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Dispatched Fabric:</span>
                <span>120 Mtrs Raw Linen (Value: ₹28,800)</span>
              </div>
              <div class="sim-meter-row">
                <span>Expected Output:</span>
                <strong>80 Finished Dyed Shirts</strong>
              </div>
              <div class="sim-meter-row">
                <span>Wastage SLA Allowance:</span>
                <span class="sim-success-text">2.0% Maximum Loss</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Job Work intake received: 80 shirts added to ready stock">
            📥 RECEIVE INTAKE &amp; RECONCILE SCRAP
          </button>
        </div>`
    },

    // 28. Exchange Credit Note Engine (Garments)
    exchange: {
      title: 'Exchange & Credit Notes',
      badge: '1:1 Piece Swap',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Basit Shaikh • Original Bill #VT-2026-041</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Returned Item:</span>
                <span class="sim-error-text">Raw Selvedge Denim (Size 32) • ₹2,999</span>
              </div>
              <div class="sim-meter-row">
                <span>Issued in Exchange:</span>
                <span class="sim-success-text">Raw Selvedge Denim (Size 34) • ₹2,999</span>
              </div>
              <div class="sim-meter-row">
                <span>Net Difference Payable:</span>
                <strong>₹0.00 (Even Exchange)</strong>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Credit Note #CR-089 issued &amp; stock matrix re-adjusted">
            ✓ ISSUE CREDIT NOTE &amp; SWAP PIECE
          </button>
        </div>`
    },

    // 29. Manufacturing Production Orders
    productionOrders: {
      title: 'Active Production Orders',
      badge: 'CNC Shopfloor',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div style="display:flex;justify-content:space-between;">
                <strong>SS304 Flange Assembly (#BOM-901)</strong>
                <span class="sim-status-chip sim-status-success">80% COMPLETE</span>
              </div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Batch Target:</span>
                <span>500 Finished Units (400 Completed)</span>
              </div>
              <div class="sim-meter-row">
                <span>Machine Assignment:</span>
                <span>CNC Lathe 2 • Operator: Suresh P.</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Production Batch #BOM-901 marked COMPLETE: 500 units moved to finished goods">
            ✓ MARK BATCH COMPLETED &amp; MOVE TO FG
          </button>
        </div>`
    },

    // 30. Raw Materials Reorder (Manufacturing)
    rawMaterials: {
      title: 'Raw Stock & Reorder Points',
      badge: 'Material Safety',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-list">
            <div class="sim-repair-card">
              <div style="width:100%;">
                <div style="display:flex;justify-content:space-between;">
                  <strong>SS304 Ingot Billet</strong>
                  <span class="sim-status-chip sim-status-error">REORDER DUE</span>
                </div>
                <div class="sim-meter-row" style="margin-top:4px;">
                  <span>Current Stock: 180 KG</span>
                  <span>Safety Threshold: 250 KG</span>
                </div>
              </div>
            </div>
            <div class="sim-repair-card">
              <div style="width:100%;">
                <div style="display:flex;justify-content:space-between;">
                  <strong>Precision Brass Rods</strong>
                  <span class="sim-status-chip sim-status-success">OPTIMAL</span>
                </div>
                <div class="sim-meter-row" style="margin-top:4px;">
                  <span>Current Stock: 420 Meters</span>
                  <span>Safety Threshold: 150 Meters</span>
                </div>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Purchase Order #PO-903 generated for Jindal Steel Strips">
            📝 RAISE RAW MATERIAL PURCHASE PO
          </button>
        </div>`
    },

    // 31. Scrap Report (Manufacturing)
    scrapReport: {
      title: 'Scrap & Shrinkage Audit',
      badge: 'Recovery Yield',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">October 2026 Monthly Scrap Audit</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Total Raw Metal Processed:</span>
                <strong>14,500 KG</strong>
              </div>
              <div class="sim-meter-row">
                <span>Finished Goods Yield:</span>
                <span class="sim-success-text">13,920 KG (96.0%)</span>
              </div>
              <div class="sim-meter-row">
                <span>Actual Scrap Loss:</span>
                <span>580 KG (4.0% vs 4.5% Allowance)</span>
              </div>
              <div class="sim-meter-row">
                <span>Scrap Cash Recovered:</span>
                <strong class="sim-success-text">+₹38,250.00</strong>
              </div>
            </div>
          </div>
        </div>`
    },

    // 32. Purchase Inward PO & ITC Match (Manufacturing / Retail)
    purchases: {
      title: 'Supplier Purchase PO',
      badge: 'GSTR-2B Matched',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Jindal Steel Strips Ltd (PO #PO-902)</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Inward Consignment:</span>
                <span>1,500 KG SS Billets @ ₹195/kg</span>
              </div>
              <div class="sim-meter-row">
                <span>Invoice Total:</span>
                <strong>₹2,92,500 + 18% GST</strong>
              </div>
              <div class="sim-meter-row">
                <span>E-Way Bill Status:</span>
                <span class="sim-success-text">✓ Verified &amp; Claimed in GSTR-2B</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Inward goods accepted: Stock added and ITC queued">
            ✓ CONFIRM INWARD GOODS &amp; POST ITC
          </button>
        </div>`
    },

    // 33. Lapidary Rough Lot Intake (Crystal & Agate)
    lapidary: {
      title: 'Rough Mineral Lot Intake',
      badge: 'Batch #LOT-412',
      badgeColor: 'warning',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Moss Agate Rough Mineral Lot</div>
              <div class="sim-item-meta">Khambhat Ghanti Unit • Assigned: Salim Bhai</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Gross Rough Weight:</span>
                <strong>50.00 KG (Grade A Dendritic)</strong>
              </div>
              <div class="sim-meter-row">
                <span>Expected Ghisat Loss:</span>
                <span class="sim-warning-text">32.0% (16.00 KG)</span>
              </div>
              <div class="sim-meter-row">
                <span>Expected Polish Yield:</span>
                <strong class="sim-success-text">34.00 KG Finished Gems</strong>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="ghanti-challan">
            ⚙️ ISSUE GHANTI CHALLAN TO ARTISAN
          </button>
        </div>`
    },

    // 34. Ghisat Loss Calculator (Crystal & Agate)
    ghisatCalc: {
      title: 'Ghisat Loss % Calculator',
      badge: 'Benchmark: 35%',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Artisan Yield Settlement: Salim Bhai</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Rough Input Issued:</span>
                <span>10.00 KG Raw Amethyst</span>
              </div>
              <div class="sim-meter-row">
                <span>Polished Output Received:</span>
                <span>6.40 KG Cabochons</span>
              </div>
              <div class="sim-meter-row">
                <span>Calculated Ghisat Loss:</span>
                <strong class="sim-success-text">36.0% (Within 1% Tolerance)</strong>
              </div>
              <div class="sim-meter-row">
                <span>Karigar Payout Due:</span>
                <strong class="sim-success-text">₹2,880.00 (@ ₹450/kg)</strong>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Karigar payout approved: Posted to Day Book Cash Outflow">
            ✓ APPROVE KARIGAR PAYOUT VOUCHER
          </button>
        </div>`
    },

    // 35. LUT Export Invoice (Crystal & Agate)
    lutExport: {
      title: 'LUT Export Invoice (0% IGST)',
      badge: 'RFD-11 Approved',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Consignee: Bohemian Crystals LLC (USA)</div>
              <div class="sim-item-meta">LUT Ref: AD240126001289K • Form RFD-11 Active</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Export Items:</span>
                <span>250 Pcs 7-Chakra Orgone Pyramids</span>
              </div>
              <div class="sim-meter-row">
                <span>Invoice Value:</span>
                <strong>$1,425.00 (₹1,18,500.00)</strong>
              </div>
              <div class="sim-meter-row">
                <span>IGST Charged (LUT 0%):</span>
                <span class="sim-success-text">₹0.00 (Zero IGST under Bond)</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Shipping Bill &amp; Packing List exported for Sahar Air Cargo Customs">
            📄 EXPORT CUSTOMS PACKING LIST
          </button>
        </div>`
    },

    // 36. Dual Pricing Slabs (Crystal & Agate / Wholesale)
    dualPricing: {
      title: 'Wholesale Dual Price Slabs',
      badge: 'Tiered Margins',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <strong>7-Chakra Orgone Pyramid</strong>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Retail (1 - 49 Pcs):</span>
                <strong>₹280.00 / Pc</strong>
              </div>
              <div class="sim-meter-row">
                <span>Wholesale (50 - 199 Pcs):</span>
                <strong class="sim-success-text">₹180.00 / Pc</strong>
              </div>
              <div class="sim-meter-row">
                <span>Master Distributor (200+ Pcs):</span>
                <strong class="sim-success-text">₹135.00 / Pc</strong>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Dual pricing tiers synced to all mobile billing counters">
            ✓ SAVE DUAL PRICE TIERS
          </button>
        </div>`
    },

    // 37. Section 80G Donation Receipt (Trust & Institute)
    trust: {
      title: 'Section 80G Donation Receipt',
      badge: '100% Tax Exempt',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Donor: Haji Abdul Sattar (PAN: AAAPA1234F)</div>
              <div class="sim-item-meta">Section 12AB/80G URN: AAATA1234F21</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Donation Amount:</span>
                <strong class="sim-success-text" style="font-size:0.9rem;">₹25,000.00</strong>
              </div>
              <div class="sim-meter-row">
                <span>Payment Mode:</span>
                <span>Bank RTGS (UTR: HDFC89124)</span>
              </div>
              <div class="sim-meter-row">
                <span>Form 10BD Serial:</span>
                <span class="sim-mono-code">VT-TR-2026-049</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="print-80g">
            🖨️ PRINT SECTION 80G TAX CERTIFICATE
          </button>
        </div>`
    },

    // 38. ₹2,000 Cash Donation Guard (Trust & Institute)
    cashGuard: {
      title: '₹2,000 Cash Guard Shield',
      badge: 'Section 80G(5D)',
      badgeColor: 'error',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-gst-alert" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#EF4444;">
            🛡️ Income Tax Rule 80G(5D): Anonymous cash donations strictly limited to ₹2,000 per donor.
          </div>
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Attempted Cash Donation Entry: ₹5,000.00</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Rule Engine Status:</span>
                <strong class="sim-error-text">⛔ BLOCKED (Exceeds ₹2,000 Cash Limit)</strong>
              </div>
              <div class="sim-meter-row">
                <span>Required Compliance:</span>
                <span>Must capture Donor PAN / Aadhaar or convert to UPI/Bank Transfer</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="✓ Donor PAN captured: Converted to compliant electronic donation voucher">
            ✓ ATTACH PAN &amp; CONVERT TO DIGITAL MODE
          </button>
        </div>`
    },

    // 39. Student Education Fee Voucher (Trust & Institute)
    studentFees: {
      title: 'Student Term Fee Voucher',
      badge: 'Scholarship',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Student: Salman Ansari (#ALH-2026-081)</div>
              <div class="sim-item-meta">Diploma in Computer Applications • Semester 2</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Standard Term Fee:</span>
                <span>₹4,500.00</span>
              </div>
              <div class="sim-meter-row">
                <span>Trust Scholarship Concession:</span>
                <span class="sim-success-text">−₹1,500.00</span>
              </div>
              <div class="sim-meter-row">
                <span>Net Amount Paid:</span>
                <strong class="sim-success-text">₹3,000.00 (UPI Receipt #FEE-88)</strong>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="toast" data-msg="🖨️ Fee receipt printed and SMS confirmation sent to parent">
            🖨️ PRINT FEE RECEIPT &amp; NOTIFY PARENT
          </button>
        </div>`
    },

    // 40. Form 10BD Statement of Donations (Trust & Institute)
    form10BD: {
      title: 'Form 10BD Annual Statement',
      badge: 'ITR Portal Ready',
      badgeColor: 'success',
      render: () => `
        <div class="sim-sub-screen-content">
          <div class="sim-repair-card">
            <div style="width:100%;">
              <div class="sim-item-name">Financial Year: 2026-27 (Quarter 2)</div>
              <div class="sim-meter-row" style="margin-top:6px;">
                <span>Total Donations Processed:</span>
                <strong>₹9,45,000.00</strong>
              </div>
              <div class="sim-meter-row">
                <span>KYC &amp; PAN Validated Records:</span>
                <span class="sim-success-text">24 / 24 Donors (100% Compliant)</span>
              </div>
              <div class="sim-meter-row">
                <span>Form 10BE Individual Certificates:</span>
                <span>24 Certificates Ready</span>
              </div>
            </div>
          </div>
          <button class="sim-complete-btn" style="margin-top:8px;" data-action="export-10bd">
            📥 DOWNLOAD FORM 10BD CSV FOR TAX FILING
          </button>
        </div>`
    },

    // 41. Fallback feature preview
    _featurePreview: (icon, title, desc) => {
      const formattedTitle = title ? title.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : 'Enterprise ERP Module';
      return `
        <div class="sim-sub-screen-content" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 16px;">
          <div class="sim-feature-preview-icon" style="font-size:2rem;margin-bottom:8px;">${icon || '⚡'}</div>
          <h3 class="sim-feature-preview-title" style="font-size:0.95rem;font-weight:700;margin-bottom:6px;color:#fff;">${formattedTitle}</h3>
          <p class="sim-feature-preview-desc" style="font-size:0.75rem;color:#94A3B8;line-height:1.5;margin-bottom:14px;">${desc || 'Full offline-first module with SQLCipher AES-256 encryption & Firestore cloud sync.'}</p>
          <span class="sim-chip sim-chip-active" style="font-size:0.65rem;margin-bottom:12px;">INCLUDED IN PRO LICENSE</span>
          <button class="sim-complete-btn" data-action="back" style="max-width:200px;">← RETURN TO COCKPIT</button>
        </div>`;
    }
  };

  SUB_SCREENS.products = SUB_SCREENS.inventory;

  // ── 3. SIMULATOR CLASS ──────────────────────────────────────────────
  class AppSimulator {
    constructor(containerEl) {
      this.container = containerEl;
      this.currentVerticalKey = 'MOBILE_SHOP';
      this.screenStack = [];
      this.isSyncing = false;
      this.currentTab = 'cockpit';
      this.isSetupPillDismissed = false;
      this.init();
    }

    get activeVertical() {
      return getVerticalData(this.currentVerticalKey);
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

    switchVertical(newKey) {
      if (!newKey) return;
      this.currentVerticalKey = newKey;
      this.screenStack = [];
      this.currentTab = 'cockpit';
      this.render();
      document.querySelectorAll('[data-vertical]').forEach(b => {
        b.classList.toggle('sim-vt-pill-active', b.dataset.vertical === newKey);
      });
      this.showToast(`Switched vertical to: ${this.activeVertical.name}`);
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

            <!-- 4. VeriStockBottomNavBar (Article 53: 5-Tab Material 3 Navigation) -->
            <div class="sim-bottom-nav-container">
              ${this.renderBottomNav()}
            </div>

            <!-- 5. Android Gesture Home Indicator -->
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
        const screenDef = SUB_SCREENS[currentScreenId] || { 
          title: currentScreenId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), 
          badge: 'PRO' 
        };
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
            <!-- 1. 5-State Live Sync Indicator -->
            <button class="sim-sync-btn ${this.isSyncing ? 'sim-sync-spinning' : ''}" id="sim-manual-sync" title="Cloud Sync Status: Sub-second Outbox Active" aria-label="Manual Cloud Sync">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                <polyline points="12 11 12 15 14 13"></polyline>
              </svg>
              <span class="sim-sync-dot"></span>
            </button>

            <!-- 2. Pulse Beacon Button -->
            <button class="sim-icon-btn sim-pulse-btn" data-screen="commandCentre" title="Pulse Telemetry Beacon" aria-label="Pulse Beacon">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#F59E0B" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </button>

            <!-- 3. Command Centre Shield Button -->
            <button class="sim-icon-btn" data-screen="commandCentre" title="Open Command Centre" aria-label="Command Centre">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#3B82F6" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </button>

            <!-- 4. Search Icon -->
            <button class="sim-icon-btn" data-screen="pos" title="Search Catalog & POS" aria-label="Search">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>
            </button>

            <!-- 5. Badged Notifications -->
            <div class="sim-notif-wrap" data-screen="daybook" title="Notifications & Audit Logs" aria-label="Notifications" style="cursor:pointer;">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span class="sim-notif-badge">2</span>
            </div>

            <!-- 6. Settings Gear Icon -->
            <button class="sim-icon-btn" data-screen="settings" title="Settings & Shop Setup" aria-label="Settings">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09"></path></svg>
            </button>
          </div>
        </div>`;
    }

    // ── RENDER 5-TAB BOTTOM NAVIGATION BAR (Article 53) ────────────
    renderBottomNav() {
      const activeTab = this.screenStack.length === 0 ? 'cockpit' : this.currentTab;
      return `
        <nav class="sim-bottom-nav">
          <button class="sim-nav-tab ${activeTab === 'cockpit' ? 'sim-nav-tab-active' : ''}" data-nav="cockpit" title="Cockpit Dashboard">
            <div class="sim-nav-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <span class="sim-nav-label">Cockpit</span>
          </button>

          <button class="sim-nav-tab ${activeTab === 'inventory' ? 'sim-nav-tab-active' : ''}" data-nav="inventory" title="Inventory Stock">
            <div class="sim-nav-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <span class="sim-nav-label">Stock</span>
          </button>

          <button class="sim-nav-tab sim-nav-tab-center ${activeTab === 'bill' ? 'sim-nav-tab-active' : ''}" data-nav="bill" title="Quick Bill POS">
            <div class="sim-nav-fab-btn">
              <span>+</span>
            </div>
            <span class="sim-nav-label">Quick Bill</span>
          </button>

          <button class="sim-nav-tab ${activeTab === 'connect' ? 'sim-nav-tab-active' : ''}" data-nav="connect" title="VeriStock Connect B2B">
            <div class="sim-nav-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <span class="sim-nav-label">Connect</span>
          </button>

          <button class="sim-nav-tab ${activeTab === 'hubs' ? 'sim-nav-tab-active' : ''}" data-nav="hubs" title="All ERP Modules">
            <div class="sim-nav-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </div>
            <span class="sim-nav-label">All Hubs</span>
          </button>
        </nav>`;
    }

    // ── RENDER HOME CONTENT (Mirrors HomeScreen.kt Article 53 Law) ──
    renderTabContent() {
      const v = this.activeVertical;

      return `
        <!-- 1. Store Setup Checklist (Article 47: 36dp Dismissible Smart Pill) -->
        ${!this.isSetupPillDismissed ? `
          <div class="sim-setup-pill">
            <div class="sim-setup-pill-body" data-screen="settings" title="Complete Store Setup">
              <span class="sim-setup-pill-icon">⚙️</span>
              <span class="sim-setup-pill-text"><strong>Setup 75%</strong> • Add GSTIN / Bank ›</span>
            </div>
            <button class="sim-setup-pill-close" id="sim-dismiss-setup" aria-label="Dismiss Setup Pill">×</button>
          </div>
        ` : ''}

        <!-- 2. Bento KPI Cockpit (Article 53: 136dp Unified Bento Grid) -->
        <div class="sim-bento-grid">
          <!-- Bento 1: Today's Revenue -->
          <div class="sim-bento-card sim-bento-revenue" style="background:${v.accentGradient};" data-screen="profitloss" title="View P&L Report">
            <div class="sim-bento-header">
              <span class="sim-bento-label">Today's Revenue</span>
              <span class="sim-revenue-month-badge">Month: ${v.stats.monthRevenue}</span>
            </div>
            <div class="sim-revenue-amount-row">
              <span class="sim-revenue-amount">${v.stats.todayRevenue}</span>
              <span class="sim-revenue-growth">${v.stats.growth}</span>
            </div>
          </div>

          <!-- Bento 2: Till Cash (Cash In Hand) -->
          <div class="sim-bento-card sim-bento-sub" data-screen="daybook" title="View Cash Drawer & Day Book">
            <div class="sim-bento-sub-header">
              <span class="sim-mini-label">TILL CASH</span>
              <span class="sim-online-dot" style="background:#22C55E;"></span>
            </div>
            <span class="sim-bento-val">${v.stats.cashInHand}</span>
            <span class="sim-bento-note" style="color:#22C55E;">● Drawer Safe</span>
          </div>

          <!-- Bento 3: Customer Udhaar (Khata Due) -->
          <div class="sim-bento-card sim-bento-sub" data-screen="customers" title="View Customer Khata & Dues">
            <div class="sim-bento-sub-header">
              <span class="sim-mini-label">KHATA DUES</span>
              <span class="sim-dues-arrow">›</span>
            </div>
            <span class="sim-bento-val" style="color:#F87171;">${v.stats.dues}</span>
            <span class="sim-bento-note" style="color:#94A3B8;">Market Udhaar</span>
          </div>

          <!-- Bento 4: Today Bills / Orders -->
          <div class="sim-bento-card sim-bento-sub" data-screen="pos" title="View Bills Counter">
            <div class="sim-bento-sub-header">
              <span class="sim-mini-label">TODAY BILLS</span>
              <span style="font-size:0.6rem;">🧾</span>
            </div>
            <span class="sim-bento-val">${v.stats.ordersCount}</span>
            <span class="sim-bento-note">Avg ${v.stats.avgTicket}</span>
          </div>
        </div>

        <!-- 3. 4-Launcher Compact Action Strip (Article 53: Max 64dp single-row) -->
        <div class="sim-launcher-strip">
          <button class="sim-launcher-chip sim-launcher-chip-primary" data-screen="pos" title="Start New Bill">
            <span class="sim-launcher-icon">⚡</span>
            <span class="sim-launcher-text">New Sale</span>
          </button>
          <button class="sim-launcher-chip" data-screen="inventory" title="Add or View Stock">
            <span class="sim-launcher-icon">📦</span>
            <span class="sim-launcher-text">Add Stock</span>
          </button>
          <button class="sim-launcher-chip" data-screen="customers" title="Customer Udhaar & Ledger">
            <span class="sim-launcher-icon">👥</span>
            <span class="sim-launcher-text">Khata</span>
          </button>
          <button class="sim-launcher-chip" data-screen="${v.primaryActions[0] ? v.primaryActions[0].id : 'invoice'}" title="${v.primaryActions[0] ? v.primaryActions[0].title : 'Action'}">
            <span class="sim-launcher-icon">${v.icon}</span>
            <span class="sim-launcher-text">${v.primaryActions[0] ? v.primaryActions[0].title.split(' ')[0] : 'Hero'}</span>
          </button>
          <button class="sim-launcher-chip sim-launcher-chip-more" data-nav="hubs" title="More Operations">
            <span class="sim-launcher-icon">⋯</span>
            <span class="sim-launcher-text">More</span>
          </button>
        </div>

        <!-- 4. Dynamic Context-Aware Vertical Widget -->
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

        <!-- 5. Top 3 Recent Bills Micro-List (Max 140dp) -->
        <div class="sim-qa-section" style="margin-bottom: 6px;">
          <div class="sim-section-label" style="display:flex;justify-content:space-between;align-items:center;">
            Recent Operations
            <span class="sim-view-all" data-screen="daybook">Day Book ›</span>
          </div>
          <div class="sim-recent-list">
            ${v.recentTx.slice(0, 3).map(tx => `
              <div class="sim-recent-item" data-screen="daybook" style="cursor:pointer;">
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
          if (newKey && newKey !== this.currentVerticalKey) {
            this.switchVertical(newKey);
          }
        }
      });

      this.container.addEventListener('click', (e) => {
        // 1. Action buttons with data-action
        const actionBtn = e.target.closest('[data-action]');
        if (actionBtn) {
          const action = actionBtn.dataset.action;
          if (action === 'back') {
            this.goBack();
            return;
          }
          if (action === 'complete-sale') {
            this.triggerCloudSync(true);
            return;
          }
          if (action === 'toast') {
            this.showToast(actionBtn.dataset.msg || '✓ Action recorded in Room Database');
            return;
          }
          if (action === 'print-barcode') {
            this.showToast('🖨️ ESC/POS Thermal Barcode (50x30mm) sent to Bluetooth printer');
            return;
          }
          if (action === 'export-sch-h1') {
            this.showToast('✓ Schedule H1 Drug Register CSV exported for Inspector Audit');
            return;
          }
          if (action === 'substitute-salt') {
            this.showToast('✓ Generic salt substitute applied (+16% margin improvement)');
            return;
          }
          if (action === 'kds-serve') {
            this.showToast('✓ Order marked SERVED! Floor Captain notified');
            return;
          }
          if (action === 'dispatch-po') {
            this.showToast('🚀 Production order #BOM-901 dispatched to CNC shopfloor');
            return;
          }
          if (action === 'ghanti-challan') {
            this.showToast('✓ Karigar Ghanti Challan #GH-412 issued to Salim Bhai');
            return;
          }
          if (action === 'print-80g') {
            this.showToast('✓ Section 80G Tax Exemption Certificate printed with URN');
            return;
          }
          if (action === 'export-10bd') {
            this.showToast('✓ Form 10BD Statement CSV downloaded for Income Tax Portal');
            return;
          }
          if (action === 'add-customer') {
            this.showToast('✓ Customer KYC ledger record saved (Room AES-256)');
            return;
          }
          if (action === 'add-stock') {
            this.showToast('✓ Product stock updated & synced to Cloud Outbox');
            return;
          }
          if (action === 'record-expense') {
            this.showToast('✓ Expense logged: Cash drawer updated (Zero Negative Cash Guard)');
            return;
          }
          if (action === 'export-ca') {
            this.showToast('✓ GSTR-1 outward supplies CSV generated for CA Web Portal');
            return;
          }
        }

        // 2. Dismiss Setup Pill
        const dismissSetupBtn = e.target.closest('#sim-dismiss-setup');
        if (dismissSetupBtn) {
          e.stopPropagation();
          this.isSetupPillDismissed = true;
          const pill = this.container.querySelector('.sim-setup-pill');
          if (pill) {
            pill.style.opacity = '0';
            pill.style.transform = 'scale(0.95)';
            setTimeout(() => pill.remove(), 200);
          }
          return;
        }

        // 3. Manual sync button
        const syncBtn = e.target.closest('#sim-manual-sync');
        if (syncBtn) {
          this.triggerCloudSync(false);
          return;
        }

        // 4. Bottom Navigation Bar tab clicks
        const navBtn = e.target.closest('[data-nav]');
        if (navBtn) {
          const navTarget = navBtn.dataset.nav;
          this.handleBottomNav(navTarget);
          return;
        }

        // 5. Screen navigation (Quick actions, buttons, mini cards, top bar icons)
        const screenBtn = e.target.closest('[data-screen]');
        if (screenBtn) {
          const screenId = screenBtn.dataset.screen;
          this.openScreen(screenId);
          return;
        }

        // 6. Generic button fallback
        const genericBtn = e.target.closest('button');
        if (genericBtn && genericBtn.id !== 'sim-dismiss-setup' && genericBtn.id !== 'sim-manual-sync') {
          const btnText = genericBtn.textContent.trim().replace(/^[+🚀🖨️🌐✓⚡\s]+/, '');
          if (btnText) {
            this.showToast(`✓ Simulated: ${btnText.substring(0, 32)}`);
          }
        }
      });
    }

    // ── BOTTOM NAVIGATION DISPATCHER ────────────────────────────────
    handleBottomNav(navTarget) {
      if (navTarget === 'cockpit') {
        this.screenStack = [];
        this.currentTab = 'cockpit';
        this.updateScreenContent();
      } else if (navTarget === 'inventory') {
        this.currentTab = 'inventory';
        this.screenStack = ['inventory'];
        this.updateScreenContent();
      } else if (navTarget === 'bill') {
        this.currentTab = 'bill';
        this.screenStack = ['pos'];
        this.updateScreenContent();
      } else if (navTarget === 'connect') {
        this.currentTab = 'connect';
        this.screenStack = ['connect'];
        this.updateScreenContent();
      } else if (navTarget === 'hubs') {
        this.currentTab = 'hubs';
        this.screenStack = ['moreHubs'];
        this.updateScreenContent();
      }
    }

    // ── NAVIGATION CONTROLLER ───────────────────────────────────────
    openScreen(screenId) {
      this.screenStack.push(screenId);
      if (screenId === 'inventory') this.currentTab = 'inventory';
      else if (screenId === 'pos' || screenId === 'invoice') this.currentTab = 'bill';
      else if (screenId === 'connect') this.currentTab = 'connect';
      else if (screenId === 'moreHubs') this.currentTab = 'hubs';
      else this.currentTab = '';
      this.updateScreenContent();
    }

    goBack() {
      if (this.screenStack.length > 0) {
        this.screenStack.pop();
        if (this.screenStack.length === 0) {
          this.currentTab = 'cockpit';
        }
        this.updateScreenContent();
      }
    }

    updateScreenContent() {
      const appBarContainer = this.container.querySelector('.sim-app-bar-container');
      const contentArea = this.container.querySelector('.sim-content-area');
      const navContainer = this.container.querySelector('.sim-bottom-nav-container');

      if (appBarContainer) appBarContainer.innerHTML = this.renderTopBar();

      // Determine content to render
      let contentHtml = '';
      if (this.screenStack.length > 0) {
        const currentScreenId = this.screenStack[this.screenStack.length - 1];
        const screenDef = SUB_SCREENS[currentScreenId] || (currentScreenId === 'products' ? SUB_SCREENS.inventory : null);
        if (screenDef) {
          contentHtml = screenDef.render(this.activeVertical);
        } else {
          contentHtml = SUB_SCREENS._featurePreview('⚡', currentScreenId, 'Enterprise offline-first module with SQLCipher encryption & cloud outbox sync.');
        }
      } else {
        contentHtml = this.renderTabContent();
      }

      if (contentArea) {
        contentArea.innerHTML = `<div class="sim-screen-layer sim-screen-active" data-layer="main">${contentHtml}</div>`;
      }

      if (navContainer) {
        navContainer.innerHTML = this.renderBottomNav();
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

  // ── PUBLIC INITIALIZER & CONTROLLER ───────────────────────────────
  window.VeriStockSimulator = {
    instance: null,
    init: function (selector) {
      const el = document.querySelector(selector);
      if (el) {
        this.instance = new AppSimulator(el);
        return this.instance;
      }
      console.warn('[VeriStockSimulator] Target element not found:', selector);
      return null;
    },
    switchVertical: function (key) {
      if (this.instance) {
        this.instance.switchVertical(key);
      }
    }
  };
})();
