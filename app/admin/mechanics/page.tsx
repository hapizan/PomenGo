"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminMechanicsPage() {
  const pendingMechanics = [
    { id: "1", name: "New Mechanic", email: "new@example.com", status: "pending" },
    { id: "2", name: "Another Mechanic", email: "another@example.com", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Approve Mechanics</h1>
        <p className="text-muted-foreground">Review and approve mechanic registrations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Mechanics awaiting verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingMechanics.map((mechanic) => (
              <div
                key={mechanic.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{mechanic.name}</p>
                  <p className="text-sm text-muted-foreground">{mechanic.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="destructive">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

