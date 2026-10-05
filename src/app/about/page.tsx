import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';

import CtaSection from '@/components/common/CtaSection';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/common/PageHero';
import Pillar from '@/components/common/Pillar';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeading from '@/components/common/SectionHeading';
import { displayFontFamily } from '@/fonts';
import { absoluteUrl } from '@/seo';
import { breadcrumbSchema, businessId, graph } from '@/structuredData';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Calgary Handyman is a locally owned home repair and improvement service built on fair pricing, careful craftsmanship and honest communication.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    title: 'About Us | Calgary Handyman',
    description:
      'Calgary Handyman is a locally owned home repair and improvement service built on fair pricing, careful craftsmanship and honest communication.',
  },
};

const breadcrumbs = [{ name: 'About Us', path: '/about' }];

const pillars = [
  {
    Icon: TrackChangesRoundedIcon,
    title: 'Our Vision',
    text: 'To be Calgary’s trusted choice for dependable home repairs and improvements, recognized for quality workmanship, honest service, and a commitment to making every home better, safer, and more comfortable.',
  },
  {
    Icon: FavoriteRoundedIcon,
    title: 'Our Values',
    text: 'Integrity, quality, and customer satisfaction guide everything we do, on every job.',
  },
  {
    Icon: HandshakeRoundedIcon,
    title: 'Our Promise',
    text: 'We stand behind our work and treat your home like our own. No shortcuts, no surprises.',
  },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '8 yrs', label: 'Serving Calgary' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '100%', label: 'Licensed & Insured' },
];

const steps = [
  {
    Icon: ChatRoundedIcon,
    title: '1. Tell Us the Job',
    text: 'Submit an online estimate or message us on WhatsApp with photos of the project.',
  },
  {
    Icon: ReceiptLongRoundedIcon,
    title: '2. Get a Clear Quote',
    text: 'We review the details and send you honest, upfront pricing — no hidden fees.',
  },
  {
    Icon: HandymanRoundedIcon,
    title: '3. We Get It Done',
    text: 'Our technician arrives on time, does the work right, and leaves your space clean.',
  },
];

const pillarGridSx = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            '@type': 'AboutPage',
            name: 'About Calgary Handyman',
            url: absoluteUrl('/about'),
            about: { '@id': businessId },
          },
          breadcrumbSchema([{ name: 'Home', path: '/' }, ...breadcrumbs]),
        )}
      />

      <PageHero
        tag="About Calgary Handyman"
        title="Local expertise, honest work, lasting relationships"
        subtitle="We're a Calgary owned handyman company built on fair pricing, careful craftsmanship, and treating every home like our own."
        image="/assets/hero/hero-about.webp"
        breadcrumbs={breadcrumbs}
      />

      <Box component="section" sx={{ py: { xs: 7, md: 10.5 } }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 4, md: 7 },
              alignItems: 'center',
            }}
          >
            <ScrollReveal>
              <SectionHeading tag="Who We Are" title="About Us" align="left" divider />
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                Calgary Handyman is a locally owned and operated home improvement and repair service
                dedicated to providing dependable, high quality workmanship throughout Calgary. We
                offer a wide range of residential handyman services, including plumbing repairs,
                painting, flooring, drywall and ceiling work, electrical repairs, glass services, and
                carpentry.
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                Our approach is simple: deliver quality workmanship, communicate clearly, and treat
                every home with the same care and respect we would give our own. From small repairs
                to larger home improvement projects, we focus on practical solutions, attention to
                detail, and a professional experience from start to finish.
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                We believe lasting customer relationships are built through honest service, fair
                pricing, reliable workmanship, and doing the job right.
              </Typography>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 5',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: 'var(--mui-palette-brandSurface-cardShadow)',
                }}
              >
                <Image
                  src="/assets/about/about-technicians.webp"
                  alt="Calgary Handyman technicians"
                  fill
                  sizes="(max-width: 900px) 100vw, 560px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </ScrollReveal>
          </Box>

          <Box sx={{ ...pillarGridSx, mt: 7 }}>
            {pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.title} delay={index * 0.08}>
                <Pillar Icon={pillar.Icon} title={pillar.title}>
                  {pillar.text}
                </Pillar>
              </ScrollReveal>
            ))}
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              my: 7,
            }}
          >
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.06} sx={{ textAlign: 'center' }}>
                <Box
                  component="strong"
                  sx={{
                    display: 'block',
                    fontFamily: displayFontFamily,
                    fontSize: 34,
                    fontWeight: 700,
                    color: 'brandSurface.heading',
                  }}
                >
                  {stat.value}
                </Box>
                <Box component="span" sx={{ fontSize: 13, color: 'text.secondary' }}>
                  {stat.label}
                </Box>
              </ScrollReveal>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ bgcolor: 'brandSurface.tint', py: { xs: 7, md: 10.5 } }}>
        <Container>
          <ScrollReveal sx={{ mb: 5.75 }}>
            <SectionHeading tag="How We Work" title="Simple, transparent, dependable" />
          </ScrollReveal>
          <Box sx={pillarGridSx}>
            {steps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.08}>
                <Pillar Icon={step.Icon} title={step.title}>
                  {step.text}
                </Pillar>
              </ScrollReveal>
            ))}
          </Box>
        </Container>
      </Box>

      <CtaSection
        title="Local Experts You Can Trust"
        text="Proudly serving the Calgary community, we are committed to delivering dependable workmanship and practical solutions that help keep every home safe, comfortable, functional, and well maintained."
        image="/assets/contact/calgary-city.webp"
        imageAlt="Calgary skyline at dusk"
      />
    </>
  );
}
