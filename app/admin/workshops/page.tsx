"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminWorkshopsPage() {
  const workshops = [
    { id: "1", name: "AutoWorks", address: "123 Main St", status: "verified" },
    { id: "2", name: "QuickFix", address: "456 Oak Ave", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Verify Workshops</h1>
        <p className="text-muted-foreground">Review and verify workshop registrations</p>
      </div>

      <div className="space-y-4">
        {workshops.map((workshop) => (
          <Card key={workshop.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{workshop.name}</CardTitle>
                  <CardDescription>{workshop.address}</CardDescription>
                </div>
                <Badge variant={workshop.status === "verified" ? "default" : "secondary"}>
                  {workshop.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {workshop.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm">Verify</Button>
                  <Button size="sm" variant="destructive">
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

