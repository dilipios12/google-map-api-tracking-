import React, { useState, useEffect } from 'react';
import './App.css';
import WrappedMap from './components/gMap/Map';
import config from './components/gMap/config';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function App() {
  const [paths, setPaths] = useState(null);
  const [stops, setStops] = useState(null);
  const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.mapsKey}`;
  
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch('https://buying.com/track_order_api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_id: '1234' }),
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const pathData = [
          { lat: parseFloat(data.customer_lat), lng: parseFloat(data.customer_lon) },
          { lat: parseFloat(data.rest_lat), lng: parseFloat(data.rest_lon) },
          { lat: parseFloat(data.driver_lat), lng: parseFloat(data.driver_lon) },
        ];
        
        const stopsData = [
          { lat: parseFloat(data.rest_lat), lng: parseFloat(data.rest_lon), id: 'Restaurant' },
          { lat: parseFloat(data.customer_lat), lng: parseFloat(data.customer_lon), id: 'Customer' },
          { lat: parseFloat(data.driver_lat), lng: parseFloat(data.driver_lon), id: 'Driver' },
        ];
        
        setPaths(pathData);
        setStops({ data: stopsData });
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    
    fetchOrderData();
  }, []);
  
  return (
    <div className="App">
     
      
      { paths && stops ?
        <WrappedMap
            paths={paths}
            stops={stops}
            googleMapURL={mapURL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className='mapContainer'  />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          : 
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
      }
    </div>
  );
}

export default App;







































//leaflet map use this map  //


                                                                         





//lef map note use this funtioc any query to profilee the part the methion           //

