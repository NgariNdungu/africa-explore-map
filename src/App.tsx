import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Select from 'react-select';
import 'leaflet/dist/leaflet.css';
import { africanCountries } from './data/africanCountries';
import MapController from './components/MapController';
import { LatLngBoundsExpression } from 'leaflet';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(africanCountries[0]);

  const countryOptions = africanCountries.map((country) => ({
    value: country.slug,
    label: country.name,
  }));

  const handleCountryChange = (selectedOption: any) => {
    const country = africanCountries.find((c) => c.slug === selectedOption.value);
    if (country) {
      setSelectedCountry(country);
    }
  };

  return (
    <div className='font.sans bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-4xl font-bold mb-4'>Ramani Africa</h1>
      <p className='text-lg mb-8'>Explore the countries of Africa</p>

      <div className='w-full max-w-2xl mb-8 z-10'>
        <Select
          options={countryOptions}
          onChange={handleCountryChange}
          defaultValue={countryOptions[0]}
          className='text-black'
        />
      </div>

      <div className='w-full h-[60vh] rounded-lg overflow-hidden'>
        <MapContainer
          center={[0, 20]}
          zoom={3}
          style={{ height: '100%', width: '100%' }}
          className='z-0'
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'
          />
          <MapController bounds={selectedCountry.bounds as LatLngBoundsExpression} />
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
