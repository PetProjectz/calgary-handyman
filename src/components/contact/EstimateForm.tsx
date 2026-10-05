'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';

import { displayFontFamily } from '@/fonts';
import { estimateEmail } from '@/contactInfo';
import { services } from '@/services';

/**
 * Posts to FormSubmit.co, a form-relay service that emails submissions — including
 * attachments — with no backend. Swap this action for your own endpoint at any
 * time; the markup keeps working unchanged. Note that the first submission to a
 * new address triggers a one-time FormSubmit activation email.
 */
const FORM_ACTION = `https://formsubmit.co/${estimateEmail}`;

const controlSx = {
  width: '100%',
  px: 1.75,
  py: 1.625,
  border: '1.5px solid',
  borderColor: 'divider',
  borderRadius: 1.5,
  fontFamily: 'inherit',
  fontSize: 14.5,
  color: 'text.primary',
  bgcolor: 'background.default',
  transition: 'border-color .15s ease, box-shadow .15s ease',
  '&:focus': {
    outline: 'none',
    borderColor: 'primary.light',
    boxShadow: '0 0 0 4px var(--mui-palette-brandSurface-tintStrong)',
  },
};

const labelSx = {
  display: 'block',
  mb: 0.875,
  fontFamily: displayFontFamily,
  fontSize: 13,
  fontWeight: 600,
  color: 'brandSurface.heading',
};

function Field({
  id,
  label,
  children,
  hint,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <Box sx={{ mb: 2.25 }}>
      <Box component="label" htmlFor={id} sx={labelSx}>
        {label}
      </Box>
      {children}
      {hint && (
        <Box sx={{ mt: 0.75, fontSize: 12, color: 'text.secondary' }}>{hint}</Box>
      )}
    </Box>
  );
}

export default function EstimateForm() {
  const [fileNames, setFileNames] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileNames(Array.from(event.target.files ?? []).map((file) => file.name));
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '24px',
        p: { xs: 3, md: 4.75 },
        boxShadow: 'var(--mui-palette-brandSurface-cardShadow)',
      }}
    >
      <Typography variant="h2" sx={{ fontSize: 'clamp(24px, 3vw, 30px)', color: 'brandSurface.heading', mb: 1 }}>
        Online Estimate
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 14.5, mb: 3.5 }}>
        Fill out the form below, including photos of the project, and we&apos;ll get back to you with
        a free estimate.
      </Typography>

      <Box component="form" action={FORM_ACTION} method="POST" encType="multipart/form-data">
        <input type="hidden" name="_subject" value="New Online Estimate Request for Calgary Handyman" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <Field id="fullName" label="Full Name *">
            <Box
              component="input"
              type="text"
              id="fullName"
              name="Full Name"
              placeholder="Jane Doe"
              required
              sx={controlSx}
            />
          </Field>
          <Field id="email" label="Email *">
            <Box
              component="input"
              type="email"
              id="email"
              name="Email"
              placeholder="jane@example.com"
              required
              sx={controlSx}
            />
          </Field>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <Field id="phone" label="Phone Number *">
            <Box
              component="input"
              type="tel"
              id="phone"
              name="Phone Number"
              placeholder="(403) 555-0123"
              required
              sx={controlSx}
            />
          </Field>
          <Field id="service" label="Service Needed *">
            <Box component="select" id="service" name="Service Needed" required defaultValue="" sx={controlSx}>
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service.slug}>{service.title}</option>
              ))}
              <option>Other / Not Sure</option>
            </Box>
          </Field>
        </Box>

        <Field id="address" label="Address *">
          <Box
            component="input"
            type="text"
            id="address"
            name="Address"
            placeholder="Street address, Calgary, AB"
            required
            sx={controlSx}
          />
        </Field>

        <Field id="details" label="Project Details">
          <Box
            component="textarea"
            id="details"
            name="Project Details"
            placeholder="Tell us what needs fixing, installing, or repairing…"
            sx={{ ...controlSx, minHeight: 110, resize: 'vertical' }}
          />
        </Field>

        <Field
          label="Upload Photos of Your Project"
          hint="Photos help us give you a faster, more accurate estimate."
        >
          <Box
            role="button"
            tabIndex={0}
            aria-label="Upload project photos"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(event: React.KeyboardEvent) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                inputRef.current?.click();
              }
            }}
            sx={{
              border: '1.8px dashed #c6d3cd',
              borderRadius: 2,
              bgcolor: 'brandSurface.tint',
              px: 2.5,
              py: 3.25,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color .15s ease, background .15s ease',
              '&:hover, &:focus-visible': { borderColor: 'primary.light', bgcolor: 'brandSurface.tintStrong' },
            }}
          >
            <CloudUploadRoundedIcon sx={{ fontSize: 26, color: 'primary.main' }} />
            <Box
              component="strong"
              sx={{ display: 'block', fontSize: 14, color: 'brandSurface.heading', mt: 0.5 }}
            >
              Click to upload or drag &amp; drop
            </Box>
            <Box component="span" sx={{ fontSize: 12.5, color: 'text.secondary' }}>
              JPG, PNG or PDF, up to 6 files, 10MB each
            </Box>
            <Box
              component="input"
              ref={inputRef}
              type="file"
              id="projectPhotos"
              name="Project Photos[]"
              accept="image/*,.pdf"
              multiple
              onChange={handleFiles}
              sx={{ display: 'none' }}
            />
          </Box>

          {fileNames.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
              {fileNames.map((name) => (
                <Box
                  key={name}
                  sx={{
                    px: 1.25,
                    py: 0.5,
                    fontSize: 12,
                    borderRadius: 1,
                    bgcolor: 'brandSurface.tintStrong',
                    color: 'primary.main',
                  }}
                >
                  {name}
                </Box>
              ))}
            </Box>
          )}
        </Field>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
          Submit Estimate Request
        </Button>
      </Box>
    </Box>
  );
}
