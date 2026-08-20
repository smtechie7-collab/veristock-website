# 🏗️ VeriStock Pro — Enterprise Multi-User & Command Centre Architecture
## Refined Master Plan v1.0

> **Domain:** `veristockpro.com` (SM Technologies)  
> **Scope:** Multi-business • Multi-shop • Multi-user • Real-time Sync • CA Web Portal  
> **Date:** August 2026

---

## 🎯 Vision Statement

VeriStock Pro evolves from a **single-device owner app** into a **full Business Command Centre** — where the owner controls multiple businesses, multiple shops, and an entire staff ecosystem from one dashboard. Every salesman, technician, accountant, and CA gets their own Firebase account with exactly the access they deserve.

```
Owner's Phone / Any Phone
   ↓ Firebase Auth (email + password)
   ↓ Identifies: Who am I? (Owner / Manager / Sales / Technician / CA)
   ↓ Loads: Which business? Which shop?
   ↓ Shows: Only MY allowed features + MY data scope
```

---

## 🏢 Multi-Business / Multi-Shop Data Model

### The Owner's World

```
Firebase Auth User (Owner: smtechie7@gmail.com)
│
├── Business 1: "SM Mobile Shop" (businessId: biz_001)
│   ├── Shop 1: "Main Branch - Surat" (shopId: shop_001)
│   │   ├── Staff: Raju (Salesman), Suresh (Technician)
│   │   └── Room DB: veristock_shop_001.db (local, encrypted)
│   └── Shop 2: "Adajan Branch - Surat" (shopId: shop_002)
│       ├── Staff: Ahmed (Salesman)
│       └── Room DB: veristock_shop_002.db (local, encrypted)
│
└── Business 2: "SM Pharmacy" (businessId: biz_002)
    └── Shop 1: "Main Pharmacy" (shopId: shop_003)
        ├── Staff: Farida (Counter), Zaid (Counter)
        └── Room DB: veristock_shop_003.db (local, encrypted)
```

### Key Rules
- Each **Shop** has its own local Room DB (isolated, encrypted)
- Each **Business** has a Firebase Firestore namespace (`businesses/{bizId}/shops/{shopId}/`)
- The **Owner** can switch between any business/shop from one app install
- **Staff** are locked to the specific shop they are assigned to
- **CA** gets read access across all businesses assigned to them

---

## 👤 User Types & Firebase Auth Strategy

### Auth Architecture

```
Firebase Authentication
├── Owner Account (email/password)     → Full admin across all businesses
├── Manager Account (email/password)   → Full access in their shop only  
├── Staff Account (email/password)     → Limited access per their role
└── CA Account (email/password)        → Read-only web portal login only
```

### How Staff Accounts Work

1. **Owner creates staff** in the app (name + email + role)
2. **Firebase Cloud Function** sends invite email to staff email
3. **Staff clicks link** → sets password → activates their Firebase account
4. **Staff logs in on their device** → app detects their role from Firestore → loads restricted UI
5. **No PIN** — full email+password auth for all users (professional & auditable)

### Role → Permission Matrix

| User Type | Business Switch | Shop Switch | Sales | Purchase | View Prices | Ledger | Reports | Settings | Delete |
|---|---|---|---|---|---|---|---|---|---|
| **OWNER** | ✅ All | ✅ All | ✅ | ✅ | ✅ | ✅ Full | ✅ All | ✅ | ✅ |
| **MANAGER** | ❌ | ✅ Their shop | ✅ | ✅ | ✅ | ✅ Full | ✅ All | ⚠️ Limited | ❌ |
| **SALESMAN** | ❌ | ❌ | ✅ | ❌ | ❌ Cost hidden | ❌ | ❌ | ❌ | ❌ |
| **TECHNICIAN** | ❌ | ❌ | ❌ | ❌ Part lookup | ❌ | ❌ | ❌ | ❌ | ❌ |
| **ACCOUNTANT** | ❌ | ✅ Their shops | ❌ | View only | ✅ | ✅ Full | ✅ All | ❌ | ❌ |
| **CA (Web)** | ❌ | View only | ❌ | ❌ | ❌ | ✅ Read | ✅ P&L/GST | ❌ | ❌ |
| **COLLECTION** | ❌ | ❌ | ❌ | ❌ | ❌ | Read/Write | ❌ | ❌ | ❌ |

---

## 🔄 Sync Architecture: Hybrid Real-Time

### Strategy: Two-Mode Sync (LAN + Cloud)

