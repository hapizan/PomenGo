export type JobStatus =
  | "pending"
  | "accepted"
  | "diagnosing"
  | "repairing"
  | "completed"
  | "cancelled";

export type CheckpointType = "before" | "during" | "after";

export type QuoteStatus = "pending" | "approved" | "rejected";

export interface Job {
  id: string;
  customer_id: string;
  mechanic_id?: string;
  workshop_id?: string;
  car_id: string;
  service_type: string;
  description: string;
  ai_estimated_price?: number;
  status: JobStatus;
  location_lat: number;
  location_lng: number;
  timestamp_created: string;
  timestamp_updated?: string;
}

export interface JobCheckpoint {
  id: string;
  job_id: string;
  type: CheckpointType;
  video_url?: string;
  notes?: string;
  timestamp_uploaded: string;
}

export interface Quote {
  id: string;
  job_id: string;
  mechanic_id: string;
  labor_cost: number;
  parts_cost: number;
  total_cost: number;
  status: QuoteStatus;
  created_at: string;
}

