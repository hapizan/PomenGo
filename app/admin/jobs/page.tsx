"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminJobsPage() {
  const jobs = [
    { id: "job-1", service: "Engine Repair", customer: "John Doe", status: "completed" },
    { id: "job-2", service: "Brake Service", customer: "Jane Smith", status: "in-progress" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Monitoring</h1>
          <p className="text-muted-foreground">Monitor all platform jobs</p>
        </div>
        <Input placeholder="Search jobs..." className="w-64" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
          <CardDescription>Platform-wide job overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{job.service}</p>
                  <p className="text-sm text-muted-foreground">Customer: {job.customer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{job.status}</Badge>
                  <Button variant="outline" size="sm">
                    View Details
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

