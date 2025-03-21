import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Rating,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Search,
  LocationOn,
  AttachMoney,
  Hotel,
  Wifi,
  Pool,
  Restaurant,
  LocalLaundryService,
  Kitchen,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const AmenityIcon = ({ type }) => {
  const icons = {
    WiFi: <Wifi />,
    Pool: <Pool />,
    Restaurant: <Restaurant />,
    Laundry: <LocalLaundryService />,
    Kitchen: <Kitchen />,
  };
  return icons[type] || null;
};

const AccommodationCard = ({ accommodation }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={`https://source.unsplash.com/random/400x300?hotel,${accommodation.name}`}
          alt={accommodation.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {accommodation.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOn sx={{ fontSize: 20, color: 'primary.main', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {accommodation.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={accommodation.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({accommodation.rating})
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            {accommodation.amenities.map((amenity, index) => (
              <Chip
                key={index}
                icon={<AmenityIcon type={amenity} />}
                label={amenity}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney sx={{ color: 'success.main', mr: 0.5 }} />
              <Typography variant="h6" color="success.main">
                {accommodation.price}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                /night
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
            >
              Book Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AccommodationList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const accommodations = [
    {
      name: 'Luxury Hotel',
      location: 'City Center',
      rating: 4.5,
      price: 200,
      amenities: ['WiFi', 'Pool', 'Restaurant'],
    },
    {
      name: 'Budget Hostel',
      location: 'Downtown',
      rating: 3.8,
      price: 40,
      amenities: ['WiFi', 'Kitchen', 'Laundry'],
    },
    {
      name: 'Boutique Hotel',
      location: 'Historic District',
      rating: 4.2,
      price: 150,
      amenities: ['WiFi', 'Restaurant', 'Pool'],
    },
    {
      name: 'Apartment Rental',
      location: 'Residential Area',
      rating: 4.0,
      price: 120,
      amenities: ['WiFi', 'Kitchen', 'Laundry'],
    },
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Accommodations
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search accommodations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          placeholder="Price range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          sx={{ minWidth: 150 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {accommodations.map((accommodation, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <AccommodationCard accommodation={accommodation} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AccommodationList; 