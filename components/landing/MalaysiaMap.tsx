"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import Leaflet map to avoid SSR issues
const LeafletMap = dynamic(
  () => import("./LeafletMapComponent"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }
);

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

export function MalaysiaMap() {
  const [selectedArea, setSelectedArea] = useState<typeof serviceAreas[0] | null>(null);

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Service Areas in Malaysia
        </CardTitle>
        <CardDescription>
          We currently serve {serviceAreas.length} major cities across Malaysia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="w-full h-[400px] rounded-lg overflow-hidden border-2 border-primary/20">
            <LeafletMap onAreaSelect={setSelectedArea} />
          </div>

          {selectedArea && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-2 border-primary/20 rounded-lg bg-primary/5"
            >
              <h3 className="font-bold text-lg mb-3">{selectedArea.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{selectedArea.mechanics} Active Mechanics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>{selectedArea.jobs.toLocaleString()} Jobs Completed</span>
                </div>
                <Badge variant="outline" className="mt-2">
                  {selectedArea.status}
                </Badge>
              </div>
            </motion.div>
          )}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {serviceAreas.map((area) => (
              <motion.div
                key={area.id}
                whileHover={{ scale: 1.02 }}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedArea?.id === area.id
                    ? "bg-primary/10 border-primary"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedArea(area)}
              >
                <div className="font-semibold">{area.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {area.mechanics} mechanics • {area.jobs.toLocaleString()} jobs
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
