/**
 * Site-wide SEO constants. Keep every absolute URL derived from `siteUrl` so a
 * domain change is a one-line edit here (and so preview deploys never emit
 * production canonicals).
 */

/** The live domain. Canonicals, JSON-LD `@id`s and the sitemap all hang off this. */
const productionUrl = 'https://calgary-handyman.com';

/**
 * Set `NEXT_PUBLIC_SITE_URL` on preview/staging deploys so their canonicals and
 * sitemap point at themselves rather than at production. Unset = production.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || productionUrl).replace(/\/+$/, '');

/**
 * False on any deploy that is not the live domain. Drives the `noindex` in
 * `layout.tsx` and the `Disallow: /` in `robots.ts`, so staging copies can't
 * compete with production in the index.
 */
export const isProductionSite = siteUrl === productionUrl;

/** Absolute URL for a site-relative path, e.g. `absoluteUrl('/about')`. */
export function absoluteUrl(path = '/') {
  return path === '/' ? siteUrl : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export const ogImages = [
  {
    url: '/assets/brand/calgary-handyman-og.png',
    width: 1200,
    height: 630,
    alt: 'Calgary Handyman',
  },
];

export const twitterImages = ['/assets/brand/calgary-handyman-og.png'];

export const organizationLogo = absoluteUrl('/assets/brand/calgary-handyman-logo.png');
