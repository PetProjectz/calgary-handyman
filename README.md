# Calgary Handyman Website

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/HEAD/packages/create-next-app) with Material UI installed.

## How to use

Clone this

Run:

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment

Optional. Copy `.env.example` to `.env.local` to set the inbox that receives Online Estimate submissions:

```bash
cp .env.example .env.local
```

Leaving it unset falls back to `info@calgary-handyman.com`.

`NEXT_PUBLIC_SITE_URL` is the other optional variable. It sets the origin used for
canonical URLs, JSON-LD, `robots.txt` and the sitemap. Leave it unset in production
(it defaults to `https://calgary-handyman.com`); set it on preview or staging deploys
so they point at themselves and serve `noindex` + `Disallow: /` rather than
competing with the live site in search results.

## SEO

- Per-page metadata, canonicals and Open Graph live in each `page.tsx`; the shared
  defaults are in `src/app/layout.tsx` and `src/seo.ts`.
- schema.org JSON-LD is built in `src/structuredData.ts` from the same
  `contactInfo` / `services` / `socialLinks` modules the UI renders from, and
  emitted via `<JsonLd />`. The site-wide `LocalBusiness` + `WebSite` graph is in
  the root layout; pages add their own `BreadcrumbList`, `Service` and `FAQPage`
  nodes that reference the business by `@id`.
- `robots.txt` and `sitemap.xml` are generated (`src/app/robots.ts`,
  `src/app/sitemap.ts`) — the sitemap is derived from the `services` array, so a
  new service appears in it automatically.
- Adding a service means adding one entry to `src/services.ts`. That one entry
  produces the home page card, the nav menu item, the `/services/[slug]` page,
  its sitemap row and its structured data.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |
