import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import {
  Flight,
  AirlineSeatReclineNormal,
  Info,
  LocalAirport,
  AccessTime,
  AttachMoney
} from '@mui/icons-material';
import FlightDetails from './FlightDetails';

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const formatDuration = (duration) => {
  // Convert PT1H30M to 1h 30m
  const hours = duration.match(/(\d+)H/)?.[1] || '0';
  const minutes = duration.match(/(\d+)M/)?.[1] || '0';
  return `${hours}h ${minutes}m`;
};

const FlightSearchResults = ({ flights, loading, error }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>No flights found for your search criteria.</Typography>
      </Box>
    );
  }

  const formatPrice = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handleViewDetails = (flight) => {
    setSelectedFlight(flight);
    setShowDetails(true);
  };

  return (
    <Box>
      {flights.map((flight) => (
        <Card key={flight.id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              {/* Price */}
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoney color="primary" />
                  <Typography variant="h6">
                    {flight.price.currency} {flight.price.total}
                  </Typography>
                </Box>
              </Grid>

              {/* Flight Details */}
              <Grid item xs={12} md={9}>
                {flight.itineraries.map((itinerary, index) => (
                  <Box key={index}>
                    {index > 0 && <Divider sx={{ my: 2 }} />}
                    
                    {/* Duration */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <AccessTime color="primary" />
                      <Typography variant="body1">
                        {formatDuration(itinerary.duration)}
                      </Typography>
                    </Box>

                    {/* Segments */}
                    {itinerary.segments.map((segment, segIndex) => (
                      <Box key={segIndex}>
                        <Grid container spacing={2} alignItems="center">
                          {/* Departure */}
                          <Grid item xs={4}>
                            <Typography variant="h6">
                              {formatTime(segment.departure.time)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {segment.departure.airport}
                              {segment.departure.terminal && ` T${segment.departure.terminal}`}
                            </Typography>
                          </Grid>

                          {/* Flight Info */}
                          <Grid item xs={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                              <Flight color="primary" />
                              <Typography variant="body2">
                                {segment.carrierCode} {segment.number}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary" display="block" align="center">
                              {formatDuration(segment.duration)}
                            </Typography>
                          </Grid>

                          {/* Arrival */}
                          <Grid item xs={4}>
                            <Typography variant="h6" align="right">
                              {formatTime(segment.arrival.time)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="right">
                              {segment.arrival.airport}
                              {segment.arrival.terminal && ` T${segment.arrival.terminal}`}
                            </Typography>
                          </Grid>
                        </Grid>

                        {/* Stops */}
                        {segment.numberOfStops > 0 && (
                          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                            <Chip 
                              label={`${segment.numberOfStops} stop${segment.numberOfStops > 1 ? 's' : ''}`}
                              size="small"
                              color="warning"
                            />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {/* Flight Details Dialog */}
      <Dialog
        open={showDetails}
        onClose={() => setShowDetails(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedFlight && (
          <FlightDetails
            flightId={selectedFlight.id}
            onClose={() => setShowDetails(false)}
          />
        )}
      </Dialog>
    </Box>
  );
};

export default FlightSearchResults; 