/**
 * schema.org JSON-LD for the site, built from the same `contactInfo` /
 * `services` / `socialLinks` modules the UI renders from, so the markup and the
 * visible page can never disagree — which is exactly what Google penalises.
 *
 * Render the output through `<JsonLd />`. Plain (non-"use client") module so
 * Server Components can import it directly.
 *
 * Deliberately NOT here: `aggregateRating` / `Review`. Google's structured-data
 * policy disallows self-serving review markup — a business marking up reviews
 * about itself — on `LocalBusiness` and `Organization`. The 4.9★ figure on the
 * About page stays visible copy. Rich-result stars require a third-party
 * platform (Google Business Profile, etc.), not markup we author ourselves.
 */
import { contactInfo } from '@/contactInfo';
import { absoluteUrl, organizationLogo, siteUrl } from '@/seo';
import { services } from '@/services';
import { socialProfileUrls } from '@/socialLinks';

/** Stable `@id`s so separate graph nodes can reference each other by pointer. */
export const businessId = `${siteUrl}/#business`;
export const websiteId = `${siteUrl}/#website`;

type Json = Record<string, unknown>;

/**
 * The business itself. `HomeAndConstructionBusiness` is the `LocalBusiness`
 * subtype that fits a handyman trade; both types are declared so consumers that
 * only understand the parent still resolve it.
 */
export const localBusinessSchema: Json = {
  '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
  '@id': businessId,
  name: contactInfo.businessName,
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: organizationLogo,
  },
  image: absoluteUrl('/assets/brand/calgary-handyman-og.png'),
  description:
    'Locally owned handyman services in Calgary, Alberta — plumbing, painting, flooring, drywall, ceiling repair, electrical, glass and carpentry.',
  telephone: contactInfo.phoneE164,
  email: contactInfo.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: contactInfo.locality,
    addressRegion: contactInfo.region,
    addressCountry: contactInfo.country,
  },
  areaServed: [
    { '@type': 'City', name: 'Calgary' },
    { '@type': 'AdministrativeArea', name: 'Alberta' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  currenciesAccepted: 'CAD',
  // Only emitted once the "#" placeholders in socialLinks.ts become real URLs.
  ...(socialProfileUrls.length > 0 ? { sameAs: socialProfileUrls } : null),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Handyman Services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        // Services are sections of the home page, not routes of their own.
        url: `${siteUrl}/#${service.slug}`,
      },
    })),
  },
};

export const websiteSchema: Json = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: siteUrl,
  name: contactInfo.businessName,
  publisher: { '@id': businessId },
  inLanguage: 'en-CA',
};

export interface BreadcrumbItem {
  name: string;
  /** Site-relative path, e.g. `/services/plumbing`. */
  path: string;
}

/** `BreadcrumbList` matching the visible breadcrumb trail in `PageHero`. */
export function breadcrumbSchema(items: BreadcrumbItem[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Wraps nodes in a single `@graph`, which is how multiple schemas should share
 * one page: cross-references resolve by `@id` instead of duplicating the
 * business block on every node.
 */
export function graph(...nodes: Json[]): Json {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
