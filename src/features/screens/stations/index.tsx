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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SettingsHeader from "../settings/header";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import FileterModal from "../dashboard/filter-moda";

const fuelTabs = ["Petrol", "Diesel", "Gas", "CNG", "Engine Oil"];

type Station = {
  id: number;
  name: string;
  distance: string;
  status: string;
  logo: any;
  favorite?: boolean;
  func?: string;
};

const stations: Station[] = [
  {
    id: 1,
    name: "NNPC - Ikeja",
    distance: "1.2 km away",
    status: "Open 24hrs",
    logo: require("../../../assets/png/mrsIcon.png"),
    favorite: true,
    func: "Open",
  },
  {
    id: 2,
    name: "Total Energies - Ikeja",
    distance: "1.2 km away",
    status: "Open 24hrs",
    logo: require("../../../assets/png/mrsIcon.png"),
    favorite: true,
    func: "Open",
  },
  {
    id: 3,
    name: "Mobil Oil - Ikeja",
    distance: "1.2 km away",
    status: "Open 24hrs",
    logo: require("../../../assets/png/mrsIcon.png"),
    favorite: true,
    func: "Close",
  },
  {
    id: 4,
    name: "MRS Oil - Lekki",
    distance: "3.1 km away",
    status: "Open 24hrs",
    logo: require("../../../assets/png/mrsIcon.png"),
    favorite: false,
    func: "Close",
  },
];

export default function Stations() {
  const [activeTab, setActiveTab] = useState("Petrol");
  const [stationList, setStationList] = useState<Station[]>(stations);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const toggleFavorite = (id: number) => {
    setStationList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      ),
    );
  };

  const renderStation: ListRenderItem<Station> = ({ item }) => (
    <View style={styles.stationRow}>
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
        <View style={styles.officeHourContainer}>
          <Text style={styles.officeHour}>{item.func}</Text>
        </View>
        <Text style={{ marginTop: 8 }}>₦720/L</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      <SettingsHeader title="List of Fuel Stations" />
      <SearchBar
        placeholder="Search name/location"
        onPress={() => {
          setOpenFilterModal(true);
        }}
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
    backgroundColor: "#C0FEB8",
    paddingVertical: 4.5,
    paddingHorizontal: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  officeHour: {
    color: "#29A329",
  },
});
