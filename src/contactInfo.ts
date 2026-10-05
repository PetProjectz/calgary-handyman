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
  email: 'info@calgaryhandyman.ca',
  emailHref: 'mailto:info@calgaryhandyman.ca',
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

/** Builds a wa.me deep link with a prefilled message. */
export function whatsappLink(message = 'Hi Calgary Handyman!') {
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
