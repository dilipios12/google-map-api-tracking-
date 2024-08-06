// import {
//   Box,
//   Flex,
//   HStack,
//   IconButton,
//   Text,
//   SkeletonText,
// } from '@chakra-ui/react';
// import { FaLocationArrow, FaTimes } from 'react-icons/fa';
// import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const center = { lat: 48.8584, lng: 2.2945 };

// function App() {
//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: "YOUR_API_KEY",
//     libraries: ['places'],
//   });

//   const [map, setMap] = useState(null);
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [driverPosition, setDriverPosition] = useState(null);
//   const [customerPosition, setCustomerPosition] = useState(null);
//   const [restaurantPosition, setRestaurantPosition] = useState(null);
//   const [travelTime, setTravelTime] = useState(null);
//   const [distance, setDistance] = useState(null);

//   const directionsService = useCallback(() => {
//     if (window.google && customerPosition && driverPosition) {
//       const service = new window.google.maps.DirectionsService();
//       service.route(
//         {
//           origin: driverPosition,
//           destination: customerPosition,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirectionsResponse(result);
//             // Extracting travel time and distance
//             const { duration, distance } = result.routes[0].legs[0];
//             setTravelTime(duration.text);
//             setDistance(distance.text);
//           } else {
//             console.error("Directions request failed due to ", status);
//           }
//         }
//       );
//     }
//   }, [driverPosition, customerPosition]);

//   useEffect(() => {
//     if (map && isLoaded) {
//       const interval = setInterval(async () => {
//         try {
//           const response = await axios.post('https://buying.com/track_order_api.php', {
//             order_id: '123'
//           });

//           console.log("API Response:", response.data);

//           const { customer_lat, customer_lon, rest_lat, rest_lon, driver_lat, driver_lon } = response.data;

//           if (
//             !isNaN(customer_lat) && !isNaN(customer_lon) &&
//             !isNaN(rest_lat) && !isNaN(rest_lon) &&
//             !isNaN(driver_lat) && !isNaN(driver_lon)
//           ) {
//             setCustomerPosition({ lat: parseFloat(customer_lat), lng: parseFloat(customer_lon) });
//             setRestaurantPosition({ lat: parseFloat(rest_lat), lng: parseFloat(rest_lon) });
//             setDriverPosition({ lat: parseFloat(driver_lat), lng: parseFloat(driver_lon) });
//           } else {
//             console.warn("Invalid data received from API.");
//           }

//           directionsService(); // Recalculate directions when positions change

//         } catch (error) {
//           console.error("Error fetching location data:", error);
//         }
//       }, 5000); // Fetch every 5 seconds

//       return () => clearInterval(interval);
//     }
//   }, [map, isLoaded, directionsService]);

//   useEffect(() => {
//     if (driverPosition && map) {
//       map.panTo(driverPosition);
//       map.setZoom(15);
//     }
//   }, [driverPosition, map]);

//   if (loadError) {
//     return <div>Error loading Google Maps API</div>;
//   }

//   if (!isLoaded) {
//     return <SkeletonText />;
//   }

//   return (
//     <div className='container-fluid'>
//       <Flex
//         position='relative'
//         flexDirection='column'
//         alignItems='center'
//         h='100vh'
//         w='100vw'
//       >
//         <Box position='absolute' left={0} right={0} top={0} bottom={0}>
//           <GoogleMap
//             center={center}
//             zoom={10}
//             mapContainerStyle={{ width: '100%', height: '100%' }}
//             options={{
//               zoomControl: false,
//               streetViewControl: true,
//               mapTypeControl: false,
//               fullscreenControl: false,
//             }}
//             onLoad={map => setMap(map)}
//           >
//             {customerPosition && (
//               <Marker
//                 position={customerPosition}
//                 label="Customer"
//                 icon={{
//                   url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom icon URL
//                   scaledSize: new window.google.maps.Size(40, 40),
//                 }}
//               />
//             )}
//             {restaurantPosition && (
//               <Marker
//                 position={restaurantPosition}
//                 label="Restaurant"
//                 icon={{
//                   url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Custom icon URL
//                   scaledSize: new window.google.maps.Size(40, 40),
//                 }}
//               />
//             )}
//             {driverPosition && (
//               <Marker
//                 position={driverPosition}
//                 label="Driver"
//                 icon={{
//                   url: "https://i.pinimg.com/474x/17/94/36/1794363d7b7b381ad61657bc193882cd.jpg", // Red bike icon URL
//                   scaledSize: new window.google.maps.Size(60, 60),
//                 }}
//               />
//             )}
//             {directionsResponse && (
//               <DirectionsRenderer directions={directionsResponse} />
//             )}
//           </GoogleMap>
//         </Box>

