import * as React from 'react';
import type { Metadata } from 'next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import EstimateForm from '@/components/contact/EstimateForm';
import { absoluteUrl } from '@/seo';
import { breadcrumbSchema, businessId, graph } from '@/structuredData';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Call, WhatsApp or email Calgary Handyman, or send your project details for a free, no-obligation estimate.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: 'Contact Us | Calgary Handyman',
    description:
      'Call, WhatsApp or email Calgary Handyman, or send your project details for a free, no-obligation estimate.',
  },
};

const breadcrumbs = [{ name: 'Contact Us', path: '/contact' }];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            '@type': 'ContactPage',
            name: 'Contact Calgary Handyman',
            url: absoluteUrl('/contact'),
            about: { '@id': businessId },
          },
          breadcrumbSchema([{ name: 'Home', path: '/' }, ...breadcrumbs]),
        )}
      />

      <PageHero
        tag="We'd Love to Help"
        title="Get in Touch"
        subtitle="Have a question or need a handyman? Call, WhatsApp, or send us your project details below. We're here to help."
        image="/assets/hero/hero-contact.webp"
        breadcrumbs={breadcrumbs}
      />

      <Box component="section" id="estimate" sx={{ py: { xs: 7, md: 10.5 }, scrollMarginTop: '80px' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '0.85fr 1.15fr' },
              gap: 5,
              alignItems: 'start',
            }}
          >
            <ScrollReveal>
              <ContactInfoCard />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <EstimateForm />
            </ScrollReveal>
          </Box>

          <ScrollReveal
            sx={{
              mt: 5,
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              height: { xs: 280, md: 360 },
            }}
          >
            <Box
              component="iframe"
              src="https://www.google.com/maps?q=Calgary,Alberta,Canada&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Calgary Handyman service area map"
              sx={{ width: '100%', height: '100%', border: 0, display: 'block' }}
            />
          </ScrollReveal>
        </Container>
      </Box>
    </>
  );
}
