# Aero Mind Wellness

A lightweight web app for tracking and improving mental wellness. Includes user settings, wearable integration, and a dashboard page with vetted mental health links.

## Quick start (Windows)

Prerequisites
- Node.js 18+ (recommended)
- npm (bundled with Node)

Steps
```powershell
# 1. Clone the repo
git clone <YOUR_GIT_URL>

# 2. Enter the project folder
cd aero-mind-wellness

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open the app in your browser at:
http://localhost:5173

(Vite default dev port is 5173; if your project uses a different port, follow the terminal output.)

## Project structure (important files)
- src/
  - pages/
    - Settings.tsx          — settings and wearable integration UI
    - Resources.tsx         — mental health resources page (add if needed)
  - components/             — shared UI components (Sidebar, Avatar, etc.)
  - App.tsx / main.tsx      — router and app bootstrap
- public/                   — static assets

## Adding the Resources page (example)
1. Create src/pages/Resources.tsx (React + TypeScript).
2. Add a route in your router (App.tsx):
```tsx
// ...existing code...
import Resources from "@/pages/Resources";

<Routes>
  {/* ...other routes */}
  <Route path="/resources" element={<Resources />} />
</Routes>
```
3. Add a link in your Sidebar or navigation to /resources.

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

## Contributing
1. Create a feature branch: git checkout -b feat/your-feature
2. Commit changes with clear messages
3. Open a pull request for review

## License
Add your chosen license file (e.g., LICENSE) and update this section.
