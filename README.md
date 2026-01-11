# Real Estate — Bazaraki-style Clone

Minimal Next.js + Tailwind starter for a Bazaraki-like real estate site.

## Project Structure
- `frontend/`: Next.js app
- Root: Deployment configs, README

## Getting started

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Set up environment variables (copy `.env.local` and fill in):

```bash
cp frontend/.env.local.example frontend/.env.local
# Edit frontend/.env.local with your DATABASE_URL and JWT_SECRET
```

3. Initialize database (optional, runs automatically on API calls):

```bash
cd frontend
npm run migrate
```

4. Run development server:

```bash
cd frontend
npm run dev
```

Open http://localhost:3000 in your browser.

```bash
npm run migrate
```

4. Run development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Deployment

### Environment Variables

Set these in your hosting dashboard (e.g., Render, Vercel):

- `DATABASE_URL`: PostgreSQL connection string (include `?sslmode=require` for Render)
- `JWT_SECRET`: Random string for JWT signing (e.g., `openssl rand -base64 32`)

If DB is not available, the app will use mock data for GET requests and still build/deploy successfully.

### Render (recommended)

1. Connect your GitHub repo to Render.
2. For the **frontend service**, set:
   - Build Command: `cd frontend && npm run migrate && npm run build`
   - Start Command: `cd frontend && npm start`
3. For the **backend service** (if separate), configure accordingly.
4. Add environment variables in Render dashboard.

Health check: Visit `/api/health` after deploy to verify DB connection.

If DB is unavailable, GET requests return mock data, allowing the app to run in demo mode.

### Vercel

1. Connect repo to Vercel.
2. Add environment variables in Vercel dashboard.
3. Vercel runs `npm run build` automatically; add a build hook if needed to run migration.

## What I created

- Basic Next.js app scaffold
- Tailwind CSS setup (`tailwind.config.js`, `postcss.config.js`)
- `pages/index.js`, dynamic `pages/listings/[id].js`
- Simple components: `components/Header.js`, `components/ListingCard.js`
- API routes: `/api/listings`, `/api/listings/[id]`, `/api/auth/login`, `/api/health`
- DB helpers: `lib/db.js`, `lib/auth.js`
- Migration script: `scripts/init-db.js`
- Features: Listings CRUD, search/filters, pagination, auth

## Next steps

- Add image uploads (local or cloud)
- Polish UI/UX and accessibility
- Add user accounts and profiles
- Deploy and test in production
