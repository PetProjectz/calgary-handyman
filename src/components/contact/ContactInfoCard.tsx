import * as React from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { contactInfo, whatsappLink } from '@/contactInfo';

const valueSx = { fontSize: 13.5, color: 'rgba(255,255,255,.78)' };
const linkSx = {
  ...valueSx,
  textDecoration: 'none',
  '&:hover': { color: '#fff', textDecoration: 'underline' },
};

function Method({
  icon,
  label,
  children,
  whatsapp = false,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  whatsapp?: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.75 }}>
      <Box
        sx={{
          width: 42,
          height: 42,
          flexShrink: 0,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          bgcolor: whatsapp ? 'brandAccent.whatsapp' : 'rgba(255,255,255,.1)',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Box component="strong" sx={{ display: 'block', fontSize: 14.5, mb: 0.25 }}>
          {label}
        </Box>
        {children}
      </Box>
    </Box>
  );
}

/** The deep-green contact details card on the left of the contact page. */
export default function ContactInfoCard() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: '24px', px: 4.25, py: 5 }}>
      <Typography variant="h2" sx={{ color: '#fff', fontSize: 'clamp(24px, 3vw, 30px)', mb: 1 }}>
        Contact Information
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,.75)', fontSize: 14.5 }}>
        Reach us any way that&apos;s convenient. WhatsApp is usually the fastest.
      </Typography>

      <Box sx={{ mt: 3.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Method icon={<PhoneRoundedIcon sx={{ fontSize: 18 }} />} label="Call Us">
          <Box component="a" href={contactInfo.phoneHref} sx={linkSx}>
            {contactInfo.phoneDisplay}
          </Box>
        </Method>
        <Method icon={<WhatsAppIcon sx={{ fontSize: 18 }} />} label="WhatsApp" whatsapp>
          <Box
            component="a"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            sx={linkSx}
          >
            Chat with us instantly
          </Box>
        </Method>
        <Method icon={<EmailRoundedIcon sx={{ fontSize: 18 }} />} label="Email Us">
          <Box component="a" href={contactInfo.emailHref} sx={linkSx}>
            {contactInfo.email}
          </Box>
        </Method>
        <Method icon={<LocationOnRoundedIcon sx={{ fontSize: 18 }} />} label="Location">
          <Box component="span" sx={valueSx}>
            {contactInfo.location}
          </Box>
        </Method>
        <Method icon={<AccessTimeRoundedIcon sx={{ fontSize: 18 }} />} label="Hours">
          <Box component="span" sx={valueSx}>
            {contactInfo.hours}
          </Box>
        </Method>
      </Box>

      <Box
        sx={{
          position: 'relative',
          mt: 3.75,
          borderRadius: 2,
          overflow: 'hidden',
          aspectRatio: '16 / 10',
        }}
      >
        <Image
          src="/assets/contact/calgary-city.webp"
          alt="Calgary city"
          fill
          sizes="(max-width: 960px) 100vw, 420px"
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Button
        component="a"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        fullWidth
        startIcon={<WhatsAppIcon />}
        sx={{
          mt: 3,
          bgcolor: 'brandAccent.whatsapp',
          color: '#fff',
          '&:hover': { bgcolor: 'brandAccent.whatsappDark' },
        }}
      >
        Message Us on WhatsApp
      </Button>
    </Box>
  );
}
