import { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { nearbyStations } from "../api/stations";


export default function NearbyStations() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [stations, setStations] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        if (Platform.OS === "android" && !Device.isDevice) {
          setErrorMsg(
            "Location will not work on an Android emulator. Try it on a physical device."
          );
          return;
        }

        // Request permission
        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // Get current location
        const currentLocation =
          await Location.getCurrentPositionAsync({});

        setLocation(currentLocation);

        const latitude = currentLocation.coords.latitude;
        const longitude = currentLocation.coords.longitude;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // Call nearby stations API
        setLoading(true);

        const response = await nearbyStations(
          latitude,
          longitude,
          10
        );

        console.log("Nearby stations:", response);

        setStations(response);
      } catch (error) {
        console.error("Failed to get nearby stations:", error);
        setErrorMsg("Unable to get nearby stations");
      } finally {
        setLoading(false);
      }
    }

    getCurrentLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Finding nearby stations...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <>
          <Text>
            Latitude: {location.coords.latitude}
          </Text>

          <Text>
            Longitude: {location.coords.longitude}
          </Text>
        </>
      )}

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
    gap: 10,
  },
});