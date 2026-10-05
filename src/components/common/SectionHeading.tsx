import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Eyebrow from '@/components/common/Eyebrow';

interface SectionHeadingProps {
  tag: string;
  title: React.ReactNode;
  align?: 'left' | 'center';
  /** Show the short red divider bar above the eyebrow (used on split sections). */
  divider?: boolean;
  /** Heading element, for the rare nested section. Styling stays `h2`. */
  headingComponent?: 'h2' | 'h3';
}

/**
 * The recurring "eyebrow + title" heading used across every Calgary Handyman
 * section (`.section-head` on the static site).
 */
export default function SectionHeading({
  tag,
  title,
  align = 'center',
  divider = false,
  headingComponent = 'h2',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <Box sx={{ textAlign: align, maxWidth: isCenter ? 620 : undefined, mx: isCenter ? 'auto' : undefined }}>
      {divider && (
        <Box
          sx={{
            width: 56,
            height: 3,
            borderRadius: 99,
            bgcolor: 'secondary.main',
            mb: 2.5,
            mx: isCenter ? 'auto' : 0,
          }}
        />
      )}
      <Eyebrow align={align}>{tag}</Eyebrow>
      <Typography
        variant="h2"
        component={headingComponent}
        sx={{
          fontSize: 'clamp(28px, 3.4vw, 40px)',
          color: 'brandSurface.heading',
          mb: 2,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
