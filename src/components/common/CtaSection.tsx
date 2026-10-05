import * as React from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import ScrollReveal from '@/components/common/ScrollReveal';

interface CtaSectionProps {
  title: React.ReactNode;
  text: React.ReactNode;
  image: string;
  imageAlt: string;
  /** Buttons rendered under the text (optional). */
  actions?: React.ReactNode;
  /** Section vertical padding override (`sx` py value). */
  py?: object | number;
  /**
   * Heading element for the CTA title. Defaults to `h2` — this is the top
   * heading of its own `<section>` — while keeping the smaller `h3` styling.
   */
  headingComponent?: 'h2' | 'h3';
}

/**
 * The photo call-to-action card (`.cta-photo` on the static site): a rounded
 * photo with a deep-green overlay and copy on the left. Used on Home and About.
 */
export default function CtaSection({
  title,
  text,
  image,
  imageAlt,
  actions,
  py,
  headingComponent = 'h2',
}: CtaSectionProps) {
  return (
    <Box component="section" sx={{ py: py ?? { xs: 7, md: 10.5 } }}>
      <Container>
        <ScrollReveal>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '24px',
              minHeight: { xs: 360, md: 340 },
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'brandSurface.deep',
              boxShadow: 'var(--mui-palette-brandSurface-cardShadowHover)',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(12,51,39,.94) 0%, rgba(12,51,39,.78) 45%, rgba(12,51,39,.25) 100%)',
              },
            }}
          >
            <Image src={image} alt={imageAlt} fill sizes="(max-width: 1228px) 100vw, 1180px" style={{ objectFit: 'cover' }} />
            <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 4, md: 7 }, maxWidth: 620 }}>
              <Typography
                variant="h3"
                component={headingComponent}
                sx={{ color: '#fff', fontSize: 'clamp(24px, 3vw, 34px)', mb: 1.5 }}
              >
                {title}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,.82)' }}>{text}</Typography>
              {actions && (
                <Box sx={{ mt: 2.75, display: 'flex', gap: 1.75, flexWrap: 'wrap' }}>{actions}</Box>
              )}
            </Box>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
}
