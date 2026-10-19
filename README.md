# BuildSoftTech

Parent website of **BuildSoftTech** — Research · Publication · Training · Technology.
Sister site of [IJEPA](https://ijepa.vercel.app/) (International Journal of Engineering Practices and Applications), which BuildSoftTech publishes. Both sites share the same design language; this one uses an orange/beige palette, IJEPA uses blue/white.

## Stack

- Next.js 14 (App Router) + React 18 — frontend only for now; API routes can be added later for the backend
- Tailwind CSS 4 (`src/app/globals.css`) with the design from the Lovable project github.com/adityapatil-air/research-hub-next: warm paper background, navy ink, saffron accent, Fraunces headings over Work Sans. Shared page blocks live in `src/components/ui.jsx`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in .next/
npm start        # serve the production build
```

Deploy to Vercel as a Next.js project (auto-detected, no extra config).

## Admin panel

Sign-in is Supabase Auth for everyone (`/login`, `/register`). The admin is any profile with `role = 'admin'`; `/admin` and `/admin/*` require that role. From `/admin` the client edits the internship fee / duration / mode / next batch, the course list, the SCI/Scopus research-topic table, package fees and contact details, and (in progress on `dev`) manages courses, recordings, resources, internships, weekly reviews and certificates. See `docs/PLATFORM_PLAN.md`.

Setup:

1. Create a Supabase project and run `supabase/schema.sql` in its SQL editor.
2. Copy `.env.example` to `.env.local` and fill `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`.
3. Register on the site, then run `update public.profiles set role = 'admin' where email = '<your email>';`.
4. Site settings are stored in the `site_settings` table (falls back to `.data/settings.json` locally when the service key is missing).

API: `GET /api/settings` (public), `PUT /api/settings` (admin), `POST /auth/signout`.

## Testing against Supabase

```bash
npm run test:seed          # test admin + test student + [TEST] courses, internship, reviews, certificate
npm run test:permissions   # 43 checks of who can see and change what (visitor, student, admin)
npm run test:cleanup       # removes all [TEST] data and both test users
```

Test logins are written to `.data/test-accounts.json` (gitignored). `test:permissions` also writes `.data/test-cookies.json` with session cookies for page tests; delete it when done.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/data/site.js` | Contact details, IJEPA links, WhatsApp number, global disclaimer |
| `src/data/content.js` | All page copy from the client brief (services, packages, FAQs, lists) |
| `src/components/` | Header, Footer, Icon set, hero visual, shared building blocks, `admin/` dashboard |
| `src/data/defaults.js` | Default values for everything editable from `/admin` |
| `src/lib/` | Settings store (file or Supabase) and admin auth |
| `src/views/` | One file per route (`Audiences.jsx` and `Policies.jsx` hold several) |

## Before launch

- Confirm the email address and WhatsApp number in `src/data/site.js`.
- Replace the placeholder research titles / fees in `COLLAB_TOPICS` and `PACKAGES` (`src/data/content.js`).
- Review the drafted Privacy, Terms and Refund policy texts in `src/views/Policies.jsx`.
- Contact is by email and phone only (no form yet); add an enquiry form or API route when the backend is built.
- Set the three Supabase variables in the Vercel project settings before going live.
- "Who we serve" photos are hot-linked from Unsplash; replace with the client's own photos in `public/` when available (`AUDIENCES` in `src/views/Home.jsx`).
- The home hero image `public/hero.jpg` comes from the Lovable project and is AI-generated (the text on the books and wall is garbled); replace it with a real photo.
