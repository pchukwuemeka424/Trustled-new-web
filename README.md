# TrustLed AI website (Next.js)

Marketing site for [trustledai.com](https://trustledai.com), with a MongoDB-backed admin CMS, Vercel Blob image uploads, and Resend contact email.

## Develop

```bash
npm install
# ensure .env.local is filled with your secrets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and the CMS at [http://localhost:3000/admin](http://localhost:3000/admin).

## Environment

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token |
| `RESEND_API_KEY` | Resend API key for contact form |
| `CONTACT_TO_EMAIL` | Inbox for enquiries |
| `CONTACT_FROM_EMAIL` | From address for Resend |
| `ADMIN_PASSWORD` | Admin CMS password |
| `ADMIN_SESSION_SECRET` | JWT signing secret for admin sessions |

## Admin CMS

- Sign in at `/admin` with `ADMIN_PASSWORD`
- Edit SEO title/description, page HTML write-ups, publish state
- Upload images to Vercel Blob and insert URLs into page HTML
- Public pages load published content from MongoDB (with static fallbacks)

## Build / deploy

```bash
npm run build
npm start
```

Netlify uses `@netlify/plugin-nextjs` (see `netlify.toml`). Set the same env vars in the Netlify UI. For production MongoDB, use Atlas (or any hosted MongoDB) instead of `127.0.0.1`.

## Notes

- Fallback page HTML lives in `data/pages-fallback.ts` and seeds MongoDB on first admin/page load.
- Contact form posts to `/api/contact` (Resend).
- `npm run generate` rebuilds pages from `_legacy` HTML — avoid using it after CMS wiring unless you re-apply CMS page modules.
