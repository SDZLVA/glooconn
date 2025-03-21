const axios = require('axios');
const apiConfig = require('../config/api');
const Amadeus = require('amadeus');

// Initialize Amadeus client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  environment: process.env.AMADEUS_ENV === 'production' ? 'production' : 'test'
});

// Get Amadeus access token
const getAmadeusToken = async () => {
  try {
    const response = await axios.post(`${process.env.AMADEUS_BASE_URL}/v1/security/oauth2/token`, 
      `grant_type=client_credentials&client_id=${process.env.AMADEUS_CLIENT_ID}&client_secret=${process.env.AMADEUS_CLIENT_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Amadeus token:', error);
    throw new Error('Failed to get Amadeus access token');
  }
};

const searchFlightOffersAmadeus = async (params) => {
  try {
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      adults = 1,
      children = 0,
      travelClass = 'ECONOMY',
      nonStop = false,
      currencyCode = 'USD',
      maxPrice,
      maxResults = 50
    } = params;

    // Validate IATA codes
    if (!origin?.match(/^[A-Z]{3}$/) || !destination?.match(/^[A-Z]{3}$/)) {
      throw new Error('Invalid origin or destination airport code. Please use IATA airport codes (e.g., LHR, JFK).');
    }

    // Prepare search parameters for Amadeus
    const searchParams = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      children,
      currencyCode,
      max: maxResults,
      nonStop
    };

    // Add return date if round trip
    if (returnDate) {
      searchParams.returnDate = returnDate;
    }

    // Add travel class
    searchParams.travelClass = travelClass.toUpperCase();

    // Search flights using Amadeus API
    const response = await amadeus.shopping.flightOffersSearch.get(searchParams);

    if (!response.data || response.data.length === 0) {
      throw new Error('No flights found for the specified route and dates.');
    }

    // Process and format the response
    const flights = response.data.map(offer => {
      const firstSegment = offer.itineraries[0].segments[0];
      const lastSegment = offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1];

      return {
        id: offer.id,
        price: {
          amount: parseFloat(offer.price.total),
          currency: offer.price.currency
        },
        carrier: {
          name: firstSegment.carrierCode,
          logo: `https://www.gstatic.com/flights/airline_logos/70px/${firstSegment.carrierCode}.png`
        },
        departure: {
          airport: firstSegment.departure.iataCode,
          date: firstSegment.departure.at
        },
        arrival: {
          airport: lastSegment.arrival.iataCode,
          date: lastSegment.arrival.at
        },
        duration: offer.itineraries[0].duration,
        stops: offer.itineraries[0].segments.length - 1,
        direct: offer.itineraries[0].segments.length === 1,
        class: travelClass
      };
    });

    // Filter by max price if specified
    const filteredFlights = maxPrice 
      ? flights.filter(flight => flight.price.amount <= maxPrice)
      : flights;

    // Sort by price
    const sortedFlights = filteredFlights.sort((a, b) => a.price.amount - b.price.amount);

    return {
      flights: sortedFlights.slice(0, maxResults),
      meta: {
        currency: currencyCode,
        total: sortedFlights.length,
        filters: {
          maxPrice,
          nonStop,
          travelClass
        }
      }
    };
  } catch (error) {
    console.error('Error searching flight offers with Amadeus:', error);
    throw error;
  }
};

