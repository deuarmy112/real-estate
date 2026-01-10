# Real Estate — Bazaraki-style Clone

Minimal Next.js + Tailwind starter for a Bazaraki-like real estate site.

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables (copy `.env.local` and fill in):

```bash
cp .env.local.example .env.local
# Edit .env.local with your DATABASE_URL and JWT_SECRET
```

3. Initialize database (optional, runs automatically on API calls):

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

### Render (recommended)

1. Connect your GitHub repo to Render.
2. Set build command: `npm run migrate && npm run build`
3. Set start command: `npm start`
4. Add environment variables in Render dashboard.

Health check: Visit `/api/health` after deploy to verify DB connection.

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
