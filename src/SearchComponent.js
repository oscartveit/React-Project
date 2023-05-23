import React, { useState, useEffect } from 'react';
import CityListComponent from './CityListComponent';

function SearchComponent() {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [savedLocations, setSavedLocations] = useState(() => {
    const savedData = localStorage.getItem('savedLocations');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const searchInputLowercase = searchInput.toLowerCase(); // Konvertera sökinmatningen till gemener

    if (savedLocations.some(location => location.name.toLowerCase() === searchInputLowercase)) {
      alert('City already saved!');
      return;
    }

    const url = `http://api.weatherstack.com/current?access_key=b0b94ccad886c5c95d42990744a60d1e&query=${searchInput}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        const locationData = {
          name: data.location.name,
          temperature: data.current.temperature
        };
        setSavedLocations(prevLocations => [...prevLocations, locationData]);
        setSearchInput('');
      })
      .catch(error => {
        console.error('API error:', error);
      });
  };

  const handleDelete = (location) => {
    const newLocations = savedLocations.filter(loc => loc.name.toLowerCase() !== location.name.toLowerCase());
    setSavedLocations(newLocations);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search location..."
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
          </div>
          <h2 className="row justify-content-center my-5">Locations</h2>
          <CityListComponent savedLocations={savedLocations} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
