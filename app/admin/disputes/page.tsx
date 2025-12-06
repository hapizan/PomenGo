"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDisputesPage() {
  const disputes = [
    {
      id: "1",
      jobId: "job-1",
      customer: "John Doe",
      mechanic: "Mike Smith",
      issue: "Price dispute",
      status: "open",
    },
    {
      id: "2",
      jobId: "job-2",
      customer: "Jane Smith",
      mechanic: "Sarah Johnson",
      issue: "Quality concern",
      status: "resolved",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dispute Center</h1>
        <p className="text-muted-foreground">Manage customer and mechanic disputes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Disputes</CardTitle>
          <CardDescription>Disputes requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div
                key={dispute.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">Job #{dispute.jobId}</p>
                  <p className="text-sm text-muted-foreground">
                    {dispute.customer} vs {dispute.mechanic}
                  </p>
                  <p className="text-sm mt-1">{dispute.issue}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={dispute.status === "open" ? "destructive" : "default"}>
                    {dispute.status}
                  </Badge>
                  {dispute.status === "open" && (
                    <Button size="sm">Resolve</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

