"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getMechanics } from "@/lib/mock-services";
import { Mechanic } from "@/types/user";
import { RatingsDisplay } from "@/components/mechanic/RatingsDisplay";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
const MyLocationMap = dynamic(
  () => import("@/components/mechanic/MyLocationMap").then((mod) => ({ default: mod.MyLocationMap })),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading map...</p>
        </CardContent>
      </Card>
    ),
  }
);

export default function MechanicProfilePage() {
  const [loading, setLoading] = useState(false);
  const [mechanic, setMechanic] = useState<Mechanic | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    async function loadMechanic() {
      const mechanics = await getMechanics();
      const currentMechanic = mechanics.find((m) => m.id === "mech-1");
      setMechanic(currentMechanic || mechanics[0]);
      if (currentMechanic) {
        setIsAvailable(currentMechanic.is_available);
      }
    }
    loadMechanic();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your mechanic profile</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input defaultValue="Mike Smith" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input type="email" defaultValue="mike@example.com" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Phone</label>
              <Input defaultValue="+1234567891" required />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>Toggle your availability status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Status</p>
              <p className="text-sm text-muted-foreground">
                {isAvailable ? "Available for new jobs" : "Not accepting new jobs"}
              </p>
            </div>
            <Button
              variant={isAvailable ? "default" : "outline"}
              onClick={() => setIsAvailable(!isAvailable)}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specialties</CardTitle>
          <CardDescription>Your areas of expertise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(mechanic?.specialties || ["Engine Repair", "Brake Service", "AC Service"]).map((spec) => (
              <Badge key={spec} variant="secondary">
                {spec}
              </Badge>
            ))}
          </div>
          <Button variant="outline" className="mt-4">
            Edit Specialties
          </Button>
        </CardContent>
      </Card>

      {/* Location Map */}
      {mechanic && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Your service location coordinates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Latitude</p>
                  <p className="text-sm font-mono font-semibold">{mechanic.location_lat.toFixed(6)}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Longitude</p>
                  <p className="text-sm font-mono font-semibold">{mechanic.location_lng.toFixed(6)}</p>
                </div>
                <Button variant="outline" className="w-full">
                  Update Location
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="lg:sticky lg:top-6" style={{ minHeight: '500px', height: '500px' }}>
            <MyLocationMap 
              lat={mechanic.location_lat} 
              lng={mechanic.location_lng}
              editable={false}
            />
          </div>
        </div>
      )}

      {/* Ratings Display */}
      {mechanic && (
        <RatingsDisplay mechanic={mechanic} />
      )}
    </div>
  );
}