//         {travelTime && distance && (
//           <Box
//             p={4}
//             borderRadius='lg'
//             m={4}
//             bgColor='white'
//             shadow='base'
//             minW='container.md'
//             zIndex='1'
//           >
//             <HStack spacing={4} justifyContent='space-between'>
//               <Text>Distance: {distance}</Text>
//               <Text>Duration: {travelTime}</Text>
//             </HStack>
//             <HStack spacing={4} mt={4} justifyContent='space-between'>
//               <IconButton
//                 aria-label='center back'
//                 icon={<FaLocationArrow />}
//                 isRound
//                 onClick={() => {
//                   if (driverPosition && map) {
//                     map.panTo(driverPosition);
//                     map.setZoom(15);
//                   }
//                 }}
//               />
//               <IconButton
//                 aria-label='reset map'
//                 icon={<FaTimes />}
//                 onClick={() => {
//                   if (map) {
//                     map.panTo(center);
//                     map.setZoom(10);
//                   }
//                 }}
//               />
//             </HStack>
//           </Box>
//         )}
//       </Flex>
//     </div>
//   );
// }



  // export default App;
// import {
//   Box,
//   Flex,
//   HStack,
//   IconButton,
//   Text,
//   SkeletonText,
// } from '@chakra-ui/react';
// import { FaLocationArrow, FaTimes } from 'react-icons/fa';
// import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const center = { lat: 48.8584, lng: 2.2945 };

// function App() {
//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: "YOUR_API_KEY",
//     libraries: ['places'],
//   });

//   const [map, setMap] = useState(null);
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [driverPosition, setDriverPosition] = useState(null);
//   const [customerPosition, setCustomerPosition] = useState(null);
//   const [restaurantPosition, setRestaurantPosition] = useState(null);
//   const [travelTime, setTravelTime] = useState(null);
//   const [distance, setDistance] = useState(null);

//   const directionsService = useCallback(() => {
//     if (window.google && customerPosition && driverPosition) {
//       const service = new window.google.maps.DirectionsService();
//       service.route(
//         {
//           origin: driverPosition,
//           destination: customerPosition,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirectionsResponse(result);
//             // Extracting travel time and distance
//             const { duration, distance } = result.routes[0].legs[0];
//             setTravelTime(duration.text);
//             setDistance(distance.text);
//           } else {
//             console.error("Directions request failed due to ", status);
//           }
//         }
//       );
//     }
//   }, [driverPosition, customerPosition]);

//   useEffect(() => {
//     if (map && isLoaded) {
//       const interval = setInterval(async () => {
//         try {
//           const response = await axios.post('https://buying.com/track_order_api.php', {
//             order_id: '123'
//           });

//           console.log("API Response:", response.data);

//           const { customer_lat, customer_lon, rest_lat, rest_lon, driver_lat, driver_lon } = response.data;

//           if (
//             !isNaN(customer_lat) && !isNaN(customer_lon) &&
//             !isNaN(rest_lat) && !isNaN(rest_lon) &&
//             !isNaN(driver_lat) && !isNaN(driver_lon)
//           ) {
//             setCustomerPosition({ lat: parseFloat(customer_lat), lng: parseFloat(customer_lon) });
//             setRestaurantPosition({ lat: parseFloat(rest_lat), lng: parseFloat(rest_lon) });
//             setDriverPosition({ lat: parseFloat(driver_lat), lng: parseFloat(driver_lon) });
//           } else {
//             console.warn("Invalid data received from API.");
//           }

//           directionsService(); // Recalculate directions when positions change

//         } catch (error) {
//           console.error("Error fetching location data:", error);
//         }
//       }, 5000); // Fetch every 5 seconds

//       return () => clearInterval(interval);
//     }
//   }, [map, isLoaded, directionsService]);

