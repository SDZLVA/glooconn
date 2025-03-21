const axios = require('axios');
const apiConfig = require('../config/api');

const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${apiConfig.weather.openweather.baseUrl}${apiConfig.weather.openweather.endpoints.current}`, {
      params: {
        q: city,
        appid: apiConfig.weather.openweather.apiKey,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const getWeatherForecast = async (city) => {
  try {
    const response = await axios.get(`${apiConfig.weather.openweather.baseUrl}${apiConfig.weather.openweather.endpoints.forecast}`, {
      params: {
        q: city,
        appid: apiConfig.weather.openweather.apiKey,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

module.exports = {
  getWeatherData,
  getWeatherForecast
}; 