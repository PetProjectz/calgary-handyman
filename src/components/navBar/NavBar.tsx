'use client';

import * as React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';

import { displayFontFamily } from '@/fonts';
import { estimateHref, navLinks } from '@/navLinks';
import { services } from '@/services';

/**
 * The logo's true intrinsic size. Passing the real dimensions rather than a
 * rounded display size keeps next/image's aspect-ratio check satisfied: a
 * rounded width (152 for a 40px cap) implies 3.800, while the real ratio is
 * 3.810, and that mismatch is what triggered the console warning. CSS caps the
 * height and derives the width.
 */
const LOGO_INTRINSIC_WIDTH = 1200;
const LOGO_INTRINSIC_HEIGHT = 315;
/** Rendered cap in the header. */
const LOGO_HEIGHT = 40;

/** Breakpoint the static site switched to the slide-in mobile nav at. */
const MOBILE_QUERY = '@media (max-width: 960px)';
const DESKTOP_QUERY = '@media (min-width: 961px)';

const navLinkSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.625,
  px: 2,
  py: 1.25,
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 500,
  lineHeight: 1.2,
  color: 'text.primary',
  textDecoration: 'none',
  borderRadius: 999,
  transition: 'background .15s ease, color .15s ease',
  '&:hover': { bgcolor: 'brandSurface.tintStrong', color: 'primary.main' },
};

const activeNavLinkSx = {
  bgcolor: 'brandSurface.tintStrong',
  color: 'primary.main',
  fontWeight: 600,
};

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  // Closed from the links themselves rather than from a pathname effect, so that
  // tapping the route you are already on still dismisses the drawer.
  const closeMenu = React.useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, []);

  /**
   * Hash links (`/#services`) never count as active — they point at a section of
   * a page rather than a route of their own, matching the static site's markup.
   */
  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    return pathname === href;
  };

  return (
    <AppBar
      component="header"
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'brandSurface.headerBg',
        backdropFilter: 'saturate(180%) blur(10px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
          px: 3,
          py: 1.75,
        }}
      >
        <Box
          component={NextLink}
          href="/"
          aria-label="Calgary Handyman home"
          sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <Image
            src="/assets/brand/calgary-handyman-logo.webp"
            alt="Calgary Handyman logo"
            width={LOGO_INTRINSIC_WIDTH}
            height={LOGO_INTRINSIC_HEIGHT}
            priority
            style={{ height: LOGO_HEIGHT, width: 'auto', display: 'block' }}
          />
        </Box>

        {/* Desktop navigation */}
        <Box
          component="nav"
          aria-label="Main"
          sx={{ [MOBILE_QUERY]: { display: 'none' }, display: 'flex', alignItems: 'center' }}
        >
          <Box component="ul" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, m: 0, p: 0, listStyle: 'none' }}>
            {navLinks.map((link) => (
              <Box
                key={link.href}
                component="li"
                sx={link.hasMenu ? { position: 'relative' } : undefined}
              >
                <Box
                  component={NextLink}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  sx={{ ...navLinkSx, ...(isActive(link.href) ? activeNavLinkSx : null) }}
                >
                  {link.label}
                  {link.hasMenu && <ExpandMoreRoundedIcon sx={{ fontSize: 16 }} />}
                </Box>

                {link.hasMenu && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      left: 0,
                      minWidth: 264,
                      p: 1,
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      boxShadow: 'var(--mui-palette-brandSurface-cardShadowHover)',
                      opacity: 0,
                      visibility: 'hidden',
                      transform: 'translateY(6px)',
                      transition: 'opacity .18s ease, transform .18s ease, visibility .18s ease',
                      'li:hover > &, li:focus-within > &': {
                        opacity: 1,
                        visibility: 'visible',
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    {services.map((service) => (
                      <Box
                        key={service.slug}
                        component={NextLink}
                        href={`/#${service.slug}`}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.25,
                          px: 1.5,
                          py: 1.25,
                          fontSize: 14.5,
                          color: 'text.primary',
                          textDecoration: 'none',
                          borderRadius: 1.5,
                          '&:hover': { bgcolor: 'brandSurface.tint', color: 'primary.main' },
                        }}
                      >
                        <service.Icon sx={{ fontSize: 18, color: 'secondary.main' }} />
                        {service.title}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Button
            component={NextLink}
            href={estimateHref}
            variant="contained"
            size="small"
            startIcon={<PhoneRoundedIcon />}
            sx={{ [MOBILE_QUERY]: { display: 'none' } }}
          >
            Online Estimate
          </Button>
          <IconButton
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            sx={{ [DESKTOP_QUERY]: { display: 'none' }, color: 'primary.dark' }}
          >
            <MenuRoundedIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={closeMenu}
        slotProps={{ paper: { sx: { width: 'min(88vw, 340px)', p: 2.25 } } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton aria-label="Close menu" onClick={closeMenu} sx={{ color: 'primary.dark' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Box component="nav" aria-label="Mobile">
          <Box component="ul" sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, m: 0, p: 0, listStyle: 'none' }}>
            {navLinks.map((link) => (
              <Box component="li" key={link.href}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    component={NextLink}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    sx={{
                      ...navLinkSx,
                      ...(isActive(link.href) ? activeNavLinkSx : null),
                      flex: 1,
                      px: 2,
                      py: 1.75,
                    }}
                  >
                    {link.label}
                  </Box>
                  {link.hasMenu && (
                    <IconButton
                      aria-label={servicesOpen ? 'Collapse services' : 'Expand services'}
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((open) => !open)}
                      sx={{ color: 'primary.dark' }}
                    >
                      <ExpandMoreRoundedIcon
                        sx={{
                          transition: 'transform .2s ease',
                          transform: servicesOpen ? 'rotate(180deg)' : 'none',
                        }}
                      />
                    </IconButton>
                  )}
                </Box>

                {link.hasMenu && (
                  <Collapse in={servicesOpen} unmountOnExit>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1.5, mb: 0.5 }}>
                      {services.map((service) => (
                        <Box
                          key={service.slug}
                          component={NextLink}
                          href={`/#${service.slug}`}
                          onClick={closeMenu}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.25,
                            px: 1.5,
                            py: 1.25,
                            fontSize: 14.5,
                            color: 'text.primary',
                            textDecoration: 'none',
                            borderRadius: 1.5,
                            '&:hover': { bgcolor: 'brandSurface.tint', color: 'primary.main' },
                          }}
                        >
                          <service.Icon sx={{ fontSize: 18, color: 'secondary.main' }} />
                          {service.title}
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Button
          component={NextLink}
          href={estimateHref}
          onClick={closeMenu}
          variant="contained"
          startIcon={<PhoneRoundedIcon />}
          sx={{ mt: 2.5, fontFamily: displayFontFamily }}
          fullWidth
        >
          Online Estimate
        </Button>
      </Drawer>
    </AppBar>
  );
}
