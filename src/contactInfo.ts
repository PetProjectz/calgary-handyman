/**
 * Business contact details. Import from here wherever a phone number, email,
 * WhatsApp link or address is rendered so they stay consistent site-wide.
 */
export const contactInfo = {
  businessName: 'Calgary Handyman',
  phoneDisplay: '(403) 616-2133',
  phoneE164: '+14036162133',
  phoneHref: 'tel:+14036162133',
  /** WhatsApp is a separate line from the call number above. */
  whatsappDisplay: '(403) 714-5593',
  whatsappNumber: '14037145593',
  email: 'info@calgary-handyman.com',
  emailHref: 'mailto:info@calgary-handyman.com',
  location: 'Calgary, Alberta, Canada',
  locality: 'Calgary',
  region: 'AB',
  country: 'CA',
  hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
  /** schema.org openingHours format for the hours above. */
  openingHours: 'Mo-Sa 08:00-18:00',
} as const;

/** Inbox that receives Online Estimate form submissions via FormSubmit.co. */
export const estimateEmail = process.env.NEXT_PUBLIC_ESTIMATE_EMAIL || contactInfo.email;

/**
 * The prefilled opener for every WhatsApp link on the site. Changing it here
 * changes it everywhere — call sites pass no argument.
 */
export const whatsappMessage = "Hi Calgary Handyman! I have a job I'd like a quote on.";

/**
 * Builds a wa.me deep link with a prefilled message.
 *
 * `encodeURIComponent` leaves apostrophes raw, which is valid in a query string
 * but trips link parsers that treat `'` as a delimiter — so they are encoded
 * explicitly. Matters here because the default message contains one.
 */
export function whatsappLink(message = whatsappMessage) {
  const text = encodeURIComponent(message).replace(/'/g, '%27');
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${text}`;
}
