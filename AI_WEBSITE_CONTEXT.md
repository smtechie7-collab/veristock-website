# VERISTOCK PRO — AI Website Context & Product Manual

This document acts as the single source of truth for AI agents or developers managing, expanding, or auditing the **VERISTOCK PRO** website. It outlines the direct mappings between the Android application's technical architecture and the website's content, compliance pages, and visual branding.

---

## 📱 1. PRODUCT METADATA & PROFILE
- **Brand Name:** VERISTOCK PRO
- **Company Name:** SM Technologies
- **Official Domain:** `https://veristockpro.com`
- **Official Contact Support Email:** `smtechie7@gmail.com`
- **Core Tagline:** *Run Your Business. Not Your Problems.*
- **Classification:** Offline-First Business ERP (B2B SaaS / App)
- **Primary Market Focus:** India (expanding worldwide)
- **Primary Target Verticals:** 
  1. Mobile Shops
  2. Electronics Shops
  3. Mobile Repair Centers
- **Adjacent Supported Verticals (from CategoryRegistry):** General Retail, Grocery, Pharmacy, Garments, Hardware & Tools, Automotive Service, Clinics, Salons, Wholesale Distributors, and Light Manufacturing.

---

## 🎨 2. BRAND DESIGN SYSTEM & STYLE TOKENS
Maintain strict visual consistency with the Android Jetpack Compose Theme (`ui/theme/Color.kt` and `ServiceTheme.kt`).

| Token / Color | Hex Value | Role in App | Recommended CSS Role |
| :--- | :--- | :--- | :--- |
| **Primary (Veristock Cobalt)** | `#1A56DB` | Primary brand action color, light theme header | Buttons, active navigation, link colors |
| **Primary Light (Cobalt Light)** | `#ADC6FF` | On-primary container, dark theme accent | Accent glow, focus rings in dark mode |
| **Secondary (Veristock Slate)** | `#2D3A4A` | Surfaces, borders, text containers | Neutral backgrounds, card borders, footer bg |
| **Accent (Veristock Gold)** | `#F59E0B` | Pro badges, warning flags, cultural resonance | Glowing CTA badges, metrics highlights, prices |
| **Success Green** | `#16A34A` | Stock-in, payment received alerts | Success badges, validation indicators |
| **Brand Red** | `#BA1A1A` | Error state background, critical stock alerts | Error messages, deletion warnings |
| **Dark Theme BG** | `#0A0A0F` | Main dark background in ServiceTheme | `body.dark-mode` background |
| **Dark Theme Surface** | `#111118` | Dark card background | Dark mode cards, menus, glass container base |

### Typography Scale
- **Header Fonts:** `Inter`, sans-serif (Clean, modern geometric sans)
- **Data & Monospace Elements:** `JetBrains Mono` (Used for invoice numbers, code tokens, prices)
- **M3 Corner Radius:** `16px` (`1rem`) applied to cards, buttons, dialog boxes.

---

## 🔒 3. PERMISSION DECLARATION (PRIVACY COMPLIANCE)
The website's Privacy Policy must match the exact permission declarations from the Android Manifest:

1. **`android.permission.CAMERA`:**
   - *Purpose:* Scan barcodes for billing and stock management, capture device photos for repair intake/claims.
2. **`android.permission.ACCESS_FINE_LOCATION`:**
   - *Purpose:* Geotag KYC records and billing points for Indian regulatory compliance.
3. **`android.permission.READ_MEDIA_IMAGES`:**
   - *Purpose:* Import inventory product photos, invoice logos, and signatures.
4. **`android.permission.POST_NOTIFICATIONS`:**
   - *Purpose:* Dispatch notifications for low-stock warnings, repair deadlines, and payment due dates.
5. **`android.permission.BLUETOOTH` (and runtime permissions):**
   - *Purpose:* Connect to local 2-inch and 3-inch ESC/POS thermal printers for invoices, and trigger data migration (Smart Clone).

---

## 🛡️ 4. DATA SAFETY COMPLIANCE (GOOGLE PLAY SPECIFICATION)
The following mapping aligns with the official Play Console declarations of July 2026:

| Data Type | Collection Status | Cloud Storage Sync | Security Mechanism |
| :--- | :--- | :--- | :--- |
| **Account Info (Name, Mobile)** | Collected (User-entered) | Authenticated Cloud Session | In-transit TLS 1.3 |
| **Financial Ledger Entries** | Collected (Local database) | None (Local only by default) | AES-256 local SQLCipher |
| **Photos & Document Attachments** | Collected (Local media) | Google Drive Backup (Optional) | User-owned Cloud Storage |
| **Location Geotags** | Collected (Automatic) | Encrypted locally | AES-256 local SQLCipher |
| **Crash & Diagnostics Logs** | Collected (Firebase SDK) | Transmitted to Firebase console | Anonymized & Encrypted |

---

## 👤 5. ACCOUNT DELETION SPECIFICATION
Under Google Play Policy (Deletability Section), users must have a pathway to request deletion both in-app and on the website:

1. **In-App Trigger:** Located in the **About Screen** (`AboutAppScreen.kt`). Triggers `deleteAccount()` in `AuthRepository`.
2. **Website Trigger:** A clean, easy-to-use form on `/account-deletion/index.html`.
3. **Scope of Deletion:**
   - Firebase Auth User records are permanently purged.
   - Firestore cloud subscriptions and metadata are deleted.
   - Local database: Local database is private. If the user uninstalls, the local DB is deleted. If they select account deletion, active cloud-linked tokens are voided, rendering cloud backups inaccessible.
4. **Processing Window:** Cloud records are purged within **7 days** of submission.

---

## 💼 6. GOOGLE PLAY BILLING EXEMPTION
- **Exemption Status:** Exempt from Google Play Billing API.
- **Rationale:** VeriStock Pro is classified strictly as a B2B Business ERP. Licensing is handled out-of-band by SM Technologies authorized channel partners and local distributors. No digital content or media is sold directly within the application.
