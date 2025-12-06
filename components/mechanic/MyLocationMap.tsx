"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

// Fix for default marker icon issue in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

// Custom marker icon for mechanic's location
const createMyLocationMarkerIcon = () => {
  return L.divIcon({
    className: "custom-my-location-marker",
    html: `
      <div style="
        background-color: #180092;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 4px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          color: white;
          font-size: 20px;
        ">🔧</div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

interface MyLocationMapProps {
  lat: number;
  lng: number;
  onLocationChange?: (lat: number, lng: number) => void;
  editable?: boolean;
}

export function MyLocationMap({ lat, lng, onLocationChange, editable = false }: MyLocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat, lng });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setLocation(newLocation);
        if (onLocationChange) {
          onLocationChange(latitude, longitude);
        }
        setLoading(false);

        // Update map center and marker
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 15);

          // Remove old marker
          if (markerRef.current) {
            mapRef.current.removeLayer(markerRef.current);
          }

          // Add new marker
          const marker = L.marker([latitude, longitude], {
            icon: createMyLocationMarkerIcon(),
            draggable: editable,
          }).addTo(mapRef.current);

          if (editable) {
            marker.on("dragend", (e) => {
              const newPos = e.target.getLatLng();
              const newLoc = { lat: newPos.lat, lng: newPos.lng };
              setLocation(newLoc);
              if (onLocationChange) {
                onLocationChange(newPos.lat, newPos.lng);
              }
            });
          }

          marker.bindPopup(`
            <div style="text-align: center; min-width: 150px;">
              <div style="font-weight: bold; margin-bottom: 4px;">My Location</div>
              <div style="font-size: 12px; color: #666;">
                ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
              </div>
            </div>
          `).openPopup();

          markerRef.current = marker;
        }
      },
      (err) => {
        setError("Unable to retrieve your location. Please enable location permissions.");
        setLoading(false);
        console.error("Geolocation error:", err);
      }
    );
  };

  useEffect(() => {
    if (!isClient || !mapContainerRef.current) {
      return;
    }

    // Wait for container to be fully rendered
    const initMap = () => {
      if (!mapContainerRef.current || mapRef.current) {
        return;
      }

      // Check if container has dimensions
      const container = mapContainerRef.current;
      if (container.offsetWidth === 0 && container.offsetHeight === 0) {
        // Retry after a short delay if container has no dimensions
        setTimeout(initMap, 100);
        return;
      }

      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: [location.lat, location.lng],
        zoom: 15,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapRef.current = map;

      // Add marker for current location
      const marker = L.marker([location.lat, location.lng], {
        icon: createMyLocationMarkerIcon(),
        draggable: editable,
      }).addTo(map);

      if (editable) {
        marker.on("dragend", (e) => {
          const newPos = e.target.getLatLng();
          const newLoc = { lat: newPos.lat, lng: newPos.lng };
          setLocation(newLoc);
          if (onLocationChange) {
            onLocationChange(newPos.lat, newPos.lng);
          }
        });
      }

      marker.bindPopup(`
        <div style="text-align: center; min-width: 150px;">
          <div style="font-weight: bold; margin-bottom: 4px;">My Location</div>
          <div style="font-size: 12px; color: #666;">
            ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}
          </div>
        </div>
      `).openPopup();

      markerRef.current = marker;

      // Invalidate map size after container is fully rendered
      const invalidateSize = () => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      };

      // Invalidate immediately and after delays to handle different rendering scenarios
      setTimeout(invalidateSize, 0);
      setTimeout(invalidateSize, 100);
      setTimeout(invalidateSize, 300);
    };

    // Initialize map
    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient, editable]);

  // Update marker when location prop changes
  useEffect(() => {
    if (mapRef.current && markerRef.current && (location.lat !== lat || location.lng !== lng)) {
      const newLocation = { lat, lng };
      setLocation(newLocation);
      mapRef.current.setView([lat, lng], 15);
      markerRef.current.setLatLng([lat, lng]);
      markerRef.current.getPopup()?.setContent(`
        <div style="text-align: center; min-width: 150px;">
          <div style="font-weight: bold; margin-bottom: 4px;">My Location</div>
          <div style="font-size: 12px; color: #666;">
            ${lat.toFixed(6)}, ${lng.toFixed(6)}
          </div>
        </div>
      `);
    }
  }, [lat, lng]);

  if (!isClient) {
    return (
      <Card className="h-full">
        <CardContent className="p-0 h-full">
          <div className="w-full h-full min-h-[400px] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          My Location
        </CardTitle>
        <CardDescription>
          {editable ? "Drag the marker to update your location" : "Your current location on the map"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-full flex flex-col">
        {/* Map Container */}
        <div className="relative flex-1 min-h-[400px]">
          <div ref={mapContainerRef} className="w-full h-full rounded-lg" style={{ minHeight: '400px', height: '100%' }} />
          
          {/* Location Info Overlay */}
          <div className="absolute top-4 left-4 right-4 z-[1000]">
            <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Current Location</span>
              </div>
              <div className="text-xs font-mono text-muted-foreground space-y-1">
                <div>Lat: {location.lat.toFixed(6)}</div>
                <div>Lng: {location.lng.toFixed(6)}</div>
              </div>
            </div>
          </div>

          {/* Get Location Button */}
          {editable && (
            <div className="absolute bottom-4 right-4 z-[1000]">
              <Button
                onClick={getCurrentLocation}
                disabled={loading}
                size="sm"
                className="gap-2 shadow-lg"
              >
                <Navigation className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Getting Location..." : "Update Location"}
              </Button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border-t border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