//   useEffect(() => {
//     if (driverPosition && map) {
//       map.panTo(driverPosition);
//       map.setZoom(15);
//     }
//   }, [driverPosition, map]);

//   if (loadError) {
//     return <div>Error loading Google Maps API</div>;
//   }

//   if (!isLoaded) {
//     return <SkeletonText />;
//   }

//   return (
//     <div className='container-fluid'>
//       <Flex
//         position='relative'
//         flexDirection='column'
//         alignItems='center'
//         h='100vh'
//         w='100vw'
//       >
//         <Box position='absolute' left={0} right={0} top={0} bottom={0}>
//           <GoogleMap
//             center={center}
//             zoom={10}
//             mapContainerStyle={{ width: '100%', height: '100%' }}
//             options={{
//               zoomControl: false,
//               streetViewControl: true,
//               mapTypeControl: false,
//               fullscreenControl: false,
//             }}
//             onLoad={map => setMap(map)}
//           >
//             {customerPosition && (
//               <Marker
//                 position={customerPosition}
//                 label="Customer"
//                 icon={{
//                   url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom icon URL
//                   scaledSize: new window.google.maps.Size(40, 40),
//                 }}
//               />
//             )}
//             {restaurantPosition && (
//               <Marker
//                 position={restaurantPosition}
//                 label="Restaurant"
//                 icon={{
//                   url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Custom icon URL
//                   scaledSize: new window.google.maps.Size(40, 40),
//                 }}
//               />
//             )}
//             {driverPosition && (
//               <Marker
//                 position={driverPosition}
//                 label="Driver"
//                 icon={{
//                   url: "https://i.pinimg.com/474x/17/94/36/1794363d7b7b381ad61657bc193882cd.jpg", // Red bike icon URL
//                   scaledSize: new window.google.maps.Size(60, 60),
//                 }}
//               />
//             )}
//             {directionsResponse && (
//               <DirectionsRenderer directions={directionsResponse} />
//             )}
//           </GoogleMap>
//         </Box>

//         {travelTime && distance && (
//           <Box
//             p={4}
//             borderRadius='lg'
//             m={4}
//             bgColor='white'
//             shadow='base'
//             minW='container.md'
//             zIndex='1'
//           >
//             <HStack spacing={4} justifyContent='space-between'>
//               <Text>Distance: {distance}</Text>
//               <Text>Duration: {travelTime}</Text>
//             </HStack>
//             <HStack spacing={4} mt={4} justifyContent='space-between'>
//               <IconButton
//                 aria-label='center back'
//                 icon={<FaLocationArrow />}
//                 isRound
//                 onClick={() => {
//                   if (driverPosition && map) {
//                     map.panTo(driverPosition);
//                     map.setZoom(15);
//                   }
//                 }}
//               />
//               <IconButton
//                 aria-label='reset map'
//                 icon={<FaTimes />}
//                 onClick={() => {
//                   if (map) {
//                     map.panTo(center);
//                     map.setZoom(10);
//                   }
//                 }}
//               />
//             </HStack>
//           </Box>
//         )}
//       </Flex>
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   Box,
//   Flex,
//   HStack,
//   IconButton,
//   Text,
//   SkeletonText,
// } from '@chakra-ui/react';
// import { FaLocationArrow, FaTimes } from 'react-icons/fa';
// import axios from 'axios';
// import { Map, Marker, Overlay } from 'pigeon-maps';

// const initialCenter = [48.8584, 2.2945]; // Default center (e.g., Eiffel Tower)

// function App() {
  
//   const [driverPosition, setDriverPosition] = useState(null);
//   const [customerPosition, setCustomerPosition] = useState(null);
//   const [restaurantPosition, setRestaurantPosition] = useState(null);
//   const [routeDriverToRestaurant, setRouteDriverToRestaurant] = useState([]);
//   const [routeDriverToCustomer, setRouteDriverToCustomer] = useState([]);
//   const [travelTime, setTravelTime] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [center, setCenter] = useState(initialCenter);
//   const animationIntervalRef = useRef(null);
//   const [path, setPath] = useState([]);

//   const fetchPositions = useCallback(async () => {
//     try {
//       const response = await axios.post('https://buying.com/track_order_api.php', {
//         order_id: '234'
//       });

//       console.log("API Response:", response.data);

//       const { customer_lat, customer_lon, rest_lat, rest_lon, driver_lat, driver_lon } = response.data;

