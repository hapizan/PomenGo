import { Job, JobCheckpoint, Quote } from "./job";
import { User, Mechanic, Workshop } from "./user";

export interface Car {
  id: string;
  user_id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  mileage: number;
}

export interface MockData {
  users: User[];
  cars: Car[];
  jobs: Job[];
  mechanics: Mechanic[];
  workshops: Workshop[];
  checkpoints: JobCheckpoint[];
  quotes: Quote[];
}

