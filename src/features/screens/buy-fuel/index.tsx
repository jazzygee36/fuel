import {
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";

import BackArrow from "../../../components/back-arrow";
import FundWallet from "../wallet/fund-wallet";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { RootStackParamList } from "../../../navigation/types";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AppButton from "../../../components/button";
import { useState } from "react";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import { useCurrentUserId } from "../../../hooks/queries/useCurrentUser";
import { useVehicles } from "../../../hooks/queries/vehicles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { usePurchasePayment } from "../../../hooks/mutations/purchases";
import { FuelProps } from "../../../utils/types";
import AppToast from "../../../components/toast";

type BuyFuelRouteProp = RouteProp<RootStackParamList, "BuyFuel">;

type Product = {
  label: string;
  pricePerLitre: number;
  type: string;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function BuyFuel() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<BuyFuelRouteProp>();
  const { selectedStation } = route.params;
  const { data: userId } = useCurrentUserId();
  const { data: vehicles, isPending } = useVehicles(userId?.id);
  const { mutate: purchasePayment, isPending: isPurchasing } =
    usePurchasePayment();

  const [step, setStep] = useState(1);
  const [buying, setBuying] = useState<Product | null>(null);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "success",
  ) => {
    setToast({
      visible: true,
      message,
      type,
    });
  };
  const [quantity, setQuantity] = useState(1);
  const [addVehicle, setAddVehicle] = useState(false);
  const products: Product[] = Array.isArray(selectedStation?.products)
    ? selectedStation.products
    : [];

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [fuelDetails, setFuelDetails] = useState(false);
  const isCurrentlyOpen = (hours?: unknown) => {
    if (typeof hours !== "string" || !hours) return false;

    const [open, close] = hours.split(" - ");

    if (!open || !close) return false;

    const now = new Date();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [openHour, openMinute] = open.split(":").map(Number);
    const [closeHour, closeMinute] = close.split(":").map(Number);

    const openingMinutes = openHour * 60 + openMinute;

    const closingMinutes = closeHour * 60 + closeMinute;

    // Normal hours e.g. 06:00 - 22:00
    if (openingMinutes <= closingMinutes) {
      return (
        currentMinutes >= openingMinutes && currentMinutes <= closingMinutes
      );
    }

    // Overnight hours e.g. 22:00 - 06:00
    return currentMinutes >= openingMinutes || currentMinutes <= closingMinutes;
  };

  const isOpen = isCurrentlyOpen(selectedStation?.operatingHours);
  const totalPrice = quantity * (buying?.pricePerLitre ?? 0);

  const handlePayment = () => {
    console.log("handlePayment called");

    if (!buying) {
      showToast("Please select a fuel product.", "warning");
      return;
    }

    if (!selectedVehicle) {
      showToast("Please select a vehicle.", "warning");
      return;
    }

    const vehicle = vehicles?.find(
      (vehicle: any) => vehicle.id === selectedVehicle,
    );

    if (!vehicle) {
      showToast("Selected vehicle could not be found.", "error");
      return;
    }

    const payload: FuelProps = {
      stationId: String(selectedStation.id),
      vehicleId: vehicle.id,
      productType: buying.type.toUpperCase(),
      quantityLitres: quantity,
      pricePerLitre: buying.pricePerLitre,
      paymentSource: "WALLET",
      totalPrice,
      
    };

    console.log("Purchase payload:", payload);

    purchasePayment(payload, {
      onSuccess: (data) => {
        console.log("Purchase successful:", data);

        setFuelDetails(false);

        showToast(
          "Payment successful! Your fuel purchase has been confirmed.",
          "success",
        );
      },

      onError: (error: any) => {
        console.log("Purchase failed:", error);

        showToast(
          error?.response?.data?.message || "Payment failed. Please try again.",
          "error",
        );
      },
    });
  };

  return (
    <View style={styles.screen}>
      <AppToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            visible: false,
          }))
        }
      />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          step === 2 && styles.stepTwoScrollContainer,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.fuelNav}>
            <BackArrow />

            <Text style={styles.fuelText}>Buy Fuel</Text>
          </View>
        </View>

        {/* WALLET */}
        <View style={{ marginVertical: 35 }}>
          <FundWallet />
        </View>

        <View>
          <View style={styles.stationHeader}>
            {selectedStation?.logo ? (
              <Image
                source={{ uri: selectedStation.logo }}
                style={styles.logo}
              />
            ) : (
              <View style={styles.logoPlaceholder}>
                <MaterialIcons
                  name="local-gas-station"
                  size={25}
                  color="#540863"
                />
              </View>
            )}

            <View style={styles.stationNameContainer}>
              <Text style={styles.stationName}>
                {selectedStation?.name
                  ? selectedStation.name.length > 25
                    ? `${selectedStation.name.substring(0, 25)}...`
                    : selectedStation.name
                  : "Fuel Station"}
              </Text>
              {step === 2 && (
                <View>
                  <Text style={styles.description}>{buying?.label}</Text>

                  <Text style={styles.title}>
                    ₦{Number(buying?.pricePerLitre).toLocaleString()}
                    /L
                  </Text>
                </View>
              )}
            </View>
          </View>

          {step === 1 && (
            <View>
              <Text style={styles.text}>
                Reliable service with fast verification and seamless wallet
                payments.
              </Text>

              <View style={styles.divContainer}>
                <Text style={styles.label}>Location</Text>

                <Text style={styles.value}>
                  {selectedStation?.address || "Location unavailable"}
                </Text>
              </View>

              <View style={styles.divContainer}>
                <Text style={styles.label}>Operating hours</Text>

                <View
                  style={[
                    styles.statusBadge,
                    isOpen ? styles.openBadge : styles.closedBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      isOpen ? styles.openText : styles.closedText,
                    ]}
                  >
                    {isOpen ? "Open" : "Closed"}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {step === 1 && (
          <View>
            <View style={styles.line} />
            <View style={styles.productsContainer}>
              <Text style={styles.productsTitle}>Available Fuel</Text>

              {products.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <MaterialIcons
                    name="local-gas-station"
                    size={40}
                    color="#540863"
                  />

                  <Text style={styles.emptyTitle}>No fuel available</Text>

                  <Text style={styles.emptyText}>
                    This station currently has no fuel products available.
                  </Text>
                </View>
              ) : (
                products.map((product) => (
                  <Pressable
                    key={product.type}
                    style={styles.row}
                    onPress={() => {
                      (setBuying(product), setStep(2));
                    }}
                  >
                    <View style={styles.leftSection}>
                      <View style={styles.iconWrapper}>
                        <MaterialIcons
                          name="local-gas-station"
                          size={22}
                          color="#540863"
                        />
                      </View>

                      <View>
                        <Text style={styles.description}>{product.label}</Text>

                        <Text style={styles.title}>
                          ₦{Number(product.pricePerLitre).toLocaleString()}
                          /L
                        </Text>
                      </View>
                    </View>

                    <View style={styles.rightSection}>
                      <Feather name="chevron-right" size={20} color="#111" />
                    </View>
                  </Pressable>
                ))
              )}
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepTwoContainer}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={styles.noOfLitres}>Number of litres</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity((prev) => Math.max(0, prev - 1))}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity((prev) => prev + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.totalPriceContainer}>
                {/* <Text style={styles.totalPriceLabel}>Total price</Text> */}

                <Text style={styles.totalPrice}>
                  ₦{totalPrice.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* BOTTOM BUTTON */}
            <View style={{ width: "100%" }}>
              <AppButton
                title="Purchase"
                variant="filled"
                backgroundColor="#540863"
                onPress={() => {
                  console.log("Fuel:", buying);
                  console.log("Quantity:", quantity);
                  console.log("Total price:", totalPrice);
                  setAddVehicle(true);
                }}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <ReuseableBottomModal
        visible={addVehicle}
        title={"Choose Vehicle"}
        onClose={() => {
          setAddVehicle(false);
        }}
      >
        <View>
          {(vehicles ?? []).map((vehicle: any, index: number) => (
            <TouchableOpacity
              key={vehicle?.id ?? index}
              style={styles.vehicleContainer}
              onPress={() => setSelectedVehicle(vehicle.id)}
            >
              <Text style={styles.vehicleName}>
                {vehicle?.make} {vehicle?.model}
              </Text>

              <View
                style={[
                  styles.radioOuter,
                  selectedVehicle === vehicle.id && styles.radioOuterSelected,
                ]}
              >
                {selectedVehicle === vehicle.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.addVehicle}
            onPress={() => {
              setAddVehicle(false);
              navigation.navigate("AddVehicle");
            }}
          >
            <Text style={styles.addVehicleText}>+ Add more vehicle</Text>
          </TouchableOpacity>
        </View>
        {selectedVehicle !== null && (
          <View style={{ width: "100%", marginTop: 10 }}>
            <AppButton
              title="Continue"
              variant="filled"
              backgroundColor="#540863"
              onPress={() => {
                setAddVehicle(false);
                setFuelDetails(true);
              }}
            />
          </View>
        )}
      </ReuseableBottomModal>
      <ReuseableBottomModal
        visible={fuelDetails}
        title="Buy Fuel"
        onClose={() => {
          setFuelDetails(false);
        }}
      >
        <View style={styles.details}>
          <Text style={styles.detailsLabel}>Fuel Type</Text>
          <Text style={styles.detailsText}>{buying?.label}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailsLabel}>Price per litre</Text>
          <Text style={styles.detailsText}>
            ₦{Number(buying?.pricePerLitre).toLocaleString()}/L
          </Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailsLabel}>Quantity</Text>
          <Text style={styles.detailsText}>{quantity} Litres</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailsLabel}>Total Price</Text>
          <Text style={styles.totalDetailsPrice}>
            ₦{totalPrice.toLocaleString()}
          </Text>
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <AppButton
            title={isPurchasing ? "Processing..." : "Make payment"}
            variant="filled"
            backgroundColor="#540863"
            onPress={handlePayment}
          />
        </View>
      </ReuseableBottomModal>
    </View>
  );
}