//       if (
//         !isNaN(customer_lat) && !isNaN(customer_lon) &&
//         !isNaN(rest_lat) && !isNaN(rest_lon) &&
//         !isNaN(driver_lat) && !isNaN(driver_lon)
//       ) {
//         const customerPos = [parseFloat(customer_lat), parseFloat(customer_lon)];
//         const restaurantPos = [parseFloat(rest_lat), parseFloat(rest_lon)];
//         const driverPos = [parseFloat(driver_lat), parseFloat(driver_lon)];

//         setCustomerPosition(customerPos);
//         setRestaurantPosition(restaurantPos);

//         fetchRoute(driverPos, restaurantPos, setRouteDriverToRestaurant);
//         fetchRoute(driverPos, customerPos, setRouteDriverToCustomer);

//         setPath(driverPos); // Set the initial driver position as the path's starting point
//       } else {
//         console.warn("Invalid data received from API.");
//       }

//     } catch (error) {
//       console.error("Error fetching location data:", error);
//     }
//   }, [1000]);

//   const fetchRoute = useCallback(async (origin, destination, setRoute) => {
//     try {
//       const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`);
//       const data = response.data;

//       if (data.routes && data.routes.length > 0) {
//         const routeCoordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
//         setRoute(routeCoordinates);
//       }
//     } catch (error) {
//       console.error("Error fetching route data:", error);
//     }
//   }, []);

//   useEffect(() => {
//     if (path.length > 0 && driverPosition) {
//       let step = 0;
//       const numSteps = path.length;
//       const timePerStep = 5000 / numSteps; // Adjust duration as needed

//       if (animationIntervalRef.current) {
//         clearInterval(animationIntervalRef.current);
//       }

//       animationIntervalRef.current = setInterval(() => {
//         if (step < numSteps) {
//           setDriverPosition(path[step]);
//           step++;
//         } else {
//           clearInterval(animationIntervalRef.current);
//         }
//       }, timePerStep);

//       return () => clearInterval(animationIntervalRef.current);
//     }
//   }, [path]);

//   useEffect(() => {
//     const interval = setInterval(fetchPositions, 5000); // Fetch every 5 seconds
//     return () => clearInterval(interval);
//   }, [fetchPositions]);

//   if (!driverPosition || !customerPosition || !restaurantPosition) {
//     return <SkeletonText />;
//   }

//   return (
//     <div className='container-fluid'>
//       <Flex
//         position='relative'
//         flexDirection='column'
//         alignItems='center'
//         h='100vh'
//         w='100vw'
//       >
//         <Box position='absolute' left={0} right={0} top={0} bottom={0}>
//           <Map center={center} zoom={12} width={window.innerWidth} height={window.innerHeight}>
//             <Marker anchor={customerPosition}>
//               <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="Customer" style={{ width: '40px' }} />
//             </Marker>
//             <Marker anchor={restaurantPosition}>
//               <img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Restaurant_2_clip_art.png" alt="Restaurant" style={{ width: '30px' }} />
//             </Marker>
//             <Marker anchor={driverPosition}>
//               <img src="https://static.wixstatic.com/media/5f6da5_647743f859474074ad7eabd25d0c9496~mv2.gif" alt="Driver" style={{ width: '40px' }} />
//             </Marker>
//             {routeDriverToRestaurant.length > 0 && (
//               <Overlay anchor={routeDriverToRestaurant[0]} offset={[0, 0]}>
//                 <svg width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
//                   <polyline
//                     points={routeDriverToRestaurant.map(coord => coord.join(',')).join(' ')}
//                     fill="none"
//                     stroke="red"
//                     strokeWidth="3"
//                   />
//                 </svg>
//               </Overlay>
//             )}
//             {routeDriverToCustomer.length > 0 && (
//               <Overlay anchor={routeDriverToCustomer[0]} offset={[0, 0]}>
//                 <svg width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
//                   <polyline
//                     points={routeDriverToCustomer.map(coord => coord.join(',')).join(' ')}
//                     fill="none"
//                     stroke="yellow"
//                     strokeWidth="3"
//                   />
//                 </svg>
//               </Overlay>
//             )}
//           </Map>
//         </Box>

