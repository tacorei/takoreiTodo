import { useState, useEffect } from 'react';
import { GeolocationService } from '../services/geolocation';
import { Task } from '../types';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export function useLocation(tasks: Task[]) {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const geolocationService = GeolocationService.getInstance();
    let mounted = true;

    const checkLocationTasks = (position: GeolocationPosition) => {
      if (!mounted) return;

      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude, error: null });

      tasks.forEach(task => {
        if (task.location && !task.completed) {
          const isNearLocation = geolocationService.isLocationWithinRange(
            latitude,
            longitude,
            task.location.latitude,
            task.location.longitude,
            task.location.radius
          );

          if (isNearLocation) {
            NotificationService.getInstance().sendTaskReminder(task);
          }
        }
      });
    };

    const setupLocationTracking = async () => {
      const hasPermission = await geolocationService.checkLocationPermission();
      if (hasPermission) {
        geolocationService.startLocationTracking(checkLocationTasks);
      } else {
        setLocation(prev => ({ ...prev, error: 'Location permission denied' }));
      }
    };

    setupLocationTracking();

    return () => {
      mounted = false;
      geolocationService.stopLocationTracking();
    };
  }, [tasks]);

  return location;
}