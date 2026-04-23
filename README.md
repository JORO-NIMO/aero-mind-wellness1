# AeroMind Wellness

A modern pilot wellness demo web app built with Vite, React, TypeScript, Tailwind, and shadcn/ui.
It includes demo authentication, onboarding, dashboard analytics, AI-style insights, wellness exercises,
resources, and settings. Data is demo-only and stored in browser localStorage.

## Key features
- Dashboard: wellness score, wearable metrics (mock), mood check-in, insights, badges, and history
- Breathing exercise: interactive inhale/hold/exhale flow with timers
- Resources: crisis contacts, self-help tools, educational content, and support flows
- Onboarding: guided setup with compliance and metrics preferences
- Settings: profile, notifications, privacy, wearable connection controls
- Wearable setup flow: connect or skip and continue to dashboard

## Quick start (Windows)

Prerequisites
- Node.js 18+
- npm

Steps
```powershell
# 1) Clone the repo
git clone https://github.com/JORO-NIMO/aero-mind-wellness1.git

# 2) Enter the project folder
cd aero-mind-wellness1

# 3) Install dependencies
npm install

# 4) Start the dev server
npm run dev
```

Open:
- http://localhost:5173

Note: Vite defaults to port 5173. Follow terminal output if another port is used.

## Routes
- `/` - public landing page with AeroMind story and product journey
- `/login` - demo login
- `/signup` - demo sign-up with on-screen OTP simulation
- `/onboarding` - guided setup
- `/dashboard` - pilot dashboard
- `/settings` - profile and preferences
- `/resources` - support and learning resources
- `/wearable-setup` - wearable setup demo

## LocalStorage keys (demo)
- `aeromind_user`
- `aeromind_logged_in`
- `aeromind_onboarded`
- `aeromind_profile_photo`

Reset demo state in browser console:
```js
localStorage.removeItem('aeromind_user');
localStorage.removeItem('aeromind_logged_in');
localStorage.removeItem('aeromind_onboarded');
localStorage.removeItem('aeromind_profile_photo');
```

## Project structure (high level)
- `src/pages` - route pages (dashboard, auth, onboarding, resources, settings)
- `src/components` - feature components and shared UI
- `src/contexts` - app state providers (wearable context)
- `src/hooks` - reusable hooks
- `public` - static assets

## Available scripts
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Tech stack
- Vite (React + SWC)
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix UI)
- React Router v6
- TanStack Query
- lucide-react

## Contributing
1. Create a feature branch: `git checkout -b feat/your-feature`
2. Commit changes with clear messages
3. Open a pull request

## License
No formal license file has been added yet.
