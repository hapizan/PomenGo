export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RoutePoint extends Coordinates {
  timestamp?: number;
}

export interface Route {
  points: RoutePoint[];
  distance: number; // in kilometers
  duration: number; // in minutes
}

