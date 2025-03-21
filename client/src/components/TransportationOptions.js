import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import {
  Flight,
  Train,
  DirectionsBus,
  DirectionsCar,
  AccessTime,
  AttachMoney,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const TransportationCard = ({ type, provider, price, departure, arrival, duration, features, selected, onSelect }) => {
  const icons = {
    flight: <Flight />,
    train: <Train />,
    bus: <DirectionsBus />,
    car: <DirectionsCar />,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          border: selected ? '2px solid #1976d2' : 'none',
          '&:hover': {
            boxShadow: 6,
          },
        }}
        onClick={onSelect}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                p: 1,
                borderRadius: 1,
                mr: 2,
              }}
            >
              {icons[type]}
            </Box>
            <Typography variant="h6" component="div">
              {provider}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Departure
              </Typography>
              <Typography variant="subtitle1">
                {departure}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Arrival
              </Typography>
              <Typography variant="subtitle1">
                {arrival}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body2">
              Duration: {duration}
            </Typography>
          </Box>

          {features && (
            <Box sx={{ mb: 2 }}>
              {features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney sx={{ color: 'success.main', mr: 0.5 }} />
              <Typography variant="h6" color="success.main">
                {price}
              </Typography>
            </Box>
            <IconButton
              color={selected ? 'primary' : 'default'}
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              <Typography variant="button">
                {selected ? 'Selected' : 'Select'}
              </Typography>
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TransportationOptions = () => {
  const [selectedTransport, setSelectedTransport] = React.useState(null);

  const transportOptions = [
    {
      type: 'flight',
      provider: 'Sample Airlines',
      price: 300,
      departure: '10:00 AM',
      arrival: '2:00 PM',
      duration: '4h',
      features: ['Economy', 'Meal Included'],
    },
    {
      type: 'train',
      provider: 'Express Rail',
      price: 150,
      departure: '8:00 AM',
      arrival: '3:00 PM',
      duration: '7h',
      features: ['Standard Class', 'WiFi'],
    },
    {
      type: 'bus',
      provider: 'Comfort Bus',
      price: 80,
      departure: '6:00 AM',
      arrival: '5:00 PM',
      duration: '11h',
      features: ['WiFi', 'Reclining Seats'],
    },
    {
      type: 'car',
      provider: 'Rent-A-Car',
      price: 200,
      duration: '3 days',
      features: ['Automatic', 'Air Conditioning', 'GPS'],
    },
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Transportation Options
      </Typography>
      <Grid container spacing={3}>
        {transportOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <TransportationCard
              {...option}
              selected={selectedTransport === index}
              onSelect={() => setSelectedTransport(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TransportationOptions; 