"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getJobs, getMechanics } from "@/lib/mock-services";
import { Job } from "@/types/job";
import { Mechanic } from "@/types/user";
import { JOB_STATUS_LABELS } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import { RatingsDisplay } from "@/components/mechanic/RatingsDisplay";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
const MyLocationMap = dynamic(
  () => import("@/components/mechanic/MyLocationMap").then((mod) => ({ default: mod.MyLocationMap })),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading map...</p>
        </CardContent>
      </Card>
    ),
  }
);

export default function MechanicDashboard() {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [mechanic, setMechanic] = useState<Mechanic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [jobsData, mechanicsData] = await Promise.all([
        getJobs(),
        getMechanics(),
      ]);
      setJobs(jobsData);
      // Get current mechanic (mech-1 for demo)
      const currentMechanic = mechanicsData.find((m) => m.id === "mech-1");
      setMechanic(currentMechanic || mechanicsData[0]);
      setLoading(false);
    }
    loadData();
  }, []);

  const activeJobs = jobs.filter((j) => j.mechanic_id === "mech-1" && j.status !== "completed");
  const earnings = 2500; // Mock earnings

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("mechanic.dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("mechanic.dashboard.welcome")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("mechanic.dashboard.activeJobs")}</CardTitle>
            <CardDescription>{t("mechanic.dashboard.activeJobsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeJobs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("mechanic.dashboard.totalEarnings")}</CardTitle>
            <CardDescription>{t("mechanic.dashboard.totalEarningsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">RM {earnings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("mechanic.dashboard.rating")}</CardTitle>
            <CardDescription>{t("mechanic.dashboard.ratingDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mechanic?.rating.toFixed(1) || "4.8"} ⭐
            </div>
            {mechanic?.platform_ratings && (
              <div className="mt-2 text-xs text-muted-foreground">
                Across all platforms
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ratings Display */}
      {mechanic && (
        <RatingsDisplay mechanic={mechanic} />
      )}

      {/* Location Map */}
      {mechanic && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>My Location</CardTitle>
              <CardDescription>Your current service location on the map</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Latitude</p>
                  <p className="text-sm font-mono font-semibold">{mechanic.location_lat.toFixed(6)}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Longitude</p>
                  <p className="text-sm font-mono font-semibold">{mechanic.location_lng.toFixed(6)}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Customers can see your location when searching for mechanics
                </p>
              </div>
            </CardContent>
          </Card>
          <div style={{ minHeight: '400px', height: '400px' }}>
            <MyLocationMap 
              lat={mechanic.location_lat} 
              lng={mechanic.location_lng}
              editable={false}
            />
          </div>
        </div>
      )}

      {/* Recent Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>{t("mechanic.dashboard.recentJobs")}</CardTitle>
          <CardDescription>{t("mechanic.dashboard.recentJobsDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">{t("common.loading")}</div>
          ) : activeJobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t("mechanic.dashboard.noActiveJobs")}
            </div>
          ) : (
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{job.service_type}</h3>
                      <Badge>{JOB_STATUS_LABELS[job.status]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  </div>
                  <Link href={`/mechanic/jobs/${job.id}`}>
                    <Button>{t("mechanic.dashboard.viewDetails")}</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

