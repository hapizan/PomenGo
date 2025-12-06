"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WorkshopJobsPage() {
  const jobs = [
    { id: "job-1", service: "Engine Repair", customer: "John Doe", status: "pending" },
    { id: "job-2", service: "Brake Service", customer: "Jane Smith", status: "assigned" },
    { id: "job-3", service: "AC Service", customer: "Bob Johnson", status: "in-progress" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dispatch Jobs</h1>
        <p className="text-muted-foreground">Assign jobs to mechanics</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{job.service}</CardTitle>
                  <CardDescription>Customer: {job.customer}</CardDescription>
                </div>
                <Badge>{job.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {job.status === "pending" && (
                  <Button size="sm">Assign Mechanic</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

