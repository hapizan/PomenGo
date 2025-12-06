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
import { cn } from "@/lib/utils";
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

      {/* Quick Actions - Moved to top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10"
      >
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border-primary/30 shadow-md overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-2xl" />
          <CardHeader className="relative z-10 py-3 px-4">
            <CardTitle className="flex items-center gap-2 text-primary text-sm">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              {t("customer.dashboard.quickActions")}
            </CardTitle>
            <CardDescription className="text-primary/70 text-xs mt-1">{t("customer.dashboard.quickActionsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 px-4 pb-3">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/customer/issue">
                <Button className="w-full h-auto py-3 flex flex-col items-center gap-1.5 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md shadow-red-500/20 transition-all text-xs">
                  <AlertCircle className="h-4 w-4" />
                  <span>{t("customer.dashboard.reportIssue")}</span>
                </Button>
              </Link>
              <Link href="/customer/cars/new">
                <Button className="w-full h-auto py-3 flex flex-col items-center gap-1.5 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md shadow-blue-500/20 transition-all text-xs">
                  <Plus className="h-4 w-4" />
                  <span>{t("customer.dashboard.addCar")}</span>
                </Button>
              </Link>
              <Link href="/customer/ai-check">
                <Button className="w-full h-auto py-3 flex flex-col items-center gap-1.5 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 transition-all text-xs">
                  <Wrench className="h-4 w-4" />
                  <span>AI Check</span>
                </Button>
              </Link>
              <Link href="/customer/cars">
                <Button className="w-full h-auto py-3 flex flex-col items-center gap-1.5 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md shadow-green-500/20 transition-all text-xs">
                  <CarIcon className="h-4 w-4" />
                  <span>My Cars</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Small Stats Cards - Only Active Jobs and My Vehicles */}
      <div className="grid gap-3 md:grid-cols-2 relative z-10">
        {activeJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-l-2 border-l-blue-500 bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -mr-10 -mt-10 blur-xl" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-4 relative z-10">
                <CardTitle className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  {t("customer.dashboard.activeJobs")}
                </CardTitle>
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                  <Activity className="h-3.5 w-3.5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10 px-4 pb-3">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{activeJobs.length}</div>
                <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-0.5">
                  {pendingJobs.length} {pendingJobs.length === 1 ? "pending" : "pending"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {cars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-l-2 border-l-orange-500 bg-gradient-to-br from-orange-50/50 to-orange-100/30 dark:from-orange-950/20 dark:to-orange-900/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full -mr-10 -mt-10 blur-xl" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-4 relative z-10">
                <CardTitle className="text-xs font-medium text-orange-700 dark:text-orange-300">
                  My Vehicles
                </CardTitle>
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20">
                  <CarIcon className="h-3.5 w-3.5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10 px-4 pb-3">
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{cars.length}</div>
                <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-0.5">
                  Registered vehicles
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Active Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-10"
      >
        <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50/50 to-slate-100/30 dark:from-slate-950/20 dark:to-slate-900/10 border-2 border-slate-200/50 dark:border-slate-800/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl" />
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  {t("customer.dashboard.activeJobsList")}
                </CardTitle>
                <CardDescription className="mt-1">
                  {t("customer.dashboard.activeJobsListDesc")}
                </CardDescription>
              </div>
              {activeJobs.length > 0 && (
                <Badge className="text-sm bg-primary/10 text-primary border-primary/20">
                  {activeJobs.length} {activeJobs.length === 1 ? "job" : "jobs"}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-4">{t("common.loading")}</p>
              </div>
            ) : activeJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Active Jobs</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  {t("customer.dashboard.noActiveJobs")}
                </p>
                <Link href="/customer/issue">
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("customer.dashboard.reportIssue")}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeJobs.map((job, idx) => {
                  const carInfo = getCarInfo(job.car_id);
                  const progress = getProgress(job.status);
                  
                  // Get status-based gradient colors
                  const getStatusGradient = (status: string) => {
                    switch (status) {
                      case "pending":
                        return "from-yellow-50/50 to-yellow-100/30 dark:from-yellow-950/20 dark:to-yellow-900/10 border-yellow-500/30";
                      case "accepted":
                        return "from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-500/30";
                      case "diagnosing":
                        return "from-purple-50/50 to-purple-100/30 dark:from-purple-950/20 dark:to-purple-900/10 border-purple-500/30";
                      case "repairing":
                        return "from-orange-50/50 to-orange-100/30 dark:from-orange-950/20 dark:to-orange-900/10 border-orange-500/30";
                      default:
                        return "from-primary/5 to-primary/10 border-primary/30";
                    }
                  };
                  
                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="group"
                    >
                      <Card className={cn(
                        "hover:shadow-lg transition-all duration-300 border-l-4 bg-gradient-to-br overflow-hidden relative h-full",
                        getStatusGradient(job.status)
                      )}>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-2xl" />
                        <CardContent className="p-5 relative z-10 flex flex-col h-full">
                          <div className="flex-1 space-y-3">
                            {/* Header */}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-base font-semibold">{job.service_type}</h3>
                                <Badge className={getStatusColor(job.status)}>
                                  {JOB_STATUS_LABELS[job.status]}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                            </div>

                            {/* Car Info & Details */}
                            <div className="space-y-2 pt-2 border-t">
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
                            <div className="space-y-2 pt-2">
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
                          <div className="pt-3 mt-auto">
                            <Link href={`/customer/job/${job.id}`}>
                              <Button className="w-full group-hover:bg-primary/90 text-sm">
                                {t("customer.dashboard.viewDetails")}
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
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

