import React from 'react';
import SearchComponent from './SearchComponent';
import CityListComponent from './CityListComponent';

/*  layout
<App.js>
    <SearchComponent />

    <CityListComponent>
        <CityComponent />
        <CityComponent />
        <CityComponent />
    </CityListComponent>
</App.js>
*/

function App() {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchComponent />
      <CityListComponent />
    </div>
  );
}

export default App;
