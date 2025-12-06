import { JobStatus, QuoteStatus } from "@/types/job";
import { UserRole } from "@/types/user";

export const JOB_STATUSES: JobStatus[] = [
  "pending",
  "accepted",
  "diagnosing",
  "repairing",
  "completed",
  "cancelled",
];

export const QUOTE_STATUSES: QuoteStatus[] = [
  "pending",
  "approved",
  "rejected",
];

export const USER_ROLES: UserRole[] = [
  "customer",
  "mechanic",
  "workshop",
  "admin",
];

export const SERVICE_TYPES = [
  "Engine Repair",
  "Brake Service",
  "Oil Change",
  "Tire Replacement",
  "Battery Replacement",
  "AC Service",
  "Transmission Repair",
  "Electrical Issues",
  "Other",
];

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  diagnosing: "Diagnosing",
  repairing: "Repairing",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  pending: "Pending Approval",
  approved: "Approved",
  rejected: "Rejected",
};

