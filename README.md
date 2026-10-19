# BuildSoftTech

Parent website of **BuildSoftTech** — Research · Publication · Training · Technology.
Sister site of [IJEPA](https://ijepa.vercel.app/) (International Journal of Engineering Practices and Applications), which BuildSoftTech publishes. Both sites share the same design language; this one uses an orange/beige palette, IJEPA uses blue/white.

## Stack

- React 18 + Vite 5
- react-router-dom 6
- Plain CSS (`src/index.css`) — tokens mirror the IJEPA stylesheet, re-coloured

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

Deploy to Vercel as a Vite project (`vercel.json` already rewrites all routes to `index.html`).

## Where things live

| Path | Purpose |
| --- | --- |
| `src/data/site.js` | Contact details, IJEPA links, WhatsApp number, global disclaimer |
| `src/data/content.js` | All page copy from the client brief (services, packages, FAQs, lists) |
| `src/components/` | Header, Footer, Icon set, hero visual, shared building blocks |
| `src/pages/` | One file per route (`Audiences.jsx` and `Policies.jsx` hold several) |

## Before launch

- Confirm the email address and WhatsApp number in `src/data/site.js`.
- Replace the placeholder research titles / fees in `COLLAB_TOPICS` and `PACKAGES` (`src/data/content.js`).
- Review the drafted Privacy, Terms and Refund policy texts in `src/pages/Policies.jsx`.
- The enquiry form currently opens the visitor's email client (mailto) with a WhatsApp fallback; wire it to a backend or form service when ready.
