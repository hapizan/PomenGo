"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Mechanic } from "@/types/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, CheckCircle2, XCircle, MessageSquare, Wrench } from "lucide-react";
import { RatingsDisplay } from "@/components/mechanic/RatingsDisplay";
import { motion, AnimatePresence } from "framer-motion";

// Fix for default marker icon issue in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

// Custom marker icons for available/unavailable mechanics
const createMechanicMarkerIcon = (isAvailable: boolean) => {
  const color = isAvailable ? "#22c55e" : "#ef4444"; // Green for available, red for unavailable
  return L.divIcon({
    className: "custom-mechanic-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          color: white;
          font-size: 18px;
        ">🔧</div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

interface MechanicsMapViewProps {
  mechanics: Mechanic[];
  onMechanicSelect?: (mechanic: Mechanic) => void;
}

// Mock feedback data
const mockFeedback: Record<string, Array<{ user: string; rating: number; comment: string; date: string }>> = {
  "mech-1": [
    { user: "Ahmad Rahman", rating: 5, comment: "Excellent service! Fixed my engine issue quickly and professionally.", date: "2024-01-15" },
    { user: "Siti Nurhaliza", rating: 4, comment: "Very knowledgeable mechanic. Explained everything clearly.", date: "2024-01-10" },
    { user: "Lim Wei Ming", rating: 5, comment: "Best mechanic in town! Highly recommended.", date: "2024-01-05" },
  ],
  "mech-2": [
    { user: "Tan Ah Beng", rating: 5, comment: "Fast response and great service. Will definitely use again!", date: "2024-01-18" },
    { user: "Fatimah Zahra", rating: 4, comment: "Professional and friendly. Fixed my electrical issue perfectly.", date: "2024-01-12" },
  ],
  "mech-3": [
    { user: "David Tan", rating: 5, comment: "Great tire service! Very professional and reasonable pricing.", date: "2024-01-20" },
    { user: "Nurul Aisyah", rating: 4, comment: "Fixed my suspension issue. Good work!", date: "2024-01-14" },
  ],
  "mech-4": [
    { user: "Chong Wei", rating: 5, comment: "Expert in transmission repair. Solved my problem in one visit!", date: "2024-01-19" },
    { user: "Aminah Binti", rating: 5, comment: "Excellent mechanic with great attention to detail.", date: "2024-01-16" },
    { user: "Raj Kumar", rating: 4, comment: "Very satisfied with the engine tuning service.", date: "2024-01-11" },
  ],
};

export function MechanicsMapView({ mechanics, onMechanicSelect }: MechanicsMapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  // Filter available mechanics
  const availableMechanics = mechanics.filter((m) => m.is_available);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapContainerRef.current) {
      return;
    }

    // Initialize map
    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [3.1390, 101.6869] as [number, number], // Kuala Lumpur center
        zoom: 11,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapRef.current = map;
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for mechanics
    mechanics.forEach((mechanic) => {
      const marker = L.marker([mechanic.location_lat, mechanic.location_lng], {
        icon: createMechanicMarkerIcon(mechanic.is_available),
      }).addTo(mapRef.current!);

      // Create popup content
      const feedback = mockFeedback[mechanic.id] || [];
      const avgFeedbackRating = feedback.length > 0
        ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
        : mechanic.rating;

      const popupContent = `
        <div style="min-width: 220px;">
          <div style="font-weight: bold; margin-bottom: 8px; font-size: 16px;">
            ${mechanic.name}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="color: #fbbf24;">⭐</span>
            <span style="font-weight: 600;">${mechanic.rating.toFixed(1)}</span>
            <span style="color: #666; font-size: 12px;">(${mechanic.total_jobs} jobs)</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span style="
              padding: 4px 8px;
              background: ${mechanic.is_available ? "#dcfce7" : "#fee2e2"};
              color: ${mechanic.is_available ? "#166534" : "#991b1b"};
              border-radius: 4px;
              font-size: 11px;
              font-weight: 600;
            ">
              ${mechanic.is_available ? "✓ Available" : "✗ Busy"}
            </span>
          </div>
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
            ${mechanic.specialties.slice(0, 2).join(", ")}
          </div>
          <button 
            onclick="window.selectMechanic('${mechanic.id}')"
            style="
              margin-top: 8px;
              width: 100%;
              padding: 6px 12px;
              background: #180092;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
              font-weight: 600;
            "
          >
            View Details
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on("click", () => {
        setSelectedMechanic(mechanic);
        if (onMechanicSelect) {
          onMechanicSelect(mechanic);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (mechanics.length > 0 && mapRef.current) {
      const group = new L.FeatureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }

    // Expose selectMechanic function to window for popup button clicks
    const selectMechanicHandler = (mechanicId: string) => {
      const mechanic = mechanics.find((m) => m.id === mechanicId);
      if (mechanic) {
        setSelectedMechanic(mechanic);
        if (onMechanicSelect) {
          onMechanicSelect(mechanic);
        }
        // Close popup
        markersRef.current.forEach((marker) => {
          if (marker.getLatLng().lat === mechanic.location_lat && marker.getLatLng().lng === mechanic.location_lng) {
            mapRef.current?.closePopup();
          }
        });
      }
    };

    (window as any).selectMechanic = selectMechanicHandler;

    return () => {
      // Cleanup
      if ((window as any).selectMechanic) {
        delete (window as any).selectMechanic;
      }
    };
  }, [mechanics, isClient, onMechanicSelect]);

  if (!isClient) {
    return (
      <div className="w-full h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  const feedback = selectedMechanic ? mockFeedback[selectedMechanic.id] || [] : [];

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Available ({availableMechanics.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-muted-foreground">Busy ({mechanics.length - availableMechanics.length})</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
          >
            Map View
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            List View
          </Button>
        </div>
      </div>

      {viewMode === "map" ? (
        <>
          {/* Map Container */}
          <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>

          {/* Selected Mechanic Card */}
          <AnimatePresence>
            {selectedMechanic && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Wrench className="h-5 w-5 text-primary" />
                          {selectedMechanic.name}
                        </CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{selectedMechanic.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">({selectedMechanic.total_jobs} jobs)</span>
                          </div>
                          <Badge
                            className={
                              selectedMechanic.is_available
                                ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                                : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                            }
                          >
                            {selectedMechanic.is_available ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Available
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Busy
                              </>
                            )}
                          </Badge>
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedMechanic(null)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Location */}
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-semibold text-sm">
                          {selectedMechanic.location_lat.toFixed(4)}, {selectedMechanic.location_lng.toFixed(4)}
                        </p>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <p className="text-sm font-medium mb-2">Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMechanic.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Ratings */}
                    <RatingsDisplay mechanic={selectedMechanic} showTitle={false} />

                    {/* Feedback/Reviews */}
                    {feedback.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <MessageSquare className="h-4 w-4 text-primary" />
                          <p className="text-sm font-medium">Customer Feedback</p>
                        </div>
                        <div className="space-y-3">
                          {feedback.map((review, idx) => (
                            <div key={idx} className="p-3 bg-muted rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-semibold text-sm">{review.user}</p>
                                  <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-semibold">{review.rating}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button className="w-full" onClick={() => onMechanicSelect?.(selectedMechanic)}>
                      Request Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* List View */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mechanics.map((mechanic) => {
            const mechanicFeedback = mockFeedback[mechanic.id] || [];
            return (
              <Card
                key={mechanic.id}
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedMechanic(mechanic)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{mechanic.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{mechanic.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({mechanic.total_jobs} jobs)</span>
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        mechanic.is_available
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                          : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                      }
                    >
                      {mechanic.is_available ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Available
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Busy
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {mechanic.specialties.slice(0, 3).map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  {mechanicFeedback.length > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Latest Review</p>
                      <p className="text-sm line-clamp-2">{mechanicFeedback[0].comment}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

