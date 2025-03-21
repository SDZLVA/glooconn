const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController');

// Search accommodations
router.get('/search', accommodationController.searchAccommodations);

// Get accommodation by ID
router.get('/:id', accommodationController.getAccommodationById);

// Create new accommodation
router.post('/', accommodationController.createAccommodation);

// Update accommodation
router.put('/:id', accommodationController.updateAccommodation);

// Delete accommodation
router.delete('/:id', accommodationController.deleteAccommodation);

// Add review to accommodation
router.post('/:id/reviews', accommodationController.addReview);

module.exports = router; 