import React, { useState } from 'react';
import CountryGlobe from './components/IranGlobe';

// A lookup table with everything the globe needs to know
const COUNTRY_OPTIONS = [
  { code: 'IRN', flag: 'ir', lat: 32.4279, lng: 53.6880, label: 'Iran' },
  { code: 'USA', flag: 'us', lat: 39.8283, lng: -98.5795, label: 'United States' },
  { code: 'BRA', flag: 'br', lat: -14.2350, lng: -51.9253, label: 'Brazil' },
  { code: 'FRA', flag: 'fr', lat: 46.2276, lng: 2.2137, label: 'France' },
  { code: 'JPN', flag: 'jp', lat: 36.2048, lng: 138.2529, label: 'Japan' },
  { code: 'AUS', flag: 'au', lat: -25.2744, lng: 133.7751, label: 'Australia' }
];

const App = () => {
  // Set Iran as the default starting state
  const [activeCountry, setActiveCountry] = useState(COUNTRY_OPTIONS[0]);

  return (
    <div className='w-screen h-screen relative bg-black'>
      
      {/* Floating UI Menu */}
      <div className="absolute top-6 left-6 z-10 bg-black/50 p-4 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
        <label className="block text-white mb-2 font-sans text-sm font-semibold tracking-wide">
          SELECT DESTINATION
        </label>
        <select
          className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 outline-none w-48 cursor-pointer focus:border-green-400 transition-colors"
          value={activeCountry.code}
          onChange={(e) => {
            // Find the full country object based on the selected code
            const selected = COUNTRY_OPTIONS.find(c => c.code === e.target.value);
            setActiveCountry(selected);
          }}
        >
          {COUNTRY_OPTIONS.map(c => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Pass the selected country down to the globe */}
      <CountryGlobe activeCountry={activeCountry} />
    </div>
  );
}

export default App;