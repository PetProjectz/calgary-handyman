import * as React from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import AppLink from '@/components/common/AppLink';
import PoweredBy from '@/components/footer/PoweredBy';
import { contactInfo, whatsappLink } from '@/contactInfo';
import { displayFontFamily } from '@/fonts';
import { estimateHref } from '@/navLinks';
import { footerServices } from '@/services';
import { socialLinks } from '@/socialLinks';

/**
 * The logo's true intrinsic size. Passing the real dimensions rather than a
 * rounded display size keeps next/image's aspect-ratio check satisfied: a
 * rounded width (152 for a 40px cap) implies 3.800, while the real ratio is
 * 3.810, and that mismatch is what triggered the console warning. CSS caps the
 * height and derives the width.
 */
const LOGO_INTRINSIC_WIDTH = 1200;
const LOGO_INTRINSIC_HEIGHT = 315;
/** Rendered cap in the footer. */
const LOGO_HEIGHT = 38;

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About Us', href: '/about' },
  { label: 'Online Estimate', href: estimateHref },
  { label: 'Contact Us', href: '/contact' },
];

const columnHeadingSx = {
  fontFamily: displayFontFamily,
  fontSize: 14.5,
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: '#fff',
  mb: 2.25,
};

const footerLinkSx = {
  fontSize: 13.5,
  color: 'rgba(255,255,255,.78)',
  // Explicit reset: the contact column uses bare `a` elements, which do not get
  // MUI Link's `underline="none"` treatment.
  textDecoration: 'none',
  transition: 'color .15s ease',
  '&:hover': { color: '#fff' },
};

/**
 * Only profiles with a real URL are rendered. The placeholders in
 * `socialLinks.ts` are still "#", and an `<a href="#">` is a dead control that
 * scrolls to the top instead of doing nothing visible — worse than no icon.
 * These reappear automatically once the real URLs are filled in.
 */
const socialProfiles = [
  { label: 'Facebook', href: socialLinks.facebook, Icon: FacebookIcon },
  { label: 'Instagram', href: socialLinks.instagram, Icon: InstagramIcon },
].filter((profile) => profile.href.startsWith('http'));

const socialButtonSx = {
  width: 36,
  height: 36,
  color: '#fff',
  bgcolor: 'rgba(255,255,255,.08)',
  transition: 'background .15s ease',
  '&:hover': { bgcolor: 'secondary.main' },
};

/** Column list wrapper — resets the `ul` the way the static site's reset did. */
function LinkList({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="ul"
      sx={{ display: 'flex', flexDirection: 'column', gap: 1.375, m: 0, p: 0, listStyle: 'none' }}
    >
      {children}
    </Box>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'rgba(255,255,255,.78)' }}>
      <Container>
        <Box
          sx={{
            display: 'grid',
            gap: 4.5,
            pt: 8,
            pb: 5,
            // Single column on mobile reads better centred; from sm up the
            // columns sit side by side and go back to left-aligned.
            textAlign: { xs: 'center', sm: 'left' },
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1.4fr 1fr 1fr 1.1fr',
            },
          }}
        >
          {/* Brand */}
          <Box>
            <AppLink
              href="/"
              aria-label="Calgary Handyman home"
              sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <Image
                src="/assets/brand/calgary-handyman-logo-light.webp"
                alt="Calgary Handyman logo"
                width={LOGO_INTRINSIC_WIDTH}
                height={LOGO_INTRINSIC_HEIGHT}
                style={{ height: LOGO_HEIGHT, width: 'auto', display: 'block' }}
              />
            </AppLink>
            <Typography
              sx={{
                mt: 1.75,
                maxWidth: 260,
                mx: { xs: 'auto', sm: 0 },
                fontSize: 13.5,
                color: 'rgba(255,255,255,.6)',
              }}
            >
              Your trusted partner for reliable handyman services in Calgary and surrounding areas.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1.25,
                mt: 2.25,
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              {socialProfiles.map((profile) => (
                <IconButton
                  key={profile.label}
                  component="a"
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.label}
                  sx={socialButtonSx}
                >
                  <profile.Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
              <IconButton
                component="a"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                sx={socialButtonSx}
              >
                <WhatsAppIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Quick links */}
          <Box>
            <Typography component="h2" sx={columnHeadingSx}>
              Quick Links
            </Typography>
            <LinkList>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <AppLink href={link.href} sx={footerLinkSx}>
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </LinkList>
          </Box>

          {/* Services */}
          <Box>
            <Typography component="h2" sx={columnHeadingSx}>
              Our Services
            </Typography>
            <LinkList>
              {footerServices.map((service) => (
                <li key={service.label}>
                  <AppLink href={service.href} sx={footerLinkSx}>
                    {service.label}
                  </AppLink>
                </li>
              ))}
            </LinkList>
          </Box>

          {/* Contact */}
          <Box>
            <Typography component="h2" sx={columnHeadingSx}>
              Contact Info
            </Typography>
            <LinkList>
              <ContactItem icon={<LocationOnRoundedIcon sx={contactIconSx} />}>
                {contactInfo.location}
              </ContactItem>
              <ContactItem icon={<PhoneRoundedIcon sx={contactIconSx} />}>
                <Box component="a" href={contactInfo.phoneHref} sx={footerLinkSx}>
                  {contactInfo.phoneDisplay}
                </Box>
              </ContactItem>
              <ContactItem icon={<WhatsAppIcon sx={contactIconSx} />}>
                <Box
                  component="a"
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={footerLinkSx}
                >
                  WhatsApp Us
                </Box>
              </ContactItem>
              <ContactItem icon={<EmailRoundedIcon sx={contactIconSx} />}>
                <Box component="a" href={contactInfo.emailHref} sx={footerLinkSx}>
                  {contactInfo.email}
                </Box>
              </ContactItem>
            </LinkList>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'space-between' },
            textAlign: { xs: 'center', sm: 'left' },
            flexWrap: 'wrap',
            gap: 1.5,
            py: 2.5,
            // Keeps the credit clear of the fixed WhatsApp button (60px wide,
            // 24px from the right edge), which otherwise sits on top of the
            // Boostify link and makes part of it unclickable. Not needed on xs,
            // where the bar is centred and the button is well to the right.
            pr: { xs: 0, sm: 8 },
            borderTop: '1px solid rgba(255,255,255,.1)',
            fontSize: 12.5,
            color: 'rgba(255,255,255,.55)',
          }}
        >
          <Box component="span">
            &copy; {year} {contactInfo.businessName}. All rights reserved.
          </Box>
          <PoweredBy />
        </Box>
      </Container>
    </Box>
  );
}

const contactIconSx = { fontSize: 16, color: 'secondary.main', mt: '3px', flexShrink: 0 };

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Box
      component="li"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: { xs: 'center', sm: 'flex-start' },
        gap: 1.25,
        fontSize: 13.5,
      }}
    >
      {icon}
      <Box component="span">{children}</Box>
    </Box>
  );
}
