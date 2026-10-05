import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SvgIconComponent } from '@mui/icons-material';

interface PillarProps {
  Icon: SvgIconComponent;
  title: React.ReactNode;
  children: React.ReactNode;
  /**
   * Heading element for the card title. Defaults to `h3` (these cards always sit
   * under a section `h2`); keeps the `h4` *styling* either way.
   */
  headingComponent?: 'h2' | 'h3' | 'h4';
}

/**
 * The bordered card with a tinted red icon tile (`.pillar` on the static site),
 * used for the About page's Vision/Values/Promise and How We Work steps.
 */
export default function Pillar({ Icon, title, children, headingComponent = 'h3' }: PillarProps) {
  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        px: 3,
        py: 3.5,
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          mb: 2,
          borderRadius: 1.5,
          bgcolor: 'rgba(200,53,43,.08)',
          color: 'secondary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon sx={{ fontSize: 22 }} />
      </Box>
      <Typography
        variant="h4"
        component={headingComponent}
        sx={{ fontSize: 16.5, color: 'brandSurface.heading', mb: 1 }}
      >
        {title}
      </Typography>
      <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{children}</Typography>
    </Box>
  );
}
