"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WorkshopDashboard() {
  const activeJobs = 5;
  const mechanicCount = 8;
  const monthlyRevenue = 12500;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workshop Dashboard</h1>
        <p className="text-muted-foreground">AutoWorks Management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
            <CardDescription>Currently in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeJobs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mechanics</CardTitle>
            <CardDescription>Total mechanics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mechanicCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">RM {monthlyRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">Job #job-1</p>
                <p className="text-sm text-muted-foreground">Engine Repair - Assigned to Mike Smith</p>
              </div>
              <Badge>In Progress</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">Job #job-2</p>
                <p className="text-sm text-muted-foreground">Brake Service - Assigned to Sarah Johnson</p>
              </div>
              <Badge>Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

