# RESUME.md — Coaching Directory Project (CRITICAL — READ THIS FIRST)

**Project Name:** Coaching Directory (Strawman → Production)  
**Domain (current):** testingzone.live  
**Permanent domain (future):** something like mylifecoach.com  
**Coach URLs:** `https://testingzone.live/coach/[slug]` (e.g. `/coach/jane-doe`)  
**Importance:** This is a **very important personal project** for a master life coach with 30 years of experience. Treat it with care, clarity, and high quality.

---

## How to Resume This Session (Copy This)

When you restart Grok in the project folder, **immediately** tell the agent:

> "Read the RESUME.md file in full (especially the Current Status, Next Steps, and Key Decisions sections). Then read README.md. Tell me the current state of the project and exactly what we should do next. We are resuming after initialization."

Alternative strong prompts:
- "Continue the coaching directory. Start by reading RESUME.md completely."
- "We left off after creating the strawman. Read RESUME.md and propose the next concrete steps."
- "Status check: read RESUME.md and list what is done vs. what needs to be done right now."

---

## Project Vision (From Original User Request)

The user is a **master life coach with 30 years of experience**. They want to create and host a dynamic website where more junior life coaches can:

- Be listed in a searchable public directory (for free in Phase 1).
- Get their own professional microsite at a clean URL (`/coach/their-slug`).
- On their microsite they can:
  - Personalize content (bio, photo, specialties, etc.)
  - Advertise their offerings and rates
  - Post their own blogs / articles
- Have a **password-protected web-based GUI** (dashboard) so they can self-administer everything without technical help.
- As the site owner (master coach), they need an easy way (ideally GUI) to post blogs on the **main site**.

**Phase 1 rule (explicitly stated):** Omit all payment/onboarding fee logic for now. Assume listings are free. We can tackle monetization in Phase 2.

**User answers from earlier:**
- Tech preference: **Fully custom code** (Next.js + database + custom admin UI). Not WordPress, not no-code.
- Branding: Starting fresh — no strong existing brand assets yet.
- Timeline: Wants a **Fast MVP** (2-6 weeks target for something usable).
- Must-haves for coach microsites in Phase 1: Professional bio/about + photo + specialties/tags + contact info. (We also included basic Offerings because it was core to the original request.)
- Content editing: Markdown is acceptable (with preview) for blogs.

Tone: Professional, calm, trustworthy, premium but warm. The master coach should feel like the curator/authority figure.

---

## Current Status (As of Last Session)

**Overall:** The project has been **initialized with a high-quality visual strawman**. All major pages exist and look/feel realistic. This is **not** just a blank Next.js app — it is a working demo of the core user experiences.

### What Is Done (Completed in Initialization)

