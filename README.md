# Saztik — Digital Creative Studio

Public site + internal hunt pipeline (`/studio`) for Saztik.

- **Site:** https://saztik.com  
- **Contact:** info@saztik.com  
- **Stack:** Next.js 16 · React 19 · Tailwind 4 · Drizzle · PostgreSQL

---

## Install on your laptop (Windows / Mac / Linux)

### 1. Install tools (once)

| Tool | Download |
|------|----------|
| **Node.js 20+** (LTS) | https://nodejs.org |
| **Git** (optional) | https://git-scm.com |
| **Docker Desktop** (easiest Postgres) | https://www.docker.com/products/docker-desktop |

Check:

```bash
node -v    # should show v20 or v22
npm -v
```

### 2. Open the project folder

```bash
cd path/to/saztik-studio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Environment file

```bash
cp .env.example .env
```

Edit `.env` if needed. Defaults work with the Docker command below.

### 5. Start PostgreSQL (recommended)

```bash
docker run --name saztik-pg \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=saztik \
  -p 5432:5432 \
  -d postgres:16
```

Create tables:

```bash
npm run db:push
```

> Without Postgres the public site still shows seed portfolio data, but the contact form and `/studio` CRM need the database.

### 6. Run the app

```bash
npm run dev
```

Open:

- Site: http://localhost:5173 or http://localhost:3000  
- Studio CRM: http://localhost:3000/studio  
  - Default passcode from `.env` → `STUDIO_PASSCODE`  
  - If unset in code fallback is weak; always set your own.

### 7. Useful commands

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # run production build
npm run db:push      # sync schema to Postgres
npm run db:studio    # visual DB browser
npm run lint
npm run typecheck
```

---

## Production checklist

1. Set a strong `STUDIO_PASSCODE`
2. Use a real managed Postgres `DATABASE_URL` (Neon, Supabase, Railway, …)
3. Deploy (Vercel / Railway / VPS) with both env vars
4. Point domain to the deployment
5. Confirm form submissions appear under `/studio` → Inquiries

---

## Project map

```
src/app/(site)/     public pages (home, work, services, process, start-a-project)
src/app/studio/     internal CRM UI
src/app/api/        inquiries + studio leads API
src/components/     site + studio components
src/db/             Drizzle schema & queries
src/lib/            copy, scoring, seed data, auth helpers
```

Contact for clients: **info@saztik.com**
