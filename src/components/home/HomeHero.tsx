import * as React from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';

import AppButton from '@/components/common/AppButton';
import Eyebrow from '@/components/common/Eyebrow';
import ScrollReveal from '@/components/common/ScrollReveal';
import { displayFontFamily } from '@/fonts';
import { estimateHref } from '@/navLinks';

const badges = [
  {
    Icon: ShieldRoundedIcon,
    title: 'Trusted & Insured',
    text: 'Peace of mind with every project',
  },
  {
    Icon: ScheduleRoundedIcon,
    title: 'On-Time Service',
    text: 'We respect your time & schedule',
  },
  {
    Icon: SentimentSatisfiedAltRoundedIcon,
    title: 'Satisfaction Guaranteed',
    text: 'Quality you can count on',
  },
];

/**
 * The taller, content-forward home hero (`.site-hero.hero-home`): background
 * photo under the green scrim, headline copy, two CTAs and a trust-badge bar
 * pinned to the bottom.
 *
 * The photo is a `priority` `next/image` rather than a CSS `background-image`:
 * it is the home page's LCP element, and as CSS the browser could not discover
 * it until the stylesheet parsed, nor serve it as AVIF at the right size.
 */
export default function HomeHero() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        bgcolor: 'brandSurface.deep',
        display: 'flex',
        flexDirection: 'column',
        minHeight: { xs: 0, md: 640 },
        pt: { xs: '110px', md: '130px' },
        pb: { xs: 7, md: 5.5 },
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/assets/hero/hero-home.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'var(--mui-palette-brandSurface-heroScrim)',
        }}
      />

      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          gap: 5,
        }}
      >
        <ScrollReveal sx={{ maxWidth: 620 }}>
          <Eyebrow tone="onDark">Trusted · Local · Professional</Eyebrow>
          <Typography
            variant="h1"
            sx={{ fontSize: 'clamp(34px, 4.4vw, 52px)', color: '#fff', mb: 2.25 }}
          >
            Reliable Handyman Services in{' '}
            <Box component="span" sx={{ color: '#ff8f85' }}>
              Calgary
            </Box>
          </Typography>
          <Typography sx={{ fontSize: 17, maxWidth: 480, mb: 3.75, color: 'rgba(255,255,255,.82)' }}>
            From small repairs to major improvements, we get the job done right. Plumbing, painting,
            flooring, drywall, ceilings, electrical, glass &amp; carpentry — one call covers it all.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.75, flexWrap: 'wrap' }}>
            <AppButton href="/#services" variant="contained" endIcon={<ArrowForwardRoundedIcon />}>
              View Services
            </AppButton>
            <AppButton
              href={estimateHref}
              variant="outlined"
              sx={{
                borderColor: '#fff',
                color: '#fff',
                '&:hover': { borderColor: '#fff', bgcolor: '#fff', color: 'primary.main' },
              }}
            >
              Get an Estimate
            </AppButton>
          </Box>
        </ScrollReveal>

        <ScrollReveal
          delay={0.12}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: { xs: 'flex-start', md: 'space-between' },
            flexWrap: 'wrap',
            gap: 3,
            pt: 3.25,
            borderTop: '1px solid rgba(255,255,255,.18)',
          }}
        >
          {badges.map((badge) => (
            <Box
              key={badge.title}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                maxWidth: { xs: 'none', sm: 220 },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid rgba(255,255,255,.5)',
                  borderRadius: '50%',
                }}
              >
                <badge.Icon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Box
                  component="strong"
                  sx={{ display: 'block', fontFamily: displayFontFamily, fontSize: 14, fontWeight: 600 }}
                >
                  {badge.title}
                </Box>
                <Box component="span" sx={{ fontSize: 12.5, color: 'rgba(255,255,255,.7)' }}>
                  {badge.text}
                </Box>
              </Box>
            </Box>
          ))}
        </ScrollReveal>
      </Container>
    </Box>
  );
}
