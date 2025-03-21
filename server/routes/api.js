const express = require('express');
const router = express.Router();
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: 'G4VYIdyB5yASsZmIxJcNDBAFWlc8Vy4i',
  clientSecret: 'QeFAYdpxwPKiXpZr'
});

// Search for airports and cities
router.get('/locations', async (req, res) => {
  try {
    const { keyword } = req.query;
    
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword parameter is required' });
    }

    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.any,
      page: {
        limit: 10
      },
      view: 'LIGHT'
    });

    // Transform the response to match our frontend format
    const locations = response.data.map(location => ({
      code: location.iataCode,
      city: location.address.cityName,
      name: location.name,
      country: location.address.countryName,
      subType: location.subType
    }));

    res.json(locations);
  } catch (error) {
    console.error('Error searching locations:', error);
    res.status(500).json({ error: 'Failed to search locations' });
  }
});

// Search for flight offers
router.get('/flight-offers', async (req, res) => {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      ...req.query
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching flight offers:', error);
    res.status(500).json({ error: 'Failed to search flight offers' });
  }
});

module.exports = router; 