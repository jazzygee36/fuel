import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../../../components/button";
import { useState } from "react";
import SettingsHeader from "./header";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
const VehicleDetails = [
  {
    carTitle: "Toyota Nissan Ultra",
    petrolType: "Fuel",
    carType: "SUV",
    plateNumber: "*** 123XY",
    tankCapacity: "45 litres",
  },
];
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function VehicleSettings() {
  const navigation = useNavigation<NavigationProp>();

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [vehicleSuccessModal, setVehicleSuccessModal] = useState(false);

  const handleEdit = (index: number) => {
    console.log("Edit vehicle", index);
    setOpenMenuIndex(null);
  };

  const handleDelete = (index: number) => {
    console.log("Delete vehicle", index);
    setOpenMenuIndex(null);
  };
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title={"My Vehicles"} />

        <View style={styles.vehicleContainer}>
          {Array.from({ length: 4 }).map((_, index) => {
            const vehicle = VehicleDetails[0];

            return (
              <View key={index} style={styles.vehicleDetails}>
                <View style={styles.topVehicle}>
                  <View style={styles.image}>
                    <View style={styles.carImage}>
                      <Image
                        source={require("../../../assets/png/CAR.png")}
                        // style={styles.avatar}
                      />
                    </View>
                    <View>
                      <Text style={styles.titleText}>{vehicle.carTitle}</Text>
                      <Text style={{ color: "#595959" }}>
                        {vehicle.petrolType}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.menuWrapper}>
                    <Pressable
                      onPress={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                    >
                      <Image
                        source={require("../../../assets/png/moredetails.png")}
                      />
                    </Pressable>

                    {openMenuIndex === index && (
                      <View style={styles.dropdownMenu}>
                        <Pressable
                          style={styles.menuItem}
                          onPress={() => handleEdit(index)}
                        >
                          <Ionicons
                            name="create-outline"
                            size={18}
                            color="#151521"
                          />
                          <Text style={styles.menuText}>Edit</Text>
                        </Pressable>

                        <Pressable
                          style={styles.menuItem}
                          onPress={() => handleDelete(index)}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={18}
                            color="#D92D20"
                          />
                          <Text style={[styles.menuText, { color: "#D92D20" }]}>
                            Delete
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.vehicleType}>
                  <Text style={styles.carText}>Car Type</Text>
                  <Text style={styles.carName}>{vehicle.carType}</Text>
                </View>

                <View style={styles.vehicleType}>
                  <Text style={styles.carText}>Plate Number</Text>
                  <Text style={styles.carName}>{vehicle.plateNumber}</Text>
                </View>

                <View style={styles.vehicleType}>
                  <Text style={styles.carText}>Tank Capacity</Text>
                  <Text style={styles.carName}>{vehicle.tankCapacity}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <AppButton
          title="Add Vehicle"
          variant="filled"
          backgroundColor="#540863"
          // style={styles.btnHalf}
          onPress={() => setVehicleSuccessModal(true)}
        />
      </ScrollView>
      <ReuseableBottomModal
        visible={vehicleSuccessModal}
        title={"Your vehicle has been added"}
        onClose={() => setVehicleSuccessModal(false)}
        description="We’ve been able to successfully add a new vehicle"
      >
        <AppButton
          title="Continue"
          variant="filled"
          backgroundColor="#540863"
          // style={styles.btnHalf}
        />
      </ReuseableBottomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    paddingTop: 27,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  notificationIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  vehicleContainer: {
    marginVertical: 30,
    gap: 16,
  },
  vehicleType: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "semibold",
  },
  topVehicle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carText: {
    color: "#5D5E61",
    fontWeight: "semibold",
  },
  titleText: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "BricolageGrotesque",
  },
  carName: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "BricolageGrotesque",
  },
  vehicleDetails: {
    flexDirection: "column",
    gap: 15,
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 9,
  },
  image: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  carImage: {
    width: 69,
    height: 50,
    backgroundColor: "#C4B2EB",
    borderColor: "#540863",
    borderWidth: 1,
    borderRadius: 2.3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  menuWrapper: {
    position: "relative",
  },

  dropdownMenu: {
    position: "absolute",
    top: 28,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    width: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 999,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  menuText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#151521",
  },
});
