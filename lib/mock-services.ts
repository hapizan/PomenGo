import { Job, JobCheckpoint, Quote } from "@/types/job";
import { Car } from "@/types/mock-data";
import { Mechanic, User } from "@/types/user";
import {
  mockJobs,
  mockCars,
  mockMechanics,
  mockCheckpoints,
  mockQuotes,
  mockUsers,
} from "./mock-data";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getJobs(): Promise<Job[]> {
  await delay(500);
  return mockJobs;
}

export async function getJob(id: string): Promise<Job | null> {
  await delay(500);
  return mockJobs.find((job) => job.id === id) || null;
}

export async function getCars(userId: string): Promise<Car[]> {
  await delay(500);
  return mockCars.filter((car) => car.user_id === userId);
}

export async function getMechanics(): Promise<Mechanic[]> {
  await delay(500);
  return mockMechanics;
}

export async function getJobCheckpoints(
  jobId: string
): Promise<JobCheckpoint[]> {
  await delay(500);
  return mockCheckpoints.filter((cp) => cp.job_id === jobId);
}

export async function getQuote(jobId: string): Promise<Quote | null> {
  await delay(500);
  return mockQuotes.find((quote) => quote.job_id === jobId) || null;
}

export async function checkSymptoms(
  description: string,
  carModel: string
): Promise<{
  possibleIssues: string[];
  estimatedPrice: { min: number; max: number };
  confidence: number;
}> {
  await delay(1500); // Simulate AI processing
  return {
    possibleIssues: [
      "Engine misfire",
      "Spark plug issues",
      "Fuel system problem",
    ],
    estimatedPrice: { min: 200, max: 500 },
    confidence: 0.75,
  };
}

export async function submitQuote(
  jobId: string,
  laborCost: number,
  partsCost: number
): Promise<Quote> {
  await delay(800);
  return {
    id: `quote-${Date.now()}`,
    job_id: jobId,
    mechanic_id: "mech-1",
    labor_cost: laborCost,
    parts_cost: partsCost,
    total_cost: laborCost + partsCost,
    status: "pending",
    created_at: new Date().toISOString(),
  };
}

export async function createJob(jobData: Partial<Job>): Promise<Job> {
  await delay(800);
  return {
    id: `job-${Date.now()}`,
    customer_id: jobData.customer_id || "user-1",
    car_id: jobData.car_id || "car-1",
    service_type: jobData.service_type || "Other",
    description: jobData.description || "",
    status: "pending",
    location_lat: jobData.location_lat || 40.7128,
    location_lng: jobData.location_lng || -74.006,
    timestamp_created: new Date().toISOString(),
    ...jobData,
  };
}

// Helper functions to get related data
export function getCarByJob(job: Job): Car | null {
  return mockCars.find((car) => car.id === job.car_id) || null;
}

export function getCustomerByJob(job: Job): User | null {
  return mockUsers.find((user) => user.id === job.customer_id) || null;
}

