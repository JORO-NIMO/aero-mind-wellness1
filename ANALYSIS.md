# AeroMind Wellness System Analysis Report

This document provides a comprehensive analysis of the AeroMind Wellness platform, which consists of a React web client, a Flutter mobile client, and a Supabase backend integration. It details the system architecture, completed features, remaining/unimplemented items, database schema alignment, known code quality/linting issues, and recommendations for future improvement.

---

## 1. System Architecture

AeroMind Wellness is structured as a cross-platform, offline-first application leveraging direct cloud backend integration.

- **Web Client**: React (v18) built with Vite and TypeScript. Styling uses Tailwind CSS, component layouts use shadcn/ui (Radix Primitives), and visualizations are built using `recharts`.
- **Mobile Client**: Flutter (v3.x) using a clean architecture pattern split into four key layers:
  - **Data**: Handlers for API calls (Supabase client), SQLite caching / key-value caches (`hive`, `shared_preferences`), and local hardware features (`health`, `flutter_local_notifications`).
  - **Domain**: Domain entities and abstract repository definitions representing core business objects and behaviors.
  - **Logic (BLoC)**: Handles state transitions for Authentication and Wellness tracking.
  - **Presentation**: UI widgets, pages, and customized components with localized support via ARB files.
- **Backend (BaaS)**: Supabase acts as the secure, unified backend providing Authentication, PostgreSQL Database, and Realtime sync services. It features automatic compliance alerting through custom trigger procedures in PL/pgSQL.

---

## 2. Completed Features

### Web & Mobile Parity
- **Onboarding Flow**: Multi-step setup gathering pilot demographics, compliance selection (FAA vs. UCAA), and metric permission preferences.
- **Biometric Wearable Syncing**: Real-time mock/simulated wearable synchronization (heart rate, sleep, steps) and persistence to the database.
- **Dashboard & Score calculation**: Custom algorithm calculating a generalized Wellness Score based on sleep and pulse metrics.
- **Anonymous Reporting Support**: Message submission categorized into Fatigue, Stress, Safety, or General feedback with Row Level Security (RLS) guaranteeing pilot privacy.
- **Admin Dashboard**: Restricted oversight views displaying fleet-wide wellness indicators, anonymous report listings, and graphical aggregate charts.
- **Mental Exercises**: Guided deep breathing screen helper.

### Mobile-Specific
- **Local Reminders**: Daily 9 AM local notification check-in schedules via `flutter_local_notifications`.
- **Offline Caching**: Device-state sync engine leveraging `hive` databases to cache wellness data.
- **Connectivity Monitoring**: Real-time banner alerts indicating cached visual fallback when connectivity is severed.
- **Dynamic Localizations**: Full localization (l10n) setup with complete ARB file pairs for Spanish (`es`) and English (`en`).
- **PDF Report Generator**: Generates and prints wellness progress summaries.

---

## 3. Remaining & Unimplemented Items

Although the prototype achieves solid coverage across its operational surface, the following items are remaining or partially complete:

1. **Production-Ready Wearable Integration on Web**:
   - The React web prototype currently simulates sync data using Math.random in `src/pages/Index.tsx` and doesn't hook into web-based Bluetooth/Web Bluetooth APIs or third-party fitness provider APIs (e.g., Google Fit, Apple Health Web API, Garmin API).
2. **Real-time Live Chat Messaging**:
   - The Flutter side includes an anonymous support system, but lacks full interactive peer-to-peer or peer-to-counselor live chat support, although PostgreSQL has real-time capabilities.
3. **True Admin Access Roles Configuration**:
   - The RLS policies exist on the backend to allow select permissions for `profiles.role = 'admin'`. However, there is no in-app administrative UI on the client to promote or demote normal users to the `admin` role safely. It must be edited directly via Supabase Studio or custom administrative functions.
4. **Comprehensive Web Unit Testing**:
   - The React root project does not include any automated test scripts (`test` is absent from `package.json`) and lacks TypeScript unit/integration tests, whereas the Flutter codebase maintains active widget smoke tests under `flutter_app/test`.
5. **Real-time Synchronization Event Handlers for UI**:
   - The web app relies on manual click-to-sync triggers in the dashboard to invoke database insertions rather than continuous background streams or automated triggers.

