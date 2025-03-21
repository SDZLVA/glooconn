module.exports = {
  // Hotel Booking APIs
  hotels: {
    booking: {
      apiKey: process.env.BOOKING_API_KEY,
      baseUrl: 'https://booking-com.p.rapidapi.com/v1',
      endpoints: {
        search: '/hotels/search',
        details: '/hotels/details',
        reviews: '/hotels/reviews'
      }
    },
    hotels: {
      apiKey: process.env.HOTELS_API_KEY,
      baseUrl: 'https://hotels4.p.rapidapi.com',
      endpoints: {
        search: '/locations/v3/search',
        details: '/properties/v2/detail',
        reviews: '/reviews/v3/list'
      }
    }
  },
  
  // Transportation APIs
  transportation: {
    skyscanner: {
      apiKey: process.env.SKYSCANNER_API_KEY,
      baseUrl: 'https://skyscanner50.p.rapidapi.com',
      endpoints: {
        search: '/v3/flights/live/search/create',
        poll: '/v3/flights/live/search/poll',
        suggestions: '/v3/autosuggest/flights'
      }
    },
    trainline: {
      apiKey: process.env.TRAINLINE_API_KEY,
      baseUrl: 'https://trainline.p.rapidapi.com',
      endpoints: {
        search: '/search',
        routes: '/routes'
      }
    }
  },
  
  // Places and Reviews APIs
  places: {
    google: {
      apiKey: process.env.GOOGLE_PLACES_API_KEY,
      baseUrl: 'https://maps.googleapis.com/maps/api',
      endpoints: {
        places: '/place/nearbysearch/json',
        details: '/place/details/json',
        photos: '/place/photo'
      }
    },
    tripadvisor: {
      apiKey: process.env.TRIPADVISOR_API_KEY,
      baseUrl: 'https://tripadvisor1.p.rapidapi.com',
      endpoints: {
        search: '/locations/search',
        details: '/locations/details',
        reviews: '/reviews/list'
      }
    }
  }
}; 