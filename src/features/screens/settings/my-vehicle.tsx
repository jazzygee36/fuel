import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../../../components/button";
import { useState } from "react";
import SettingsHeader from "./header";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import { useVehicles } from "../../../hooks/queries/vehicles";
import { useCurrentUserId } from "../../../hooks/queries/useCurrentUser";
import { useDeleteVehicle } from "../../../hooks/mutations/vehicles";
import Loading from "../../../components/loading";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function VehicleSettings() {
  const { data: userId } = useCurrentUserId();
  const { data: vehicles, isPending } = useVehicles(userId?.id);
    console.log("deleteVehicle", vehicles);

  const [selected, setSelected] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [deleteVehicleModal, setDeleteVehicleModal] = useState(false);

  const { mutate: deleteVehicle, isPending: isDeleting } = useDeleteVehicle();


  const navigation = useNavigation<NavigationProp>();

  const handleDelete = (vehicleId: string) => {

    setSelected(vehicleId);
    setOpenMenuIndex(null);
    setDeleteVehicleModal(true);
  };

  const handleCancelDelete = () => {
    setDeleteVehicleModal(false);
    setSelected("");
  };

  const handleConfirmDelete = () => {
    if (!selected) return;

    deleteVehicle(selected, {
      onSuccess: () => {
        setDeleteVehicleModal(false);
        setSelected("");
      },
    });
  };

  if (isPending) {
    return <Loading />;
  }

  const hasVehicles = Array.isArray(vehicles) && vehicles.length > 0;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title="My Vehicles" />

        {hasVehicles ? (
          <View style={styles.vehicleContainer}>
            {vehicles.map((vehicle: any, index: number) => (
              <View
                key={vehicle.id}
                style={[
                  styles.vehicleDetails,
                  openMenuIndex === index && styles.activeVehicleDetails,
                ]}
              >
                {/* Top section */}
                <View style={styles.topVehicle}>
                  <View style={styles.image}>
                    <View style={styles.carImage}>
                      <Image source={require("../../../assets/png/CAR.png")} />
                    </View>

                    <View>
                      <Text style={styles.titleText}>{vehicle?.make}</Text>

                      <Text style={styles.fuelType}>{vehicle?.fuelType}</Text>
                    </View>
                  </View>

                  {/* Menu */}
                  <View style={styles.menuWrapper}>
                    <Pressable
                      onPress={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                      hitSlop={10}
                    >
                      <Image
                        source={require("../../../assets/png/moredetails.png")}
                      />
                    </Pressable>

                    {openMenuIndex === index && (
                      <View style={styles.dropdownMenu}>
                        <Pressable
                          style={styles.menuItem}
                          onPress={() => handleDelete(vehicle.id)}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={18}
                            color="#D92D20"
                          />

                          <Text style={[styles.menuText, styles.deleteText]}>
                            Delete
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.vehicleType}>
                  <Text style={styles.carText}>Car Type</Text>

                  <Text style={styles.carName}>{vehicle?.model}</Text>
                </View>

                <View style={styles.vehicleType}>
                  <Text style={styles.carText}>Plate Number</Text>

                  <Text style={styles.carName}>
                    {vehicle?.registrationNumber}
                  </Text>
                </View>

                <View style={styles.vehicleType}>
                  <Text style={styles.carText}>Tank Capacity</Text>

                  <Text style={styles.carName}>{vehicle?.capacity} litres</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="car-outline" size={55} color="#540863" />
            </View>

            <Text style={styles.emptyTitle}>No vehicle added yet</Text>

            <Text style={styles.emptyDescription}>
              You haven't added any vehicle to your account yet. Add a vehicle
              to make managing your fuel purchases easier.
            </Text>

            <AppButton
              title="Add Vehicle"
              variant="filled"
              backgroundColor="#540863"
              onPress={() => navigation.navigate("AddVehicle")}
              style={styles.emptyButton}
            />
          </View>
        )}

        {/* Add Vehicle button when vehicles exist */}
        {hasVehicles && (
          <AppButton
            title="Add Vehicle"
            variant="filled"
            backgroundColor="#540863"
            onPress={() => navigation.navigate("AddVehicle")}
          />
        )}
      </ScrollView>

      <ReuseableBottomModal
        visible={deleteVehicleModal}
        title="Delete Vehicle"
        onClose={handleCancelDelete}
        description="Are you sure you want to delete this vehicle? This action cannot be undone."
      >
        <View style={styles.modalButtons}>
          <AppButton
            title="Cancel"
            variant="outlined"
            backgroundColor="#540863"
            onPress={handleCancelDelete}
            disabled={isDeleting}
          />

          <AppButton
            title={isDeleting ? "Deleting..." : "Continue"}
            variant="filled"
            backgroundColor="#540863"
            disabled={isDeleting}
            onPress={handleConfirmDelete}
          />
        </View>
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
    flexGrow: 1,
  },

  vehicleContainer: {
    marginVertical: 30,
    gap: 16,
  },

  vehicleDetails: {
    flexDirection: "column",
    gap: 15,
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 9,
    position: "relative",
    zIndex: 1,
  },

  topVehicle: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
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
    justifyContent: "center",
    alignItems: "center",
  },

  titleText: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "BricolageGrotesque",
  },

  fuelType: {
    color: "#595959",
    textTransform: "capitalize",
    marginTop: 2,
  },

  vehicleType: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  carText: {
    color: "#5D5E61",
    fontWeight: "600",
  },

  carName: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "BricolageGrotesque",
  },

  /* ================= MENU ================= */

  menuWrapper: {
    position: "relative",
    zIndex: 3000,
    elevation: 3000,
  },

  dropdownMenu: {
    position: "absolute",
    top: 28,
    right: 0,
    width: 140,

    backgroundColor: "#FFFFFF",

    borderRadius: 10,
    paddingVertical: 8,

    zIndex: 3000,
    elevation: 3000,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
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

  deleteText: {
    color: "#D92D20",
  },

  /* ================= EMPTY STATE ================= */

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 80,
  },

  emptyIconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#F3EAF5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#151521",
    textAlign: "center",
    fontFamily: "BricolageGrotesque",
    marginBottom: 10,
  },

  emptyDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: "#776F69",
    textAlign: "center",
    maxWidth: 320,
    marginBottom: 28,
  },

  emptyButton: {
    width: "100%",
  },
  activeVehicleDetails: {
    zIndex: 1000,
    elevation: 1000,
  },

  /* ================= MODAL ================= */

  modalButtons: {
    gap: 12,
  },
});
