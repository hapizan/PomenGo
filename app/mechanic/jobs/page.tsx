"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getJobs } from "@/lib/mock-services";
import { Job } from "@/types/job";
import { JOB_STATUS_LABELS } from "@/lib/constants";

export default function MechanicJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "available" | "my">("available");

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
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-muted-foreground">Browse and manage service requests</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "available" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("available")}
          >
            Available
          </Button>
          <Button
            variant={filter === "my" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("my")}
          >
            My Jobs
          </Button>
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
        </div>
      </div>

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
    </div>
  );
}

