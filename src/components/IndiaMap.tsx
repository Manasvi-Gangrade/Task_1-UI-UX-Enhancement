import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockWorkshops, stateCoordinates } from '@/data/mockData';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const IndiaMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Count workshops by state
    const workshopsByState = mockWorkshops.reduce((acc, workshop) => {
      acc[workshop.state] = (acc[workshop.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Add markers for each state with workshops
    Object.entries(workshopsByState).forEach(([state, count]) => {
      const coordinates = stateCoordinates[state];
      if (coordinates) {
        const marker = L.marker(coordinates).addTo(map);
        marker.bindPopup(
          `<div class="text-center">
            <h3 class="font-semibold">${state}</h3>
            <p>${count} workshop${count > 1 ? 's' : ''}</p>
          </div>`
        );
        
        // Add circle to represent workshop count
        L.circle(coordinates, {
          color: '#0ea5e9',
          fillColor: '#0ea5e9',
          fillOpacity: 0.3,
          radius: count * 50000,
        }).addTo(map);
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-gradient-card rounded-lg border shadow-card overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Workshop Locations</h3>
        <p className="text-sm text-muted-foreground">
          Interactive map showing workshop distribution across India
        </p>
      </div>
      <div ref={mapRef} className="h-96 w-full" />
    </div>
  );
};

export default IndiaMap;