- Full Next.js 15 + TypeScript + Tailwind v4 project scaffolded
- Professional homepage with strong positioning for the master coach
- `/directory` page with searchable-looking coach cards (hardcoded samples)
- **Fully functional coach microsite** at `/coach/jane-doe`:
  - Hero with photo, name, title, contact CTAs
  - About/Bio section (supports multiline)
  - Specialties as pills
  - **Offerings & Rates section** (multiple cards with title, description, and rate — this directly fulfills the user's request)
  - Writings section (stub)
- Main site blog at `/blog` + individual post view
- Coach signup and login pages (form stubs that navigate to dashboard)
- **Coach Dashboard** (`/dashboard`):
  - Profile editing form (name, title, bio, specialties)
  - Offerings manager (add/view stub)
  - Writings manager stub
  - "Preview my page" link
- **Master Admin** (`/admin`):
  - Section for creating main-site blog posts
  - Basic coach management list (publish/unpublish/approve)
- Prisma schema fully defined (`prisma/schema.prisma`)
- Seed script created (`prisma/seed.ts`) that creates:
  - Master admin user
  - Sample coach (Jane Doe)
  - Sample offerings
  - Sample main-site blog post
- Detailed README.md with vision, tech decisions, DreamHost answer, etc.
- This RESUME.md file (created to protect continuity on this important project)
- .env.example, .gitignore, next.config.ts, tsconfig.json, postcss, globals.css all set up
- Sample images via Unsplash (for demo purposes only)

### What Is NOT Done Yet (Strawman State)

- No real database connection working yet (Prisma is defined but not migrated/installed)
- No real authentication (logins are fake — just form navigation)
- No real data persistence (everything is hardcoded in the page files)
- No actual coach signup flow that creates real users/profiles
- No rich Markdown editor yet (just textareas)
- No image upload (only URL paste or hardcoded)
- No search/filter functionality that actually works (UI only)
- No protected routes / real role-based access (coach vs admin)
- No seed command has been run
- `npm install` has not been executed by the user yet
- No deployment (local only)
- No real coach self-service editing that saves to DB

**Summary:** We have an excellent **visual and UX prototype** that lets the user (and future coaches) click around and understand the product. The hard engineering (auth, database, real CRUD, dashboards that actually save) is the next phase.

---

## Project Folder Structure (Important Files)

```
K:\Projects\Coaching thing\
├── RESUME.md                 ← YOU ARE HERE — always read this first on restart
├── README.md                 ← High-level vision + setup instructions
├── package.json
├── next.config.ts
├── prisma/
│   ├── schema.prisma         ← Core data model (read this)
│   └── seed.ts               ← Creates initial data
├── app/
│   ├── layout.tsx
│   ├── page.tsx              ← Homepage
│   ├── directory/page.tsx    ← Public coach directory
│   ├── coach/[slug]/page.tsx ← The actual microsite (critical UX)
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── dashboard/page.tsx    ← Coach self-admin (most important GUI)
│   └── admin/page.tsx        ← Master coach controls
├── app/globals.css
└── .env.example
```

---

## Prisma Data Model (Current Schema)

See `prisma/schema.prisma` for the exact code. High-level:

- **User** — email + passwordHash + role (COACH or ADMIN)
- **CoachProfile** — 1:1 with User. Contains slug (unique, used in URL), displayName, title, bio (markdown), photoUrl, specialties (string[]), contact fields, isPublished, isFeatured
- **Offering** — repeatable per coach (title, description, rate, duration, sortOrder)
- **Post** — used for both coach writings AND main-site blogs. If `coachProfileId` is null → main site post. Has title, slug, content (markdown), isPublished

This model supports:
- Multiple coaches each owning their own content
- One master admin
- Offerings as structured data (not free text)
- Blogs for both coaches and the owner

---

## Key Decisions & Constraints (Do Not Change Without Discussion)

1. **Tech Stack:** Fully custom Next.js 15 (App Router) + Prisma + Postgres. No Payload CMS, no WordPress, no Bubble/Softr.
2. **Coach URLs:** Must be `/coach/[slug]` (clean, matches user's explicit example).
3. **Phase 1 Scope:** Free listings only. No payment logic, no Stripe, no subscription status.
4. **Content Editing:** Markdown + preview is acceptable (user preference). We can upgrade to TipTap/WYSIWYG later if needed.
5. **MVP Speed:** User wants something usable quickly. Prioritize working flows over perfect polish initially.
6. **Hosting:** Vercel for the app + Neon (or Supabase) Postgres. DreamHost shared hosting is **not suitable** (documented in README).
7. **Branding:** Starting fresh. Use calm, trustworthy, professional design (deep navy + sage accents currently in CSS variables).
8. **Quality Bar:** Because this is important to the user, aim for clean code, good UX, and clear documentation.

---

## User Context (Important for Tone & Prioritization)

- User is a **master life coach** with 30 years experience — position them as the authority/curator on the site.
- They were feeling nervous about starting a big project and continuity.
- This is personal and meaningful — quality and clarity matter.
- They want junior coaches to feel supported and professional.
- Fast progress is desired, but they want to understand where we are at every step.

When making suggestions, be reassuring, clear, and break things into small, concrete next actions.

---

## Immediate Next Steps (Prioritized — Do These First When Resuming)

1. **User Action (required before anything else):**
   - Install Node.js LTS from https://nodejs.org (if not already installed)
   - In PowerShell, navigate to the folder and run:
     ```powershell
     npm install
     ```
   - Then:
     ```powershell
     copy .env.example .env
     ```

2. **Verify the strawman runs:**
   ```powershell
   npm run dev
   ```
   Visit:
   - http://localhost:3000
   - http://localhost:3000/coach/jane-doe (show this to the user — it's the core deliverable)
   - http://localhost:3000/directory
   - http://localhost:3000/dashboard
   - http://localhost:3000/admin

3. **Set up the database (first real engineering step):**
   - Create a free Neon.tech Postgres project (recommended) or Supabase.
   - Add the connection string to `.env` as `DATABASE_URL`
   - Run:
     ```powershell
     npx prisma generate
     npx prisma migrate dev --name init
     npx prisma db seed   # or npm run db:seed
     ```

4. **Replace strawman data with real DB reads** (start with the coach microsite and directory).

5. **Add real authentication** (Better Auth or simple session-based with role checks).

6. **Make the coach dashboard actually save data** (profile + offerings + posts).

7. **Implement basic search/filter** on the directory.

---

## Suggested Roadmap After the Above

**Phase 1 MVP (Fast & Usable)**
- Working coach signup that creates real profile + slug
- Real login that protects /dashboard and /admin
- Coach can edit their profile, offerings, and write markdown posts that appear on their public page
- Master admin can publish/unpublish coaches and create main-site blog posts
- Decent search + filters on /directory
- Basic image URL support (later: real uploads)
- Deploy to Vercel + connect testingzone.live

**Phase 1.5 Polish**
- Better Markdown editor with live preview
- Improved UI/UX and mobile experience
- Seed more realistic sample coaches
- Onboarding copy and empty states
- Simple "featured" logic

**Phase 2 (Later)**
- Payment / subscription system for listings
- More advanced coach customization
- Analytics, testimonials, booking embeds, etc.
- Domain change to permanent brand
- Production hardening

---

## Common Pitfalls & Things to Remember

- Do **not** start building payments yet (user was explicit).
- Keep the coach experience extremely simple — many junior coaches are not technical.
- The master coach (user) should feel powerful in the /admin area.
- Always keep the `/coach/[slug]` experience as the hero of the product.
- When showing progress, prioritize letting the user click through the actual flows.
- Document everything — this project may grow over years.

---

## If the Agent Seems Confused on Restart

Tell it:
> "You are in the middle of building an important coaching directory platform. Read RESUME.md in full before doing anything else. Do not start coding until you have summarized the current status back to me."

This file exists precisely because the user cares deeply about this project and wants reliable continuity.

---

## Final Notes

- All work is saved in the folder. Nothing is lost when closing the window.
- The strawman we built is already impressive and demonstrates the core value (own microsite + offerings + self-serve feel).
- Take it one clear step at a time when you return.
- You can always ask the agent to re-read this file.

**You are doing something meaningful.** This platform can genuinely help rising coaches while leveraging your 30 years of wisdom.

---

**Last updated:** During the session where the full strawman + Prisma schema + RESUME.md were created.

**Next action for user:** Run `npm install` when ready, then come back and say “Continue from RESUME.md”.

Welcome back whenever you're ready. The project is waiting in a clean, well-documented state.
