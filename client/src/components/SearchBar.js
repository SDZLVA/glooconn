import React, { useState, useEffect, useCallback } from 'react';
import {
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Autocomplete,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { LocationOn, LocationCity, Flight, SwapHoriz } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

const SearchBar = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = useCallback(async (query, setSuggestions, setLoading) => {
    if (!query || query.length < 1) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching suggestions for:', query);
      const response = await axios.get(`${API_URL}/api/suggestions`, {
        params: { query }
      });
      console.log('Received suggestions:', response.data);
      setSuggestions(response.data || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced function to fetch location suggestions
  useEffect(() => {
    if (origin.length > 0) {
      const timeoutId = setTimeout(() => {
        fetchSuggestions(origin, setOriginSuggestions, setOriginLoading);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [origin, fetchSuggestions]);

  useEffect(() => {
    if (destination.length > 0) {
      const timeoutId = setTimeout(() => {
        fetchSuggestions(destination, setDestinationSuggestions, setDestinationLoading);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [destination, fetchSuggestions]);

  const handleSearch = async () => {
    if (!origin || !destination || !startDate || !endDate || !budget) {
      setError('Please fill in all fields');
      return;
    }

    if (startDate > endDate) {
      setError('End date must be after start date');
      return;
    }

    if (parseFloat(budget) <= 0) {
      setError('Budget must be greater than 0');
      return;
    }

    setSearchLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/search`, {
        origin,
        destination,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        budget: parseFloat(budget)
      });

      onSearch(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to search for travel options');
    } finally {
      setSearchLoading(false);
    }
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'airport':
        return <Flight sx={{ mr: 1, color: 'text.secondary' }} />;
      case 'city':
        return type === 'major' ? 
          <LocationCity sx={{ mr: 1, color: 'text.secondary' }} /> :
          <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />;
      default:
        return <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />;
    }
  };

  const handleSwapLocations = () => {
    const tempOrigin = origin;
    const tempDestination = destination;
    setOrigin(tempDestination);
    setDestination(tempOrigin);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5.5}>
            <Autocomplete
              freeSolo
              options={originSuggestions}
              getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
              value={origin}
              onChange={(event, newValue) => {
                setOrigin(typeof newValue === 'string' ? newValue : newValue?.name || '');
              }}
              onInputChange={(event, newInputValue) => {
                setOrigin(newInputValue);
              }}
              filterOptions={(x) => x}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Origin"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter city or airport"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {originLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  {getLocationIcon(option.type)}
                  {option.name}
                </li>
              )}
            />
          </Grid>

          <Grid item xs={12} md={1} sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            px: 0 
          }}>
            <IconButton 
              onClick={handleSwapLocations}
              sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                width: 40,
                height: 40,
              }}
            >
              <SwapHoriz />
            </IconButton>
          </Grid>

          <Grid item xs={12} md={5.5}>
            <Autocomplete
              freeSolo
              options={destinationSuggestions}
              getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
              value={destination}
              onChange={(event, newValue) => {
                setDestination(typeof newValue === 'string' ? newValue : newValue?.name || '');
              }}
              onInputChange={(event, newInputValue) => {
                setDestination(newInputValue);
              }}
              filterOptions={(x) => x}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter city or airport"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {destinationLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  {getLocationIcon(option.type)}
                  {option.name}
                </li>
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={setStartDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDate={new Date()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={setEndDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDate={startDate || new Date()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                labelId="currency-select-label"
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((curr) => (
                  <MenuItem key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              label="Budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: currencies.find(c => c.code === currency)?.symbol || '$',
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={searchLoading}
              fullWidth
              sx={{ height: '100%', minHeight: '56px' }}
            >
              {searchLoading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default SearchBar; 