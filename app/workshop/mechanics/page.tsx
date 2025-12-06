"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WorkshopMechanicsPage() {
  const mechanics = [
    { id: "1", name: "Mike Smith", rating: 4.8, jobs: 150, status: "active" },
    { id: "2", name: "Sarah Johnson", rating: 4.9, jobs: 200, status: "active" },
    { id: "3", name: "John Doe", rating: 4.7, jobs: 120, status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Mechanics</h1>
          <p className="text-muted-foreground">View and manage your mechanics</p>
        </div>
        <Button>Add Mechanic</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mechanics.map((mechanic) => (
          <Card key={mechanic.id}>
            <CardHeader>
              <CardTitle>{mechanic.name}</CardTitle>
              <CardDescription>
                {mechanic.jobs} jobs completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rating:</span>
                <span className="font-semibold">{mechanic.rating} ⭐</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={mechanic.status === "active" ? "default" : "secondary"}>
                  {mechanic.status}
                </Badge>
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
    </div>
  );
}

