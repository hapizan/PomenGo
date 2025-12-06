"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function MechanicProfilePage() {
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

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
            {["Engine Repair", "Brake Service", "AC Service"].map((spec) => (
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
    </div>
  );
}

