import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Flight,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Flight sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                Glooconn
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your trusted partner for seamless travel experiences. We connect you to the world's best destinations with unbeatable deals and exceptional service.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="/careers" color="inherit" display="block" sx={{ mb: 1 }}>
              Careers
            </Link>
            <Link href="/press" color="inherit" display="block" sx={{ mb: 1 }}>
              Press
            </Link>
            <Link href="/blog" color="inherit" display="block" sx={{ mb: 1 }}>
              Blog
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Link href="/help" color="inherit" display="block" sx={{ mb: 1 }}>
              Help Center
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
            <Link href="/faq" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQs
            </Link>
            <Link href="/feedback" color="inherit" display="block" sx={{ mb: 1 }}>
              Feedback
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Terms of Service
            </Link>
            <Link href="/cookies" color="inherit" display="block" sx={{ mb: 1 }}>
              Cookie Policy
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Features
            </Typography>
            <Link href="/rewards" color="inherit" display="block" sx={{ mb: 1 }}>
              Rewards Program
            </Link>
            <Link href="/partners" color="inherit" display="block" sx={{ mb: 1 }}>
              Partners
            </Link>
            <Link href="/business" color="inherit" display="block" sx={{ mb: 1 }}>
              Business Travel
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Glooconn. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 