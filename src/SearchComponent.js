import React, { useState, useEffect } from 'react';
import CityListComponent from './CityListComponent';

function SearchComponent() {
  // State för sökning, API respons, och sparade platser
  const [searchInput, setSearchInput] = useState(''); // Sökinmatning från användaren
  const [weatherData, setWeatherData] = useState(null); // API-svar för vädret
  const [savedLocations, setSavedLocations] = useState(() => {
    // Hämta sparade platser från localStorage vid start
    const savedData = localStorage.getItem('savedLocations');
    return savedData ? JSON.parse(savedData) : [];
  }); // Sparade platser

  // Uppdatera sparade platser i localStorage vid förändring
  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  // Uppdatera sökinmatningen vid förändring
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Hantera sökning och API-anrop
  const handleSearch = () => {
    // Kontrollera om staden redan är sparad
    if (savedLocations.some(location => location.name === searchInput)) {
      alert('City already saved!');
      return;
    }

    const url = `http://api.weatherstack.com/current?access_key=b0b94ccad886c5c95d42990744a60d1e&query=${searchInput}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data); // Uppdatera state med API-svaret
        const locationData = {
          name: data.location.name,
          temperature: data.current.temperature
        };
        setSavedLocations(prevLocations => [...prevLocations, locationData]); // Spara platsen i state
        setSearchInput(''); // Återställ sökinmatningen
      })
      .catch(error => {
        console.error('API error:', error);
      });
  };

  // Hantera borttagning av en plats
  const handleDelete = (location) => {
    const newLocations = savedLocations.filter(loc => loc.name !== location.name);
    setSavedLocations(newLocations);
  };


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          {/* Sökruta */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search location..."
              value={searchInput}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
          </div>

          {/* Sparade platser */}
          <h2 className="row justify-content-center my-5">Locations</h2>
          <CityListComponent savedLocations={savedLocations} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;