```
┌─────────────────────────────────────────────────┐
│              SYNC ENGINE                        │
│                                                 │
│  Mode 1: LAN Wi-Fi (Same Shop)                  │
│  ├── All devices on same Wi-Fi → P2P sync       │
│  ├── Uses mDNS / NSD for device discovery       │
│  ├── < 50ms latency, no internet needed         │
│  └── Primary for in-shop real-time operations  │
│                                                 │
│  Mode 2: Internet (Firebase Firestore)          │
│  ├── Online → auto-sync to Firestore            │
│  ├── Offline → queue in local DB                │
│  ├── Reconnect → flush queue to Firestore       │
│  └── CA portal reads from Firestore             │
└─────────────────────────────────────────────────┘
```

### Sync Rules
- **Staff devices MUST sync before working** (as you specified)
- App shows "Sync Required" screen if last sync > 30 minutes and internet is available
- If no internet AND no LAN → show warning, allow continue with local data
- All records have: `syncedAt`, `createdByUserId`, `shopId`, `businessId`, `deviceId`, `version`

### Conflict Resolution Strategy
```
Last-Write-Wins (default) for most records
Owner-Wins for financial records (sales, purchases, ledger)
Soft-Delete → tombstone records (never hard delete synced records)
```

---

## 🔥 Firebase Firestore Data Model

```
Firestore (Cloud)
│
businesses/
└── {businessId}/
    ├── metadata: { name, category, ownerUid, gstin, ... }
    ├── members/
    │   └── {uid}: { role, name, email, shopIds[], status, invitedAt }
    └── shops/
        └── {shopId}/
            ├── metadata: { name, address, ... }
            ├── sync_log/
            │   └── {recordId}: { table, action, payload, timestamp, deviceId }
            ├── sales/ (mirrored from local DB for reporting)
            ├── purchases/ (mirrored)
            ├── repair_jobs/ (mirrored)
            ├── inventory_snapshots/ (daily EOD snapshot)
            └── staff_activity/ { staffId, action, timestamp }

users/
└── {uid}/
    ├── profile: { name, email, role, businessIds[], defaultBusinessId }
    └── devices/
        └── {deviceId}: { lastSeen, platform, appVersion }
```

---

## 🌐 CA Web Portal (veristockpro.com/ca-portal)

### What the CA Portal Is
A **read-only web dashboard** hosted on `veristockpro.com` where a CA or accountant logs in with their Firebase email account and views financial data of businesses they are assigned to.

### CA Portal Features
| Feature | Description |
|---|---|
| 📊 P&L Summary | Monthly Profit & Loss by shop/business |
| 📋 GST Report | GSTR-1, GSTR-3B data export |
| 📈 Sales Trend | Weekly/Monthly sales graphs |
| 💰 Ledger View | Customer/Supplier outstanding |
| 📥 Export to Excel | CSV/Excel download for filing |
| 🔔 Period Selector | Date range filter, FY filter |

### Tech Stack for CA Portal
- **Same domain:** `veristockpro.com/ca-portal/`
- **Auth:** Firebase Auth JS SDK (same Firebase project as Android app)
- **Data:** Firebase Firestore JS SDK (reads from the same Firestore)
- **UI:** Vanilla HTML + CSS (follows your existing website design system)
- **Charts:** Chart.js (lightweight, no heavy frameworks)
- **Zero backend server needed** — pure client-side Firebase SDK

### CA Portal Page Structure
```
veristockpro.com/ca-portal/
├── index.html          → Login page
├── dashboard.html      → Main dashboard (business/shop selector)
├── reports.html        → P&L, GST reports
├── ledger.html         → Customer/Supplier ledger
├── export.html         → Data export tool
└── assets/
    ├── css/ca-portal.css
    └── js/
        ├── firebase-config.js
        ├── auth.js
        └── dashboard.js
```

---

## 📱 Android App Architecture Changes

### New App Flow

```
App Launch
    ↓
Firebase Auth Check
    ├── Not logged in → Login Screen (email + password)
    └── Logged in → Fetch user profile from Firestore
                        ↓
                   Determine Role
                        ├── OWNER → Business Selector Screen
                        │          → Shop Selector Screen
                        │          → Full Admin Dashboard
                        │
                        ├── MANAGER/STAFF → Auto-load their shop
                        │                 → Role-restricted Dashboard
                        │
                        └── CA → Redirect to web portal (can't use Android app)
```

