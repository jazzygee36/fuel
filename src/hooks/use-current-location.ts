import { useEffect, useState } from "react";
import * as Location from "expo-location";

interface CurrentLocationState {
  location: Location.LocationObject | null;
  loading: boolean;
  error: string | null;
}

export const useCurrentLocation = (): CurrentLocationState => {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        console.log("📍 Starting location request...");

        setLoading(true);
        setError(null);

        const servicesEnabled =
          await Location.hasServicesEnabledAsync();

        console.log(
          "📍 Location services enabled:",
          servicesEnabled
        );

        if (!servicesEnabled) {
          setError("Please enable location services on your device.");
          return;
        }

        const { status: existingStatus } =
          await Location.getForegroundPermissionsAsync();

        console.log(
          "📍 Existing permission:",
          existingStatus
        );

        let permissionStatus = existingStatus;

        if (permissionStatus !== "granted") {
          console.log("📍 Requesting location permission...");

          const { status } =
            await Location.requestForegroundPermissionsAsync();

          console.log(
            "📍 Requested permission:",
            status
          );

          permissionStatus = status;
        }

        if (permissionStatus !== "granted") {
          console.log("❌ Location permission denied");

          setError(
            "Permission to access your location was denied."
          );

          return;
        }

        console.log("📍 Getting current GPS position...");

        const currentLocation =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });

        console.log(
          "✅ CURRENT LOCATION:",
          currentLocation
        );

        console.log(
          "✅ LATITUDE:",
          currentLocation.coords.latitude
        );

        console.log(
          "✅ LONGITUDE:",
          currentLocation.coords.longitude
        );

        setLocation(currentLocation);
      } catch (error) {
        console.error(
          "❌ Failed to get current location:",
          error
        );

        setError(
          "Unable to get your current location."
        );
      } finally {
        console.log("📍 Location request finished");
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