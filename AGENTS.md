# VERISTOCK PRO — DEVELOPER & AI AGENT ARCHITECTURAL RULES

> **MANDATORY DIRECTIVE FOR ALL DEVELOPERS AND AI AGENTS:**
> This document is the authoritative rulebook for maintaining, updating, or expanding the **VERISTOCK PRO** website (`veristock-website`) and synchronizing it with the Android application (`veristockpro-android`).
> Every developer or AI agent working on this codebase **MUST** strictly adhere to the rules, architecture, design system, backend compliance standards, and UI/UX guidelines detailed below.

---

## 🏛️ 1. ARCHITECTURE & TECH STACK PRINCIPLES

### 1.1 Zero-Framework Philosophy
- **Core Technology:** Pure Vanilla HTML5, CSS3, and ES6 JavaScript.
- **Forbidden Technologies:** Do **NOT** introduce React, Next.js, Vue, Angular, Svelte, TailwindCSS, Bootstrap, jQuery, or third-party JS bundles unless explicitly requested by the user.
- **Rationale:** Ensures < 100ms load times, 100/100 Lighthouse performance, zero build tool overhead, and lifetime maintainability.

### 1.2 Offline-First Data Autonomy Philosophy
- The website **MUST** clearly represent VeriStock Pro's core architectural identity: **100% Offline-First ERP**.
- All marketing, technical docs, and FAQs must emphasize:
  1. Zero cloud server dependency for core operations.
  2. Local **SQLCipher 256-Bit AES** database encryption.
  3. Absolute data privacy — zero telemetry or cloud logging of financial ledgers.

---

## 🎨 2. FRONTEND UI / UX & DESIGN SYSTEM SPECIFICATIONS

All visual designs **MUST** strictly mirror the Jetpack Compose M3 Design System used in the Android application (`ui/theme/Color.kt` & `ServiceTheme.kt`).

### 2.1 Standardized Color Palette (CSS Tokens)

```css
:root {
  /* Brand Primary Tokens */
  --primary: #1A56DB;          /* Veristock Cobalt - Primary Action Buttons & Active Nav */
  --primary-light: #ADC6FF;    /* Cobalt Light - Focus Rings & Dark Theme Accents */
  --secondary: #2D3A4A;        /* Veristock Slate - Neutral Backgrounds & Footer Base */
  --accent: #F59E0B;           /* Veristock Gold - PRO Badges, Highlights & Prices */
  --success: #16A34A;          /* Success Green - Verified Badges & Positive Metrics */
  --error: #EF4444;            /* Brand Red / Error - Warnings & Expired Flags */

  /* Dark Theme Surfaces */
  --bg-dark: #0A0A0F;          /* Main Body Dark Background */
  --surface-dark: #111118;     /* Card Container & Glassmorphism Base */
  --surface-border-dark: rgba(255, 255, 255, 0.08);

  /* Light Theme Surfaces */
  --bg-light: #F8FAFC;         /* Main Body Light Background */
  --surface-light: #FFFFFF;    /* Card Base in Light Mode */
  --surface-border-light: rgba(0, 0, 0, 0.08);
}
```

### 2.2 Typography Scale & Fonts
- **Headings & Body Copy:** `Inter`, sans-serif (Geometric, modern, highly legible).
- **Financial Data, Monospace & Numbers:** `JetBrains Mono` (Used for invoice numbers, prices, serials, IMEI codes, HSN tags, and JSON code snippets).
- **Rule:** Never use standard browser default serif fonts. Always specify fallback chains: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.

### 2.3 Structural Components & Aesthetics
- **M3 Corner Radius:** Exactly `16px` (`1rem`) on cards, modals, dialogs, and primary buttons. Smaller interactive chips use `8px` or pill radius (`20px`).
- **Glassmorphism Standards:** Use `background: rgba(17, 17, 24, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08);`.
- **Micro-Animations:**
  - Buttons & Cards: Smooth `transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;`.
  - Hover states: Subtle upward lift (`transform: translateY(-3px)` or `translateY(-2px)`).
  - Scroll Reveals: Smooth intersection observer fade-in (`opacity` + `translateY`).

### 2.4 Responsive Breakpoints & Accessibility
- **Breakpoints:**
  - Desktop: `1024px+` (Multi-column grid, horizontal navbar menu).
  - Tablet: `768px` to `1023px` (2-column grid, condensed spacing).
  - Mobile: `< 768px` (Single column grid, slide-out drawer menu trigger).
- **Accessibility Constraints:**
  - All interactive controls (`<button>`, `<a>`, `<input>`) MUST have unique `id` attributes and descriptive `aria-label` tags.
  - Minimum touch target size: `44px × 44px`.
  - Color contrast ratio MUST meet Web Content Accessibility Guidelines (WCAG AA >= 4.5:1).

---

## 🔒 3. BACKEND, COMPLIANCE & PRIVACY LAWS

Developers and AI agents MUST enforce strict compliance with Google Play Store Developer Policies and Indian regulatory standards.

