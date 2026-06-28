# Caelosphere Launchpad — Backend (Stage 3: Backend Architecture)

Express + MongoDB API structure, built per the roadmap's "Do not connect Gemini yet" rule.
This is architecture only — routes, controllers, models, and middleware exist and run,
but the database connection and AI integration are optional/stubbed until later stages.

## Setup

```bash
npm install
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm run dev
```

The server boots even with `MONGO_URI` empty — it'll just warn and skip the DB
connection (useful for testing routing/middleware before Stage 4).

## Folder structure

```
backend/
├── server.js
├── .env.example
└── src/
    ├── config/        # env.js, db.js (Mongo connection)
    ├── controllers/    # auth, project, report, workspace
    ├── routes/         # /api/auth, /api/projects, /api/reports, /api/workspaces
    ├── models/         # User, Project, Report, Workspace, Chat (Mongoose schemas)
    ├── middleware/      # auth (JWT protect), errorHandler
    ├── services/        # gemini.service.js — stub only, wired in Stage 6
    └── utils/           # asyncHandler, ApiError, token helpers
```

## Routes implemented

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | – | Create account |
| POST | `/api/auth/login` | – | Log in, get JWT |
| POST | `/api/auth/logout` | – | Stateless logout |
| GET | `/api/auth/me` | ✅ | Current user |
| GET | `/api/projects` | ✅ | List user's projects |
| POST | `/api/projects` | ✅ | Create project |
| GET/PUT/DELETE | `/api/projects/:id` | ✅ | Read/update/delete a project |
| GET/POST | `/api/reports/:projectId` | ✅ | Read or upsert a project's report |
| GET/PUT | `/api/workspaces/:projectId` | ✅ | Read or update a project's workspace state |
| GET | `/api/health` | – | Health check |

## Stage roadmap reminder

- ✅ Stage 3 — Backend architecture (this)
- ⏳ Stage 4 — MongoDB Atlas integration (models are ready, just add `MONGO_URI`)
- ⏳ Stage 5 — Auth hardening (JWT flow scaffolded, refine session handling)
- ⏳ Stage 6 — Gemini AI integration (`src/services/gemini.service.js` is stubbed, not implemented)
- ⏳ Stage 7+ — Workspace persistence, exports, polish, deployment

Per the plan: **do not implement `gemini.service.js` until Stages 3–5 are fully solid.**
