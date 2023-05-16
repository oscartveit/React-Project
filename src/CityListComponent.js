import React from 'react';
import CityComponent from './Citycomponent';

const CityListComponent = ({ savedLocations, onDelete }) => {
  // Om inga sparade platser finns visas ett meddelande
  if (!savedLocations || savedLocations.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No saved locations found.
      </div>
    );
  }

  // Hantera borttagning av en plats
  const handleDelete = (location) => {
    onDelete(location);
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {/* Loopa igenom sparade platser och rendera en CityComponent för varje */}
      {savedLocations.map((location, index) => (
        <div className="col mb-3" key={index}>
          <CityComponent location={location} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default CityListComponent;