//         {travelTime && distance && (
//           <Box
//             p={4}
//             borderRadius='lg'
//             m={4}
//             bgColor='white'
//             shadow='base'
//             minW='container.md'
//             zIndex='1'
//           >
//             <HStack spacing={4} justifyContent='space-between'>
//               <Text>Distance: {distance.toFixed(2)} km</Text>
//               <Text>Duration: {travelTime.toFixed(2)} mins</Text>
//             </HStack>
//             <HStack spacing={4} mt={4} justifyContent='space-between'>
//               <IconButton
//                 aria-label='center back'
//                 icon={<FaLocationArrow />}
//                 isRound
//                 onClick={() => {
//                   if (driverPosition) {
//                     setCenter(driverPosition);
//                   }
//                 }}
//               />
//               <IconButton
//                 aria-label='reset map'
//                 icon={<FaTimes />}
//                 onClick={() => {
//                   setCenter(initialCenter);
//                 }}
//               />
//             </HStack>
//           </Box>
//         )}
//       </Flex>
//     </div>
//   );
// }

// export default App;
























// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   Box,
//   Flex,
//   SkeletonText,
// } from '@chakra-ui/react';
// import axios from 'axios';
// import { Map, Marker, Overlay } from 'pigeon-maps';
// import "./App.css";

// const initialCenter = [48.8584, 2.2945]; // Default center (e.g., Eiffel Tower)

// function App() {
//   const [driverPosition, setDriverPosition] = useState(null);
//   const [driverRotation, setDriverRotation] = useState(0);
//   const [customerPosition, setCustomerPosition] = useState(null);
//   const [restaurantPosition, setRestaurantPosition] = useState(null);
//   const [routeDriverToRestaurant, setRouteDriverToRestaurant] = useState([]);
//   const [routeDriverToCustomer, setRouteDriverToCustomer] = useState([]);
//   const [center, setCenter] = useState(initialCenter);
//   const [zoom, setZoom] = useState(15); // Initial zoom level
//   const [path, setPath] = useState([]);
//   const [pathIndex, setPathIndex] = useState(0);
//   const animationIntervalRef = useRef(null);
//   const [zoomDirection, setZoomDirection] = useState('in'); // State to control zoom direction

//   const fetchRoute = useCallback(async (origin, destination, setRoute) => {
//     try {
//       const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`);
//       const data = response.data;

//       if (data.routes && data.routes.length > 0) {
//         const routeCoordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
//         setRoute(routeCoordinates);
//       }
//     } catch (error) {
//       console.error("Error fetching route data:", error);
//     }
//   }, []);

//   const fetchPositions = useCallback(async () => {
//     try {
//       const response = await axios.post('https://buying.com/track_order_api.php', {
//         order_id: '123'
//       });

//       console.log("API Response:", response.data);

//       const { customer_lat, customer_lon, rest_lat, rest_lon, driver_lat, driver_lon } = response.data;

//       if (
//         !isNaN(customer_lat) && !isNaN(customer_lon) &&
//         !isNaN(rest_lat) && !isNaN(rest_lon) &&
//         !isNaN(driver_lat) && !isNaN(driver_lon)
//       ) {
//         const customerPos = [parseFloat(customer_lat), parseFloat(customer_lon)];
//         const restaurantPos = [parseFloat(rest_lat), parseFloat(rest_lon)];
//         const driverPos = [parseFloat(driver_lat), parseFloat(driver_lon)];

//         setCustomerPosition(customerPos);
//         setRestaurantPosition(restaurantPos);

//         await fetchRoute(driverPos, restaurantPos, setRouteDriverToRestaurant);
//         await fetchRoute(driverPos, customerPos, setRouteDriverToCustomer);

//         setPath([driverPos, ...routeDriverToRestaurant, ...routeDriverToCustomer]);
//         setPathIndex(0);
//       } else {
//         console.warn("Invalid data received from API.");
//       }

//     } catch (error) {
//       console.error("Error fetching location data:", error);
//     }
//   }, [fetchRoute]);

//   useEffect(() => {
//     const interval = setInterval(fetchPositions, 1000); // Fetch every 1 second
//     return () => clearInterval(interval);
//   }, [fetchPositions]);

//   useEffect(() => {
//     if (path.length > 0) {
//       if (animationIntervalRef.current) {
//         clearInterval(animationIntervalRef.current);
//       }

