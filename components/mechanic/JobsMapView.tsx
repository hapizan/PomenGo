"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Job } from "@/types/job";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock, Wrench } from "lucide-react";
import Link from "next/link";
import { JOB_STATUS_LABELS } from "@/lib/constants";
import { motion } from "framer-motion";

// Fix for default marker icon issue in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

// Custom marker icons for different job statuses
const createJobMarkerIcon = (status: string, isAvailable: boolean) => {
  const color = isAvailable ? "#22c55e" : "#3b82f6"; // Green for available, blue for assigned
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 16px;
        ">🔧</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

interface JobsMapViewProps {
  jobs: Job[];
  filter: "all" | "available" | "my";
  onJobSelect?: (job: Job) => void;
}

export function JobsMapView({ jobs, filter, onJobSelect }: JobsMapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Filter jobs based on selection
  const filteredJobs = jobs.filter((job) => {
    if (filter === "available") {
      return job.status === "pending" && !job.mechanic_id;
    } else if (filter === "my") {
      return job.mechanic_id === "mech-1";
    }
    return true;
  });

  // Get active jobs (not completed/cancelled)
  const activeJobs = filteredJobs.filter(
    (job) => job.status !== "completed" && job.status !== "cancelled"
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapContainerRef.current) {
      return;
    }

    // Initialize map
    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [3.1390, 101.6869] as [number, number], // Kuala Lumpur center
        zoom: 11,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapRef.current = map;
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for active jobs
    activeJobs.forEach((job) => {
      const isAvailable = job.status === "pending" && !job.mechanic_id;
      const marker = L.marker([job.location_lat, job.location_lng], {
        icon: createJobMarkerIcon(job.status, isAvailable),
      }).addTo(mapRef.current!);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">
            ${job.service_type}
          </div>
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
            ${job.description}
          </div>
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
            <span style="
              padding: 4px 8px;
              background: ${isAvailable ? "#dcfce7" : "#dbeafe"};
              color: ${isAvailable ? "#166534" : "#1e40af"};
              border-radius: 4px;
              font-size: 11px;
              font-weight: 600;
            ">
              ${JOB_STATUS_LABELS[job.status]}
            </span>
          </div>
          ${job.ai_estimated_price ? `
            <div style="font-size: 12px; color: #666;">
              Est. RM ${job.ai_estimated_price}
            </div>
          ` : ""}
          <button 
            onclick="window.selectJob('${job.id}')"
            style="
              margin-top: 8px;
              width: 100%;
              padding: 6px 12px;
              background: #180092;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
              font-weight: 600;
            "
          >
            ${isAvailable ? "Accept Job" : "View Details"}
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on("click", () => {
        setSelectedJob(job);
        if (onJobSelect) {
          onJobSelect(job);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (activeJobs.length > 0 && mapRef.current) {
      const group = new L.FeatureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }

    // Expose selectJob function to window for popup button clicks
    const selectJobHandler = (jobId: string) => {
      const job = activeJobs.find((j) => j.id === jobId);
      if (job) {
        setSelectedJob(job);
        if (onJobSelect) {
          onJobSelect(job);
        }
        // Close popup
        markersRef.current.forEach((marker) => {
          if (marker.getLatLng().lat === job.location_lat && marker.getLatLng().lng === job.location_lng) {
            mapRef.current?.closePopup();
          }
        });
      }
    };

    (window as any).selectJob = selectJobHandler;

    return () => {
      // Cleanup
      if ((window as any).selectJob) {
        delete (window as any).selectJob;
      }
    };
  }, [activeJobs, isClient, onJobSelect]);

  if (!isClient) {
    return (
      <div className="w-full h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Selected Job Card */}
      {selectedJob && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    {selectedJob.service_type}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {selectedJob.description}
                  </CardDescription>
                </div>
                <Badge
                  className={
                    selectedJob.status === "pending" && !selectedJob.mechanic_id
                      ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                  }
                >
                  {JOB_STATUS_LABELS[selectedJob.status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {selectedJob.ai_estimated_price && (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Estimated Price</p>
                        <p className="font-semibold">RM {selectedJob.ai_estimated_price}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Created</p>
                      <p className="font-semibold text-sm">
                        {new Date(selectedJob.timestamp_created).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold text-sm">
                      {selectedJob.location_lat.toFixed(4)}, {selectedJob.location_lng.toFixed(4)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`/mechanic/jobs/${selectedJob.id}`} className="flex-1">
                    <Button className="w-full">
                      {selectedJob.status === "pending" && !selectedJob.mechanic_id
                        ? "Accept Job"
                        : "View Details"}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedJob(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Jobs Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Available Jobs ({activeJobs.filter(j => j.status === "pending" && !j.mechanic_id).length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>My Jobs ({activeJobs.filter(j => j.mechanic_id === "mech-1").length})</span>
          </div>
        </div>
        <div>
          Total Active: <span className="font-semibold text-foreground">{activeJobs.length}</span>
        </div>
      </div>
    </div>
  );
}

