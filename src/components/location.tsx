import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { nearbyStations } from "../api/stations";

export default function NearbyStations() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [stations, setStations] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNearbyStations = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        // Check if location services are enabled
        const servicesEnabled =
          await Location.hasServicesEnabledAsync();

        console.log(
          "Location services enabled:",
          servicesEnabled
        );

        if (!servicesEnabled) {
          setErrorMsg(
            "Please enable location services on your device."
          );
          return;
        }

        // Check existing permission
        const existingPermission =
          await Location.getForegroundPermissionsAsync();

        console.log(
          "Existing location permission:",
          existingPermission.status
        );

        let permissionStatus =
          existingPermission.status;

        // Request permission if we don't already have it
        if (permissionStatus !== "granted") {
          const requestedPermission =
            await Location.requestForegroundPermissionsAsync();

          permissionStatus =
            requestedPermission.status;

          console.log(
            "Location permission:",
            permissionStatus
          );
        }

        if (permissionStatus !== "granted") {
          setErrorMsg(
            "Permission to access your location was denied."
          );
          return;
        }

        // Get current location
        const currentLocation =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

        console.log(
          "Current location:",
          currentLocation
        );

        setLocation(currentLocation);

        const {
          latitude,
          longitude,
        } = currentLocation.coords;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // Get nearby stations
        const response = await nearbyStations(
          latitude,
          longitude,
          10
        );

        console.log(
          "Nearby stations:",
          response
        );

        setStations(response);
      } catch (error) {
        console.error(
          "Failed to get nearby stations:",
          error
        );

        setErrorMsg(
          "Unable to get your location or nearby stations."
        );
      } finally {
        setLoading(false);
      }
    };

    getNearbyStations();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />

        <Text>
          Finding nearby stations...
        </Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {errorMsg}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.title}>
            Your Location
          </Text>

          <Text>
            Latitude:{" "}
            {location.coords.latitude}
          </Text>

          <Text>
            Longitude:{" "}
            {location.coords.longitude}
          </Text>
        </View>
      )}

      <Text style={styles.title}>
        Nearby Stations
      </Text>

      <Text>
        Stations found: {stations.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 15,
  },

  locationContainer: {
    alignItems: "center",
    gap: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  errorText: {
    color: "#EF4444",
    textAlign: "center",
  },
});