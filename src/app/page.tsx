import * as React from 'react';
import type { Metadata } from 'next';

import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import AppButton from '@/components/common/AppButton';
import CtaSection from '@/components/common/CtaSection';
import JsonLd from '@/components/common/JsonLd';
import BannerStrip from '@/components/home/BannerStrip';
import HomeHero from '@/components/home/HomeHero';
import ServicesGrid from '@/components/home/ServicesGrid';
import Testimonials from '@/components/home/Testimonials';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { whatsappLink } from '@/contactInfo';
import { estimateHref } from '@/navLinks';
import { siteUrl } from '@/seo';
import { businessId, graph, websiteId } from '@/structuredData';

// Set here rather than inherited from the layout, so that no other page can
// accidentally pick up the home page's canonical.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph({
          '@type': 'WebPage',
          '@id': `${siteUrl}/#webpage`,
          url: siteUrl,
          name: 'Calgary Handyman | Reliable Handyman Services in Calgary, AB',
          isPartOf: { '@id': websiteId },
          about: { '@id': businessId },
          inLanguage: 'en-CA',
        })}
      />

      <HomeHero />
      <ServicesGrid />
      <BannerStrip />
      <WhyChooseUs />
      <Testimonials />
      <CtaSection
        py={{ xs: 7, md: 10.5 }}
        title="Ready to fix it, finish it, or install it?"
        text="Tell us about your project and we'll get back to you with a free, no-obligation estimate, often the same day."
        image="/assets/home/final-cta.webp"
        imageAlt="Calgary skyline"
        actions={
          <>
            <AppButton href={estimateHref} variant="contained" color="secondary">
              Get an Estimate
            </AppButton>
            <Button
              component="a"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<WhatsAppIcon />}
              sx={{
                borderColor: '#fff',
                color: '#fff',
                '&:hover': { borderColor: '#fff', bgcolor: '#fff', color: 'primary.main' },
              }}
            >
              WhatsApp Us
            </Button>
          </>
        }
      />
    </>
  );
}