### 3.1 Permission Declarations (Privacy Policy Synchronization)
The Privacy Policy page (`/privacy-policy/` & `privacy.html`) MUST accurately disclose only the 5 Android permissions requested by the app:
1. `android.permission.CAMERA`: Barcode scanning for billing & device photo intake for repair claims.
2. `android.permission.ACCESS_FINE_LOCATION`: Geotagging KYC records for regulatory compliance.
3. `android.permission.READ_MEDIA_IMAGES`: Importing product images, logos, and signatures.
4. `android.permission.POST_NOTIFICATIONS`: Dispatching low-stock alerts, repair deadlines, and due date reminders.
5. `android.permission.BLUETOOTH`: Connecting ESC/POS thermal printers and triggering local Smart Clone migration.

### 3.2 Google Play Account Deletion Specification
Under Google Play Policy (Deletability Section), users MUST have a functional pathway to request account deletion on the website:
- **Location:** `/account-deletion/index.html`.
- **Data Scope Purged:** Firebase Auth user records, cloud subscription tokens, and cloud backup metadata.
- **SLA Processing Window:** Hard cap of **7 business days** to execute cloud purge upon form submission.
- **Local Data Rule:** Remind users that local database data is private on their device; uninstalling the app deletes local SQLCipher files.

### 3.3 Google Play Billing Exemption Specification
- **Exemption Rationale:** VeriStock Pro is strictly a B2B Business ERP. Licenses are activated out-of-band by SM Technologies authorized distributors and channel partners.
- **Rule:** The website MUST NEVER use terms like "In-App Purchases" or display direct digital download checkout buttons that violate B2B billing policies.

---

## 📦 4. FEATURE & TERMINOLOGY SYNCHRONIZATION RULES

### 4.1 Feature Flag Gating (43 Features in `Feature.kt`)
When editing feature lists, pricing tables, or documentation, maintain exact feature classification:

- **LITE Tier (Free Starter Plan):**
  - `POS_BILLING` (Express Billing, Thermal Printing)
  - `INVENTORY` (Stock tracking, low stock alerts)
  - `SALES` & `EXPENSES`
  - `REPORTS_BASIC`
  - `KOT_PRINTING` (Kitchen Order Tickets)
  - `ITEM_MODIFIERS` (Restaurant customizations)

- **PRO Tier (Paid Channel License Required):**
  - `WHOLESALE_BILLING` (Dedicated order-to-invoice workflow)
  - `MULTI_PRICING` (Retail vs Wholesale price slabs)
  - `MANUFACTURING`, `PRODUCTION_ORDERS`, `BOM` (Bill of Materials editor)
  - `KITCHEN_DISPLAY_SYSTEM` (KDS live status dashboard)
  - `REST_TABLE_MANAGEMENT` (Table split/merge)
  - `IMEI_TRACKING` & `IMEI_HISTORY_AUDIT`
  - `MARGIN_SCHEME_TAX` (GST Rule 32(5) for secondhand trade-in margin taxation)
  - `KYC_COMPLIANCE` (Digital Legal Shield, photo ID & signature capture)
  - `DEVICE_BUYBACK` (Trade-in valuation)
  - `AMC_MANAGEMENT` (Annual Maintenance Contracts)
  - `PHARMACY_COMPLIANCE_REPORT` (Schedule H/H1 registers, Rx tags, Salt search)
  - `PRODUCT_VARIANTS` & `EXCHANGE_MANAGEMENT` (Garment Size-Color Grid & Credit Notes)
  - `JOB_WORK_TRACKING` (Outsource vendor challans)
  - `PROJECT_EXPENSES` (Construction site expense tracking)
  - `REPORTS_ADVANCED` (5-Pillar Health Score 0-100, Receivables Aging 0-180+ days)

### 4.2 Vertical Terminology Engine Rules
Never substitute or confuse industry-specific terminology across verticals:
- **Mobile Shop:** Product, Piece, IMEI Number, Serial Number, Repair Job.
- **Pharmacy:** Medicine, Strip/Pack, Batch No., Expiry Date, Patient, Prescription, Schedule H/H1.
- **Clinic:** Consultation, Patient, Vitals, Medical History, Clinical Notes.
- **Restaurant:** Menu Item, Table No., KOT, KDS (Pending, Preparing, Served), Modifiers.
- **Garments:** Apparel, Piece, Size × Color Matrix, Job Work Challan, Exchange Credit Note.
- **Manufacturing:** Assembly, BOM Recipe, Production Batch, WIP Stock, Scrap Report.
- **Automotive:** Spare Part, Chassis No., Engine No., Odometer (km), Fuel Level.
- **Grocery:** Item, Measurement Unit, Loose/Packed, Weight-based Price (kg/g).

---

## 🚫 5. FORBIDDEN PRACTICES (CHECKLIST FOR DEVELOPERS & AI)

1. ❌ **NEVER** add npm dependencies, build scripts, or Webpack/Vite bundlers to this static repository unless explicitly instructed.
2. ❌ **NEVER** remove or alter compliance links (`/privacy.html`, `/terms.html`, `/account-deletion/`).
3. ❌ **NEVER** hardcode static layout heights; compute exact container bounds dynamically.
4. ❌ **NEVER** use generic non-brand colors (e.g. raw `#FF0000` red or `#00FF00` green). Use curated CSS tokens (`var(--primary)`, `var(--accent)`, `var(--success)`, `var(--error)`).
5. ❌ **NEVER** declare a feature or bug fix completed without validating HTML syntax and responsive rendering across desktop, tablet, and mobile breakpoints.
