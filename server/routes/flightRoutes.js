const express = require('express');
const router = express.Router();
const { airports, searchAirports } = require('../data/airports');

// Search airports endpoint
router.get('/airports/search', (req, res) => {
  const { query } = req.query;
  
  if (!query || query.length < 2) {
    return res.json([]);
  }

  const results = searchAirports(query);
  res.json(results);
});

module.exports = router; 