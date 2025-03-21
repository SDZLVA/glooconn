import React, { useState, useEffect, useRef } from 'react';
import { amadeusService } from '../services/amadeus';
import './LocationSearch.css';

const LocationSearch = ({ onSelect, placeholder, label }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const searchTimeout = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Handle click outside to close suggestions
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    console.log('Starting search for:', searchQuery);
    setIsLoading(true);
    setError(null);

    try {
      const results = await amadeusService.searchLocations(searchQuery);
      console.log('Search results received:', results);
      
      // Filter out results without necessary data
      const validResults = results.filter(result => 
        result.code && result.name && (result.city || result.country)
      );
      
      setSuggestions(validResults);
      setShowSuggestions(validResults.length > 0);
    } catch (error) {
      console.error('Error in component while searching locations:', error);
      setError('Failed to fetch locations. Please try again.');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log('Input changed to:', value);
    setQuery(value);
    setShowSuggestions(true);

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Only search if 2 or more characters
    if (value.length >= 2) {
      searchTimeout.current = setTimeout(() => {
        handleSearch(value);
      }, 500); // Increased debounce time to 500ms
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const displayValue = `${suggestion.name} (${suggestion.code})`;
    setQuery(displayValue);
    setShowSuggestions(false);
    onSelect(suggestion);
  };

  return (
    <div className="location-search-container" ref={wrapperRef}>
      {label && <label className="location-search-label">{label}</label>}
      <div className="location-search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="location-search-input"
          autoComplete="off"
        />
        {isLoading && <div className="location-search-loader" />}
      </div>
      {error && <div className="location-search-error">{error}</div>}
      {showSuggestions && suggestions.length > 0 && (
        <div className="location-suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.code}
              className="location-suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-main">
                <span className="suggestion-name">{suggestion.name}</span>
                <span className="suggestion-code">{suggestion.code}</span>
              </div>
              <div className="suggestion-details">
                {suggestion.city && suggestion.city !== suggestion.name && (
                  <span className="suggestion-city">{suggestion.city}, </span>
                )}
                <span className="suggestion-country">{suggestion.country}</span>
                <span className={`suggestion-type ${suggestion.subType.toLowerCase()}`}>
                  {suggestion.subType === 'AIRPORT' ? '✈️' : '🏢'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch; 