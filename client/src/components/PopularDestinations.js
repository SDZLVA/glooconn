import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

const destinations = [
  {
    id: 1,
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    description: 'The City of Light awaits with iconic landmarks and charming cafés'
  },
  {
    id: 2,
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
    description: 'Where tradition meets future in a vibrant metropolis'
  },
  {
    id: 3,
    city: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    description: 'The city that never sleeps, filled with endless possibilities'
  },
  {
    id: 4,
    city: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    description: 'A modern oasis of luxury and architectural marvels'
  },
  {
    id: 5,
    city: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
    description: 'Eternal city with ancient history and delicious cuisine'
  },
  {
    id: 6,
    city: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
    description: 'Stunning harbors and beaches in a sunny paradise'
  }
];

const PopularDestinations = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center',
              color: '#1a237e'
            }}
          >
            Popular Destinations
          </Typography>
          
          <Grid container spacing={4}>
            {destinations.map((destination) => (
              <Grid item xs={12} sm={6} md={4} key={destination.id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={destination.image}
                      alt={destination.city}
                      sx={{
                        objectFit: 'cover'
                      }}
                    />
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {destination.city}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {destination.country}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {destination.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PopularDestinations; 