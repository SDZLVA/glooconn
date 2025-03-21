import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const searchFlights = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/api/flights/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

export const getFlightDetails = async (flightId) => {
  try {
    const response = await axios.get(`${API_URL}/api/flights/details/${flightId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flight details:', error);
    throw error;
  }
}; 