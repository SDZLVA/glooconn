import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class AmadeusService {
  constructor() {
    this.baseURL = API_URL;
  }

  async getAccessToken() {
    try {
      const response = await axios.post(`${this.baseURL}/api/flights/token`);
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  async makeAuthenticatedRequest(endpoint, params = {}) {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error making authenticated request:', error);
      throw error;
    }
  }

  async searchFlightOffers(params) {
    try {
      const response = await axios.get(`${this.baseURL}/api/flights/search`, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching flight offers:', error);
      throw error;
    }
  }

  async searchAirports(query) {
    if (!query || query.length < 1) {
      return [];
    }
    try {
      const response = await axios.get(`${this.baseURL}/api/flights/airports/search`, {
        params: { query }
      });
      return response.data.filter(airport => airport.code && airport.name);
    } catch (error) {
      console.error('Error searching airports:', error);
      return [];
    }
  }

  async getSeatMap(flightOfferId) {
    try {
      const response = await axios.get(`${this.baseURL}/api/flights/${flightOfferId}/seatmap`);
      return response.data;
    } catch (error) {
      console.error('Error getting seat map:', error);
      throw error;
    }
  }

  async getPriceAnalysis(origin, destination, departureDate) {
    try {
      const response = await axios.get(`${this.baseURL}/api/flights/price-analysis`, {
        params: { origin, destination, date: departureDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting price analysis:', error);
      throw error;
    }
  }

  async getFlightStatus(flightNumber, date) {
    try {
      const response = await axios.get(`${this.baseURL}/api/flights/status/${flightNumber}`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting flight status:', error);
      throw error;
    }
  }

  async getAirportInfo(iataCode) {
    try {
      const response = await axios.get(`${this.baseURL}/api/flights/airports/${iataCode}`);
      return response.data;
    } catch (error) {
      console.error('Error getting airport info:', error);
      throw error;
    }
  }
}

const amadeusService = new AmadeusService();
export { amadeusService };
export default amadeusService; 