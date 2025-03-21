import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${API_URL}/api/weather`, {
      params: { city }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherForecast = async (city) => {
  try {
    const response = await axios.get(`${API_URL}/api/weather/forecast`, {
      params: { city }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}; 