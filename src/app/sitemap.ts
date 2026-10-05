import { MetadataRoute } from 'next';

import { absoluteUrl } from '@/seo';

/**
 * The site is three pages: services live as anchored sections of the home page
 * (`/#plumbing`), not as routes of their own, so there is nothing else to list.
 * Anchors are not separate URLs and must not be listed here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/about'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
