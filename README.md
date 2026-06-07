# Coaching Directory — Strawman MVP

> **IMPORTANT:** For resuming this project later, **read `RESUME.md` first** (it is the single source of truth for current status, decisions, and next steps).

Master life coach (30 years) platform. Junior coaches get free listings + their own microsite at `/coach/[slug]`.

They self-manage via password-protected dashboard:
- Profile (bio, photo, specialties, contact)
- Basic offerings/services + rates
- Markdown blog posts on their page

You (owner) manage main-site blogs via admin GUI + oversee coaches.

**Phase 1 assumptions**: Free listings. No payments yet. Focus on fast MVP.

Domain for now: **testingzone.live** (will later move to something like mylifecoach.com).
Coach URLs: `https://testingzone.live/coach/jane-doe`

---

## Current Status (MVP in progress)

**See RESUME.md for the most detailed and up-to-date status, next steps, and resumption instructions.**

This project was initialized as a fully custom Next.js 15 + TypeScript + Tailwind app (per your preference).

**Key decisions locked in:**
- URLs: `/coach/[slug]`
- Includes basic Offerings/Services section
- Markdown for blogs (with preview)
- Fast MVP scope: directory, coach microsites, coach self-serve dashboard, your admin for main blogs + coach oversight.
- Deployment target: **Vercel** (see below)

---

## DreamHost Question — Answer

**Short answer: No, DreamHost (shared hosting) will not suffice for this strawman.**

Details from current research (2026):
- DreamHost Node.js support is **limited to VPS and Dedicated Servers only**. Shared hosting is PHP/Apache focused and cannot run a Next.js app (which requires a Node runtime for server-side rendering, API routes/server actions, auth sessions, database connections, etc.).
- On a DreamHost VPS you *can* self-manage Node.js (install via nvm, run with PM2, set up Nginx reverse proxy, handle SSL, process restarts, updates). It is possible but high-maintenance for a dynamic site.
- For a fast strawman/MVP with auth, user-generated content, rich dashboards, and frequent iteration, this is painful and not recommended.

**Recommended path (what we are building for):**
- Deploy the Next.js app to **Vercel** (free tier is excellent for this, automatic previews, great DX, edge caching).
- Database: Neon (free serverless Postgres) or Supabase — connect via `DATABASE_URL`.
- Your domain `testingzone.live` (registered/hosted at DreamHost) can be easily pointed at the Vercel deployment:
  - In Vercel project settings → Domains → add `testingzone.live` (and `www.`).
  - Update DNS at DreamHost: CNAME for apex/subdomain to Vercel's target, or switch nameservers if preferred.
  - You keep email, other services on DreamHost if wanted.
- Later (when moving to mylifecoach.com or similar): same process — zero code changes, just update the custom domain in Vercel.

This is the standard, low-ops way to run exactly this kind of Next.js directory + user content site in 2026. We can add a production build + deploy notes once the MVP has legs.

If you have a DreamHost VPS specifically and want to self-host later, we can add standalone output + Docker/PM2 instructions as a Phase 2 option. For now: Vercel + Neon.

---

## Tech Stack (Fully Custom Next.js)

- Next.js 15 (App Router, Server Actions, TypeScript)
- Tailwind + shadcn/ui components (clean professional UI)
- Prisma ORM + Postgres (Neon recommended for dev)
- Auth: Better Auth (lightweight, Prisma adapter, roles for coach vs admin) — or a simple credentials start if we want ultra-fast
- Markdown: `@uiw/react-md-editor` or custom split textarea + react-markdown preview (your preference)
- Images: Start with URL input; quick upgrade to Vercel Blob or Supabase Storage
- Search: Server-side filters + text search (Postgres to start)
- Deploy: Vercel

---

## Project Structure (MVP)

```
app/
  layout.tsx
  page.tsx                 # Homepage (your positioning + CTAs)
  directory/
    page.tsx               # Searchable coach directory
  coach/
    [slug]/
      page.tsx             # Public microsite
  blog/
    page.tsx
    [slug]/page.tsx
  dashboard/               # Coach self-serve (protected)
    page.tsx
  admin/                   # Your master controls (protected, role check)
    page.tsx
  login/
  signup/
lib/
  prisma.ts
  auth.ts (or better-auth config)
prisma/
  schema.prisma
components/
  (ui + coach cards, forms, md preview, etc.)
```

---

## Quick Start (After Node is Installed)

