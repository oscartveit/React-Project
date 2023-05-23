import React from 'react';
import SearchComponent from './SearchComponent';

function App() {
  const appStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: "url('./image.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div style={appStyle}>
      <h1 className="row justify-content-center my-5">Weather App</h1>
      <SearchComponent />
    </div>
  );
}

export default App;
