export type UserRole = "customer" | "mechanic" | "workshop" | "admin";

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Mechanic {
  id: string;
  user_id: string;
  name: string;
  rating: number;
  total_jobs: number;
  specialties: string[];
  location_lat: number;
  location_lng: number;
  is_available: boolean;
}

export interface Workshop {
  id: string;
  name: string;
  address: string;
  phone: string;
  mechanic_count: number;
  is_verified: boolean;
}

