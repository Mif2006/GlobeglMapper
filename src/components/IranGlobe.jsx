import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const CountryGlobe = ({ activeCountry }) => {
  const globeEl = useRef();
  const [allCountries, setAllCountries] = useState([]);
  const [highlightedBorder, setHighlightedBorder] = useState([]);

  // 1. Fetch the entire world map ONCE when component loads
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setAllCountries(data.features);
      })
      .catch(err => console.error("Error fetching GeoJSON:", err));
  }, []);

  // 2. React to changes in the activeCountry prop
  useEffect(() => {
    // Filter the border data
    if (allCountries.length > 0) {
      const border = allCountries.filter(d => d.properties.ISO_A3 === activeCountry.code);
      setHighlightedBorder(border);
    }

    // Animate the camera
    if (globeEl.current) {
      globeEl.current.pointOfView({ 
        lat: activeCountry.lat, 
        lng: activeCountry.lng, 
        altitude: 1.5 // Zoomed in a bit closer!
      }, 2000); // 2000ms (2 seconds) smooth flight
    }
  }, [activeCountry, allCountries]);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
      
      // DRAW BORDERS
      polygonsData={highlightedBorder}
      polygonCapColor={() => 'rgba(34, 197, 94, 0.4)'} 
      polygonSideColor={() => 'rgba(255, 255, 255, 0.1)'} 
      polygonStrokeColor={() => '#ffffff'}
      
      // ADD FLAG/MARKER
      htmlElementsData={[activeCountry]}
      htmlElement={d => {
        const el = document.createElement('div');
        el.innerHTML = `
          <div style="text-align: center; pointer-events: none; transition: all 0.3s ease;">
            <img src="https://flagcdn.com/w40/${d.flag}.png" style="width: 36px; border: 2px solid rgba(255,255,255,0.8); border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.5);" alt="Flag" />
            <div style="color: white; font-family: sans-serif; font-size: 13px; font-weight: bold; margin-top: 6px; text-shadow: 1px 1px 4px black, 0 0 10px rgba(34,197,94,0.8);">${d.label}</div>
          </div>
        `;
        return el;
      }}
    />
  );
};

export default CountryGlobe;