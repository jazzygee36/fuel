import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SearchBar from "../../../components/search-bar";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsHeader from "../settings/header";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import FileterModal from "../dashboard/filter-moda";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useAllStations } from "../../../hooks/queries/stations";
import Loading from "../../../components/loading";

const fuelTabs = ["Petrol", "Diesel", "Gas", "Kerosene"];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FUEL_TYPE_MAP: Record<string, string> = {
  Petrol: "petrol",
  Diesel: "diesel",
  Gas: "gas",
  Kerosene: "kerosene",
};

export default function Stations() {
  const navigation = useNavigation<NavigationProp>();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Petrol");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  

  const stationsPerPage = 20;

  /**
   * The backend handles:
   * - search
   * - fuelType
   * - page
   * - limit
   */
  const {
    data: stationsResponse,
    isPending,
    isFetching,
  } = useAllStations({
    search: searchQuery.trim() || undefined,
    fuelType: FUEL_TYPE_MAP[activeTab],
    page: currentPage,
    limit: stationsPerPage,
  });

  console.log("stationsResponse", stationsResponse);

  /**
   * The API already returns the stations for the requested
   * page/filter/search, so DON'T filter or slice again here.
   */
  const stations = Array.isArray(stationsResponse)
    ? stationsResponse
    : (stationsResponse?.stations ?? []);

  const totalStations = stationsResponse?.pagination?.total ?? 0;

  const apiPage = stationsResponse?.pagination?.page ?? currentPage;

  const apiLimit = stationsResponse?.pagination?.limit ?? stationsPerPage;

  const totalPages = Math.ceil(totalStations / apiLimit);

  const handleBuyFuel = (item: any) => {
    navigation.navigate("BuyFuel", {
      selectedStation: item,
    });
  };

  const formatOperatingHours = (hours?: string) => {
    if (!hours || typeof hours !== "string") {
      return "Available";
    }

    const [open, close] = hours.split(" - ");

    if (!open || !close) {
      return "Available";
    }

    const formatTime = (time?: string) => {
      if (!time || typeof time !== "string") {
        return "";
      }

      const [hourString, minuteString] = time.split(":");

      const hour = Number(hourString);
      const minute = Number(minuteString);

      if (Number.isNaN(hour) || Number.isNaN(minute)) {
        return "";
      }

      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;

      return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
    };

    const formattedOpen = formatTime(open);
    const formattedClose = formatTime(close);

    if (!formattedOpen || !formattedClose) {
      return "Available";
    }

    return `${formattedOpen} - ${formattedClose}`;
  };

  console.log("========== STATIONS DEBUG ==========");
  console.log("activeTab:", activeTab);
  console.log("fuelType:", FUEL_TYPE_MAP[activeTab]);
  console.log("currentPage:", currentPage);
  console.log("stationsResponse:", stationsResponse);
  console.log("stations:", stations);
  console.log("totalStations:", totalStations);
  console.log("totalPages:", totalPages);
  console.log("isPending:", isPending);
  console.log("isFetching:", isFetching);
  console.log("====================================");
  /**
   * Whenever search or fuel type changes,
   * start again from page 1.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const isCurrentlyOpen = (hours?: string) => {
    if (!hours) return false;

    const [open, close] = hours.split(" - ");

    if (!open || !close) return false;

    const now = new Date();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [openHour, openMinute] = open.split(":").map(Number);
    const [closeHour, closeMinute] = close.split(":").map(Number);

    const openingMinutes = openHour * 60 + openMinute;
    const closingMinutes = closeHour * 60 + closeMinute;

    // Normal opening hours e.g. 06:00 - 22:00
    if (openingMinutes <= closingMinutes) {
      return (
        currentMinutes >= openingMinutes && currentMinutes <= closingMinutes
      );
    }

    // Handles overnight hours e.g. 22:00 - 06:00
    return currentMinutes >= openingMinutes || currentMinutes <= closingMinutes;
  };

  const renderStation = ({ item }: { item: any }) => {
    const isOpen = isCurrentlyOpen(item?.operatingHours);

    const selectedProduct = item?.products?.find(
      (product: any) =>
        product?.type?.toLowerCase() === activeTab.toLowerCase(),
    );

    return (
      <TouchableOpacity
        style={styles.stationRow}
        onPress={() => handleBuyFuel(item)}
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
                {item?.latitude ? `${item?.latitude} km` : "Nearby"}
              </Text>

              <Text style={styles.metaDot}>•</Text>

              <Text style={styles.metaText}>
                {formatOperatingHours(item?.operatingHours)}
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
              {selectedProduct?.pricePerLitre
                ? `₦${selectedProduct.pricePerLitre}/L`
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

  return (
    <View style={styles.page}>
      <FlatList
        data={stations}
        keyExtractor={(item) => item.id}
        renderItem={renderStation}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={listHeader}
        refreshing={isFetching && !isPending}
        onRefresh={() => {
          // React Query will refetch when the query is invalidated
          // or when the screen/query becomes stale.
        }}
        ListEmptyComponent={
          isPending ? (
            <Loading />
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