const searchFlightOffersSkyscanner = async (params) => {
  try {
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      adults = 1,
      children = 0,
      travelClass = 'ECONOMY',
      nonStop = false,
      currencyCode = 'USD',
      maxPrice,
      maxResults = 50
    } = params;

    // Validate IATA codes
    if (!origin?.match(/^[A-Z]{3}$/) || !destination?.match(/^[A-Z]{3}$/)) {
      throw new Error('Invalid origin or destination airport code. Please use IATA airport codes (e.g., LHR, JFK).');
    }

    // Validate dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const departureDateTime = new Date(departureDate);
    const returnDateTime = returnDate ? new Date(returnDate) : null;

    if (isNaN(departureDateTime.getTime())) {
      throw new Error('Invalid departure date format. Please use YYYY-MM-DD format.');
    }

    if (departureDateTime < today) {
      throw new Error('Departure date cannot be in the past.');
    }

    if (returnDateTime) {
      if (isNaN(returnDateTime.getTime())) {
        throw new Error('Invalid return date format. Please use YYYY-MM-DD format.');
      }
      if (returnDateTime < departureDateTime) {
        throw new Error('Return date must be after departure date.');
      }
    }

    // Initial search request
    const searchParams = {
      query: {
        market: 'US',
        locale: 'en-US',
        currency: currencyCode,
        queryLegs: [{
          originPlaceId: { iata: origin },
          destinationPlaceId: { iata: destination },
          date: {
            year: parseInt(departureDate.split('-')[0]),
            month: parseInt(departureDate.split('-')[1]),
            day: parseInt(departureDate.split('-')[2])
          }
        }],
        cabinClass: travelClass.toUpperCase(),
        adults,
        childrenAges: Array(children).fill(10),
        excludedCarriers: [],
        excludedStops: nonStop ? [1, 2, 3] : [],
        excludedAgents: [],
        includedAgents: []
      }
    };

    if (returnDate) {
      searchParams.query.queryLegs.push({
        originPlaceId: { iata: destination },
        destinationPlaceId: { iata: origin },
        date: {
          year: parseInt(returnDate.split('-')[0]),
          month: parseInt(returnDate.split('-')[1]),
          day: parseInt(returnDate.split('-')[2])
        }
      });
    }

    // Create search session
    let createSession;
    try {
      createSession = await axios.post(
        `${apiConfig.transportation.skyscanner.baseUrl}/v3/flights/live/search/create`,
        searchParams,
        {
          headers: {
            'X-RapidAPI-Key': apiConfig.transportation.skyscanner.apiKey,
            'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com',
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      throw new Error(error.response?.data?.message || 'Failed to create flight search session');
    }

    if (!createSession.data.sessionToken) {
      throw new Error('Failed to create search session: No session token received');
    }

    // Poll for results
    const sessionToken = createSession.data.sessionToken;
    let attempts = 0;
    let results = null;

    while (attempts < 3) {
      try {
        const pollResponse = await axios.get(
          `${apiConfig.transportation.skyscanner.baseUrl}/v3/flights/live/search/poll/${sessionToken}`,
          {
            headers: {
              'X-RapidAPI-Key': apiConfig.transportation.skyscanner.apiKey,
              'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
            }
          }
        );

        if (pollResponse.data.status === 'RESULT_STATUS_COMPLETE') {
          results = pollResponse.data;
          break;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      } catch (error) {
        console.error('Error polling for results:', error);
        throw new Error('Failed to retrieve flight search results. Please try again.');
      }
    }

    if (!results || !results.itineraries || results.itineraries.length === 0) {
      throw new Error('No flights found for the specified route and dates.');
    }

    // Process and format the response
    const flights = results.itineraries.map(itinerary => {
      const pricingOption = itinerary.pricingOptions[0];
      const leg = itinerary.legs[0];
      
      return {
        id: itinerary.id,
        price: {
          amount: pricingOption.price.amount,
          currency: pricingOption.price.currency
        },
        carrier: {
          name: leg.carriers[0]?.name || 'Unknown',
          logo: leg.carriers[0]?.imageUrl
        },
        departure: {
          airport: leg.origin.name,
          city: leg.origin.city,
          date: leg.departure
        },
        arrival: {
          airport: leg.destination.name,
          city: leg.destination.city,
          date: leg.arrival
        },
        duration: leg.duration,
        stops: leg.stopCount,
        direct: leg.stopCount === 0,
        class: travelClass
      };
    });

    // Filter by max price if specified
    const filteredFlights = maxPrice 
      ? flights.filter(flight => flight.price.amount <= maxPrice)
      : flights;

    // Sort by price
    const sortedFlights = filteredFlights.sort((a, b) => a.price.amount - b.price.amount);

    return {
      flights: sortedFlights.slice(0, maxResults),
      meta: {
        currency: currencyCode,
        total: sortedFlights.length,
        filters: {
          maxPrice,
          nonStop,
          travelClass
        }
      }
    };
  } catch (error) {
    console.error('Error searching flight offers:', error);
    throw error; // Propagate the error with its original message
  }
};

const searchFlightOffers = async (params) => {
  try {
    // Try Amadeus first
    try {
      return await searchFlightOffersAmadeus(params);
    } catch (amadeusError) {
      console.warn('Amadeus search failed, falling back to Skyscanner:', amadeusError);
      // Fall back to Skyscanner if Amadeus fails
      return await searchFlightOffersSkyscanner(params);
    }
  } catch (error) {
    throw error;
  }
};

// Get seat map for a specific flight offer
const getSeatMap = async (flightOfferId) => {
  try {
    const response = await amadeus.shopping.seatMaps.get({
      flightOrderId: flightOfferId
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('Seat map not available for this flight.');
    }

    return response.data.map(seatMap => ({
      cabin: seatMap.cabin,
      deck: seatMap.deck,
      seatLayout: seatMap.decks[0].deckConfiguration.startWingsX,
      seats: seatMap.decks[0].seats.map(seat => ({
        number: seat.number,
        cabin: seat.cabin,
        characteristics: seat.characteristicsCodes,
        available: seat.travelerPricing ? true : false,
        price: seat.travelerPricing ? {
          amount: seat.travelerPricing[0].price.total,
          currency: seat.travelerPricing[0].price.currency
        } : null
      }))
    }));
  } catch (error) {
    console.error('Error fetching seat map:', error);
    throw error;
  }
};

// Get price analysis for a route
const getPriceAnalysis = async (origin, destination, departureDate) => {
  try {
    const response = await amadeus.analytics.itineraryPriceMetrics.get({
      originIataCode: origin,
      destinationIataCode: destination,
      departureDate
    });

    if (!response.data) {
      throw new Error('Price analysis not available for this route.');
    }

    return {
      priceMetrics: {
        minimum: response.data.priceMetrics.minimum,
        maximum: response.data.priceMetrics.maximum,
        median: response.data.priceMetrics.median,
        firstQuartile: response.data.priceMetrics.firstQuartile,
        thirdQuartile: response.data.priceMetrics.thirdQuartile
      },
      currencyCode: response.data.currencyCode
    };
  } catch (error) {
    console.error('Error fetching price analysis:', error);
    throw error;
  }
};

// Get airline information
const getAirlineInfo = async (airlineCode) => {
  try {
    const response = await amadeus.referenceData.airlines.get({
      airlineCodes: airlineCode
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('Airline information not found.');
    }

    return {
      name: response.data[0].commonName,
      iataCode: response.data[0].iataCode,
      icaoCode: response.data[0].icaoCode,
      businessName: response.data[0].businessName
    };
  } catch (error) {
    console.error('Error fetching airline information:', error);
    throw error;
  }
};

// Get flight status
const getFlightStatus = async (flightNumber, date) => {
  try {
    const response = await amadeus.schedule.flights.get({
      carrierCode: flightNumber.substring(0, 2),
      flightNumber: flightNumber.substring(2),
      scheduledDepartureDate: date
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('Flight status not available.');
    }

    return response.data.map(flight => ({
      departure: {
        airport: flight.departure.iataCode,
        terminal: flight.departure.terminal,
        time: flight.departure.at
      },
      arrival: {
        airport: flight.arrival.iataCode,
        terminal: flight.arrival.terminal,
        time: flight.arrival.at
      },
      aircraft: flight.aircraft.code,
      status: flight.status,
      codeshare: flight.codeshared
    }));
  } catch (error) {
    console.error('Error fetching flight status:', error);
    throw error;
  }
};

// Get airport information
const getAirportInfo = async (airportCode) => {
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: airportCode,
      subType: 'AIRPORT'
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('Airport information not found.');
    }

    const airport = response.data[0];
    return {
      name: airport.name,
      iataCode: airport.iataCode,
      city: airport.address.cityName,
      country: airport.address.countryName,
      location: {
        latitude: airport.geoCode.latitude,
        longitude: airport.geoCode.longitude
      },
      timezone: airport.timeZoneOffset
    };
  } catch (error) {
    console.error('Error fetching airport information:', error);
    throw error;
  }
};

// Enhanced getFlightDetails function
const getFlightDetails = async (flightId) => {
  try {
    const flight = await searchFlightOffersAmadeus({ flightId });
    if (!flight) {
      throw new Error('Flight not found');
    }

    // Get additional information
    const [seatMap, priceAnalysis, airlineInfo, flightStatus, departureAirport, arrivalAirport] = await Promise.all([
      getSeatMap(flightId),
      getPriceAnalysis(flight.departure.airport, flight.arrival.airport, flight.departure.date),
      getAirlineInfo(flight.carrier.code),
      getFlightStatus(flight.carrier.code + flight.flightNumber, flight.departure.date),
      getAirportInfo(flight.departure.airport),
      getAirportInfo(flight.arrival.airport)
    ]);

    return {
      ...flight,
      seatMap,
      priceAnalysis,
      airline: airlineInfo,
      status: flightStatus,
      airports: {
        departure: departureAirport,
        arrival: arrivalAirport
      }
    };
  } catch (error) {
    console.error('Error fetching flight details:', error);
    throw error;
  }
};

module.exports = {
  searchFlightOffers,
  searchFlightOffersAmadeus,
  searchFlightOffersSkyscanner: searchFlightOffers,
  getFlightDetails,
  getSeatMap,
  getPriceAnalysis,
  getAirlineInfo,
  getFlightStatus,
  getAirportInfo
}; 