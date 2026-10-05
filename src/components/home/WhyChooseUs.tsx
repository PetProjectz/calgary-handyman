import * as React from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeading from '@/components/common/SectionHeading';

const values = [
  {
    Icon: HowToRegRoundedIcon,
    title: 'Licensed & Insured',
    text: 'Every technician is vetted, trained and covered.',
  },
  {
    Icon: SellRoundedIcon,
    title: 'Upfront Pricing',
    text: 'Clear estimates before we ever pick up a tool.',
  },
  {
    Icon: ThumbUpAltRoundedIcon,
    title: 'Guaranteed Work',
    text: 'We stand behind every repair we complete.',
  },
];

/** The photo-and-copy split section (`.split.reverse`) below the banner. */
export default function WhyChooseUs() {
  return (
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
                src="/assets/home/home-technician.webp"
                alt="Calgary Handyman technician at work"
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <SectionHeading
              tag="Why Homeowners Choose Us"
              title="Craftsmanship you can trust, service you can schedule around"
              align="left"
              divider
            />
            <Typography sx={{ color: 'text.secondary' }}>
              We&apos;re a locally owned Calgary crew that shows up on time, communicates clearly,
              and treats your home like our own. No subcontractor shuffle — just skilled hands and
              honest pricing.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, mt: 3.75 }}>
              {values.map((value) => (
                <Box
                  key={value.title}
                  sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.75, maxWidth: 260 }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      borderRadius: '50%',
                      bgcolor: 'brandSurface.tintStrong',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <value.Icon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{ fontSize: 15, color: 'brandSurface.heading', mb: 0.5 }}
                    >
                      {value.title}
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: 'text.secondary' }}>
                      {value.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </ScrollReveal>
        </Box>
      </Container>
    </Box>
  );
}