//       const updateFrequency = 40; // Update every 40ms for smoother animation
//       const travelSpeed = 0.005; // Adjust distance per update to control speed

//       animationIntervalRef.current = setInterval(() => {
//         if (pathIndex < path.length - 1) {
//           const start = path[pathIndex];
//           const end = path[pathIndex + 1];

//           const distance = getDistance(start, end);
//           const step = travelSpeed / distance;

//           const t = Math.min(step, 1);
//           const lat = start[0] + t * (end[0] - start[0]);
//           const lng = start[1] + t * (end[1] - start[1]);

//           setDriverPosition([lat, lng]);

//           // Calculate heading
//           const heading = getHeading(start, end);
//           setDriverRotation(heading); // Update rotation state

//           if (t === 1) {
//             setPathIndex(prevIndex => prevIndex + 1);
//           }
//         } else {
//           clearInterval(animationIntervalRef.current);
//         }
//       }, updateFrequency);

//       return () => clearInterval(animationIntervalRef.current);
//     }
//   }, [path, pathIndex]);

//   useEffect(() => {
//     const zoomInterval = setInterval(() => {
//       if (driverPosition) {
//         setCenter(driverPosition);

//         setZoom(prevZoom => {
//           // Alternate between zooming in and out
//           const newZoom = zoomDirection === 'in' 
//             ? Math.min(prevZoom + 1, 15) // Zoom in
//             : Math.max(prevZoom - 1, 12); // Zoom out

//           // Change direction after reaching the zoom limits
//           if (newZoom === 12 || newZoom === 15) {
//             setZoomDirection(prev => (prev === 'in' ? 'out' : 'in'));
//           }

//           return newZoom;
//         });
//       }
//     }, 2000); // Zoom in and out every 2 seconds

//     return () => clearInterval(zoomInterval);
//   }, [driverPosition, zoomDirection]);

//   function getHeading(start, end) {
//     const lat1 = start[0];
//     const lon1 = start[1];
//     const lat2 = end[0];
//     const lon2 = end[1];

//     const dLon = lon2 - lon1;
//     const y = Math.sin(dLon) * Math.cos(lat2);
//     const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
//     const angle = Math.atan2(y, x) * (180 / Math.PI);

//     return (angle + 360) % 360; // Normalize to 0-360
//   }

//   function getDistance(start, end) {
//     const lat1 = start[0];
//     const lon1 = start[1];
//     const lat2 = end[0];
//     const lon2 = end[1];

//     const R = 6371e3; // metres
//     const φ1 = lat1 * Math.PI / 180;
//     const φ2 = lat2 * Math.PI / 180;
//     const Δφ = (lat2 - lat1) * Math.PI / 180;
//     const Δλ = (lon2 - lon1) * Math.PI / 180;

//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   }

//   if (!driverPosition || !customerPosition || !restaurantPosition) {
//     return <SkeletonText />;
//   }

//   return (
//     <div className='container-fluid'>
//       <Flex
//         position='relative'
//         flexDirection='column'
//         alignItems='center'
//         h='100vh'
//         w='100vw'
//       >
//         <Box position='absolute' left={0} right={0} top={0} bottom={0}>
//           <Map center={center} zoom={zoom} width={window.innerWidth} height={window.innerHeight}>
//             <Marker anchor={customerPosition}>
//               <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="Customer" style={{ width: '40px' }} />
//             </Marker>
//             <Marker anchor={restaurantPosition}>
//               <img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Restaurant_2_clip_art.png" alt="Restaurant" style={{ width: '25px' }} />
//             </Marker>
//             {driverPosition && (
//               <Marker anchor={driverPosition}>
//                 <div
//                   style={{
//                     width: '40px',
//                     height: '40px',
//                     transform: `rotate(${driverRotation}deg)`,
//                     backgroundImage: `url('https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png')`,
//                     backgroundSize: 'contain',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundPosition: 'center',
//                     transition: 'transform 0.3s cubic-bezier(0.51, 0.61, 0.66, 0.52)' // Fixed transition property
//                   }}
//                 />
//               </Marker>
//             )}
//             {routeDriverToRestaurant.length > 0 && (
//               <Overlay anchor={routeDriverToRestaurant[0]} offset={[0, 0]}>
//                 <svg width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
//                   <polyline
//                     points={routeDriverToRestaurant.map(coord => coord.join(',')).join(' ')}
//                     fill="none"
//                     stroke="red"
//                     strokeWidth="4"
//                   />
//                 </svg>
//               </Overlay>
//             )}
//             {routeDriverToCustomer.length > 0 && (
//               <Overlay anchor={routeDriverToCustomer[0]} offset={[0, 0]}>
//                 <svg width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
//                   <polyline
//                     points={routeDriverToCustomer.map(coord => coord.join(',')).join(' ')}
//                     fill="none"
//                     stroke="yellow"
//                     strokeWidth="4"
//                   />
//                 </svg>
//               </Overlay>
//             )}
//           </Map>
//         </Box>
//       </Flex>
//     </div>
//   );
// }

