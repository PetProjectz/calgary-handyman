'use client';

import React from 'react';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import Footer from '@/components/footer/Footer';
import NavBar from '@/components/navBar/NavBar';
import { whatsappLink } from '@/contactInfo';

// Unlike boostify-web, the shell is not gated behind a client-side "theme ready"
// flag: the site is light-only, so there is no colour flash to hide, and gating
// would strip all page content from the server-rendered HTML (bad for local SEO).
function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <Box
        component="main"
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      <Footer />
      <Fab
        aria-label="Chat on WhatsApp"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1200,
          width: 60,
          height: 60,
          color: '#fff',
          bgcolor: 'brandAccent.whatsapp',
          boxShadow: '0 10px 26px rgba(37,211,102,.45)',
          '&:hover': { bgcolor: 'brandAccent.whatsappDark', transform: 'scale(1.06)' },
          '@keyframes waPulse': {
            '0%, 100%': { boxShadow: '0 10px 26px rgba(37,211,102,.45), 0 0 0 0 rgba(37,211,102,.45)' },
            '50%': { boxShadow: '0 10px 26px rgba(37,211,102,.45), 0 0 0 14px rgba(37,211,102,0)' },
          },
          animation: 'waPulse 2.6s ease-in-out infinite',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 30 }} />
      </Fab>
    </>
  );
}

export default AppShell;
