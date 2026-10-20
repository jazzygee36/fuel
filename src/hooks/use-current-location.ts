import { useEffect, useState } from "react";
import * as Location from "expo-location";

interface CurrentLocationState {
  location: Location.LocationObject | null;
  loading: boolean;
  error: string | null;
}

export const useCurrentLocation = (): CurrentLocationState => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        const servicesEnabled = await Location.hasServicesEnabledAsync();

        if (!servicesEnabled) {
          setError("Please enable location services on your device.");
          return;
        }

        const { status: existingStatus } =
          await Location.getForegroundPermissionsAsync();

        let permissionStatus = existingStatus;

        if (permissionStatus !== "granted") {
          const { status } = await Location.requestForegroundPermissionsAsync();

          permissionStatus = status;
        }

        if (permissionStatus !== "granted") {
          setError("Permission to access your location was denied.");

          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(currentLocation);
      } catch (error) {
        reportError(error);

        setError("Unable to get your current location.");
      } finally {
        setLoading(false);
      }
    };

    getCurrentLocation();
  }, []);

  return {
    location,
    loading,
    error,
  };
};
