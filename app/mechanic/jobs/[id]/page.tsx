"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getJob, getJobCheckpoints, submitQuote } from "@/lib/mock-services";
import { Job, JobCheckpoint } from "@/types/job";
import { JOB_STATUS_LABELS } from "@/lib/constants";
import { MechanicMapNavigation } from "@/components/job/MechanicMapNavigation";

export default function MechanicJobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [checkpoints, setCheckpoints] = useState<JobCheckpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingQuote, setSubmittingQuote] = useState(false);
  const [laborCost, setLaborCost] = useState("");
  const [partsCost, setPartsCost] = useState("");

  useEffect(() => {
    async function loadData() {
      const [jobData, checkpointData] = await Promise.all([
        getJob(jobId),
        getJobCheckpoints(jobId),
      ]);
      setJob(jobData);
      setCheckpoints(checkpointData);
      setLoading(false);
    }
    loadData();
  }, [jobId]);

  const handleAcceptJob = async () => {
    // Simulate accepting job
    if (job) {
      setJob({ ...job, status: "accepted", mechanic_id: "mech-1" });
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittingQuote(true);
    await submitQuote(jobId, parseFloat(laborCost), parseFloat(partsCost));
    setSubmittingQuote(false);
    router.push("/mechanic/jobs");
  };

  if (loading || !job) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const isTraveling = job.status === "accepted" || job.status === "diagnosing";
  const mechanicLocation = isTraveling
    ? { lat: 40.715, lng: -74.008 }
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
          {job.status === "pending" && !job.mechanic_id && (
            <Button onClick={handleAcceptJob} className="w-full">
              Accept This Job
            </Button>
          )}
        </CardContent>
      </Card>

      {/* SOP Checklist */}
      {job.status !== "pending" && (
        <Card>
          <CardHeader>
            <CardTitle>Standard Operating Procedure</CardTitle>
            <CardDescription>Follow these steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Record before video",
              "Diagnose the issue",
              "Submit quote to customer",
              "Wait for approval",
              "Perform repair",
              "Record after video",
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>{step}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Submit Quote */}
      {job.status === "diagnosing" && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Quote</CardTitle>
            <CardDescription>Provide pricing breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitQuote} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Labor Cost ($)</label>
                <Input
                  type="number"
                  value={laborCost}
                  onChange={(e) => setLaborCost(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Parts Cost ($)</label>
                <Input
                  type="number"
                  value={partsCost}
                  onChange={(e) => setPartsCost(e.target.value)}
                  required
                />
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">
                    RM {((parseFloat(laborCost) || 0) + (parseFloat(partsCost) || 0)).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={submittingQuote}>
                {submittingQuote ? "Submitting..." : "Submit Quote"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Checkpoints */}
      {checkpoints.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Checkpoints</CardTitle>
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
                {checkpoint.notes && <p className="text-sm">{checkpoint.notes}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

