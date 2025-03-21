require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { getHotels, getTransportation, getPlacesAndReviews } = require('./services/travelServices');
const { getWeatherData, getWeatherForecast } = require('./services/weatherService');
const accommodationRoutes = require('./routes/accommodationRoutes');
const flightRoutes = require('./routes/flightRoutes');
const axios = require('axios');
const apiConfig = require('./config/api');

// Initialize Stripe only if the key exists
const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      console.log('Continuing without MongoDB connection...');
    });
} else {
  console.log('MONGODB_URI not found in environment variables. Continuing without MongoDB connection...');
}

// Routes
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/flights', flightRoutes);

// Location suggestions endpoint
app.get('/api/suggestions', async (req, res) => {
  try {
    const { query } = req.query;
    console.log('Received query:', query);

    if (!query || query.length < 1) {
      console.log('No query provided, returning empty array');
      return res.json([]);
    }

    // Get Amadeus access token
    const token = await getAmadeusToken();
    
    // Call Amadeus API for location search
    const response = await axios.get(`${AMADEUS_BASE_URL}/v1/reference-data/locations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      params: {
        subType: 'AIRPORT,CITY',
        keyword: query,
        page: { limit: 10 }
      }
    });

    // Transform Amadeus response to match our frontend format
    const suggestions = response.data.data.map(location => ({
      id: location.id,
      name: `${location.address.cityName || ''} ${location.address.countryName ? `(${location.address.countryName})` : ''}`,
      type: location.subType.toLowerCase(),
      code: location.iataCode || '',
      city: location.address.cityName || '',
      country: location.address.countryName || ''
    }));

    console.log('Sending suggestions:', suggestions);
    res.json(suggestions);
  } catch (error) {
    console.error('Error in suggestions endpoint:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

// Routes
app.post('/api/search', async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, origin } = req.body;
    
    // Validate required fields
    if (!destination || !startDate || !endDate || !budget || !origin) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['origin', 'destination', 'startDate', 'endDate', 'budget']
      });
    }

    try {
      // Get transportation options first
      const transportation = await getTransportation(origin, destination, startDate, endDate);
      
      // Only proceed with other searches if transportation is available
      if (!transportation || (!transportation.flights && !transportation.trains)) {
        throw new Error('No transportation options available for the selected route and dates');
      }

      // Get hotels from multiple sources
      const hotels = await getHotels(destination, startDate, endDate, 2);
      
      // Get places and reviews
      const placesAndReviews = await getPlacesAndReviews(destination);

      // Calculate costs
      const hotelCosts = calculateHotelCosts(hotels);
      const transportationCosts = calculateTransportationCosts(transportation);
      const activityCosts = calculateActivityCosts(placesAndReviews);
      const totalCost = hotelCosts + transportationCosts + activityCosts;

      // Combine all results
      const response = {
        hotels: hotels,
        transportation: transportation,
        places: placesAndReviews.attractions,
        reviews: placesAndReviews.reviews,
        budgetAnalysis: {
          totalCost,
          withinBudget: totalCost <= budget,
          breakdown: {
            hotels: hotelCosts,
            transportation: transportationCosts,
            activities: activityCosts
          },
          suggestions: generateBudgetSuggestions(totalCost, budget, {
            hotels: hotelCosts,
            transportation: transportationCosts,
            activities: activityCosts
          })
        }
      };

      res.json(response);
    } catch (error) {
      // Log the specific error for debugging
      console.error('Service error:', error);
      
      // Send a more specific error message based on the error type
      if (error.message.includes('No transportation options')) {
        res.status(404).json({ error: error.message });
      } else if (error.response?.status === 429) {
        res.status(429).json({ error: 'Too many requests. Please try again later.' });
      } else if (error.response?.data?.message) {
        res.status(error.response.status || 500).json({ error: error.response.data.message });
      } else {
        res.status(500).json({ error: 'Failed to search for travel options. Please try again.' });
      }
    }
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
});

// Helper functions for budget calculations
const calculateTotalCost = (hotels, transportation, placesAndReviews) => {
  return (
    calculateHotelCosts(hotels) +
    calculateTransportationCosts(transportation) +
    calculateActivityCosts(placesAndReviews)
  );
};

const calculateHotelCosts = (hotels) => {
  if (!hotels || !hotels.booking || !hotels.hotels) return 0;
  
  const bookingCosts = hotels.booking.results?.reduce((sum, hotel) => 
    sum + (hotel.price?.total || 0), 0) || 0;
  
  const hotelsCosts = hotels.hotels.results?.reduce((sum, hotel) => 
    sum + (hotel.price?.total || 0), 0) || 0;
  
  return (bookingCosts + hotelsCosts) / 2; // Average of both sources
};

const calculateTransportationCosts = (transportation) => {
  if (!transportation || !transportation.flights || !transportation.trains) return 0;
  
  const flightCosts = transportation.flights.quotes?.reduce((sum, flight) => 
    sum + (flight.minPrice || 0), 0) || 0;
  
  const trainCosts = transportation.trains.routes?.reduce((sum, train) => 
    sum + (train.price || 0), 0) || 0;
  
  return Math.min(flightCosts, trainCosts); // Use the cheaper option
};

const calculateActivityCosts = (placesAndReviews) => {
  if (!placesAndReviews || !placesAndReviews.attractions) return 0;
  
  return placesAndReviews.attractions.reduce((sum, attraction) => 
    sum + (attraction.price_level || 0), 0);
};

const generateBudgetSuggestions = (totalCost, budget, breakdown) => {
  const suggestions = [];
  
  if (totalCost > budget) {
    const overBudget = totalCost - budget;
    
    if (breakdown.hotels > overBudget) {
      suggestions.push({
        type: 'hotels',
        message: `Consider staying at a more budget-friendly hotel to save $${overBudget.toFixed(2)}`,
        potentialSavings: overBudget
      });
    }
    
    if (breakdown.transportation > overBudget) {
      suggestions.push({
        type: 'transportation',
        message: `Look for alternative transportation options to save $${overBudget.toFixed(2)}`,
        potentialSavings: overBudget
      });
    }
    
    if (breakdown.activities > overBudget) {
      suggestions.push({
        type: 'activities',
        message: `Reduce planned activities to save $${overBudget.toFixed(2)}`,
        potentialSavings: overBudget
      });
    }
  }
  
  return suggestions;
};

// Add a new route for getting alternative suggestions
app.post('/api/alternatives', async (req, res) => {
  try {
    const { destination, budget } = req.body;
    
    const mockAlternatives = {
      nearbyDestinations: [
        {
          name: 'Alternative City 1',
          distance: '100km',
          estimatedSavings: '30%',
          highlights: ['Beach', 'Historic Sites']
        },
        {
          name: 'Alternative City 2',
          distance: '150km',
          estimatedSavings: '25%',
          highlights: ['Mountains', 'Local Culture']
        }
      ],
      flexibleDateSuggestions: [
        {
          dates: 'Mid-week in 2 weeks',
          estimatedSavings: '20%',
          availability: 'High'
        },
        {
          dates: 'Next month',
          estimatedSavings: '15%',
          availability: 'Medium'
        }
      ]
    };

    res.json(mockAlternatives);
  } catch (error) {
    console.error('Alternatives error:', error);
    res.status(500).json({ error: 'Failed to get alternative suggestions' });
  }
});

// Payment Routes
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amounts in cents
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

app.post('/api/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      res.json({ success: true, paymentIntent });
    } else {
      res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

// Weather API routes
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/weather/forecast', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    const forecastData = await getWeatherForecast(city);
    res.json(forecastData);
  } catch (error) {
    console.error('Weather forecast API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather forecast' });
  }
});

// Flight-related endpoints
app.get('/api/flights/:flightId/details', async (req, res) => {
  try {
    const details = await getFlightDetails(req.params.flightId);
    res.json(details);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/flights/:flightId/seatmap', async (req, res) => {
  try {
    const seatMap = await getSeatMap(req.params.flightId);
    res.json(seatMap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/flights/price-analysis', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    const analysis = await getPriceAnalysis(origin, destination, date);
    res.json(analysis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/flights/airlines/:code', async (req, res) => {
  try {
    const info = await getAirlineInfo(req.params.code);
    res.json(info);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/flights/status/:flightNumber', async (req, res) => {
  try {
    const { date } = req.query;
    const status = await getFlightStatus(req.params.flightNumber, date);
    res.json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/flights/airports/:code', async (req, res) => {
  try {
    const info = await getAirportInfo(req.params.code);
    res.json(info);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 