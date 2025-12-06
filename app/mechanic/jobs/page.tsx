"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getJobs } from "@/lib/mock-services";
import { Job } from "@/types/job";
import { JOB_STATUS_LABELS } from "@/lib/constants";
import { Map, List } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
const MapView = dynamic(
  () => import("@/components/mechanic/JobsMapView").then((mod) => ({ default: mod.JobsMapView })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    ),
  }
);

export default function MechanicJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "available" | "my">("available");
  const [viewMode, setViewMode] = useState<"list" | "map">("map");

  useEffect(() => {
    async function loadJobs() {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    }
    loadJobs();
  }, []);

  const availableJobs = jobs.filter((j) => j.status === "pending" && !j.mechanic_id);
  const myJobs = jobs.filter((j) => j.mechanic_id === "mech-1");
  const filteredJobs = filter === "available" ? availableJobs : filter === "my" ? myJobs : jobs;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Jobs</h1>
          <p className="text-muted-foreground">Browse and manage active service requests</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2 border rounded-lg p-1">
            <Button
              variant={filter === "available" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("available")}
            >
              Available
            </Button>
            <Button
              variant={filter === "my" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("my")}
            >
              My Jobs
            </Button>
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
          </div>
          <div className="flex gap-2 border rounded-lg p-1">
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="gap-2"
            >
              <Map className="h-4 w-4" />
              Map
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              List
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "map" ? (
        <MapView jobs={jobs} filter={filter} />
      ) : (
        <>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No jobs found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{job.service_type}</CardTitle>
                        <CardDescription>{job.description}</CardDescription>
                      </div>
                      <Badge>{JOB_STATUS_LABELS[job.status]}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        {job.ai_estimated_price && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">Estimated:</span>{" "}
                            <span className="font-semibold">RM {job.ai_estimated_price}</span>
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {new Date(job.timestamp_created).toLocaleString()}
                        </p>
                      </div>
                      <Link href={`/mechanic/jobs/${job.id}`}>
                        <Button>
                          {job.status === "pending" && !job.mechanic_id
                            ? "Accept Job"
                            : "View Details"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

