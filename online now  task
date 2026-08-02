# Phase 1 Task Tracker — VeriStock Pro Multi-User Foundation

## Week 1: Database + Firestore Foundation
- [x] Create MIGRATION_112_113 — multi-user fields on core tables
  - [x] sales: shop_id, created_by_user_id, synced_at, sync_version
  - [x] purchases: shop_id, created_by_user_id, synced_at, sync_version
  - [x] repair_jobs: shop_id, assigned_to_user_id, created_by_user_id, synced_at, sync_version
  - [x] expenses: shop_id, created_by_user_id, synced_at, sync_version
  - [x] staff: firebase_uid, email, pin_hash, can_login, invited_at, last_login_at, shop_ids_json
- [x] Add new entity: ShopEntity (local cache of cloud shop config)
- [x] Add new entity: UserProfileCacheEntity (local cache of Firebase user role)
- [x] Update AppDatabase version to 113
- [x] Update PersistenceMigrationRegistry with MIGRATION_112_113
- [x] Update SaleEntity, PurchaseEntity, RepairJobEntity, ExpenseEntity with new fields
- [x] Create Firestore security rules file (firestore.rules)

## Week 2: Session + Navigation
- [x] Create ActiveUserSession.kt domain model
- [x] Create UserRole.kt enum
- [x] Create UserRoleRepository.kt (fetch role from Firestore on login)
- [/] Create MultiShopRepository.kt (business + shop management)
- [x] Update BusinessSession.kt to hold ActiveUserSession + switchShop()
- [x] Create ShopSelectorScreen.kt + ShopSelectorViewModel.kt
- [x] Update LoginViewModel with UserRoleRepository + new LoginEvent types
- [x] Update LoginScreen.kt to dual-callback signature
- [x] Update NavigationGraph for ShopSelector, CommandCentre, StaffInvite routes
- [x] Add Screen.ShopSelector, Screen.CommandCentre, Screen.StaffInvite to Screen.kt

## Week 3: Staff Invite + RBAC
- [x] Create RolePermissionMapper.kt
- [x] Create UserRole.kt with computed permission helpers
- [x] Create StaffInviteScreen.kt
- [x] Create StaffInviteViewModel.kt
- [x] Create CommandCentreScreen.kt (owner/manager overview)
- [x] Create CommandCentreViewModel.kt
- [x] Add RoleGate composable to FeatureGate.kt
- [x] Add RoleRestrictedScreen composable to FeatureGate.kt
- [x] Create Firestore security rules (firestore.rules)
- [ ] Firebase Cloud Function: sendStaffInviteEmail (server-side, needs Firebase CLI)
- [ ] Wire CommandCentre entry point into HomeScreen menu

## Week 4: Sync Foundation
- [x] Create SyncOutboxEntity.kt (extended write-ahead log)
- [x] Create SyncOutboxDao.kt
- [x] Add sync_outbox columns to MIGRATION_112_113
- [x] Register SyncOutboxEntity + syncOutboxDao() in AppDatabase
- [x] Create FirestoreSyncWorker.kt (immediate + periodic sync)
- [ ] Call FirestoreSyncWorker.schedulePeriodicSync() from Application.onCreate()
- [ ] Insert SyncOutboxEntity after each sale/purchase/repair write
- [ ] Implement entity-specific Firestore serializers in FirestoreSyncWorker

## Phase 4: CA Web Portal
- [x] Create ca-portal/index.html on veristockpro.com
- [ ] Fill Firebase config with actual project credentials
- [ ] Implement Firestore data queries for P&L, GST, Ledger
- [ ] Add chart visualization for P&L trends
