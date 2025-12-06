"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

// Fix for default marker icon issue in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

// Custom marker icon for current location
const createLocationMarkerIcon = () => {
  return L.divIcon({
    className: "custom-location-marker",
    html: `
      <div style="
        background-color: #ef4444;
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
        ">📍</div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

interface LocationMapProps {
  onLocationChange?: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

export function LocationMap({ onLocationChange, initialLat, initialLng }: LocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null
  );
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
            icon: createLocationMarkerIcon(),
          }).addTo(mapRef.current);

          marker.bindPopup(`
            <div style="text-align: center; min-width: 150px;">
              <div style="font-weight: bold; margin-bottom: 4px;">Your Location</div>
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

    // Initialize map
    if (!mapRef.current) {
      const defaultCenter: [number, number] = location
        ? [location.lat, location.lng]
        : [3.1390, 101.6869]; // Kuala Lumpur center as default

      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: location ? 15 : 11,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapRef.current = map;

      // If we have an initial location, add marker
      if (location) {
        const marker = L.marker([location.lat, location.lng], {
          icon: createLocationMarkerIcon(),
        }).addTo(map);

        marker.bindPopup(`
          <div style="text-align: center; min-width: 150px;">
            <div style="font-weight: bold; margin-bottom: 4px;">Your Location</div>
            <div style="font-size: 12px; color: #666;">
              ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}
            </div>
          </div>
        `).openPopup();

        markerRef.current = marker;
      } else {
        // Try to get current location on mount
        getCurrentLocation();
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <Card className="h-full">
        <CardContent className="p-0 h-full">
          <div className="w-full h-full min-h-[500px] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Map Container */}
        <div className="relative flex-1 min-h-[500px]">
          <div ref={mapContainerRef} className="w-full h-full rounded-lg" />
          
          {/* Location Info Overlay */}
          {location && (
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
          )}

          {/* Get Location Button */}
          <div className="absolute bottom-4 right-4 z-[1000]">
            <Button
              onClick={getCurrentLocation}
              disabled={loading}
              size="sm"
              className="gap-2 shadow-lg"
            >
              <Navigation className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Getting Location..." : "Get My Location"}
            </Button>
          </div>
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

