# AeroMind Wellness

A modern mental wellness assistant for pilots. Track key metrics (mock wearable), get insights, practice guided exercises, discover resources, and manage preferences. The UI now includes subtle animations and interactive sessions to feel more intuitive and alive.

## Key features
- Dashboard
  - Wellness score, wearable metrics (mocked), mood check-in, AI insights, badges, history chart
  - Quick actions: Refresh data, launch Breathing Exercise modal
  - Smooth page and section reveal animations
- Breathing Exercise (interactive)
  - Animated circle, inhale/hold/exhale phases with timers
  - Can be launched from Dashboard or Resources (Start Session)
- Resources
  - Crisis resources by country (driven by onboarding compliance: UCAA/KCAA/TCAA)
  - Self-help tools: Breathing, Progressive Muscle Relaxation, Mindfulness (with demo audio), Gratitude Journal (inline editor + downloadable template)
  - Educational content: video (embedded demo), podcast (embedded demo audio), and downloadable article files
  - Professionals: message or book appointments (mock flows)
  - Support groups: join (mock flow)
- Onboarding
  - 5-step guided setup including personal details, regulatory compliance, and metrics selection
  - Persists profile to localStorage and routes to dashboard
- Settings
  - Profile management (photo upload), notifications, privacy/data
  - Wearable devices connection (mock), live data indicator, connect/disconnect controls
  - Video consultation modal demo with call timer and media controls
- Wearable setup flow
  - Lightweight page to connect or skip, then route to dashboard

## Quick start (Windows)

Prerequisites
- Node.js 18+
- npm (bundled with Node)

Steps
```powershell
# 1) Clone the repo
git clone <YOUR_GIT_URL>

# 2) Enter the project folder
cd aero-mind-wellness

# 3) Install dependencies
npm install

# 4) Start the dev server
npm run dev
```

Open the app in your browser at:
http://localhost:5173

Note: Vite defaults to port 5173. Follow the terminal output if a different port is selected.

## Project structure (high-level)
- src/
  - pages/
    - Index.tsx             — dashboard (score, insights, badges, history, breathing)
    - Onboarding.tsx        — 5-step onboarding (persists to localStorage)
    - Settings.tsx          — profile, notifications, privacy, wearable, video consult demo
    - Resources.tsx         — crisis support, tools (audio + journal), content (video/podcast/article), pros, groups
    - WearableSetup.tsx     — quick wearable connection flow
    - NotFound.tsx          — 404
  - components/
    - BreathingExercise.tsx — interactive breathing modal with phases and timer
    - WellnessScore.tsx, WearableData.tsx, MoodCheckIn.tsx, AIInsights.tsx, HistoryChart.tsx, GamificationBadges.tsx
    - Sidebar.tsx, AlertBanner.tsx, and ui/* shadcn components
  - contexts/
    - WearableContext.tsx   — mock wearable connection state
  - hooks/
    - use-toast.ts          — toasts
  - App.tsx / main.tsx      — router and app bootstrap
- public/                   — static assets (favicons, placeholder, robots)

## Usage tips
- First run will redirect to Onboarding if not completed
- After onboarding, the Dashboard loads with mock data. Use the top bar actions or Demo controls to simulate different states
- Breathing exercise can be launched from the Dashboard or from Resources > Self-Help Tools > Breathing Exercises > Start Session
- In Resources:
  - Video and podcast entries open an embedded player
  - Articles offer a small downloadable file for offline reading (demo)
  - Gratitude Journal allows writing and saving an entry, plus downloading a template
  - Professionals support message/booking dialogs (demo)

## Animations and interactivity
- Subtle fade/slide-in on page mount for key sections
- Button hover/press transitions for tactile feedback
- Live timers and playback controls in modals where applicable

## Available scripts
- npm run dev        — start dev server (hot reload)
- npm run build      — production build
- npm run preview    — serve built app locally

## Tech stack
- Vite
- React + TypeScript
- Tailwind CSS
- shadcn/ui (component primitives)
- lucide-react (icons)

## Roadmap ideas
- Persist gratitude entries and session history
- Real wearable integrations (Bluetooth/API)
- Auth + secure backend for profiles and bookings

## Contributing
1. Create a feature branch: git checkout -b feat/your-feature
2. Commit changes with clear messages
3. Open a pull request for review

## License
Add your chosen license file (e.g., LICENSE) and update this section.
