# Deploying to Render

This repository is prepared to deploy both the backend (Node + Prisma) and the frontend (Vite static site) to Render using `render.yaml`.

Quick steps:

1. Push this repository to GitHub (or connect your Git provider).
2. In Render dashboard choose **New > Import from Git** and select this repo. Render will read `render.yaml` and create two services:
   - `real-estate-backend` (web service, Node)
   - `real-estate-frontend` (static site)

3. Configure environment variables for the backend service in Render:
   - `DATABASE_URL` = use the External Database URL from your Render Postgres (already shown in the dashboard)
   - `JWT_SECRET` = a random secret value

4. After `real-estate-backend` deploys, copy its published URL (for example `https://real-estate-backend.onrender.com`) and set it in the frontend service environment:
   - `VITE_API_URL` = `https://<your-backend>.onrender.com`

5. Redeploy the frontend service (it will use the `VITE_API_URL` at build time).

Notes & recommendations:
- The backend `releaseCommand` runs Prisma client generation and attempts to deploy migrations; it falls back to `db push` if migrations are not configured. It also runs the seed script. If your project requires a different migration strategy, edit `render.yaml`.
- The `VITE_API_URL` must be set in the Render UI for the static site so the frontend is built with the correct backend URL.
- If you prefer to create services manually in the Render UI, use the build/start commands defined in `render.yaml`.

If you want, provide the Git repo URL and I can verify the render config or prepare a short pull request to tweak anything before you connect it to Render.
