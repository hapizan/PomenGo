"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getJob, getJobCheckpoints, getQuote } from "@/lib/mock-services";
import { Job, JobCheckpoint, Quote } from "@/types/job";
import { JOB_STATUS_LABELS } from "@/lib/constants";
import { MechanicMapNavigation } from "@/components/job/MechanicMapNavigation";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [checkpoints, setCheckpoints] = useState<JobCheckpoint[]>([]);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [jobData, checkpointData, quoteData] = await Promise.all([
        getJob(jobId),
        getJobCheckpoints(jobId),
        getQuote(jobId),
      ]);
      setJob(jobData);
      setCheckpoints(checkpointData);
      setQuote(quoteData);
      setLoading(false);
    }
    loadData();
  }, [jobId]);

  if (loading || !job) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const isTraveling = job.status === "accepted" || job.status === "diagnosing";
  const mechanicLocation = isTraveling
    ? { lat: 40.715, lng: -74.008 } // Mock mechanic location
    : { lat: job.location_lat, lng: job.location_lng };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{job.service_type}</h1>
          <p className="text-muted-foreground">Job ID: {job.id}</p>
        </div>
        <Badge>{JOB_STATUS_LABELS[job.status]}</Badge>
      </div>

      {/* Map Navigation */}
      {isTraveling && (
        <MechanicMapNavigation
          mechanicLocation={mechanicLocation}
          destination={{ lat: job.location_lat, lng: job.location_lng }}
          isTraveling={isTraveling}
        />
      )}

      {/* Job Details */}
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p>{job.description}</p>
          </div>
          {job.ai_estimated_price && (
            <div>
              <p className="text-sm text-muted-foreground">AI Estimated Price</p>
              <p className="text-xl font-bold">RM {job.ai_estimated_price}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quote */}
      {quote && (
        <Card>
          <CardHeader>
            <CardTitle>Quote</CardTitle>
            <CardDescription>Mechanic&apos;s pricing breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Labor Cost:</span>
              <span className="font-semibold">RM {quote.labor_cost}</span>
            </div>
            <div className="flex justify-between">
              <span>Parts Cost:</span>
              <span className="font-semibold">RM {quote.parts_cost}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-4">
              <span>Total:</span>
              <span className="text-primary">RM {quote.total_cost}</span>
            </div>
            {quote.status === "pending" && (
              <div className="flex gap-2">
                <Button className="flex-1">Approve Quote</Button>
                <Button variant="outline" className="flex-1">
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Checkpoints */}
      {checkpoints.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Repair Checkpoints</CardTitle>
            <CardDescription>Video proof of work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {checkpoints.map((checkpoint) => (
              <div key={checkpoint.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{checkpoint.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(checkpoint.timestamp_uploaded).toLocaleString()}
                  </span>
                </div>
                {checkpoint.video_url && (
                  <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Video: {checkpoint.video_url}</p>
                  </div>
                )}
                {checkpoint.notes && <p className="mt-2 text-sm">{checkpoint.notes}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {job.status === "completed" && (
        <Link href={`/customer/job/${job.id}/payment`}>
          <Button className="w-full" size="lg">
            Proceed to Payment
          </Button>
        </Link>
      )}
    </div>
  );
}

