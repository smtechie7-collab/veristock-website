# VERISTOCK PRO — Technical Architecture & AI Developer Rules Manual

This document serves as the primary source of truth for human developers and AI agents managing, auditing, expanding, or maintaining the **VERISTOCK PRO** website (`veristock-website`) and its integration with the **Android ERP application** (`veristockpro-android`).

---

## 📱 1. PRODUCT METADATA & PROFILE
- **Brand Name:** VERISTOCK PRO
- **Company Name:** SM Technologies
- **Official Domain:** `https://veristockpro.com`
- **Official Support Email:** `smtechie7@gmail.com`
- **Official Contact Phone:** `+91-99258-11505`
- **Core Tagline:** *Run Your Business. Not Your Problems.*
- **App Classification:** Offline-First Business ERP (B2B SaaS / Android App)
- **Target Market:** India (expanding worldwide)
- **Supported Business Verticals (16 Categories):**
  1. Mobile Shop (IMEI, SIM KYC, Accessories, Repairs)
  2. Second Hand Mobile (Used Device Trade-In, Margin Tax Rule 32(5), IMEI Audit)
  3. Electronics & Home Appliances (Serial tracking, Screen Size, Energy Rating, Fridge/AC/WM specs)
  4. Pharmacy & Healthcare Retail (Batch/Expiry tracking, Schedule H/H1, Rx tags, Salt composition)
  5. Clinic & Medical Consultation (Patient queue, Consultation, Prescriptions, Vitals)
  6. Service & Repair Workshop (Technician commissions, Repair intake, Diagnostic checklists, AMC)
  7. Salon & Spa (Appointment booking, Service durations, Stylist commissions)
  8. Grocery & Supermarket (Loose vs Packed, Weight-based billing, Expiry tracking, Commodity pricing)
  9. Garments, Apparel & Footwear (Size × Color Matrix, Garment costing, Exchange credits, Outsource Job Work)
  10. Restaurant & Food Outlet (Table management, KOT Printing, Kitchen Display System - KDS, Modifiers)
  11. Manufacturing & Industrial Floor (Bill of Materials - BOM, Production Orders, WIP stock, Scrap reports)
  12. Wholesale & Distribution (Wholesale billing, Multi-tier price slabs, Bulk discounts, MOQ)
  13. Automotive & Spare Parts (Chassis/Engine number tracking, Fuel level, KMS driven, Vehicle history)
  14. Hardware & Building Tools (Contractor billing, Heavy equipment serial tracking, Quality grades)
  15. Construction & Site Projects (Site expense tracking, Project clients, Procurement tracking)
  16. General Retail / Departmental

---

## 🎨 2. FRONTEND UI / UX DESIGN SYSTEM & CSS TOKENS
Maintain strict visual consistency with the Android Jetpack Compose M3 Theme (`ui/theme/Color.kt` and `ServiceTheme.kt`).

### Color System Mapping

| CSS Token Name | Hex Value | Role in Android App | Recommended Web CSS Role |
| :--- | :--- | :--- | :--- |
| `--primary` | `#1A56DB` | Primary brand action color, light theme header | Primary CTA buttons, active links, nav highlights |
| `--primary-light` | `#ADC6FF` | On-primary container, dark theme accent | Focus rings, glowing badges, dark mode accents |
| `--secondary` | `#2D3A4A` | Surfaces, borders, neutral containers | Card borders, secondary buttons, footer background |
| `--accent` | `#F59E0B` | Pro badges, warning flags, cultural gold | Glowing CTA badges, price highlights, metric alerts |
| `--success` | `#16A34A` | Stock-in, payment received alerts | Success badges, verified indicators, positive cash flow |
| `--error` | `#EF4444` | Critical stock alerts, deletion states | Error states, overdue warnings, expiry alerts |
| `--bg-dark` | `#0A0A0F` | Main dark background in ServiceTheme | `body.dark` background |
| `--surface-dark` | `#111118` | Dark card background | Dark mode card containers, glass base |

### Typography Scale
- **Headings & Body Copy:** `Inter`, sans-serif (Clean, modern geometric sans)
- **Data & Monospace Elements:** `JetBrains Mono` (Invoice numbers, prices, serials, IMEI codes, HSN tags, JSON code snippets)
- **M3 Corner Radius:** `16px` (`1rem`) applied to cards, primary buttons, and modals.

---

## 🔒 3. PERMISSION DECLARATION & PRIVACY COMPLIANCE
The website's Privacy Policy (`privacy.html` & `/pages/privacy-policy/`) MUST match the exact permission declarations from the Android Manifest:

1. `android.permission.CAMERA`: Scan barcodes for billing and stock management, capture device photos for repair intake/claims.
2. `android.permission.ACCESS_FINE_LOCATION`: Geotag KYC records and billing points for Indian regulatory compliance.
3. `android.permission.READ_MEDIA_IMAGES`: Import inventory product photos, invoice logos, and signatures.
4. `android.permission.POST_NOTIFICATIONS`: Dispatch notifications for low-stock warnings, repair deadlines, and payment due dates.
5. `android.permission.BLUETOOTH`: Connect to local 2-inch and 3-inch ESC/POS thermal printers for invoices, and trigger data migration (Smart Clone).

