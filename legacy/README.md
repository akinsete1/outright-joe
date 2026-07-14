# Outright Joe Website

Run locally with Node 18 or newer:

```bash
npm start
```

The website is served at `http://localhost:3000`.

## Content API

Public reads:

- `GET /api/properties`
- `GET /api/posts`
- `GET /api/testimonials`
- `GET /api/investments`

Create, edit, or remove editorial records with `POST`, `PUT /api/<collection>/<id>`, and `DELETE /api/<collection>/<id>`. Set `ADMIN_API_KEY` before deployment and pass it as the `x-admin-key` request header. Records are stored in `data/*.json` and can also be edited directly for simple content updates.

`POST /api/enquiries` is intentionally public so the contact form can work. Enquiries are saved to `data/enquiries.json`.

## SEO

`robots.txt`, `sitemap.xml`, descriptive page titles, a home-page description, canonical URL, and Open Graph metadata are included. Replace `https://outrightjoe.com` in the sitemap and canonical tag with the production domain if it differs.

## Deploy on Vercel

1. Push this folder to GitHub and import the repository in Vercel, or run `vercel` from this folder.
2. Create a **Vercel KV** database in the project storage settings.
3. Add `KV_REST_API_URL`, `KV_REST_API_TOKEN`, and a long random `ADMIN_API_KEY` in **Project Settings → Environment Variables**. The variable names are listed in [.env.example](.env.example).
4. Deploy. The serverless backend will be available at `https://your-domain.vercel.app/api/properties` and the other API paths listed above.

The first API read uses the sample records under `data/`; the first create, update, or delete stores that collection permanently in Vercel KV. Vercel KV is required because serverless function files are read-only and non-persistent.
