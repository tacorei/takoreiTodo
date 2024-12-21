export class GeolocationService {
  private static instance: GeolocationService;
  private watchId: number | null = null;

  private constructor() {}

  static getInstance(): GeolocationService {
    if (!this.instance) {
      this.instance = new GeolocationService();
    }
    return this.instance;
  }

  async checkLocationPermission(): Promise<boolean> {
    if (!('geolocation' in navigator)) {
      return false;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state === 'granted';
    } catch {
      return false;
    }
  }

  startLocationTracking(onLocationUpdate: (position: GeolocationPosition) => void): void {
    if (!('geolocation' in navigator)) {
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      onLocationUpdate,
      undefined,
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  }

  stopLocationTracking(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  isLocationWithinRange(
    userLat: number,
    userLng: number,
    targetLat: number,
    targetLng: number,
    radius: number
  ): boolean {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (userLat * Math.PI) / 180;
    const φ2 = (targetLat * Math.PI) / 180;
    const Δφ = ((targetLat - userLat) * Math.PI) / 180;
    const Δλ = ((targetLng - userLng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance <= radius;
  }
}