1. Make sure you have Node.js LTS installed (https://nodejs.org — download Windows installer, check "Add to PATH", restart PowerShell).
2. In this folder (`K:\Projects\Coaching thing`):

```powershell
npm install
```

3. Copy `.env.example` to `.env` and fill values (see below).

4. Run the dev server:

```powershell
npm run dev
```

Open http://localhost:3000

Later:
```powershell
npx prisma migrate dev
npx prisma studio   # nice DB browser
```

---

## Environment Variables (create .env)

```
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"   # Neon or Supabase connection string

# For auth (Better Auth or similar)
BETTER_AUTH_SECRET="generate-a-long-random-string-here"
BETTER_AUTH_URL="http://localhost:3000"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
# Later: https://testingzone.live

# When adding uploads
# BLOB_READ_WRITE_TOKEN=...   # Vercel Blob (optional for MVP)
```

Generate a secret: use `openssl rand -base64 32` or any long random value.

---

## MVP Feature Scope (Locked for Fast Delivery)

**Public**
- Homepage with your master positioning
- `/directory` — grid/list, search by name/bio, filter by specialties
- `/coach/[slug]` — microsite with:
  - Hero (photo, name, tagline, CTAs)
  - About/Bio (markdown rendered)
  - Specialties (pills)
  - Contact info
  - Offerings/Services (basic cards: title, desc, rate/duration)
  - Writings (their published posts)
- `/blog` + individual posts (your main site content, markdown)

**Coach Self-Serve (/dashboard after login)**
- Edit profile: name, slug (unique), bio (MD), photo URL (MVP), specialties (tag input), contact/booking links
- Manage Offerings: add/edit/delete structured items
- Manage own Posts: create/edit (MD editor + preview), publish/unpublish
- "Preview my page" button

**Your Admin (/admin — role protected)**
- Create/edit/publish your main blog posts (MD + preview)
- List all coaches, toggle published/featured, basic oversight

**Other MVP**
- Email/password signup + login (coaches + you as seeded admin)
- Role checks (coach can only touch own data)
- Seed script for demo coaches + your sample blog post
- Basic responsive, professional styling (fresh brand: calm, trustworthy)

Out for first cut: payments, advanced image uploads/cropping, per-coach theming, full-text search engine, moderation workflow, testimonials.

---

## Data Model (Prisma — Draft)

See `prisma/schema.prisma` (we will create/refine this next).

Rough entities:
- User (email, passwordHash, role: COACH | ADMIN)
- CoachProfile (1:1 with User, unique slug, bio, photoUrl, specialties[], ...)
- Offering (many to CoachProfile)
- Post (markdown content, belongs to coach or is main-site)

---

## Hosting & Domain Notes (Updated for Live Deployment)

- **Vercel** is the hosting platform (perfect for Next.js).
- **Neon** Postgres is the database (serverless, works great with Vercel).
- Custom domain: `testingzone.live` (we'll point it at Vercel).

### Deployment Steps (What We Just Did)
1. Push code to a GitHub repo.
2. Import the repo into Vercel (vercel.com).
3. Add Environment Variables in Vercel:
   - `DATABASE_URL` → Use the **pooled** connection string from Neon (the one that contains `-pooler` in the hostname — important for serverless).
   - `NEXT_PUBLIC_SITE_URL` → `https://testingzone.live`
4. Deploy.
5. Connect custom domain in Vercel → Settings → Domains.
6. Update DNS at your registrar (DreamHost) with the records Vercel gives you (usually an A record for the apex domain).
7. Run production migrations:
   ```bash
   npx prisma migrate deploy
   ```
   (with your production `DATABASE_URL`).

Vercel gives you a free `*.vercel.app` URL immediately for testing. The custom domain will work after DNS propagates (usually 5–60 minutes, sometimes longer).

### Useful Vercel Commands (optional)
```bash
npm i -g vercel
vercel
vercel --prod
```

Once the domain is connected, your partner can visit https://testingzone.live directly. SSL is automatic.

---

## Next Immediate Steps (for us)

1. You: Install Node.js LTS if you haven't (https://nodejs.org). Run `npm install` in this folder.
2. We scaffold the full project structure, Prisma schema, basic pages, auth stubs, forms.
3. Seed data + make `/coach/demo-coach` and directory work.
4. Iterate on dashboard + admin.
5. Deploy to Vercel + map testingzone.live.

Reply with:
- "Node installed, npm install done" (or paste any errors)
- Or any tweaks to scope/brand before we code the pages.

---

## Useful Commands (once set up)

```powershell
npm run dev
npm run build
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
```

---

This is your platform. Let's build the strawman fast and clean.

Questions or changes? Just say.