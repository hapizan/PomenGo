"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateRoute, interpolatePosition, formatDistance, formatDuration } from "@/lib/map-utils";
import { Coordinates, Route } from "@/types/map";
import { motion } from "framer-motion";

interface MechanicMapNavigationProps {
  mechanicLocation: Coordinates;
  destination: Coordinates;
  isTraveling?: boolean;
}

export function MechanicMapNavigation({
  mechanicLocation,
  destination,
  isTraveling = true,
}: MechanicMapNavigationProps) {
  const [currentPosition, setCurrentPosition] = useState<Coordinates>(mechanicLocation);
  const [route, setRoute] = useState<Route | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const generatedRoute = generateRoute(mechanicLocation, destination);
    setRoute(generatedRoute);
  }, [mechanicLocation, destination]);

  useEffect(() => {
    if (!isTraveling || !route) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 0.02, 1);
        if (newProgress < 1) {
          const newPos = interpolatePosition(route, newProgress);
          setCurrentPosition(newPos);
        }
        return newProgress;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isTraveling, route]);

  if (!route) return <div>Loading map...</div>;

  const remainingDistance = route.distance * (1 - progress);
  const remainingTime = route.duration * (1 - progress);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mechanic Location</CardTitle>
        <CardDescription>Real-time tracking</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Visualization */}
        <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
          {/* Destination Marker */}
          <div
            className="absolute z-10"
            style={{
              left: `${((destination.lng + 180) / 360) * 100}%`,
              top: `${((90 - destination.lat) / 180) * 100}%`,
            }}
          >
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold bg-red-500 text-white px-2 py-1 rounded">
              Destination
            </div>
          </div>

          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full">
            <line
              x1={`${((mechanicLocation.lng + 180) / 360) * 100}%`}
              y1={`${((90 - mechanicLocation.lat) / 180) * 100}%`}
              x2={`${((destination.lng + 180) / 360) * 100}%`}
              y2={`${((90 - destination.lat) / 180) * 100}%`}
              stroke="#180092"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>

          {/* Mechanic Marker (Animated) */}
          <motion.div
            className="absolute z-20"
            animate={{
              left: `${((currentPosition.lng + 180) / 360) * 100}%`,
              top: `${((90 - currentPosition.lat) / 180) * 100}%`,
            }}
            transition={{ duration: 2, ease: "linear" }}
          >
            <motion.div
              className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold bg-primary text-white px-2 py-1 rounded">
              Mechanic
            </div>
          </motion.div>
        </div>

        {/* Status Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Distance Remaining</p>
            <p className="text-xl font-bold">{formatDistance(remainingDistance)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estimated Time</p>
            <p className="text-xl font-bold">{formatDuration(Math.round(remainingTime))}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {isTraveling && (
          <Badge variant="default" className="w-full justify-center">
            Mechanic is traveling to your location
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

