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

## Where things live

| Path | Purpose |
| --- | --- |
| `src/data/site.js` | Contact details, IJEPA links, WhatsApp number, global disclaimer |
| `src/data/content.js` | All page copy from the client brief (services, packages, FAQs, lists) |
| `src/components/` | Header, Footer, Icon set, hero visual, shared building blocks |
| `src/views/` | One file per route (`Audiences.jsx` and `Policies.jsx` hold several) |

## Before launch

- Confirm the email address and WhatsApp number in `src/data/site.js`.
- Replace the placeholder research titles / fees in `COLLAB_TOPICS` and `PACKAGES` (`src/data/content.js`).
- Review the drafted Privacy, Terms and Refund policy texts in `src/views/Policies.jsx`.
- Contact is by email and phone only (no form yet); add an enquiry form or API route when the backend is built.
