import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
  Alert,
  Autocomplete,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Flight, SwapHoriz, CalendarToday, Person } from '@mui/icons-material';
import api from '../services/api';
import FlightSearchResults from './FlightSearchResults';

const FlightSearch = ({ compact = false }) => {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: null,
    returnDate: null,
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'ECONOMY',
    nonStop: false
  });

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [airports, setAirports] = useState([]);
  const [loadingAirports, setLoadingAirports] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const searchAirportsHandler = async (query) => {
    if (query.length < 2) {
      setAirports([]);
      return;
    }
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(async () => {
      console.log('Searching airports with query:', query);
      setLoadingAirports(true);
      setError(null);
      
      try {
        const results = await api.searchAirports(query);
        console.log('Airport search response:', results);
        
        if (!results || results.length === 0) {
          setError('No airports found matching your search');
          setAirports([]);
          return;
        }

        setAirports(results);
      } catch (err) {
        console.error('Error fetching airports:', err);
        setAirports([]);
        if (err.response?.status === 429) {
          setError('Too many requests. Please wait a moment and try again.');
        } else if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        }
      } finally {
        setLoadingAirports(false);
      }
    }, 500); // Debounce for 500ms

    setSearchTimeout(timeout);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
        setError('Please fill in all required fields');
        return;
      }

      // Format dates for API
      const formattedParams = {
        ...searchParams,
        departureDate: searchParams.departureDate.toISOString().split('T')[0],
        returnDate: searchParams.returnDate?.toISOString().split('T')[0]
      };

      console.log('Searching flights with params:', formattedParams);
      const results = await api.searchFlights(formattedParams);
      console.log('Flight search response:', results);

      if (!results || results.length === 0) {
        setError('No flights found for the selected criteria');
        setFlights([]);
        return;
      }

      setFlights(results);
    } catch (err) {
      console.error('Error searching flights:', err);
      setError(err.response?.data?.error || err.response?.data?.message || 'An error occurred while searching for flights');
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSearch}>
        <Grid container spacing={3}>
          {/* Origin and Destination */}
          <Grid item xs={12} md={5}>
            <Autocomplete
              id="origin-airport"
              name="origin"
              options={airports}
              getOptionLabel={(option) => `${option.city} (${option.code})`}
              loading={loadingAirports}
              onInputChange={(_, value) => searchAirportsHandler(value)}
              onChange={(_, value) => setSearchParams({
                ...searchParams,
                origin: value?.code || ''
              })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  required
                  fullWidth
                  placeholder="Enter city or airport code"
                  error={!!error}
                  helperText={error}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onClick={handleSwapLocations}
              sx={{ minWidth: 'auto', p: 1 }}
            >
              <SwapHoriz />
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <Autocomplete
              id="destination-airport"
              name="destination"
              options={airports}
              getOptionLabel={(option) => `${option.city} (${option.code})`}
              loading={loadingAirports}
              onInputChange={(_, value) => searchAirportsHandler(value)}
              onChange={(_, value) => setSearchParams({
                ...searchParams,
                destination: value?.code || ''
              })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  required
                  fullWidth
                  placeholder="Enter city or airport code"
                  error={!!error}
                  helperText={error}
                />
              )}
            />
          </Grid>

          {/* Dates */}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                id="departure-date"
                name="departureDate"
                label="Departure Date"
                value={searchParams.departureDate}
                onChange={(date) => setSearchParams({ ...searchParams, departureDate: date })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                    error={!searchParams.departureDate && !!error}
                    helperText={!searchParams.departureDate && error ? 'Please select departure date' : ''}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                id="return-date"
                name="returnDate"
                label="Return Date (Optional)"
                value={searchParams.returnDate}
                onChange={(date) => setSearchParams({ ...searchParams, returnDate: date })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    InputProps={{
                      startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* Passengers and Class */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="adults-label">Adults</InputLabel>
              <Select
                id="adults"
                name="adults"
                labelId="adults-label"
                value={searchParams.adults}
                onChange={(e) => setSearchParams({
                  ...searchParams,
                  adults: Math.max(1, parseInt(e.target.value) || 1)
                })}
                label="Adults"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="children-label">Children</InputLabel>
              <Select
                id="children"
                name="children"
                labelId="children-label"
                value={searchParams.children}
                onChange={(e) => setSearchParams({
                  ...searchParams,
                  children: Math.max(0, parseInt(e.target.value) || 0)
                })}
                label="Children"
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="infants-label">Infants</InputLabel>
              <Select
                id="infants"
                name="infants"
                labelId="infants-label"
                value={searchParams.infants}
                onChange={(e) => setSearchParams({
                  ...searchParams,
                  infants: Math.max(0, parseInt(e.target.value) || 0)
                })}
                label="Infants"
              >
                {[0, 1, 2].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="travel-class-label">Travel Class</InputLabel>
              <Select
                id="travel-class"
                name="travelClass"
                labelId="travel-class-label"
                value={searchParams.travelClass}
                onChange={(e) => setSearchParams({
                  ...searchParams,
                  travelClass: e.target.value
                })}
                label="Travel Class"
              >
                <MenuItem value="ECONOMY">Economy</MenuItem>
                <MenuItem value="PREMIUM_ECONOMY">Premium Economy</MenuItem>
                <MenuItem value="BUSINESS">Business</MenuItem>
                <MenuItem value="FIRST">First Class</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Non-stop Option */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={searchParams.nonStop}
                  onChange={(e) => setSearchParams({
                    ...searchParams,
                    nonStop: e.target.checked
                  })}
                />
              }
              label="Non-stop flights only"
            />
          </Grid>

          {/* Search Button */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                id="search-button"
                name="search"
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Flight />}
              >
                {loading ? 'Searching...' : 'Search Flights'}
              </Button>
            </Box>
          </Grid>

          {/* Error Message */}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
        </Grid>
      </form>

      {/* Results */}
      {flights.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Search Results
          </Typography>
          <FlightSearchResults flights={flights} />
        </Box>
      )}
    </Paper>
  );
};

export default FlightSearch; 