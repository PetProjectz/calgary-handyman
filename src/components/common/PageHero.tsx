import * as React from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import AppLink from '@/components/common/AppLink';
import Eyebrow from '@/components/common/Eyebrow';
import type { BreadcrumbItem } from '@/structuredData';

interface PageHeroProps {
  tag: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Background photo under the green overlay, e.g. `/assets/hero/hero-about.webp`. */
  image: string;
  /**
   * Breadcrumb trail *after* "Home" — the last entry is the current page and is
   * rendered as plain text. Pass the same array to `breadcrumbSchema()` (with
   * Home prepended) so the markup and the visible trail always agree.
   */
  breadcrumbs: readonly BreadcrumbItem[];
}

/**
 * Inner-page hero (`.site-hero.hero-page`): background photo, green gradient
 * overlay, eyebrow, title, subtitle and a Home › Page breadcrumb.
 *
 * The photo is a `next/image` rather than a CSS `background-image` so it gets
 * AVIF/WebP negotiation, a responsive `srcset` and — via `priority` — a preload
 * hint. It is the LCP element on every inner page, so discovery timing matters.
 */
export default function PageHero({ tag, title, subtitle, image, breadcrumbs }: PageHeroProps) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        bgcolor: 'brandSurface.deep',
        pt: { xs: '120px', md: '150px' },
        pb: { xs: '64px', md: '84px' },
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src={image}
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

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Eyebrow tone="onDark">{tag}</Eyebrow>
        <Typography
          variant="h1"
          sx={{ fontSize: 'clamp(30px, 4vw, 44px)', color: '#fff', mb: 1.25, maxWidth: 760 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ maxWidth: 520, fontSize: 15.5, color: 'rgba(255,255,255,.82)' }}>
            {subtitle}
          </Typography>
        )}
        <Box
          component="nav"
          aria-label="Breadcrumb"
          sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, fontSize: 13, color: 'rgba(255,255,255,.65)', mt: 2 }}
        >
          <AppLink href="/" sx={{ color: 'inherit', '&:hover': { color: '#fff' } }}>
            Home
          </AppLink>
          {breadcrumbs.map((crumb, index) => {
            const isCurrent = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.path}>
                <ChevronRightRoundedIcon sx={{ fontSize: 14 }} />
                {isCurrent ? (
                  <Box component="span" aria-current="page">
                    {crumb.name}
                  </Box>
                ) : (
                  <AppLink href={crumb.path} sx={{ color: 'inherit', '&:hover': { color: '#fff' } }}>
                    {crumb.name}
                  </AppLink>
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
