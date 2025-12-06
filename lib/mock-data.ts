import { Job, JobCheckpoint, Quote } from "@/types/job";
import { User, Mechanic, Workshop } from "@/types/user";
import { Car, MockData } from "@/types/mock-data";

export const mockUsers: User[] = [
  {
    id: "user-1",
    role: "customer",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    role: "mechanic",
    name: "Mike Smith",
    email: "mike@example.com",
    phone: "+1234567891",
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "user-3",
    role: "workshop",
    name: "AutoWorks",
    email: "workshop@example.com",
    phone: "+1234567892",
    created_at: "2024-01-05T10:00:00Z",
  },
];

export const mockCars: Car[] = [
  {
    id: "car-1",
    user_id: "user-1",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    plate: "ABC-1234",
    mileage: 45000,
    // Using local image from public/image folder
    image_url: "/image/camry.png",
  },
  {
    id: "car-2",
    user_id: "user-1",
    brand: "Honda",
    model: "Civic",
    year: 2019,
    plate: "XYZ-5678",
    mileage: 60000,
    // Using local image from public/image folder
    image_url: "/image/honda_civic.png",
  },
];

export const mockMechanics: Mechanic[] = [
  {
    id: "mech-1",
    user_id: "user-2",
    name: "Mike Smith",
    rating: 4.8,
    total_jobs: 150,
    specialties: ["Engine Repair", "Brake Service", "AC Service"],
    location_lat: 3.1390,
    location_lng: 101.6869,
    is_available: true,
    platform_ratings: {
      facebook: 4.7,
      youtube: 4.9,
      tiktok: 4.6,
    },
  },
  {
    id: "mech-2",
    user_id: "user-4",
    name: "Sarah Johnson",
    rating: 4.9,
    total_jobs: 200,
    specialties: ["Electrical Issues", "Battery Replacement"],
    location_lat: 3.0738,
    location_lng: 101.5183,
    is_available: true,
    platform_ratings: {
      facebook: 4.8,
      youtube: 5.0,
      tiktok: 4.7,
    },
  },
  {
    id: "mech-3",
    user_id: "user-5",
    name: "Ahmad Rahman",
    rating: 4.7,
    total_jobs: 120,
    specialties: ["Tire Service", "Suspension", "Alignment"],
    location_lat: 3.1580,
    location_lng: 101.7120,
    is_available: false,
    platform_ratings: {
      facebook: 4.6,
      youtube: 4.8,
      tiktok: 4.5,
    },
  },
  {
    id: "mech-4",
    user_id: "user-6",
    name: "Lim Wei Ming",
    rating: 4.9,
    total_jobs: 180,
    specialties: ["Transmission", "Clutch Service", "Engine Tuning"],
    location_lat: 3.1000,
    location_lng: 101.6500,
    is_available: true,
    platform_ratings: {
      facebook: 4.9,
      youtube: 5.0,
      tiktok: 4.8,
    },
  },
];

export const mockWorkshops: Workshop[] = [
  {
    id: "workshop-1",
    name: "AutoWorks",
    address: "123 Main St, New York, NY",
    phone: "+1234567892",
    mechanic_count: 5,
    is_verified: true,
  },
];

export const mockJobs: Job[] = [
  {
    id: "job-1",
    customer_id: "user-1",
    mechanic_id: "mech-1",
    car_id: "car-1",
    service_type: "Engine Repair",
    description: "Engine making strange noises, check engine light on",
    ai_estimated_price: 250,
    status: "repairing",
    location_lat: 3.1390,
    location_lng: 101.6869,
    timestamp_created: "2024-01-20T10:00:00Z",
    timestamp_updated: "2024-01-20T11:00:00Z",
  },
  {
    id: "job-2",
    customer_id: "user-1",
    car_id: "car-2",
    service_type: "Brake Service",
    description: "Brakes squeaking, need inspection",
    ai_estimated_price: 150,
    status: "pending",
    location_lat: 3.0738,
    location_lng: 101.5183,
    timestamp_created: "2024-01-21T09:00:00Z",
  },
  {
    id: "job-3",
    customer_id: "user-1",
    car_id: "car-1",
    service_type: "AC Service",
    description: "Air conditioning not working properly",
    ai_estimated_price: 180,
    status: "pending",
    location_lat: 3.1580,
    location_lng: 101.7120,
    timestamp_created: "2024-01-22T08:00:00Z",
  },
  {
    id: "job-4",
    customer_id: "user-1",
    car_id: "car-2",
    service_type: "Battery Replacement",
    description: "Car won't start, battery might be dead",
    ai_estimated_price: 200,
    status: "pending",
    location_lat: 3.1000,
    location_lng: 101.6500,
    timestamp_created: "2024-01-22T10:00:00Z",
  },
];

export const mockCheckpoints: JobCheckpoint[] = [
  {
    id: "checkpoint-1",
    job_id: "job-1",
    type: "before",
    video_url: "/videos/before-repair.mp4",
    notes: "Initial inspection completed",
    timestamp_uploaded: "2024-01-20T10:30:00Z",
  },
  {
    id: "checkpoint-2",
    job_id: "job-1",
    type: "during",
    video_url: "/videos/during-repair.mp4",
    notes: "Repair in progress",
    timestamp_uploaded: "2024-01-20T11:00:00Z",
  },
];

export const mockQuotes: Quote[] = [
  {
    id: "quote-1",
    job_id: "job-1",
    mechanic_id: "mech-1",
    labor_cost: 200,
    parts_cost: 150,
    total_cost: 350,
    status: "approved",
    created_at: "2024-01-20T10:45:00Z",
  },
];

export const mockData: MockData = {
  users: mockUsers,
  cars: mockCars,
  jobs: mockJobs,
  mechanics: mockMechanics,
  workshops: mockWorkshops,
  checkpoints: mockCheckpoints,
  quotes: mockQuotes,
};

