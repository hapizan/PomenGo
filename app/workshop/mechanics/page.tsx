"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMechanics } from "@/lib/mock-services";
import { Mechanic } from "@/types/user";
import { MechanicsMapView } from "@/components/admin/MechanicsMapView";
import { Map, List } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
const MapView = dynamic(
  () => import("@/components/admin/MechanicsMapView").then((mod) => ({ default: mod.MechanicsMapView })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    ),
  }
);

export default function WorkshopMechanicsPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  useEffect(() => {
    async function loadMechanics() {
      const data = await getMechanics();
      // Filter mechanics for this workshop (in real app, filter by workshop_id)
      setMechanics(data);
      setLoading(false);
    }
    loadMechanics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Mechanics</h1>
          <p className="text-muted-foreground">View and manage your mechanics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2 border rounded-lg p-1">
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="gap-2"
            >
              <Map className="h-4 w-4" />
              Map
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              List
            </Button>
          </div>
          <Button>Add Mechanic</Button>
        </div>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading mechanics...</p>
          </CardContent>
        </Card>
      ) : mechanics.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No mechanics found.</p>
          </CardContent>
        </Card>
      ) : viewMode === "map" ? (
        <MapView mechanics={mechanics} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mechanics.map((mechanic) => (
            <Card key={mechanic.id}>
              <CardHeader>
                <CardTitle>{mechanic.name}</CardTitle>
                <CardDescription>
                  {mechanic.total_jobs} jobs completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating:</span>
                  <span className="font-semibold">{mechanic.rating.toFixed(1)} ⭐</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge className={mechanic.is_available ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"}>
                    {mechanic.is_available ? "Available" : "Busy"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-mono text-xs">
                    {mechanic.location_lat.toFixed(4)}, {mechanic.location_lng.toFixed(4)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