---

## 4. Database Schema Match

The SQL schema described in `supabase_schema.sql` matches the implementations in the frontend.

| Table Name | Primary Key | Foreign Key / Target | Row Level Security (RLS) Status |
| :--- | :--- | :--- | :--- |
| `profiles` | `id (UUID)` | `auth.users (cascade)` | Enabled. Active policies limit updates/reads to self. |
| `onboarding_data` | `user_id (UUID)` | `profiles.id (cascade)` | Enabled. Active policies limit access to owners. |
| `wellness_metrics` | `id (BIGINT)` | `profiles.id (cascade)` | Enabled. Restricted read/insert actions per user owner. |
| `anonymous_messages` | `id (BIGINT)` | None | Enabled. Inserts allowed for everyone, read permissions restricted exclusively to roles identified as `'admin'`. |
| `active_alerts` | `id (BIGINT)` | `profiles.id (cascade)` | Enabled. Select policies configured for self or role `'admin'`. |

### Database Triggers:
- **`on_auth_user_created`**: Automates profile creation upon registration.
- **`on_wellness_metrics_inserted`**: Executes compliance calculation comparing logged sleep against rule limits (8.0h for FAA, 7.0h for UCAA), raising active alerts into `active_alerts` automatically on breach.

---

## 5. Code Quality & Linter Issues

The following static analysis and syntax errors are currently detected:

### React Web Client Issues (`pnpm lint`)
- **Type Safety (`@typescript-eslint/no-explicit-any`)**:
  - `src/contexts/WearableContext.tsx` contains 5 instances of `any` types (lines 10, 21, 61, 82, 107).
  - `src/pages/AdminReports.tsx` contains 3 instances of `any` (lines 34, 35, 125).
  - `src/pages/Landing.tsx` contains 1 instance of `any` (line 11).
- **React Hooks warnings**:
  - `src/pages/AdminReports.tsx` line 63 has a missing `useEffect` dependency (`toast`).
- **Fast Refresh warnings**:
  - Multiple components (`badge.tsx`, `button.tsx`, `form.tsx`, `navigation-menu.tsx`, `sidebar.tsx`, `sonner.tsx`, `toggle.tsx`, and `WearableContext.tsx`) emit warnings because they export constants or functions alongside React components.

### Flutter Mobile Client Issues (`flutter analyze`)
- **Unused Imports**:
  - `lib/data/repositories/cache_service.dart` (unused wearable model)
  - `lib/data/repositories/report_service.dart` (unused typed data import)
  - `lib/presentation/pages/breathing_page.dart` (unused lucide icons import)
  - `lib/presentation/pages/resources_page.dart` (unused google fonts import)
  - `lib/presentation/widgets/mood_check_in.dart` (unused lucide icons import)
- **Deprecated Members**:
  - `anonKey` (superseded by `publishableKey` in Supabase)
  - `withOpacity` (superseded by `.withValues()` in Flutter to prevent precision loss)
  - `value`, `groupValue`, `onChanged` (Radio properties and FormField initializers flagged for replacement)
- **Formatting/Control Structures**:
  - Missing curly braces in `lib/presentation/pages/dashboard_page.dart` (line 120).
  - Missing type annotations in `lib/presentation/pages/settings_page.dart`.

---

## 6. Recommendations

To bring AeroMind Wellness to a production-ready status, the following tasks are recommended:

1. **Resolve Linter and Typing Issues**:
   - Refactor React files to use strict custom interfaces instead of `any`, ensuring proper contract enforcement.
   - Clean up Flutter's static analysis warnings, substituting deprecated APIs (`withOpacity`, `anonKey`) with modern equivalents (`withValues()`, `publishableKey`).
2. **Implement Automated Web Testing**:
   - Set up Vitest or Jest along with React Testing Library to match the quality standards of Flutter's existing test runner.
3. **Establish a Proper Admin User-Promotion Workflow**:
   - Implement a safe serverless/Supabase Edge function or custom procedure to manage system-level privileges without direct database table manipulation.
4. **Improve Real-time Background Sync**:
   - Incorporate Web Workers on Web and native Background Tasks on mobile (using `workmanager`) to execute metrics sync periodically without relying on active user interaction.
