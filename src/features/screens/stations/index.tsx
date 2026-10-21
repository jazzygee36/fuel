import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";

import SearchBar from "../../../components/search-bar";
import SettingsHeader from "../settings/header";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import FileterModal from "../dashboard/filter-moda";
import Loading from "../../../components/loading";

import { Station, StationsNavigationProp } from "../../../navigation/types";
import { useNearbyStations } from "../../../hooks/queries/stations";
import { useCurrentLocation } from "../../../hooks/use-current-location";

const fuelTabs = ["Petrol", "Diesel", "Gas", "Kerosene"];

type NavigationProp = StationsNavigationProp;

type FuelProduct = {
  type: string;
  label: string;
  pricePerLitre: number | string;
};

type StationItem = Omit<Station, "products"> & {
  products?: FuelProduct[];
  latitude?: number | string;
  longitude?: number | string;
};

const FUEL_TYPE_MAP: Record<string, string> = {
  Petrol: "petrol",
  Diesel: "diesel",
  Gas: "gas",
  Kerosene: "kerosene",
};

export default function Stations() {
  const navigation = useNavigation<NavigationProp>();

  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useCurrentLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Petrol");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const stationsPerPage = 10;

  const {
    data: stationsResponse,
    isPending,
    isFetching,
  } = useNearbyStations({
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
    radius: 10,
    search: searchQuery.trim() || undefined,
    fuelType: FUEL_TYPE_MAP[activeTab],
    page: currentPage,
    limit: stationsPerPage,
  });

  const stations: StationItem[] = Array.isArray(stationsResponse)
    ? stationsResponse
    : (stationsResponse?.stations ?? []);

  const totalStations = stationsResponse?.pagination?.total ?? 0;
  const apiPage = stationsResponse?.pagination?.page ?? currentPage;
  const apiLimit = stationsResponse?.pagination?.limit ?? stationsPerPage;
  const totalPages = Math.ceil(totalStations / apiLimit);

  const isInitialLoading =
    locationLoading || (!location && !locationError) || isPending;

  // Pass the exact station clicked to the BuyFuel screen.

  const handleBuyFuel = (station: StationItem) => {
    navigation.navigate("BuyFuel", {
      selectedStation: {
        ...station,
        products:
          station.products?.map((product) => ({
            ...product,
            pricePerLitre: Number(product.pricePerLitre),
          })) ?? [],
      },
    });
  };

  const formatOperatingHours = (hours?: unknown) => {
    if (!hours || typeof hours !== "string") {
      return "Available";
    }

    const [open, close] = hours.split(" - ");

    if (!open || !close) {
      return "Available";
    }

    const formatTime = (time?: string) => {
      if (!time) return "";

      const [hourString, minuteString] = time.split(":");
      const hour = Number(hourString);
      const minute = Number(minuteString);

      if (
        !Number.isInteger(hour) ||
        !Number.isInteger(minute) ||
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59
      ) {
        return "";
      }

      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;

      return `${formattedHour}:${String(minute).padStart(2, "0")} ${period}`;
    };

    const formattedOpen = formatTime(open);
    const formattedClose = formatTime(close);

    if (!formattedOpen || !formattedClose) {
      return "Available";
    }

    return `${formattedOpen} - ${formattedClose}`;
  };

  const isCurrentlyOpen = (hours?: unknown) => {
    if (!hours || typeof hours !== "string") {
      return false;
    }

    const [open, close] = hours.split(" - ");

    if (!open || !close) {
      return false;
    }

    const parseTime = (time: string) => {
      const [hour, minute] = time.split(":").map(Number);

      if (
        !Number.isInteger(hour) ||
        !Number.isInteger(minute) ||
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59
      ) {
        return null;
      }

      return hour * 60 + minute;
    };

    const openingMinutes = parseTime(open);
    const closingMinutes = parseTime(close);

    if (openingMinutes === null || closingMinutes === null) {
      return false;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Normal hours, e.g. 06:00 - 22:00.
    if (openingMinutes <= closingMinutes) {
      return (
        currentMinutes >= openingMinutes && currentMinutes <= closingMinutes
      );
    }

    // Overnight hours, e.g. 22:00 - 06:00.
    return currentMinutes >= openingMinutes || currentMinutes <= closingMinutes;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const renderStation = ({ item }: { item: StationItem }) => {
    const isOpen = isCurrentlyOpen(item.operatingHours);

    const products = Array.isArray(item.products) ? item.products : [];

    const selectedProduct = products.find(
      (product) => product?.type?.toLowerCase() === activeTab.toLowerCase(),
    );

    return (
      <TouchableOpacity
        style={styles.stationRow}
        onPress={() => handleBuyFuel(item)}
        activeOpacity={0.7}
      >
        <View style={styles.leftSection}>
          <Image
            source={require("../../../assets/svg/gas-station.svg")}
            style={styles.logo}
          />

          <View style={styles.stationInfo}>
            <Text style={styles.stationName}>
              {item?.name?.length > 20
                ? `${item.name.substring(0, 20)}...`
                : item?.name}
            </Text>

            <View style={styles.metaRow}>
              <MaterialIcons name="location-pin" size={13} color="#E74C3C" />

              <Text style={styles.metaText}>
                {item?.distance
                  ? item.distance
                  : item?.latitude != null
                    ? `${Number(item.latitude).toFixed(2)} km`
                    : "Nearby"}
              </Text>

              <Text style={styles.metaDot}>•</Text>

              <Text style={styles.metaText}>
                {formatOperatingHours(item.operatingHours)}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View
            style={[
              styles.officeHourContainer,
              isOpen ? styles.openBadge : styles.closedBadge,
            ]}
          >
            <Text
              style={[
                styles.officeHour,
                isOpen ? styles.openText : styles.closedText,
              ]}
            >
              {isOpen ? "Open" : "Closed"}
            </Text>
          </View>

          <View style={styles.imageLitre}>
            <Image
              source={require("../../../assets/svg/gas-station.svg")}
              style={styles.fuelIcon}
            />

            <Text>
              {selectedProduct?.pricePerLitre != null
                ? `₦${Number(selectedProduct.pricePerLitre).toLocaleString()}/L`
                : "N/A"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const listHeader = (
    <>
      <SettingsHeader title="List of Fuel Stations" />

      <SearchBar
        placeholder="Search name/location"
        value={searchQuery}
        onSearch={setSearchQuery}
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
              <TouchableOpacity onPress={() => setActiveTab(item)}>
                <Text style={[styles.tabText, active && styles.activeTabText]}>
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
        <FileterModal setOpenFilterModal={setOpenFilterModal} />
      </ReuseableBottomModal>
    </>
  );

  if (isInitialLoading) {
    return (
      <View style={styles.page}>
        <View style={styles.loadingScreen}>
          <Loading />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <FlatList
        data={stations}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderStation}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={listHeader}
        refreshing={isFetching && !isPending}
        onRefresh={() => {
          // Keep your existing query refresh behavior.
        }}
        ListEmptyComponent={
          locationError ? (
            <View style={styles.empty}>
              <MaterialIcons name="location-off" size={50} color="#540863" />

              <Text style={styles.emptyTitle}>Location unavailable</Text>

              <Text style={styles.emptyText}>{locationError}</Text>
            </View>
          ) : (
            <View style={styles.empty}>
              <MaterialIcons
                name="local-gas-station"
                size={50}
                color="#540863"
              />

              <Text style={styles.emptyTitle}>{activeTab} not available</Text>

              <Text style={styles.emptyText}>
                No fuel station currently has {activeTab} available.
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          stations.length > 0 && totalPages > 1 ? (
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  apiPage === 1 && styles.disabledButton,
                ]}
                disabled={apiPage === 1 || isFetching}
                onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                <MaterialIcons
                  name="chevron-left"
                  size={24}
                  color={apiPage === 1 ? "#BDBDBD" : "#7C3AED"}
                />

                <Text
                  style={[
                    styles.paginationText,
                    apiPage === 1 && styles.disabledText,
                  ]}
                >
                  Previous
                </Text>
              </TouchableOpacity>

              <Text style={styles.pageNumber}>
                {apiPage} / {totalPages}
              </Text>

              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  apiPage === totalPages && styles.disabledButton,
                ]}
                disabled={apiPage === totalPages || isFetching}
                onPress={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
              >
                <Text
                  style={[
                    styles.paginationText,
                    apiPage === totalPages && styles.disabledText,
                  ]}
                >
                  Next
                </Text>

                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={apiPage === totalPages ? "#BDBDBD" : "#7C3AED"}
                />
              </TouchableOpacity>
            </View>
          ) : null
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
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 13,
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
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingVertical: 15,
  },
  paginationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#7C3AED",
    borderRadius: 8,
  },
  disabledButton: {
    borderColor: "#E2E2E5",
  },
  paginationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7C3AED",
  },
  disabledText: {
    color: "#BDBDBD",
  },
  pageNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
});
