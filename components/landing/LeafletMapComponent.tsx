"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle2 } from "lucide-react";

// Fix for default marker icon issue in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

const malaysiaCenter: [number, number] = [4.2105, 101.9758];

const serviceAreas = [
  {
    id: 1,
    name: "Kuala Lumpur",
    position: [3.1390, 101.6869] as [number, number],
    mechanics: 150,
    jobs: 2500,
    status: "Active",
  },
  {
    id: 2,
    name: "Selangor",
    position: [3.0738, 101.5183] as [number, number],
    mechanics: 200,
    jobs: 3500,
    status: "Active",
  },
  {
    id: 3,
    name: "Penang",
    position: [5.4164, 100.3327] as [number, number],
    mechanics: 80,
    jobs: 1200,
    status: "Active",
  },
  {
    id: 4,
    name: "Johor Bahru",
    position: [1.4927, 103.7414] as [number, number],
    mechanics: 70,
    jobs: 1100,
    status: "Active",
  },
  {
    id: 5,
    name: "Malacca",
    position: [2.1896, 102.2501] as [number, number],
    mechanics: 45,
    jobs: 800,
    status: "Active",
  },
  {
    id: 6,
    name: "Ipoh",
    position: [4.5975, 101.0901] as [number, number],
    mechanics: 55,
    jobs: 900,
    status: "Active",
  },
];

// Custom marker icon with mechanic count
const createCustomIcon = (count: number) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: #180092;
        color: white;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
      ">
        ${count}
      </div>
    `,
    iconSize: [45, 45],
    iconAnchor: [22.5, 22.5],
  });
};

interface LeafletMapComponentProps {
  onAreaSelect?: (area: typeof serviceAreas[0]) => void;
}

export default function LeafletMapComponent({ onAreaSelect }: LeafletMapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapContainerRef.current || mapRef.current) {
      return;
    }

    // Initialize map only once
    const map = L.map(mapContainerRef.current, {
      center: malaysiaCenter,
      zoom: 7,
      scrollWheelZoom: true,
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    // Add markers
    serviceAreas.forEach((area) => {
      const icon = createCustomIcon(area.mechanics);
      const marker = L.marker(area.position, { icon }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="font-weight: bold; font-size: 18px; margin-bottom: 8px;">${area.name}</h3>
          <div style="display: flex; flex-direction: column; gap: 4px; font-size: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #180092;">👥</span>
              <span>${area.mechanics} Mechanics</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #22c55e;">✓</span>
              <span>${area.jobs.toLocaleString()} Jobs Completed</span>
            </div>
            <span style="margin-top: 8px; padding: 4px 8px; border: 1px solid #e5e7eb; border-radius: 4px; display: inline-block; width: fit-content;">
              ${area.status}
            </span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add click handler
      marker.on("click", () => {
        if (onAreaSelect) {
          onAreaSelect(area);
        }
      });

      markersRef.current.push(marker);
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
    };
  }, [isClient, onAreaSelect]);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-lg"
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    />
  );
}

