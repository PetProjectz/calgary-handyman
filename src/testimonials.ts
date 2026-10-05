/**
 * Customer testimonials shown on the home page. Kept here so the copy lives
 * alongside the site's other content modules rather than inside a component.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** Initials shown in the avatar circle. */
  initials: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Fast, tidy and genuinely skilled. They patched our drywall and repainted the whole hallway in a single afternoon.',
    name: 'Jordan R.',
    initials: 'JR',
    location: 'Signal Hill, Calgary',
  },
  {
    quote:
      'Our kitchen faucet and a ceiling leak were both sorted in one visit. Upfront pricing, no surprises.',
    name: 'Amara M.',
    initials: 'AM',
    location: 'Tuscany, Calgary',
  },
  {
    quote:
      'Replaced a cracked window pane and rebuilt our deck railing. Professional from the first WhatsApp message.',
    name: 'Daniel K.',
    initials: 'DK',
    location: 'Auburn Bay, Calgary',
  },
];
