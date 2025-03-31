
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Settings, Info } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Destination {
  name: string;
  country: string;
  coordinates: [number, number];
  slug: string;
  description: string;
  image: string;
}

const destinations: Destination[] = [
  {
    name: 'Kyoto',
    country: 'Japan',
    coordinates: [135.7681, 35.0116],
    slug: 'kyoto',
    description: 'Experience traditional Japan with temples, shrines and beautiful gardens.',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Santorini',
    country: 'Greece',
    coordinates: [25.3963, 36.4640],
    slug: 'santorini',
    description: 'Iconic white-washed buildings with blue domes overlooking the Aegean Sea.',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Swiss Alps',
    country: 'Switzerland',
    coordinates: [8.2275, 46.8182],
    slug: 'swiss-alps',
    description: 'Breathtaking mountain landscapes with snow-capped peaks and alpine villages.',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Yosemite',
    country: 'United States',
    coordinates: [-119.5383, 37.8651],
    slug: 'yosemite',
    description: 'Iconic national park known for its waterfalls, giant sequoias, and valley views.',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    coordinates: [115.1889, -8.4095],
    slug: 'bali',
    description: 'Island of the Gods with forested volcanic mountains, beaches, and coral reefs.',
    image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Marrakech',
    country: 'Morocco',
    coordinates: [-7.9811, 31.6295],
    slug: 'marrakech',
    description: 'Vibrant markets, gardens, palaces, and mosques in this major Moroccan city.',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Machu Picchu',
    country: 'Peru',
    coordinates: [-72.5450, -13.1631],
    slug: 'machu-picchu',
    description: 'Iconic Incan citadel set high in the Andes Mountains with spectacular views.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Great Barrier Reef',
    country: 'Australia',
    coordinates: [145.7178, -16.2864],
    slug: 'great-barrier-reef',
    description: 'World\'s largest coral reef system with thousands of reefs and hundreds of islands.',
    image: 'https://images.unsplash.com/photo-1549201440-34361a6a5158?w=500&auto=format&fit=crop&q=80'
  }
];

const WorldMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: 1.5,
        center: [0, 20],
        pitch: 30,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Disable scroll zoom for smoother experience
      map.current.scrollZoom.disable();

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        if (!map.current) return;
        
        map.current.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });

        // Add destination markers
        addDestinationMarkers();
      });

      // Rotation animation settings
      const secondsPerRevolution = 240;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;

      // Spin globe function
      function spinGlobe() {
        if (!map.current) return;
        
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond / 30;
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      // Event listeners for interaction
      map.current.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.current.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.current.on('mouseup', () => {
        userInteracting = false;
        setTimeout(spinGlobe, 1000);
      });
      
      map.current.on('touchend', () => {
        userInteracting = false;
        setTimeout(spinGlobe, 1000);
      });

      map.current.on('moveend', () => {
        setTimeout(spinGlobe, 1000);
      });

      // Start the globe spinning
      spinGlobe();
      
      // Save token to localStorage
      localStorage.setItem('mapboxToken', mapboxToken);
      setShowTokenInput(false);
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Error",
        description: "Failed to initialize the map. Please check your Mapbox token.",
        variant: "destructive"
      });
      setShowTokenInput(true);
    }
  };

  const addDestinationMarkers = () => {
    if (!map.current) return;

    destinations.forEach(destination => {
      // Create a custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'cursor-pointer';
      markerEl.innerHTML = `
        <div class="bg-travel-blue text-white rounded-full h-5 w-5 flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-125">
          <div class="h-3 w-3 rounded-full bg-white"></div>
        </div>
      `;

      // Add marker to map
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(destination.coordinates)
        .addTo(map.current!);

      // Add click event to marker
      markerEl.addEventListener('click', () => {
        if (!map.current) return;
        
        // Fly to destination
        map.current.flyTo({
          center: destination.coordinates,
          zoom: 6,
          duration: 2000,
          essential: true
        });

        // Show destination info
        setSelectedDestination(destination);
      });
    });
  };

  useEffect(() => {
    // Check for token in localStorage
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
    }
  }, []);

  useEffect(() => {
    if (mapboxToken && !map.current) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    initializeMap();
  };

  const handleNavigateToDestination = () => {
    if (selectedDestination) {
      navigate(`/destinations/${selectedDestination.slug}`);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Explore Our World</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations around the globe. Click on any marker to learn more about the location
            and see available tours.
          </p>
        </div>
        
        {showTokenInput ? (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 max-w-lg mx-auto">
            <div className="flex items-start mb-4">
              <Info className="h-6 w-6 text-travel-blue mr-3 flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-600">
                To use the interactive world map, you'll need a Mapbox access token. 
                You can get a free token by signing up at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-travel-blue hover:underline">mapbox.com</a> and 
                finding your public token in the Account dashboard.
              </p>
            </div>
            <form onSubmit={handleTokenSubmit} className="flex flex-col">
              <input
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="Enter your Mapbox access token"
                className="p-2.5 mb-3 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-travel-blue focus:ring-travel-blue"
                required
              />
              <Button type="submit" className="bg-travel-blue hover:bg-travel-blue/90">
                Initialize Map
              </Button>
            </form>
          </div>
        ) : null}
        
        <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
          <div ref={mapContainer} className="absolute inset-0" />
          
          {selectedDestination && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white p-4 animate-fade-in">
              <div className="flex items-start">
                <img 
                  src={selectedDestination.image} 
                  alt={selectedDestination.name} 
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedDestination.name}, {selectedDestination.country}</h3>
                  <p className="text-white/80 mb-3">{selectedDestination.description}</p>
                  <Button 
                    onClick={handleNavigateToDestination}
                    className="bg-travel-blue hover:bg-travel-blue/90"
                  >
                    Explore {selectedDestination.name}
                  </Button>
                </div>
                <button 
                  onClick={() => setSelectedDestination(null)}
                  className="text-white/70 hover:text-white p-1"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
          
          {!showTokenInput && (
            <div className="absolute top-3 left-3 bg-white rounded-md shadow-md p-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center text-xs"
                onClick={() => setShowTokenInput(true)}
              >
                <Settings className="h-3 w-3 mr-1" />
                Change API Key
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
