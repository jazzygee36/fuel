import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import FundWallet from "../wallet/fund-wallet";
import SearchBar from "../../../components/search-bar";
import ContinueModal from "./continue-modal";
import FileterModal from "./filter-moda";
import VerificationModal from "./verification-modal";
import { useNavigation } from "@react-navigation/native";
import { AppTabParamList, RootStackParamList } from "../../../navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useCurrentUser } from "../../../hooks/queries/useCurrentUser";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCurrentLocation } from "../../../hooks/use-current-location";
import { useFocusEffect } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useAdvert } from "../../../hooks/queries/advert";
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TabNavigationProp = BottomTabNavigationProp<AppTabParamList>;

export default function Dashboard() {
  const { data: Users } = useCurrentUser();
  const { data: promotions, isPending: promotionPending } = useAdvert();
  const promotionList = promotions?.banners ?? [];
  const rootNavigation = useNavigation<RootNavigationProp>();
  const tabNavigation = useNavigation<TabNavigationProp>();
  const [open, setOpen] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationName, setLocationName] = useState("Locating...");
  const [dismissedAds, setDismissedAds] = useState<(string | number)[]>([]);

  const closeAd = (id: string | number) => {
    setDismissedAds((prev) => [...prev, id]);
  };

  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useCurrentLocation();

  const getKycProgress = () => {
    switch (Users?.kycStage) {
      case "PENDING":
        return "25%";

      case "SELFIE_CAPTURE":
        return "50%";

      case "REVIEW":
        return "75%";

      case "COMPLETED":
        return "100%";

      default:
        return "25%";
    }
  };
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    }, [queryClient]),
  );

  useEffect(() => {
    const getLocationName = async () => {
      if (!location) {
        setLocationName("Locating...");
        return;
      }

      try {
        const { latitude, longitude } = location.coords;

        const url =
          `https://nominatim.openstreetmap.org/reverse` +
          `?format=json` +
          `&lat=${latitude}` +
          `&lon=${longitude}` +
          `&zoom=10` +
          `&addressdetails=1`;

        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            "User-Agent": "FuelNetixMobile/1.0",
          },
        });

        if (!response.ok) {
          throw new Error(`Reverse geocoding failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("📍 ADDRESS:", data);

        const address = data?.address;

        if (!address) {
          setLocationName("Current location");
          return;
        }

        const locality =
          address.city ||
          address.town ||
          address.village ||
          address.city_district ||
          address.municipality ||
          address.county;

        const state = address.state;

        console.log("📍 LOCALITY:", locality);
        console.log("📍 STATE:", state);

        if (locality && state) {
          if (locality.toLowerCase() === state.toLowerCase()) {
            setLocationName(locality);
          } else {
            setLocationName(`${locality}, ${state}`);
          }
        } else if (locality) {
          setLocationName(locality);
        } else if (state) {
          setLocationName(state);
        } else {
          setLocationName("Current location");
        }
      } catch (error) {
        console.error("❌ Failed to get location name:", error);

        setLocationName("Current location");
      }
    };

    getLocationName();
  }, [location]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.flexDiv}>
        <View style={styles.flexCircle}>
          <View style={styles.avataContainer}>
            {Users?.profileImage ? (
              <Image
                source={{ uri: Users.profileImage }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <Text style={styles.avarta}>
                {Users?.firstName?.charAt(0) || "U"}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.userName}>
              Hello,
              <Text style={styles.userNameText}>{Users?.firstName}</Text>
            </Text>
            <Text style={styles.desc}>
              <Entypo name="location-pin" size={12} color="black" />
              {locationName}
            </Text>
          </View>
        </View>

        <View style={styles.flexCircle}>
          <Pressable
            style={styles.circle}
            onPress={() => rootNavigation.navigate("TransactionHistory")}
          >
            <Image
              source={require("../../../assets/png/message.png")}
              // style={styles.stationImage}
              resizeMode="cover"
            />
          </Pressable>
          {/* <View style={styles.circle}>
            <Image
              source={require("../../../assets/png/notify.png")}
             
              resizeMode="cover"
            />
          </View> */}
        </View>
      </View>
      <Pressable onPress={() => tabNavigation.navigate("Station")}>
        <SearchBar
          placeholder="Search name/location"
          value={searchQuery}
          onSearch={setSearchQuery}
          // onPress={() => {
          //   setOpenFilterModal(true);
          // }}
        />
      </Pressable>

      <View style={{ marginTop: 25 }}>
        <View>
          <FundWallet />
        </View>
      </View>
      <View style={styles.stationsMap}>
        <View style={styles.station}>
          <Pressable onPress={() => tabNavigation.navigate("Station")}>
            <Image
              source={require("../../../assets/png/fuelStation.png")}
              // style={styles.stationImage}
              // resizeMode="cover"
            />
          </Pressable>
          <Pressable
            onPress={() => rootNavigation.navigate("TransactionHistory")}
          >
            <Image
              source={require("../../../assets/png/trans.png")}
              // style={styles.stationImage}
              // resizeMode="cover"
            />
          </Pressable>
        </View>
        <View style={styles.station}>
          <Pressable onPress={() => rootNavigation.navigate("VehicleSettings")}>
            <Image
              source={require("../../../assets/png/vehicle.png")}
              // style={styles.stationImage}
              // resizeMode="cover"
            />
          </Pressable>
          <Image
            source={require("../../../assets/png/nearStation.png")}
            // style={styles.stationImage}
            // resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.verifyIdentity}>
        <View style={styles.verifyLeft}>
          <Text style={styles.verifyText}>Verify your identity</Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                {
                  width: getKycProgress(),
                },
                Users?.kycStage === "COMPLETED" && styles.progressComplete,
              ]}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.verifyContinue,
            Users?.isVerified && styles.verifiedButton,
            Users?.kycStage === "REVIEW" && styles.reviewButton,
          ]}
          disabled={
            Users?.isVerified ||
            Users?.kycStage === "REVIEW" ||
            Users?.kycStage === "COMPLETED"
          }
          onPress={() => {
            if (Users?.kycStage === "SELFIE_CAPTURE") {
              rootNavigation.navigate("SelfieVerification");
            } else {
              setVerifyModal(true);
            }
          }}
        >
          <Text style={styles.continueText}>
            {Users?.kycStage === "SELFIE_CAPTURE"
              ? "Take Selfie"
              : Users?.kycStage === "REVIEW"
                ? "In Review"
                : Users?.kycStage === "COMPLETED"
                  ? "Completed"
                  : "Continue"}
          </Text>

          {Users?.kycStage !== "REVIEW" && !Users?.isVerified && (
            <View style={styles.arrowCircle}>
              <Image
                source={require("../../../assets/png/continue.png")}
                style={styles.arrowImage}
                resizeMode="contain"
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
      {!promotionPending &&
        promotionList
          .filter((ad: any) => !dismissedAds.includes(ad.id))
          .map((ad: any) => (
            <View key={ad.id} style={styles.advertCard}>
              <View style={styles.closeIcon}>
                <Pressable
                  onPress={() => closeAd(ad.id)}
                  accessibilityRole="button"
                  hitSlop={10}
                >
                  <Text>✕</Text>
                </Pressable>
              </View>

              {ad.imageUrl ? (
                <Image
                  source={{ uri: ad.imageUrl }}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              ) : null}

              <Text style={styles.advertTitle}>{ad.title}</Text>

              <Text style={styles.advertDescription}>{ad.description}</Text>
            </View>
          ))}

      <ReuseableBottomModal
        visible={open}
        title="Your business location"
        onClose={() => setOpen(false)}
      >
        <ContinueModal setOpen={setOpen} />
      </ReuseableBottomModal>
      <ReuseableBottomModal
        visible={openFilterModal}
        title="Filter"
        onClose={() => setOpenFilterModal(false)}
      >
        <FileterModal setOpenFilterModal={setOpenFilterModal} />
      </ReuseableBottomModal>
      <ReuseableBottomModal
        visible={verifyModal}
        title="Verify your Identity"
        description="Important Notice"
        onClose={() => setVerifyModal(false)}
      >
        <VerificationModal setVerifyModal={setVerifyModal} />
      </ReuseableBottomModal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 27,
    paddingHorizontal: 20,
    paddingBottom: 120,
    backgroundColor: "#fff",
  },

  flexDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  flexCircle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  circle: {
    width: 40,
    height: 40,
    borderColor: "#151521",
    borderWidth: 0.5,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  userName: {
    color: "#76777A",
    fontSize: 16,
    fontWeight: "700",
  },

  userNameText: {
    color: "#151521",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  desc: {
    color: "#76777A",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "BricolageGrotesque",
    marginTop: 2,
  },

  balanceCard: {
    width: "100%",
    backgroundColor: "#1A1C1E",
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginTop: 30,
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    marginBottom: 4,
  },

  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "BricolageGrotesque",
  },

  fundWallet: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "#8167BA",
    paddingVertical: 4,
    paddingHorizontal: 11,
    borderRadius: 50,
    cursor: "pointer",
  },
  stationsMap: {
    marginTop: 19,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
    alignItems: "center",
  },
  station: {
    flexDirection: "column",
    gap: 13,
  },
  verifyIdentity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 29,
    gap: 15,
  },

  verifyLeft: {
    flex: 1,
  },

  verifyText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#3A3B3E",
    marginBottom: 8,
  },

  progressBar: {
    width: "70%",
    height: 7,
    backgroundColor: "#B7B7B7",
    borderRadius: 10,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#FF9B2F",
    borderRadius: 10,
  },

  progressComplete: {
    width: "100%",
    backgroundColor: "#4CD080",
  },

  verifyContinue: {
    backgroundColor: "#E1D8F5",
    paddingVertical: 7,
    paddingLeft: 10,
    paddingRight: 7,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  verifiedButton: {
    backgroundColor: "#DFF5E8",
  },

  continueText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3A3B3E",
  },

  arrowCircle: {
    width: 21,
    height: 21,
    borderRadius: 11,
    // backgroundColor: "#665096",
    justifyContent: "center",
    alignItems: "center",
  },

  arrowImage: {
    width: 14,
    height: 14,
  },

  continueArrow: {
    borderRadius: "100%",
    padding: 2,
    backgroundColor: "#665096",
    height: 20,
    width: 20,
  },
  advertCard: {
    width: "100%",
    backgroundColor: "#F0F0F4",
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginTop: 11,
    borderRadius: 9,
  },
  advertTitle: {
    color: "#262626",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
  },
  advertDescription: {
    color: "#262626",
    fontSize: 12,
    fontWeight: "400",
  },
  closeIcon: {
    flexDirection: "row",
    textAlign: "right",
    justifyContent: "flex-end",
    cursor: "pointer",
  },
  avataContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#665096",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E1D8F5",
    overflow: "hidden",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  avarta: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  reviewButton: {
    backgroundColor: "#F3F3F3",
    opacity: 0.7,
    color: "#262626",
  },

  bannerImage: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
});
