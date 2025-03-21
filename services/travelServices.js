const axios = require('axios');
const apiConfig = require('../config/api');
const { searchFlightOffers } = require('./flightServices');

// Hotel Booking Services
const getHotels = async (location, checkIn, checkOut, guests) => {
  try {
    // Booking.com API call
    const bookingResponse = await axios.get(`${apiConfig.hotels.booking.baseUrl}${apiConfig.hotels.booking.endpoints.search}`, {
      params: {
        location,
        checkin_date: checkIn,
        checkout_date: checkOut,
        adults: guests
      },
      headers: {
        'X-RapidAPI-Key': apiConfig.hotels.booking.apiKey,
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
    });

    // Hotels.com API call
    const hotelsResponse = await axios.get(`${apiConfig.hotels.hotels.baseUrl}${apiConfig.hotels.hotels.endpoints.search}`, {
      params: {
        q: location,
        checkin: checkIn,
        checkout: checkOut,
        adults: guests
      },
      headers: {
        'X-RapidAPI-Key': apiConfig.hotels.hotels.apiKey,
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    });

    return {
      booking: bookingResponse.data,
      hotels: hotelsResponse.data
    };
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

// Transportation Services
const getTransportation = async (origin, destination, date, returnDate) => {
  try {
    // Skyscanner API call for flights
    const flightsResponse = await searchFlightOffers({
      origin,
      destination,
      departureDate: date,
      returnDate,
      adults: 1,
      travelClass: 'ECONOMY',
      currencyCode: 'USD'
    });

    // Trainline API call for trains
    const trainsResponse = await axios.get(`${apiConfig.transportation.trainline.baseUrl}${apiConfig.transportation.trainline.endpoints.search}`, {
      params: {
        from: origin,
        to: destination,
        date: date
      },
      headers: {
        'X-RapidAPI-Key': apiConfig.transportation.trainline.apiKey,
        'X-RapidAPI-Host': 'trainline.p.rapidapi.com'
      }
    });

    return {
      flights: flightsResponse.flights,
      trains: trainsResponse.data
    };
  } catch (error) {
    console.error('Error fetching transportation:', error);
    throw error;
  }
};

// Places and Reviews Services
const getPlacesAndReviews = async (location, radius = 5000) => {
  try {
    // Google Places API call for attractions and restaurants
    const placesResponse = await axios.get(`${apiConfig.places.google.baseUrl}${apiConfig.places.google.endpoints.places}`, {
      params: {
        location,
        radius,
        type: 'tourist_attraction',
        key: apiConfig.places.google.apiKey
      }
    });

    // TripAdvisor API call for reviews
    const tripAdvisorResponse = await axios.get(`${apiConfig.places.tripadvisor.baseUrl}${apiConfig.places.tripadvisor.endpoints.search}`, {
      params: {
        query: location,
        limit: 10
      },
      headers: {
        'X-RapidAPI-Key': apiConfig.places.tripadvisor.apiKey,
        'X-RapidAPI-Host': 'tripadvisor1.p.rapidapi.com'
      }
    });

    return {
      attractions: placesResponse.data.results,
      reviews: tripAdvisorResponse.data
    };
  } catch (error) {
    console.error('Error fetching places and reviews:', error);
    throw error;
  }
};

module.exports = {
  getHotels,
  getTransportation,
  getPlacesAndReviews
}; 