// export default App;
import {
  Box,
  Flex,
  SkeletonText,
} from '@chakra-ui/react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { factoryAnimatedTracking } from 'map-animated-tracking';

const googleMapsApiKey = "AIzaSyBLk-MOAZfXP0LXqhCENue9pofF6pEMS2U";
const center = { lat: 48.8584, lng: 2.2945 }; // Example coordinates for Paris

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);
  const [customerPosition, setCustomerPosition] = useState(null);
  const [restaurantPosition, setRestaurantPosition] = useState(null);
  const [path, setPath] = useState([]);
  const animationRef = useRef(null);

  const directionsService = useCallback(() => {
    if (window.google && customerPosition && driverPosition) {
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: driverPosition,
          destination: customerPosition,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
            const steps = result.routes[0].legs[0].steps;
            const path = steps.flatMap(step => step.path);
            setPath(path);
          } else {
            console.error("Directions request failed due to ", status);
          }
        }
      );
    }
  }, [driverPosition, customerPosition]);

  useEffect(() => {
    if (map && isLoaded) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.post('https://buying.com/track_order_api.php', {
            order_id: '123'
          });

          console.log("API Response:", response.data);

          const { customer_lat, customer_lon, rest_lat, rest_lon, driver_lat, driver_lon } = response.data;

          if (
            !isNaN(customer_lat) && !isNaN(customer_lon) &&
            !isNaN(rest_lat) && !isNaN(rest_lon) &&
            !isNaN(driver_lat) && !isNaN(driver_lon)
          ) {
            setCustomerPosition({ lat: parseFloat(customer_lat), lng: parseFloat(customer_lon) });
            setRestaurantPosition({ lat: parseFloat(rest_lat), lng: parseFloat(rest_lon) });
            setDriverPosition({ lat: parseFloat(driver_lat), lng: parseFloat(driver_lon) });
          } else {
            console.warn("Invalid data received from API.");
          }

          directionsService();
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      }, 5000); // Fetch every 5 seconds

      return () => clearInterval(interval);
    }
  }, [map, isLoaded, directionsService]);

  useEffect(() => {
    if (driverPosition && map) {
      map.panTo(driverPosition);
      map.setZoom(15);
    }
  }, [driverPosition, map]);

  useEffect(() => {
    if (path.length > 0 && map) {
      try {
        if (animationRef.current) {
          animationRef.current.stop();
        }

        // Create the animated tracking instance
        const animatedTracking = factoryAnimatedTracking({
          map: map,
          path: path,
          icon: {
            url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
          duration: 600, // Duration of the animation in milliseconds
        });

        // Start the animation
        animatedTracking.start();
        animationRef.current = animatedTracking;

      } catch (error) {
        console.error("Error initializing animated tracking:", error);
      }

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }
  }, [path, map]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <SkeletonText />;
  }

  return (
    <div className='container-fluid'>
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        h='100vh'
        w='100vw'
      >
        <Box position='absolute' left={0} right={0} top={0} bottom={0}>
          <GoogleMap
            center={center}
            zoom={10}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: true,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            {driverPosition && (
              <Marker
                position={driverPosition}
                icon={{
                  url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            )}
            {customerPosition && (
              <Marker
                position={customerPosition}
                label="Customer"
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            )}
            {restaurantPosition && (
              <Marker
                position={restaurantPosition}
                label="Restaurant"
                icon={{
                  url: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Restaurant_2_clip_art.png",
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            )}
          </GoogleMap>
        </Box>
      </Flex>
    </div>
  );
}

export default App;
