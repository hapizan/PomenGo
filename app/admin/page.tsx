"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const stats = {
    totalJobs: 1250,
    activeMechanics: 45,
    workshops: 12,
    monthlyRevenue: 125000,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and analytics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Jobs</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalJobs.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Mechanics</CardTitle>
            <CardDescription>Currently active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeMechanics}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Workshops</CardTitle>
            <CardDescription>Verified workshops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.workshops}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              RM {stats.monthlyRevenue.toLocaleString()}
            </div>
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
                <p className="font-semibold">New Mechanic Registration</p>
                <p className="text-sm text-muted-foreground">Mike Smith - Pending approval</p>
              </div>
              <Badge>Pending</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">Workshop Verification</p>
                <p className="text-sm text-muted-foreground">AutoWorks - Needs review</p>
              </div>
              <Badge>Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

