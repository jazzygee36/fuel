import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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

export default function Stations() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: stationsResponse, isPending } = useAllStations();
  console.log("stationsResponse", stationsResponse);

  const [activeTab, setActiveTab] = useState("Petrol");
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const stationsPerPage = 10;

  const stations = Array.isArray(stationsResponse)
    ? stationsResponse
    : (stationsResponse?.stations ?? []);
  console.log("stations", stations);
  const filteredStations = stations.filter((station: any) => {
    const hasFuelType = station?.products?.some(
      (product: any) =>
        product?.type?.toLowerCase() === activeTab.toLowerCase(),
    );

    if (!hasFuelType) return false;

    const search = searchQuery.trim().toLowerCase();

    if (!search) return true;

    const searchableText = [
      station?.name,
      station?.address,
      station?.city,
      station?.state,
      station?.location?.address,
      station?.location?.city,
      station?.location?.state,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search);
  });

  const totalPages = Math.ceil(filteredStations.length / stationsPerPage);

  const startIndex = (currentPage - 1) * stationsPerPage;

  const paginatedStations = filteredStations.slice(
    startIndex,
    startIndex + stationsPerPage,
  );

  const handleBuyFuel = (item: any) => {
    navigation.navigate("BuyFuel", {
      selectedStation: item,
    });
  };

  const formatOperatingHours = (hours?: string) => {
    if (!hours) return "Available";

    const [open, close] = hours.split(" - ");

    const formatTime = (time: string) => {
      const [hour, minute] = time.split(":").map(Number);

      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;

      return `${formattedHour}:${minute.toString().padStart(1, "0")} ${period}`;
    };

    return `${formatTime(open)} - ${formatTime(close)}`;
  };

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
    console.log("item", item);
    const isOpen = isCurrentlyOpen(item?.operatingHours);
    const selectedProduct = item?.products?.find(
      (product: any) =>
        product?.type?.toLowerCase() === activeTab.toLowerCase(),
    );

    if (isPending) {
      return <Loading />;
    }

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
      <FileterModal setOpenFilterModal={setOpenFilterModal} />
    </ReuseableBottomModal>
  </>
);

  return (
    <View style={styles.page}>
      <FlatList
        data={paginatedStations}
        keyExtractor={(item) => item.id}
        renderItem={renderStation}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="local-gas-station" size={50} color="#540863" />

            <Text style={styles.emptyTitle}>{activeTab} not available</Text>

            <Text style={styles.emptyText}>
              No fuel station currently has {activeTab} available.
            </Text>
          </View>
        }
        ListFooterComponent={
          paginatedStations.length > 0 ? (
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === 1 && styles.disabledButton,
                ]}
                disabled={currentPage === 1}
                onPress={() => setCurrentPage((prev) => prev - 1)}
              >
                <MaterialIcons
                  name="chevron-left"
                  size={24}
                  color={currentPage === 1 ? "#BDBDBD" : "#7C3AED"}
                />

                <Text
                  style={[
                    styles.paginationText,
                    currentPage === 1 && styles.disabledText,
                  ]}
                >
                  Previous
                </Text>
              </TouchableOpacity>

              <Text style={styles.pageNumber}>
                {currentPage} / {totalPages}
              </Text>

              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === totalPages && styles.disabledButton,
                ]}
                disabled={currentPage === totalPages}
                onPress={() => setCurrentPage((prev) => prev + 1)}
              >
                <Text
                  style={[
                    styles.paginationText,
                    currentPage === totalPages && styles.disabledText,
                  ]}
                >
                  Next
                </Text>

                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={currentPage === totalPages ? "#BDBDBD" : "#7C3AED"}
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
