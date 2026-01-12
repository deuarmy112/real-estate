# Real Estate App

This repository contains a full-stack real estate application built with Next.js, inspired by Bazaraki CY. It allows users to browse, create, edit, and delete property listings with search, filtering, and pagination.

## Features
- **Frontend**: Next.js with React, styled with Tailwind CSS.
- **Backend**: Next.js API routes for serverless backend.
- **Database**: PostgreSQL for data storage.
- **Authentication**: JWT-based user auth.
- **Search & Filters**: Search by location, price range, property type.
- **Pagination**: Efficient listing pagination.
- **Deployment**: Hosted on Render with automatic builds.

## Tech Stack
- Next.js 13.5.11
- React 18
- Tailwind CSS
- PostgreSQL
- pg (PostgreSQL client)
- jsonwebtoken
- dotenv

## Quick Start (Local Development)

### Prerequisites
- Node.js 16.14+ (18 recommended)
- PostgreSQL database (local or cloud)

### Setup
1. **Clone the repo**:
   ```bash
   git clone https://github.com/deuarmy112/real-estate.git
   cd real-estate
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.local.example` to `.env.local` (if exists).
   - Set the following in `.env.local` or your environment:
     - `DATABASE_URL`: Your PostgreSQL connection string (e.g., `postgresql://user:pass@localhost:5432/realestate`).
     - `JWT_SECRET`: A secret key for JWT tokens.
     - `PORT`: Optional, defaults to 3000.

4. **Run database migration** (creates tables if needed):
   ```bash
   npm run migrate
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
- The app is deployed on Render.
- Build Command: `npm install && npm run migrate && npm run build`
- Start Command: `npm start`
- Set environment variables in Render: `DATABASE_URL`, `JWT_SECRET`, `NODE_VERSION=18`

## API Endpoints
- `GET /api/listings` - Fetch listings with optional search/filters/pagination.
- `POST /api/listings` - Create a new listing (auth required).
- `GET /api/listings/[id]` - Get a single listing.
- `PUT /api/listings/[id]` - Update a listing (auth required).
- `DELETE /api/listings/[id]` - Delete a listing (auth required).
- `POST /api/auth/login` - User login.
- `POST /api/auth/register` - User registration.

## Project Structure
- `pages/` - Next.js pages and API routes.
- `components/` - Reusable React components.
- `lib/` - Utility functions (DB, auth).
- `styles/` - Global CSS.
- `scripts/` - DB migration script.

## Next Steps
- Add image uploads for listings.
- Improve UI/UX and responsiveness.
- Add user profiles and favorites.
- Implement tests and CI/CD.

## License
MIT
