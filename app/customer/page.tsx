"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getJobs } from "@/lib/mock-services";
import { Job } from "@/types/job";
import { JOB_STATUS_LABELS } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { FloatingTools } from "@/components/animated/FloatingTools";

export default function CustomerDashboard() {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    }
    loadJobs();
  }, []);

  const activeJobs = jobs.filter((j) => j.status !== "completed" && j.status !== "cancelled");
  const completedJobs = jobs.filter((j) => j.status === "completed");

  return (
    <div className="space-y-6 relative">
      {/* Subtle floating tools in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <FloatingTools />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold">{t("customer.dashboard.title")}</h1>
          <p className="text-muted-foreground">{t("customer.dashboard.welcome")}</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{t("customer.dashboard.activeJobs")}</CardTitle>
              <CardDescription>{t("customer.dashboard.activeJobsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeJobs.length}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{t("customer.dashboard.completed")}</CardTitle>
              <CardDescription>{t("customer.dashboard.completedDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedJobs.length}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{t("customer.dashboard.quickActions")}</CardTitle>
              <CardDescription>{t("customer.dashboard.quickActionsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Link href="/customer/issue">
                  <Button size="sm">{t("customer.dashboard.reportIssue")}</Button>
                </Link>
                <Link href="/customer/cars/new">
                  <Button size="sm" variant="outline">{t("customer.dashboard.addCar")}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Active Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10"
      >
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{t("customer.dashboard.activeJobsList")}</CardTitle>
            <CardDescription>{t("customer.dashboard.activeJobsListDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">{t("common.loading")}</div>
            ) : activeJobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t("customer.dashboard.noActiveJobs")} <Link href="/customer/issue" className="text-primary underline">{t("customer.dashboard.reportIssueLink")}</Link> {t("customer.dashboard.getStarted")}
              </div>
            ) : (
              <div className="space-y-4">
                {activeJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{job.service_type}</h3>
                        <Badge>{JOB_STATUS_LABELS[job.status]}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
                    </div>
                    <Link href={`/customer/job/${job.id}`}>
                      <Button>{t("customer.dashboard.viewDetails")}</Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

