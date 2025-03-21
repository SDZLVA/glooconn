import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Flight,
  EventSeat,
  AttachMoney,
  Info,
  LocationOn,
  Schedule
} from '@mui/icons-material';
import axios from 'axios';

const FlightDetails = ({ flightId, onClose }) => {
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSeatMap, setShowSeatMap] = useState(false);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`/api/flights/${flightId}/details`);
        setFlightDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch flight details');
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [flightId]);

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

  const formatPrice = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const SeatMapDialog = () => (
    <Dialog open={showSeatMap} onClose={() => setShowSeatMap(false)} maxWidth="md" fullWidth>
      <DialogTitle>Seat Map</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seat</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Features</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flightDetails.seatMap[0].seats.map((seat) => (
                <TableRow key={seat.number}>
                  <TableCell>{seat.number}</TableCell>
                  <TableCell>{seat.cabin}</TableCell>
                  <TableCell>
                    {seat.characteristics.map((char) => (
                      <Chip key={char} label={char} size="small" style={{ margin: 2 }} />
                    ))}
                  </TableCell>
                  <TableCell>
                    {seat.price ? formatPrice(seat.price.amount, seat.price.currency) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={seat.available ? 'Available' : 'Occupied'}
                      color={seat.available ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          {/* Flight Header */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Flight />
              <Typography variant="h5">
                {flightDetails.airline.name} - Flight {flightDetails.carrier.code}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Flight Status */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Schedule />
              <Typography>
                Status: <Chip label={flightDetails.status[0].status} color="primary" />
              </Typography>
            </Box>
          </Grid>

          {/* Departure & Arrival */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <LocationOn /> Departure
                </Typography>
                <Typography>
                  {flightDetails.airports.departure.name} ({flightDetails.departure.airport})
                </Typography>
                <Typography>Terminal: {flightDetails.status[0].departure.terminal}</Typography>
                <Typography>
                  Time: {new Date(flightDetails.departure.date).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <LocationOn /> Arrival
                </Typography>
                <Typography>
                  {flightDetails.airports.arrival.name} ({flightDetails.arrival.airport})
                </Typography>
                <Typography>Terminal: {flightDetails.status[0].arrival.terminal}</Typography>
                <Typography>
                  Time: {new Date(flightDetails.arrival.date).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Price Analysis */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <AttachMoney /> Price Analysis
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Minimum Price</Typography>
                    <Typography>
                      {formatPrice(
                        flightDetails.priceAnalysis.priceMetrics.minimum,
                        flightDetails.priceAnalysis.currencyCode
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Median Price</Typography>
                    <Typography>
                      {formatPrice(
                        flightDetails.priceAnalysis.priceMetrics.median,
                        flightDetails.priceAnalysis.currencyCode
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Maximum Price</Typography>
                    <Typography>
                      {formatPrice(
                        flightDetails.priceAnalysis.priceMetrics.maximum,
                        flightDetails.priceAnalysis.currencyCode
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<EventSeat />}
                onClick={() => setShowSeatMap(true)}
              >
                View Seat Map
              </Button>
              <Button
                variant="outlined"
                startIcon={<Info />}
                onClick={onClose}
              >
                Close
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Seat Map Dialog */}
        <SeatMapDialog />
      </CardContent>
    </Card>
  );
};

export default FlightDetails; 