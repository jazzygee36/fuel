import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import SearchBar from "../../../components/search-bar";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsHeader from "../settings/header";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import FileterModal from "../dashboard/filter-moda";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useNearbyStations } from "../../../hooks/queries/stations";

const fuelTabs = ["Petrol", "Diesel", "Gas", "CNG", "Engine Oil"];

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Stations"
>;

export default function Stations() {
  const navigation = useNavigation<NavigationProp>();

  const [activeTab, setActiveTab] = useState("Petrol");
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [locationError, setLocationError] = useState("");

  /**
   * Get user's current location
   */
  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationError("Location permission was denied");
          return;
        }

        const currentLocation =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });

        const lat = currentLocation.coords.latitude;
        const lng = currentLocation.coords.longitude;

        console.log("USER LATITUDE:", lat);
        console.log("USER LONGITUDE:", lng);

        setLatitude(lat);
        setLongitude(lng);
      } catch (error) {
        console.log("Location error:", error);
        setLocationError("Unable to get your current location");
      }
    };

    getLocation();
  }, []);

  /**
   * Get nearby stations
   *
   * This will NOT run until latitude and longitude exist
   * because of the `enabled` condition in useNearbyStations.
   */
  const {
    data: nearbyStations,
    isPending,
    isError,
    error,
  } = useNearbyStations(latitude, longitude);

  console.log("NEARBY STATIONS:", nearbyStations);

  /**
   * Make sure the API response is an array.
   *
   * If your backend returns { data: [...] },
   * change this to:
   *
   * const stationList = nearbyStations?.data ?? [];
   */
  const stationList = Array.isArray(nearbyStations)
    ? nearbyStations
    : [];

  const handleBuyFuel = (item: any) => {
    navigation.navigate("BuyFuel", {
      selectedStation: item,
    });
  };

  const renderStation: ListRenderItem<any> = ({ item }) => {
    /**
     * Adjust these field names based on your backend response.
     */
    const isOpen =
      item.status?.toLowerCase() === "open" ||
      item.func?.toLowerCase() === "open";

    return (
      <TouchableOpacity
        style={styles.stationRow}
        onPress={() => handleBuyFuel(item)}
      >
        <View style={styles.leftSection}>
          {/* Use station logo if your API returns one.
              Otherwise use your default image. */}
          <Image
            source={require("../../../assets/png/gas-station-icon.png")}
            style={styles.logo}
          />

          <View style={styles.stationInfo}>
            <Text style={styles.stationName}>
              {item.name}
            </Text>

            <View style={styles.metaRow}>
              <MaterialIcons
                name="location-pin"
                size={13}
                color="#E74C3C"
              />

              <Text style={styles.metaText}>
                {item.distance
                  ? `${item.distance} km`
                  : "Nearby"}
              </Text>

              <Text style={styles.metaDot}>•</Text>

              <Text style={styles.metaText}>
                {item.status || "Available"}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View
            style={[
              styles.officeHourContainer,
              isOpen
                ? styles.openBadge
                : styles.closedBadge,
            ]}
          >
            <Text
              style={[
                styles.officeHour,
                isOpen
                  ? styles.openText
                  : styles.closedText,
              ]}
            >
              {item.status || "Closed"}
            </Text>
          </View>

          <View style={styles.imageLitre}>
            <Image
              source={require(
                "../../../assets/png/gas-station-icon.png"
              )}
              style={styles.fuelIcon}
            />

            <Text>
              {item.price
                ? `₦${item.price}/L`
                : "N/A"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * Header
   */
  const renderHeader = () => (
    <>
      <SettingsHeader title="List of Fuel Stations" />

      <SearchBar
        placeholder="Search name/location"
        onPress={() => setOpenFilterModal(true)}
      />

      <FlatList
        data={fuelTabs}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
        renderItem={({ item, index }) => {
          const active = activeTab === item;

          return (
            <View style={styles.tabItemWrapper}>
              <TouchableOpacity
                onPress={() => setActiveTab(item)}
              >
                <Text
                  style={[
                    styles.tabText,
                    active && styles.activeTabText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>

              {index !== fuelTabs.length - 1 && (
                <Text style={styles.dot}>•</Text>
              )}
            </View>
          );
        }}
      />

      <ReuseableBottomModal
        visible={openFilterModal}
        title="Filter"
        onClose={() => setOpenFilterModal(false)}
      >
        <FileterModal
          setOpenFilterModal={setOpenFilterModal}
        />
      </ReuseableBottomModal>
    </>
  );

  /**
   * Location permission error
   */
  if (locationError) {
    return (
      <View style={styles.center}>
        <MaterialIcons
          name="location-off"
          size={45}
          color="#540863"
        />

        <Text style={styles.emptyTitle}>
          Location unavailable
        </Text>

        <Text style={styles.emptyText}>
          {locationError}
        </Text>
      </View>
    );
  }

  /**
   * Waiting for location
   */
  if (latitude === undefined || longitude === undefined) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#540863"
        />

        <Text style={styles.loadingText}>
          Getting your location...
        </Text>
      </View>
    );
  }

  /**
   * Loading stations
   */
  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#540863"
        />

        <Text style={styles.loadingText}>
          Finding nearby stations...
        </Text>
      </View>
    );
  }

  /**
   * API error
   */
  if (isError) {
    return (
      <View style={styles.center}>
        <MaterialIcons
          name="error-outline"
          size={45}
          color="#D92D20"
        />

        <Text style={styles.emptyTitle}>
          Unable to load stations
        </Text>

        <Text style={styles.emptyText}>
          {error instanceof Error
            ? error.message
            : "Something went wrong"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <FlatList
        data={stationList}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        renderItem={renderStation}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons
              name="local-gas-station"
              size={50}
              color="#540863"
            />

            <Text style={styles.emptyTitle}>
              No nearby stations
            </Text>

            <Text style={styles.emptyText}>
              We couldn't find any fuel stations
              within 10km of your current location.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    padding: 20,
    paddingBottom: 30,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  loadingText: {
    marginTop: 12,
    color: "#595959",
    fontSize: 14,
  },

  empty: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 80,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151521",
    marginTop: 15,
    textAlign: "center",
  },

  emptyText: {
    color: "#777",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
  },

  tabsContainer: {
    alignItems: "center",
    marginTop: 22,
    marginBottom: 10,
  },

  tabItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  tabText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#8E8E93",
  },

  activeTabText: {
    color: "#7C3AED",
    fontWeight: "700",
  },

  dot: {
    marginHorizontal: 8,
    color: "#8E8E93",
    fontSize: 18,
  },

  stationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  logo: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: 14,
  },

  stationInfo: {
    flex: 1,
  },

  stationName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    marginBottom: 4,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaText: {
    fontSize: 15,
    color: "#8E8E93",
  },

  metaDot: {
    marginHorizontal: 5,
    color: "#8E8E93",
    fontSize: 14,
  },

  officeHourContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  officeHour: {
    fontSize: 13,
    fontWeight: "500",
  },

  openBadge: {
    backgroundColor: "#C0FEB8",
  },

  closedBadge: {
    backgroundColor: "#E2E2E5",
  },

  openText: {
    color: "#29A329",
  },

  closedText: {
    color: "#76777A",
  },

  imageLitre: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },

  fuelIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
});