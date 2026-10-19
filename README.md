# BuildSoftTech

Parent website of **BuildSoftTech** — Research · Publication · Training · Technology.
Sister site of [IJEPA](https://ijepa.vercel.app/) (International Journal of Engineering Practices and Applications), which BuildSoftTech publishes. Both sites share the same design language; this one uses an orange/beige palette, IJEPA uses blue/white.

## Stack

- Next.js 14 (App Router) + React 18 — frontend only for now; API routes can be added later for the backend
- Plain CSS (`src/app/globals.css`) — tokens mirror the IJEPA stylesheet, re-coloured

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in .next/
npm start        # serve the production build
```

Deploy to Vercel as a Next.js project (auto-detected, no extra config).

## Admin panel

`/admin` is a single-user login (link in the footer). From there the client can change the internship fee / duration / mode / next batch, the course list (with optional fee and duration), the SCI/Scopus research-topic table, package fees and the contact details. Public pages read these values on every request.

Setup:

1. Copy `.env.example` to `.env.local` and set `ADMIN_PASSWORD` and a random `ADMIN_SECRET`.
2. Locally, saved settings go to `.data/settings.json` (gitignored).
3. On Vercel the filesystem is not persistent, so also set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` and create a table `site_settings (key text primary key, value jsonb)`. The store (`src/lib/store.js`) switches to Supabase automatically when those are present.

API: `GET /api/settings` (public), `PUT /api/settings` (admin cookie), `POST/DELETE /api/admin/login`.

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
- Set `ADMIN_PASSWORD`, `ADMIN_SECRET` and the Supabase variables in the Vercel project settings before going live.
- "Who we serve" photos are hot-linked from Unsplash; replace with the client's own photos in `public/` when available (`AUDIENCES` in `src/views/Home.jsx`).
