# Aero Mind Wellness

Pilot wellness demo web app built with Vite + React + Tailwind. Includes demo authentication (login/sign-up with company email, worker ID, phone, DOB), onboarding, dashboard with mock wearable data, AI-powered insights (what‑if simulation), settings bound to the signed-in profile, and a resources page. All demo data is stored locally in the browser.

## Quick start (Windows)

Prerequisites
- Node.js 18+ (recommended)
- npm (bundled with Node)

Steps
```powershell
# 1. Clone the repo
git clone https://github.com/JORO-NIMO/aero-mind-wellness1.git

# 2. Enter the project folder
cd aero-mind-wellness1

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open the app in your browser at:
http://localhost:5173

(Vite default dev port is 5173; if your project uses a different port, follow the terminal output.)

## Features (Demo mode)
- **[Auth demo]**
  - `Login` and `Signup` flows using localStorage. Signup collects company email, worker ID, phone (E.164), and DOB.
  - Dual OTP verification is simulated by showing OTPs on screen.
  - Allowed email domain defaults to `airlinecompany.com` (changeable).
- **[Onboarding]**
  - Stepper to collect name, airline, role, compliance authority, and metrics to track.
- **[Dashboard]**
  - Wellness score, mock wearable metrics, mood check‑in, history chart.
  - AI Insights demo container with What‑if mode (sliders for HR/Sleep/Score), presets, and Regenerate.
  - Gamification badges and demo controls to set healthy/stressed/critical states.
- **[Settings]**
  - Reads and updates name/email from `localStorage` profile created by login/signup.
  - Age placeholder derived from DOB (if provided). Photo upload is in‑memory for demo.
- **[Resources]**
  - Curated mental health content.
- **[Wearable]**
  - Demo wearable context and connection UI.

## Routes
- `/login` — demo login
- `/signup` — demo sign‑up with OTPs (on‑screen)
- `/onboarding` — guided setup (requires login)
- `/` — dashboard (requires login + onboarding)
- `/settings` — profile, privacy, devices
- `/resources` — content/resources
- `/wearable-setup` — wearable setup demo
- `*` — not found

## LocalStorage keys (demo)
- `aeromind_user` — profile fields (name, email, phone, workerId, dob, verification flags)
- `aeromind_logged_in` — "true" when logged in
- `aeromind_onboarded` — "true" after onboarding
- `aeromind_profile_photo` — optionally used for profile photo (not persisted by default in Settings)

To reset the demo quickly, clear these keys in DevTools or run in console:
```js
localStorage.removeItem('aeromind_user');
localStorage.removeItem('aeromind_logged_in');
localStorage.removeItem('aeromind_onboarded');
localStorage.removeItem('aeromind_profile_photo');
```

## Configuration
- **Allowed email domain** for signup: update `allowedDomain` in `src/pages/Signup.tsx`.
- This project is fully client‑side in demo mode; there is no backend.

## Available scripts
- npm run dev        — start dev server (hot reload)
- npm run build      — production build
- npm run preview    — serve built app locally
- npm run lint       — run ESLint

## Tech stack
- Vite (React + SWC)
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix UI)
- React Router v6
- TanStack Query (for future data needs)
- lucide-react (icons)

## Contributing
1. Create a feature branch: git checkout -b feat/your-feature
2. Commit changes with clear messages
3. Open a pull request for review

## License
Add your chosen license file (e.g., LICENSE) and update this section.
