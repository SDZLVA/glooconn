const express = require('express');
const router = express.Router();
const {
  searchFlightOffers,
  getFlightDetails,
  getSeatMap,
  getPriceAnalysis,
  getAirlineInfo,
  getFlightStatus,
  getAirportInfo
} = require('../services/flightServices');
const axios = require('axios');

// Search flight offers
router.get('/search', async (req, res) => {
  try {
    const results = await searchFlightOffers(req.query);
    res.json(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get detailed flight information
router.get('/:flightId/details', async (req, res) => {
  try {
    const details = await getFlightDetails(req.params.flightId);
    res.json(details);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get seat map for a specific flight
router.get('/:flightId/seatmap', async (req, res) => {
  try {
    const seatMap = await getSeatMap(req.params.flightId);
    res.json(seatMap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get price analysis for a route
router.get('/price-analysis', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    const analysis = await getPriceAnalysis(origin, destination, date);
    res.json(analysis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get airline information
router.get('/airlines/:code', async (req, res) => {
  try {
    const info = await getAirlineInfo(req.params.code);
    res.json(info);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get flight status
router.get('/status/:flightNumber', async (req, res) => {
  try {
    const { date } = req.query;
    const status = await getFlightStatus(req.params.flightNumber, date);
    res.json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get airport information
router.get('/airports/:code', async (req, res) => {
  try {
    const info = await getAirportInfo(req.params.code);
    res.json(info);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search airports
router.get('/airports/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 1) {
      return res.json([]);
    }

    // Get Amadeus access token
    const token = await getAmadeusToken();
    
    // Call Amadeus API for location search
    const response = await axios.get(`${process.env.AMADEUS_BASE_URL}/v1/reference-data/locations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      params: {
        subType: 'AIRPORT',
        keyword: query,
        page: { limit: 10 }
      }
    });

    // Transform Amadeus response to match our frontend format
    const airports = response.data.data.map(location => ({
      id: location.id,
      code: location.iataCode || '',
      name: location.address.cityName || '',
      city: location.address.cityName || '',
      country: location.address.countryName || ''
    }));

    res.json(airports);
  } catch (error) {
    console.error('Error searching airports:', error);
    
    // Handle rate limiting
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again in a few seconds.' 
      });
    }

    // Handle other errors
    res.status(500).json({ 
      error: 'Failed to search airports',
      message: error.message 
    });
  }
});

module.exports = router; 