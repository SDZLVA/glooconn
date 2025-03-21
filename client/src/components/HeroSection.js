import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Flight, Public, Support } from '@mui/icons-material';
import { motion } from 'framer-motion';
import FlightSearch from './FlightSearch';

const StatItem = ({ icon, value, label }) => (
  <Box sx={{ textAlign: 'center', color: 'white' }}>
    {React.cloneElement(icon, { sx: { fontSize: 40, color: 'white' } })}
    <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'white' }}>
      {value}
    </Typography>
    <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
      {label}
    </Typography>
  </Box>
);

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #0d47a1 30%, #1565c0 90%)',
        color: 'white',
        width: '100%',
        margin: 0,
        padding: 0
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                textAlign: 'center',
              }}
            >
              Travel the World with{' '}
              <Box
                component="span"
                sx={{
                  color: '#ffeb3b',
                }}
              >
                Glooconn
              </Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textAlign: 'center',
                opacity: 0.9,
              }}
            >
              Your trusted partner for seamless travel experiences
            </Typography>
            
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <StatItem
                  icon={<Flight />}
                  value="1000+"
                  label="Flight Routes"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StatItem
                  icon={<Public />}
                  value="500+"
                  label="Destinations"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StatItem
                  icon={<Support />}
                  value="24/7"
                  label="Support"
                />
              </Grid>
            </Grid>

            <Box sx={{ maxWidth: '1100px', mx: 'auto', px: 2 }}>
              <FlightSearch compact={true} />
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection; 