---

## 🛡️ 4. DATA SAFETY & BACKEND ARCHITECTURE SPECIFICATION

| Data Type | Web / App Collection Status | Cloud Storage Sync | Security Mechanism |
| :--- | :--- | :--- | :--- |
| **Account Info (Name, Mobile)** | User-entered on login | Authenticated Firebase Cloud Session | In-transit TLS 1.3 |
| **Financial Ledger Entries** | Collected in local DB | None (100% Local only by default) | AES-256 local SQLCipher |
| **Photos & Document Attachments**| Local device storage | Google Drive Backup (Opt-in only) | User-owned Cloud Storage |
| **Location Geotags** | Automatic on intake | Encrypted locally | AES-256 local SQLCipher |
| **Crash & Diagnostics Logs** | Firebase SDK | Transmitted to Firebase console | Anonymized & Encrypted |

---

## 👤 5. ACCOUNT DELETION SPECIFICATION
Under Google Play Policy (Deletability Section), users must have a pathway to request deletion both in-app and on the website:

1. **In-App Trigger:** Located in **About Screen** (`AboutAppScreen.kt`). Triggers `deleteAccount()` in `AuthRepository`.
2. **Website Trigger:** Form located at `/account-deletion/index.html`.
3. **Scope of Deletion:**
   - Firebase Auth User records permanently purged.
   - Firestore cloud subscriptions and metadata deleted.
   - Active cloud-linked backup tokens voided.
4. **Processing Window:** Cloud records are purged within **7 business days** of submission.

---

## 💼 6. GOOGLE PLAY BILLING EXEMPTION SPECIFICATION
- **Exemption Status:** Exempt from Google Play Billing API.
- **Rationale:** VeriStock Pro is classified strictly as a B2B Business ERP. Licensing is handled out-of-band by SM Technologies authorized channel partners and local distributors. No digital consumer content is sold directly in-app.

---

## ⚙️ 7. FEATURE FLAG CATALOG & TIER MATRIX (43 FEATURES)

### LITE Tier (Included in Starter Free Version):
- `POS_BILLING`: Express Billing, ESC/POS Thermal Printing.
- `INVENTORY`: Real-time stock tracking, low stock alerts.
- `SALES` & `EXPENSES`: Ledger recording, basic expenses.
- `REPORTS_BASIC`: Daily/monthly sales reports.
- `KOT_PRINTING`: Kitchen Order Tickets for food outlets.
- `ITEM_MODIFIERS`: Menu customization tags (e.g. Extra Spicy).

### PRO Tier (Paid Channel License Required):
- `WHOLESALE_BILLING`: Dedicated order-to-invoice wholesale screen.
- `MULTI_PRICING`: Multi-tier pricing slabs (retail, wholesale, customer).
- `MANUFACTURING`, `PRODUCTION_ORDERS`, `BOM`: Bill of Materials editor, WIP stock, scrap reports.
- `KITCHEN_DISPLAY_SYSTEM`: Live KDS status dashboard (Pending, Preparing, Served).
- `REST_TABLE_MANAGEMENT`: Table Split and Merge actions.
- `IMEI_TRACKING` & `IMEI_HISTORY_AUDIT`: Dual IMEI lifecycle tracking.
- `MARGIN_SCHEME_TAX`: GST Rule 32(5) secondhand margin taxation.
- `KYC_COMPLIANCE`: Digital Legal Shield with seller photo ID & signature.
- `DEVICE_BUYBACK`: Trade-in valuation connector.
- `AMC_MANAGEMENT`: Annual Maintenance Contracts.
- `PHARMACY_COMPLIANCE_REPORT`: Schedule H/H1 registers, Rx tags, Salt composition search.
- `PRODUCT_VARIANTS` & `EXCHANGE_MANAGEMENT`: Garment Size-Color Grid & Credit Notes.
- `JOB_WORK_TRACKING`: Outsource vendor challan tracking.
- `PROJECT_EXPENSES`: Construction site expense tracking.
- `REPORTS_ADVANCED`: 5-Pillar Health Score (0-100), Receivables Aging (0-180+ days Udhari).

---

## 📋 8. DEVELOPER & AI CHECKLIST

Before submitting any code or documentation changes:
- [ ] HTML markup validated without syntax errors.
- [ ] All interactive elements (`<button>`, `<a>`, `<input>`) have unique `id`s and `aria-label`s.
- [ ] Responsive layouts tested on Desktop (1024px+), Tablet (768px), and Mobile (<768px).
- [ ] Color tokens adhere to Jetpack Compose theme (`var(--primary)`, `var(--accent)`, `var(--success)`, `var(--error)`).
- [ ] Zero third-party JS libraries added.
- [ ] Compliance links (`/privacy.html`, `/terms.html`, `/account-deletion/`) remain intact.
