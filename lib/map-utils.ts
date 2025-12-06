import { Coordinates, Route, RoutePoint } from "@/types/map";

export function calculateDistance(
  point1: Coordinates,
  point2: Coordinates
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const dLon = ((point2.lng - point1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function generateRoute(
  start: Coordinates,
  end: Coordinates,
  numPoints: number = 20
): Route {
  const points: RoutePoint[] = [];
  const distance = calculateDistance(start, end);
  const duration = Math.round(distance * 2); // Rough estimate: 2 min per km

  for (let i = 0; i <= numPoints; i++) {
    const ratio = i / numPoints;
    points.push({
      lat: start.lat + (end.lat - start.lat) * ratio,
      lng: start.lng + (end.lng - start.lng) * ratio,
      timestamp: Date.now() + i * (duration * 60 * 1000) / numPoints,
    });
  }

  return { points, distance, duration };
}

export function interpolatePosition(
  route: Route,
  progress: number
): Coordinates {
  const index = Math.floor(progress * (route.points.length - 1));
  const point = route.points[Math.min(index, route.points.length - 1)];
  return { lat: point.lat, lng: point.lng };
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)}km`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

