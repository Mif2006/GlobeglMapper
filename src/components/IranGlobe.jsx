import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const IranGlobe = () => {
  const globeEl = useRef();
  const [countries, setCountries] = useState([]);
  
  // Coordinates for Central Iran
  const IRAN_CENTER = { lat: 32.4279, lng: 53.6880, label: 'Iran' };

  useEffect(() => {
    // 1. Fetch valid GeoJSON border data (Fixed URL)
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        // 2. Filter data to ONLY include Iran (ISO code: IRN)
        const iranBorder = data.features.filter(d => d.properties.ISO_A3 === 'IRN');
        setCountries(iranBorder);
      })
      .catch(err => console.error("Error fetching GeoJSON:", err));

    // 3. Smoothly fly to Iran on load
    setTimeout(() => {
      // Safety check: ensure globeEl exists before calling methods
      if (globeEl.current) {
        globeEl.current.pointOfView({ lat: 32, lng: 53, altitude: 1.8 }, 3000);
      }
    }, 1000);
  }, []);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
      
      // DRAW BORDERS
      polygonsData={countries}
      polygonCapColor={() => 'rgba(34, 197, 94, 0.4)'} // Transparent Green
      polygonSideColor={() => 'rgba(255, 255, 255, 0.1)'} // Thin white edge
      polygonStrokeColor={() => '#ffffff'}
      
      // ADD FLAG/MARKER
      htmlElementsData={[IRAN_CENTER]}
      htmlElement={d => {
        const el = document.createElement('div');
        el.innerHTML = `
          <div style="text-align: center; pointer-events: none;">
            <img src="https://flagcdn.com/w40/ir.png" style="width: 30px; border: 1px solid rgba(255,255,255,0.5); border-radius: 2px;" alt="Flag" />
            <div style="color: white; font-family: sans-serif; font-size: 11px; margin-top: 4px; text-shadow: 1px 1px 2px black;">${d.label}</div>
          </div>
        `;
        return el;
      }}
    />
  );
};

export default IranGlobe;