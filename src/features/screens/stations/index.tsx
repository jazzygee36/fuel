import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import SearchBar from "../../../components/search-bar";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsHeader from "../settings/header";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import FileterModal from "../dashboard/filter-moda";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Station } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";

const fuelTabs = ["Petrol", "Diesel", "Gas", "CNG", "Engine Oil"];

const stations: Station[] = [
  {
    id: 1,
    name: "NNPC - Ikeja",
    distance: "1.2 km away",
    status: "Open 24hrs",
    logo: require("../../../assets/png/mrsIcon.png"),
    favorite: true,
    func: "Open",
    petrol: "₦680/Litre",
    Diesel: "₦990/Litre",
    Gas: "₦680/Litre",
  },
  {
    id: 2,
    name: "Total Energies - Ikeja",
    distance: "1.2 km away",
    status: "Open 24hrs",
    logo: require("../../../assets/png/mrsIcon.png"),
    favorite: true,
    func: "Closed",
    petrol: "₦680/Litre",
    Diesel: "₦990/Litre",
    Gas: "₦680/Litre",
  },
  {
    id: 3,
    name: "Mobil Oil - Ikeja",
    distance: "1.2 km away",
    status: "Open 24hrs",
    logo: require("../../../assets/png/mrsIcon.png"),
    favorite: true,
    func: "Open",
    petrol: "₦680/Litre",
    Diesel: "₦990/Litre",
    Gas: "₦680/Litre",
  },
  {
    id: 4,
    name: "MRS Oil - Lekki",
    distance: "3.1 km away",
    status: "Open 24hrs",
    logo: require("../../../assets/png/mrsIcon.png"),
    favorite: false,
    func: "Closed",
    petrol: "₦680/Litre",
    Diesel: "₦990/Litre",
    Gas: "₦680/Litre",
  },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Stations">;

export default function Stations() {
  const [activeTab, setActiveTab] = useState("Petrol");
  const [stationList, setStationList] = useState<Station[]>(stations);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const handleBuyFuel = (item: Station) => {
    navigation.navigate("BuyFuel", { selectedStation: item });
  };

  const renderStation: ListRenderItem<Station> = ({ item }) => {
    const isOpen = item.func === "Open";

    return (
      <TouchableOpacity
        style={styles.stationRow}
        onPress={() => handleBuyFuel(item)}
      >
        <View style={styles.leftSection}>
          <Image source={item.logo} style={styles.logo} />

          <View style={styles.stationInfo}>
            <Text style={styles.stationName}>{item.name}</Text>

            <View style={styles.metaRow}>
              <MaterialIcons name="location-pin" size={13} color="#E74C3C" />
              <Text style={styles.metaText}>{item.distance}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{item.status}</Text>
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
              {item.func}
            </Text>
          </View>

          <View style={styles.imageLitre}>
            <Image
              source={require("../../../assets/png/gas-station-icon.png")}
            />
            <Text>₦720/L</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
        data={stationList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStation}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={renderHeader}
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
});
