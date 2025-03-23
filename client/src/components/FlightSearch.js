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
import { Flight, Add } from '@mui/icons-material';
import api from '../services/api';
import FlightSearchResults from './FlightSearchResults';
import europeAirports from '../data/europe_airports.json';

const FlightSearch = ({ compact = false }) => {
    const [searchParams, setSearchParams] = useState({
        origin: '',
        destination: '',
        departureDate: null,
        returnDate: null,
        adults: 1,
        children: 0,
        rooms: 1,
        travelClass: 'ECONOMY',
        nonStop: false
    });

    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [airports, setAirports] = useState([]);
    const [budget, setBudget] = useState('');
    const [includeAccommodation, setIncludeAccommodation] = useState(false);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [transitLocations, setTransitLocations] = useState([{ location: '', fromDate: null, toDate: null }]);
    const [currency, setCurrency] = useState('USD');

    // Define searchTimeout if needed
    const [searchTimeout, setSearchTimeout] = useState(null);

    // Remove unused variables
    // const [loadingAirports, setLoadingAirports] = useState(false);
    // const handleSwapLocations = () => { ... }

    // Use useEffect to clear searchTimeout if needed
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    const searchAirportsHandler = async (query) => {
        console.log('Searching airports for:', query);
        if (query.length < 2) {
            setAirports([]);
            return;
        }

        const filteredAirports = europeAirports.filter(airport =>
            airport.city.toLowerCase().includes(query.toLowerCase()) ||
            airport.code.toLowerCase().includes(query.toLowerCase())
        );

        setAirports(filteredAirports);
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
                returnDate: searchParams.returnDate?.toISOString().split('T')[0],
                budget,
                currency
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

    // Function to add a new transit location
    const addTransitLocation = () => {
        setTransitLocations([...transitLocations, { location: '', fromDate: null, toDate: null }]);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 1200, mx: 'auto', mt: 4 }}>
            <form onSubmit={handleSearch}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                        <Autocomplete
                            id="origin-autocomplete"
                            options={airports}
                            getOptionLabel={(option) => `${option.city} (${option.code})`}
                            renderInput={(params) => <TextField {...params} label="From" variant="outlined" fullWidth />}
                            onInputChange={(event, newInputValue) => {
                                const selectedAirport = airports.find(airport => `${airport.city} (${airport.code})` === newInputValue);
                                setSearchParams({ ...searchParams, origin: selectedAirport ? selectedAirport.code : '' });
                                searchAirportsHandler(newInputValue);
                            }}
                            openOnFocus
                            sx={{
                                '& .MuiAutocomplete-listbox': {
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                    zIndex: 2,
                                    marginTop: '2px',
                                },
                                '& .MuiAutocomplete-option': {
                                    padding: '10px',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                        <Autocomplete
                            id="destination-autocomplete"
                            options={airports}
                            getOptionLabel={(option) => `${option.city} (${option.code})`}
                            renderInput={(params) => <TextField {...params} label="To" variant="outlined" fullWidth />}
                            onInputChange={(event, newInputValue) => {
                                const selectedAirport = airports.find(airport => `${airport.city} (${airport.code})` === newInputValue);
                                setSearchParams({ ...searchParams, destination: selectedAirport ? selectedAirport.code : '' });
                                searchAirportsHandler(newInputValue);
                            }}
                            openOnFocus
                            sx={{
                                '& .MuiAutocomplete-listbox': {
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                    zIndex: 2,
                                    marginTop: '2px',
                                },
                                '& .MuiAutocomplete-option': {
                                    padding: '10px',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                id="departure-date"
                                label="Departure Date"
                                value={searchParams.departureDate}
                                onChange={(newValue) => setSearchParams({ ...searchParams, departureDate: newValue })}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                id="return-date"
                                label="Return Date"
                                value={searchParams.returnDate}
                                onChange={(newValue) => setSearchParams({ ...searchParams, returnDate: newValue })}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={4} display="flex" alignItems="center">
                        <FormControl sx={{ minWidth: 80, mr: 1 }}>
                            <Select
                                id="currency-select"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="budget"
                            label="Budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    {includeAccommodation && (
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel id="passengers-rooms-label" htmlFor="passengers-rooms">Passengers & Rooms</InputLabel>
                                <Select
                                    id="passengers-rooms"
                                    labelId="passengers-rooms-label"
                                    value={`${searchParams.adults} Adults, ${searchParams.children} Children, ${searchParams.rooms} Rooms`}
                                    onChange={(e) => {
                                        const [adults, children, rooms] = e.target.value.split(', ').map(str => parseInt(str.split(' ')[0]));
                                        setSearchParams({
                                            ...searchParams,
                                            adults: adults || 1,
                                            children: children || 0,
                                            rooms: rooms || 1
                                        });
                                    }}
                                    label="Passengers & Rooms"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                        <MenuItem key={num} value={`${num} Adults, 0 Children, 1 Room`}>
                                            {`${num} Adults, 0 Children, 1 Room`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Switch checked={includeAccommodation} onChange={(e) => setIncludeAccommodation(e.target.checked)} />}
                            label="Include Accommodation"
                        />
                    </Grid>
                    {includeAccommodation && (
                        <Grid item xs={12}>
                            <Typography variant="body2">Additional fields for accommodation booking will appear here.</Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Switch checked={showAdvancedSearch} onChange={(e) => setShowAdvancedSearch(e.target.checked)} />}
                            label="Advanced Search"
                        />
                    </Grid>
                    {showAdvancedSearch && (
                        <Grid item xs={12}>
                            <Typography variant="h6">Advanced Search Options</Typography>
                            <FormControl fullWidth>
                                <InputLabel id="travel-class-label" htmlFor="travel-class">Travel Class</InputLabel>
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
                            {transitLocations.map((transit, index) => (
                                <Grid container spacing={2} key={index}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id={`transit-location-${index}`}
                                            label="Transit Location"
                                            value={transit.location}
                                            onChange={(e) => {
                                                const newTransitLocations = [...transitLocations];
                                                newTransitLocations[index].location = e.target.value;
                                                setTransitLocations(newTransitLocations);
                                            }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                id={`transit-from-date-${index}`}
                                                label="From Date"
                                                value={transit.fromDate}
                                                onChange={(newValue) => {
                                                    const newTransitLocations = [...transitLocations];
                                                    newTransitLocations[index].fromDate = newValue;
                                                    setTransitLocations(newTransitLocations);
                                                }}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                id={`transit-to-date-${index}`}
                                                label="To Date"
                                                value={transit.toDate}
                                                onChange={(newValue) => {
                                                    const newTransitLocations = [...transitLocations];
                                                    newTransitLocations[index].toDate = newValue;
                                                    setTransitLocations(newTransitLocations);
                                                }}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button onClick={addTransitLocation} variant="outlined" startIcon={<Add />}>Add Transit</Button>
                        </Grid>
                    )}
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
                                {loading ? 'Searching...' : "Let's Go"}
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