# Project CRUD (MERN)

Simple CRUD app:
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Frontend:** React + TypeScript + Vite

## Folder structure

```
project_crud/
  backend/
    server.js                 # entrypoint (loads src/index.js)
    src/
      index.js                # connect DB + start server
      app.js                  # express app + routes + middleware
      config/
        env.js                # env validation/config
        db.js                 # mongoose connection helper
      controllers/
        projectController.js
      middleware/
        errorHandler.js
      models/
        Project.js
      routes/
        healthRoutes.js
        projectRoutes.js
  frontend/
```

## Setup

### Backend

1) Install deps:
```bash
cd backend
npm install
```

2) Configure env:
```bash
cp .env.example .env
```

Env vars (`backend/.env`):
- `PORT` (default `5000`)
- `MONGODB_URI` (required)
- `CLIENT_URL` (default `http://localhost:5173`)

3) Run:
```bash
npm run dev
```

### Frontend

1) Install deps:
```bash
cd frontend
npm install
```

2) Configure env:
```bash
cp .env.example .env
```

Env vars (`frontend/.env`):
- `VITE_API_URL` (default `http://localhost:5000/api`)

3) Run:
```bash
npm run dev
```

## API

Base URL: `http://localhost:5000/api`

- `GET /health` → `{ ok: true }`
- `GET /projects` → list projects (newest first)
- `POST /projects` → create project
- `PUT /projects/:id` → update project
- `DELETE /projects/:id` → delete project

Project fields:
- `title` (string, required)
- `description` (string, required)
- `status` (`pending` | `in-progress` | `complete`)
- `techStack` (string[], optional, example: `["react","node","mongodb"]`)
