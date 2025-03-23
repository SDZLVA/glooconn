import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  config => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      params: config.params,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  response => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

const api = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Flight endpoints
  searchFlights: async (params) => {
    return api.get('/api/flights/search', params);
  },

  searchAirports: async (query) => {
    if (!query || query.length < 1) {
      return [];
    }
    try {
      const results = await api.get('/api/flights/airports/search', { query });
      return results.filter(airport => airport.code && airport.name);
    } catch (error) {
      console.error('Error searching airports:', error);
      return [];
    }
  },

  // Accommodation endpoints
  searchAccommodations: async (params) => {
    return api.get('/api/accommodations/search', params);
  },

  getAccommodationById: async (id) => {
    return api.get(`/api/accommodations/${id}`);
  },

  createAccommodation: async (data) => {
    const response = await axiosInstance.post('/api/accommodations', data);
    return response.data;
  },

  updateAccommodation: async (id, data) => {
    const response = await axiosInstance.put(`/api/accommodations/${id}`, data);
    return response.data;
  },

  deleteAccommodation: async (id) => {
    const response = await axiosInstance.delete(`/api/accommodations/${id}`);
    return response.data;
  },

  addAccommodationReview: async (id, data) => {
    const response = await axiosInstance.post(`/api/accommodations/${id}/reviews`, data);
    return response.data;
  },

  // Travel options endpoints
  getTravelOptions: async (params) => {
    return api.get('/api/travel-options', params);
  },

  getAlternativeRoutes: async (params) => {
    return api.get('/api/alternative-routes', params);
  },

  // Activity endpoints
  getActivities: async (params) => {
    return api.get('/api/activities', params);
  }
};

export default api; 