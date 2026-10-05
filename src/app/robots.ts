import { MetadataRoute } from 'next';

import { isProductionSite, siteUrl } from '@/seo';

/**
 * Replaces the old static `public/robots.txt`, which hardcoded the domain in a
 * second place. Deriving it from `siteUrl` means a domain change is one edit in
 * `seo.ts`, and non-production deploys (`NEXT_PUBLIC_SITE_URL` set to a preview
 * host) disallow everything so a staging copy can't be indexed alongside the
 * real site.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
