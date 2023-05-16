import React from 'react';

function CityComponent(props) {
  const { location, onDelete } = props;

  // Hantera borttagning av platsen
  const handleDelete = () => {
    onDelete(location);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{location.name}</h5>
        <p className="card-text">Temperature: {location.temperature} °C</p>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default CityComponent;




