const express = require('express');
const router = express.Router();
const Amadeus = require('amadeus');
const { getAmadeusToken } = require('../services/flightServices');
const axios = require('axios');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  hostname: process.env.AMADEUS_ENV === 'production' ? 'production' : 'test'
});

// Get Amadeus access token
router.get('/token', async (req, res) => {
  try {
    const token = await getAmadeusToken();
    res.json({ access_token: token });
  } catch (error) {
    console.error('Error getting Amadeus token:', error);
    res.status(500).json({ error: 'Failed to get access token' });
  }
});

// Search airports
router.get('/airports/search', async (req, res) => {
  try {
    const { query } = req.query;
    console.log('Searching airports for query:', query);
    if (!query || query.length < 1) {
      return res.json([]);
    }

    // Get Amadeus access token
    const token = await getAmadeusToken();
    console.log('Amadeus token retrieved:', token);
    
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

    console.log('Amadeus API response:', response.data);

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

// Search flight offers
router.get('/search', async (req, res) => {
  try {
    const { origin, destination, departureDate, adults, children, infants } = req.query;

    if (!origin || !destination || !departureDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: parseInt(adults) || 1,
      children: parseInt(children) || 0,
      infants: parseInt(infants) || 0,
      currencyCode: 'USD',
      max: 20
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error searching flights:', error);
    if (error.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    } else {
      res.status(500).json({ error: 'Failed to search flights' });
    }
  }
});

// Get seat map
router.get('/:offerId/seatmap', async (req, res) => {
  try {
    const { offerId } = req.params;
    const response = await amadeus.shopping.seatmaps.get({
      flightOrderId: offerId
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting seat map:', error);
    res.status(500).json({ error: 'Failed to get seat map' });
  }
});

// Get price analysis
router.get('/price-analysis', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    const response = await amadeus.analytics.itineraryPriceMetrics.get({
      originIataCode: origin,
      destinationIataCode: destination,
      departureDate: date
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting price analysis:', error);
    res.status(500).json({ error: 'Failed to get price analysis' });
  }
});

// Get flight status
router.get('/status/:flightNumber', async (req, res) => {
  try {
    const { flightNumber } = req.params;
    const { date } = req.query;
    const response = await amadeus.schedule.flights.get({
      carrierCode: flightNumber.substring(0, 2),
      flightNumber: flightNumber.substring(2),
      scheduledDepartureDate: date
    });
    res.json(response.data[0] || null);
  } catch (error) {
    console.error('Error getting flight status:', error);
    res.status(500).json({ error: 'Failed to get flight status' });
  }
});

// Get airport info
router.get('/airports/:iataCode', async (req, res) => {
  try {
    const { iataCode } = req.params;
    const response = await amadeus.referenceData.locations.get({
      subType: 'AIRPORT',
      keyword: iataCode,
      view: 'FULL'
    });
    res.json(response.data[0] || null);
  } catch (error) {
    console.error('Error getting airport info:', error);
    res.status(500).json({ error: 'Failed to get airport info' });
  }
});

module.exports = router; 