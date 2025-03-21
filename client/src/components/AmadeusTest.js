import React, { useState } from 'react';
import { amadeusService } from '../services/amadeus';

const AmadeusTest = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testFlightSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await amadeusService.searchFlightOffers({
        origin: 'LHR',
        destination: 'JFK',
        departureDate: '2024-04-01',
        adults: 1,
        travelClass: 'ECONOMY'
      });
      setResults(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testAirportSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await amadeusService.searchAirports('London');
      setResults(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testPriceAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await amadeusService.getPriceAnalysis(
        'LHR',
        'JFK',
        '2024-04-01'
      );
      setResults(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="amadeus-test">
      <h2>Amadeus API Test</h2>
      
      <div className="test-buttons">
        <button onClick={testFlightSearch} disabled={loading}>
          Test Flight Search
        </button>
        <button onClick={testAirportSearch} disabled={loading}>
          Test Airport Search
        </button>
        <button onClick={testPriceAnalysis} disabled={loading}>
          Test Price Analysis
        </button>
      </div>

      {loading && <div>Loading...</div>}
      
      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      {results && (
        <div className="results">
          <h3>Results:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AmadeusTest; 