# Caelosphere Launchpad

> **Turn Your Startup Idea Into a Launch Plan**

An AI-powered startup operating system built with the MERN stack + Gemini 2.5 Flash.
Validates ideas, analyzes markets, discovers competitors, builds MVP roadmaps, generates branding, and creates launch strategies — all in one workspace.

---

## Project Structure

```
Caelosphere Launchpad/
├── client/          ← React + Vite + Tailwind (frontend)
└── server/          ← Express + MongoDB + Gemini (backend)
```

---

## Quick Start

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas — paste your full connection string here
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/caelosphere?retryWrites=true&w=majority&appName=Cluster3

# JWT — generate with: openssl rand -hex 32
JWT_SECRET=your-64-char-random-hex-secret

JWT_EXPIRES_IN=7d

# Frontend origin for CORS
CLIENT_URL=http://localhost:5173

# Gemini API key from https://aistudio.google.com
GEMINI_API_KEY=AIzaSy...
```

Then start the backend:

```bash
npm run dev
# → ✅ MongoDB connected
# → 🚀 Caelosphere Launchpad API running on port 5000
```

### 2. Frontend Setup

```bash
cd client
npm install
```

The frontend `.env` is already committed (it's public config, no secrets):

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
# → Local: http://localhost:5173/
```

Open `http://localhost:5173` in your browser.

---

## How to Use

1. **Register** an account at `/register`
2. **Create a startup** via the 5-step Launchpad wizard (Sidebar → Launchpad)
3. **Watch the AI** analyze your idea — Gemini runs 7 parallel generators:
   - Idea Validation + Score
   - Competitor Analysis + Positioning Map
   - SWOT Analysis
   - Lean Canvas (9 blocks)
   - MVP Planner with Prioritization Matrix
   - Branding Studio (names, taglines, colors, logo prompt)
   - Launch Roadmap (4 phases with milestones + KPIs)
4. **Explore your workspace** — each tab shows real AI-generated content specific to your startup
5. **Export** your report as Markdown or PDF (Export button, top-right of workspace)
6. **Ctrl+K** anywhere in the dashboard to search projects and navigate fast

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Recharts |
| Routing | React Router DOM (HashRouter) |
| Backend | Node.js, Express.js, ES Modules |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| AI | Google Gemini 2.5 Flash (`@google/genai` SDK) |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas |

---

## API Reference

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Login, get JWT |
| GET | `/api/auth/me` | ✅ | Current user |
| GET | `/api/projects` | ✅ | List all projects |
| POST | `/api/projects` | ✅ | Create project |
| GET/PUT/DELETE | `/api/projects/:id` | ✅ | Read/update/delete |
| GET | `/api/reports/:projectId` | ✅ | Get saved report |
| POST | `/api/reports/:projectId/analyze` | ✅ | Run full AI analysis |
| GET/PUT | `/api/workspaces/:projectId` | ✅ | Workspace state |
| GET | `/api/health` | — | Health check |

---

## Deployment

### Frontend → Vercel

```bash
cd client
npm run build
# Deploy the dist/ folder to Vercel
# Set environment variable: VITE_API_URL=https://your-backend.onrender.com/api
```

### Backend → Render

1. Push `server/` folder to a GitHub repo
2. Create a new **Web Service** on Render, point to that repo
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add all `.env` variables in Render's Environment tab
6. Set `CLIENT_URL` to your Vercel deployment URL

### Database → MongoDB Atlas

Already set up. Just make sure:
- `0.0.0.0/0` is in Network Access (or add Render's static IPs)
- Your `MONGO_URI` has `/caelosphere` as the database name

---

## Common Issues

| Problem | Fix |
|---|---|
| `querySrv ECONNREFUSED` on Windows | Already fixed in `src/config/db.js` via `dns.setServers(["8.8.8.8","8.8.4.4"])` |
| `MONGO_URI not set` warning | Open `server/.env` and paste your real connection string |
| `JWT_SECRET=JWT_SECRET=...` double prefix | Delete the first `JWT_SECRET=` — a copy-paste error |
| Gemini `invalid JSON` error | The model occasionally adds markdown fences — already stripped in the service layer |
| Nav links scroll to wrong place on deployed site | Already fixed — uses `scrollIntoView()` not `href="#id"` (HashRouter compatible) |

---

## Development Roadmap Completed

| Stage | Description | Status |
|---|---|---|
| 1 | Product Foundation (PRD + Design System) | ✅ |
| 2 | Complete Frontend UI (all pages, dummy data) | ✅ |
| 3 | Backend Architecture (Express + REST APIs) | ✅ |
| 4 | MongoDB Integration (all 4 models) | ✅ |
| 5 | Authentication (JWT + bcrypt + protected routes) | ✅ |
| 6 | Gemini AI Integration (all 7 generators) | ✅ |
| 7 | Workspace Persistence (reports saved to MongoDB) | ✅ |
| 8 | Export System (Markdown + PDF) | ✅ |
| 9 | SaaS Polish (toasts, skeletons, Ctrl+K palette, copy buttons) | ✅ |
| 10 | Deployment | ⏳ Deploy to Vercel + Render |

---

## Resume Description

> Developed **Caelosphere Launchpad**, a full-stack AI-powered startup operating system that transforms business ideas into validated launch strategies. Features automated market analysis, competitor research with positioning maps, SWOT analysis, Lean Canvas generation, MVP planning with prioritization matrices, branding studio with AI-generated names/colors/logo prompts, and 4-phase launch roadmaps. Built with React, Tailwind CSS, Node.js, Express, MongoDB Atlas, Gemini 2.5 Flash, JWT authentication, and deployed on Vercel + Render.

