import * as React from 'react';

import Box from '@mui/material/Box';

/**
 * Build credit in the footer's bottom bar, mirroring the `PoweredBy` component
 * in the hi-grow-lanka project. Restyled for this site's dark-green footer: it
 * inherits the bottom bar's 12.5px size and muted colour rather than carrying
 * its own `Typography` variant, so it sits level with the copyright line.
 */
export default function PoweredBy() {
  return (
    <Box component="span">
      Powered by{' '}
      <Box
        component="a"
        href="https://boostify.lk"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: 'inherit',
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
          transition: 'color .15s ease',
          '&:hover': { color: '#fff' },
        }}
      >
        Boostify
      </Box>
    </Box>
  );
}