### New Screens Required (Android)
| Screen | Purpose |
|---|---|
| `BusinessSelectorScreen` | Owner picks which business to operate |
| `ShopSelectorScreen` | Owner/Manager picks which shop branch |
| `StaffInviteScreen` | Send Firebase invite to staff email |
| `ActiveUserBadge` | Top bar shows who is logged in + role badge |
| `SyncStatusScreen` | Real-time sync status, manual sync trigger |
| `SyncRequiredScreen` | Shown when staff tries to work without sync |
| `CommandCentreScreen` | Owner's overview: all businesses + all shops |

### New Data Components Required (Android)
| Component | Purpose |
|---|---|
| `MultiBusinessRepository` | Manages businessId / shopId context |
| `UserRoleRepository` | Fetches role + permissions from Firestore |
| `SyncEngine` | Orchestrates LAN + Cloud sync |
| `LanSyncServer` (Ktor) | Local HTTP server for LAN sync |
| `LanSyncClient` | NSD device discovery + delta pull |
| `FirestoreSyncWorker` | WorkManager worker for cloud sync |
| `SyncQueue` | Local Room table for pending sync operations |
| `ActiveUserSession` | In-memory: who is logged in + their permissions |

### Room DB Changes Required
```sql
-- Add businessId + shopId to all tables
ALTER TABLE sales ADD COLUMN business_id TEXT;
ALTER TABLE sales ADD COLUMN shop_id TEXT;
ALTER TABLE sales ADD COLUMN created_by_user_id TEXT;
ALTER TABLE sales ADD COLUMN synced_at INTEGER;
ALTER TABLE sales ADD COLUMN sync_version INTEGER DEFAULT 0;

-- Same for: purchases, repair_jobs, expenses, customers, 
--           products, suppliers, staff, ledger entries

-- New table: sync_queue
CREATE TABLE sync_queue (
    id TEXT PRIMARY KEY,
    table_name TEXT NOT NULL,
    record_id TEXT NOT NULL,
    action TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    payload TEXT NOT NULL, -- JSON
    shop_id TEXT NOT NULL,
    business_id TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    is_synced INTEGER DEFAULT 0,
    retry_count INTEGER DEFAULT 0
);

-- New table: business_shops (local cache of cloud data)
CREATE TABLE business_shops (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    business_name TEXT NOT NULL,
    shop_id TEXT NOT NULL,
    shop_name TEXT NOT NULL,
    user_role TEXT NOT NULL,
    last_synced_at INTEGER
);
```

---

## 📅 Phased Implementation Plan

### Phase 1 — Foundation (Weeks 1–4)
**Goal: Multi-business + multi-shop switching + proper user roles**

```
Week 1:
├── Add businessId + shopId to all Room DB tables (migration)
├── Create Firestore data model + security rules
└── Create UserRoleRepository (fetch role from Firestore on login)

Week 2:
├── BusinessSelectorScreen + ShopSelectorScreen
├── ActiveUserSession model
└── Role-based navigation (hide menus based on role)

Week 3:
├── Staff invite flow (Firebase email invite via Cloud Function)
├── StaffInviteScreen in Android
└── Role enforcement in FeatureGate

Week 4:
├── createdByUserId on all transactions
├── Staff activity log
└── Owner Command Centre overview screen
```

**Deliverable:** Owner can manage 2 businesses, 3 shops. Staff log in with email and see restricted UI.

---

### Phase 2 — Internet Sync (Weeks 5–8)
**Goal: Real-time cloud sync via Firebase Firestore**

```
Week 5:
├── SyncQueue table in Room DB
├── FirestoreSyncWorker (WorkManager)
└── Delta sync: only changed records since last sync

Week 6:
├── Firestore security rules (staff can only write their shop)
├── Conflict resolution (last-write-wins + version vector)
└── Sync status UI (badge showing "Synced 2 min ago")

Week 7:
├── SyncRequiredScreen (must sync before working)
├── Offline queue (works offline, syncs when connected)
└── Inventory snapshot (daily EOD sync to Firestore)

Week 8:
├── Testing multi-device scenarios
├── Migration from old single-device data to multi-shop format
└── Cross-device conflict resolution testing
```

**Deliverable:** Salesman's phone syncs sales to owner's phone via internet in real-time.

---

### Phase 3 — LAN Wi-Fi Sync (Weeks 9–11)
**Goal: In-shop real-time sync without internet**

