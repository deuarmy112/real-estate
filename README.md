# Real Estate App (Monorepo)

This repository contains a minimal full-stack scaffold for a real-estate application.

Services
- Backend: `backend` (Node + Express + TypeScript + Prisma)
- Frontend: `frontend` (React + Vite + TypeScript)
- Database: PostgreSQL via `docker-compose.yml`

Quick start (PowerShell)

```powershell
# 1) Start Postgres
docker-compose up -d

# 2) Backend
cd backend
npm install
# set DATABASE_URL in .env or copy .env.example
npx prisma generate
# optionally run migrations:
# npx prisma migrate dev --name init
npm run dev

# 3) Frontend (in a separate terminal)
cd ../frontend
npm install
npm run dev
```

Next steps
- Implement auth, listings CRUD, image uploads, and frontend UI.
- Add tests and CI.
