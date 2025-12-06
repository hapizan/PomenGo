"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getJobs, getCars } from "@/lib/mock-services";
import { Job } from "@/types/job";
import { Car } from "@/types/mock-data";
import { JOB_STATUS_LABELS } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { FloatingTools } from "@/components/animated/FloatingTools";
import {
  Wrench,
  CheckCircle2,
  Clock,
  AlertCircle,
  Car as CarIcon,
  Plus,
  ArrowRight,
  Calendar,
  DollarSign,
  Activity,
  Zap,
} from "lucide-react";

// Status color mapping
const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20";
    case "accepted":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-500/20";
    case "diagnosing":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-500 border-purple-500/20";
    case "repairing":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-500 border-orange-500/20";
    case "completed":
      return "bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-600 dark:text-gray-500 border-gray-500/20";
  }
};

// Progress percentage based on status
const getProgress = (status: string) => {
  switch (status) {
    case "pending":
      return 10;
    case "accepted":
      return 25;
    case "diagnosing":
      return 50;
    case "repairing":
      return 75;
    case "completed":
      return 100;
    default:
      return 0;
  }
};

// Format date relative to now
const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString();
};

export default function CustomerDashboard() {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [jobsData, carsData] = await Promise.all([
        getJobs(),
        getCars("user-1"),
      ]);
      setJobs(jobsData);
      setCars(carsData);
      setLoading(false);
    }
    loadData();
  }, []);

  const activeJobs = jobs.filter((j) => j.status !== "completed" && j.status !== "cancelled");
  const completedJobs = jobs.filter((j) => j.status === "completed");
  const pendingJobs = jobs.filter((j) => j.status === "pending");
  
  // Calculate total spent (from completed jobs with quotes)
  const totalSpent = completedJobs.reduce((sum, job) => {
    return sum + (job.ai_estimated_price || 0);
  }, 0);

  // Get car info for a job
  const getCarInfo = (carId: string) => {
    return cars.find((car) => car.id === carId);
  };

  return (
    <div className="space-y-6 relative">
      {/* Subtle floating tools in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <FloatingTools />
      </div>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{t("customer.dashboard.title")}</h1>
            <p className="text-muted-foreground mt-2 text-lg">{t("customer.dashboard.welcome")}</p>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("customer.dashboard.activeJobs")}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeJobs.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {pendingJobs.length} {pendingJobs.length === 1 ? "pending" : "pending"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("customer.dashboard.completed")}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedJobs.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All time completed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">RM {totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {completedJobs.length} {completedJobs.length === 1 ? "service" : "services"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                My Vehicles
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                <CarIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{cars.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Registered vehicles
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10"
      >
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("customer.dashboard.quickActions")}
            </CardTitle>
            <CardDescription>{t("customer.dashboard.quickActionsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/customer/issue">
                <Button className="w-full h-auto py-6 flex flex-col items-center gap-2 bg-primary hover:bg-primary/90">
                  <AlertCircle className="h-6 w-6" />
                  <span>{t("customer.dashboard.reportIssue")}</span>
                </Button>
              </Link>
              <Link href="/customer/cars/new">
                <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2 hover:bg-accent">
                  <Plus className="h-6 w-6" />
                  <span>{t("customer.dashboard.addCar")}</span>
                </Button>
              </Link>
              <Link href="/customer/ai-check">
                <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2 hover:bg-accent">
                  <Wrench className="h-6 w-6" />
                  <span>AI Check</span>
                </Button>
              </Link>
              <Link href="/customer/cars">
                <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2 hover:bg-accent">
                  <CarIcon className="h-6 w-6" />
                  <span>My Cars</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-10"
      >
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {t("customer.dashboard.activeJobsList")}
                </CardTitle>
                <CardDescription className="mt-1">
                  {t("customer.dashboard.activeJobsListDesc")}
                </CardDescription>
              </div>
              {activeJobs.length > 0 && (
                <Badge variant="secondary" className="text-sm">
                  {activeJobs.length} {activeJobs.length === 1 ? "job" : "jobs"}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-4">{t("common.loading")}</p>
              </div>
            ) : activeJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Wrench className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Active Jobs</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  {t("customer.dashboard.noActiveJobs")}
                </p>
                <Link href="/customer/issue">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("customer.dashboard.reportIssue")}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {activeJobs.map((job, idx) => {
                  const carInfo = getCarInfo(job.car_id);
                  const progress = getProgress(job.status);
                  
                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="group"
                    >
                      <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1 space-y-4">
                              {/* Header */}
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-semibold">{job.service_type}</h3>
                                    <Badge className={getStatusColor(job.status)}>
                                      {JOB_STATUS_LABELS[job.status]}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{job.description}</p>
                                </div>
                              </div>

                              {/* Car Info & Details */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
                                {carInfo && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <CarIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{carInfo.brand} {carInfo.model}</span>
                                    <span className="text-muted-foreground">({carInfo.year})</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>Created {formatRelativeTime(job.timestamp_created)}</span>
                                </div>
                                {job.ai_estimated_price && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Est. RM {job.ai_estimated_price}</span>
                                  </div>
                                )}
                                {job.mechanic_id && (
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Wrench className="h-4 w-4" />
                                    <span>Mechanic assigned</span>
                                  </div>
                                )}
                              </div>

                              {/* Progress Bar */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>Progress</span>
                                  <span>{progress}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                                    className="h-full bg-primary rounded-full"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex items-center lg:flex-col gap-2">
                              <Link href={`/customer/job/${job.id}`} className="flex-1 lg:w-full">
                                <Button className="w-full group-hover:bg-primary/90">
                                  {t("customer.dashboard.viewDetails")}
                                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