```
Week 9:
├── Ktor embedded HTTP server (LanSyncServer)
├── Android NSD for device discovery
└── Admin device can be any device (elected dynamically)

Week 10:
├── Delta sync via LAN REST API
├── LAN sync + Cloud sync working together (LAN preferred)
└── Auto-fallback: LAN → Internet → Queue

Week 11:
├── Sync conflict handling for LAN
├── LAN sync status screen
└── "Admin Device" indicator in UI
```

**Deliverable:** In the shop, all phones sync instantly on same Wi-Fi even without internet.

---

### Phase 4 — CA Web Portal (Weeks 12–14)
**Goal: CA logs in at veristockpro.com/ca-portal and views all financial data**

```
Week 12:
├── Create /ca-portal/ directory in veristock-website
├── Firebase Auth + Firestore JS SDK integration
├── Login page (matches website design system)
└── Business + Shop selector

Week 13:
├── P&L dashboard with Chart.js
├── GST report page
├── Ledger view (Customer/Supplier)
└── Date range + FY filter

Week 14:
├── Excel/CSV export
├── CA assignment in Android app (owner assigns CA to business)
├── Firestore security rules for CA read access
└── End-to-end testing
```

**Deliverable:** CA logs in at website, sees real-time financial data, exports GST reports.

---

## 🔐 Security Architecture

### Firebase Security Rules (Firestore)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can only read their own profile
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    // Business access: only members
    match /businesses/{bizId} {
      allow read: if isMember(bizId);
      allow write: if isOwner(bizId);
      
      match /shops/{shopId} {
        // Staff can only access their assigned shop
        allow read, write: if isShopMember(bizId, shopId);
        
        // CA can only read
        match /sales/{docId} {
          allow read: if isCA(bizId);
          allow write: if isShopMember(bizId, shopId) 
                       && !isCA(bizId);
        }
      }
    }
    
    function isMember(bizId) {
      return exists(/databases/$(database)/documents/
                    businesses/$(bizId)/members/$(request.auth.uid));
    }
    
    function isOwner(bizId) {
      return get(/databases/$(database)/documents/
                 businesses/$(bizId)/members/$(request.auth.uid))
                 .data.role == 'OWNER';
    }
    
    function isCA(bizId) {
      return get(/databases/$(database)/documents/
                 businesses/$(bizId)/members/$(request.auth.uid))
                 .data.role == 'CA';
    }
    
    function isShopMember(bizId, shopId) {
      let member = get(/databases/$(database)/documents/
                       businesses/$(bizId)/members/$(request.auth.uid)).data;
      return member.shopIds.hasAny([shopId]) 
             || member.role == 'OWNER' 
             || member.role == 'MANAGER';
    }
  }
}
```

### Data Privacy Maintained
- Financial ledger data stays in **local Room DB (SQLCipher)** as primary
- Firestore only holds **sync metadata + aggregated reports** (not full raw DB)
- CA portal reads only **aggregated summaries** — never raw individual customer records
- Staff cannot see cost prices (enforced both in UI and Firestore rules)

---

## 📊 Effort Summary

| Phase | Scope | Effort | Priority |
|---|---|---|---|
| Phase 1 — Foundation | Multi-biz, multi-shop, roles, Firebase invite | 4 weeks | 🔴 Critical |
| Phase 2 — Internet Sync | Firestore real-time sync, SyncQueue | 4 weeks | 🔴 Critical |
| Phase 3 — LAN Sync | Same Wi-Fi P2P sync, any device as admin | 3 weeks | 🟡 High |
| Phase 4 — CA Portal | Web portal on veristockpro.com | 3 weeks | 🟡 High |
| **Total** | | **~14 weeks** | |

---

## ✅ Decisions Confirmed

| Decision | Your Answer | Implementation |
|---|---|---|
| Staff auth type | Firebase email accounts | Cloud Function sends invite email |
| Admin device | Any device can be admin | Dynamic "admin election" in sync |
| Sync type | LAN + Internet (hybrid) | Dual-mode SyncEngine |
| CA access | Web portal on veristockpro.com | /ca-portal/ sub-directory |
| Staff work without sync | No — must sync first | SyncRequiredScreen gate |
| Business model | Multi-business + multi-shop | businessId + shopId on every record |

---

## 🚀 Recommended First Step

> Start with **Phase 1, Week 1** — adding `businessId`, `shopId`, `createdByUserId` to all Room DB tables via proper migrations. This is the foundation that everything else builds on. Without this, no sync or multi-shop system is possible.

Shall I start executing Phase 1 now?
