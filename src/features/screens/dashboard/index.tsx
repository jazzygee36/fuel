import * as Location from "expo-location";
import { useEffect, useState } from "react";
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
import { useCurrentUser } from "../../../hooks/queries/useCurrentUser";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TabNavigationProp = BottomTabNavigationProp<AppTabParamList>;

export default function Dashboard() {
  const { data: Users } = useCurrentUser();
  console.log("Users", Users);
  const rootNavigation = useNavigation<RootNavigationProp>();
  const tabNavigation = useNavigation<TabNavigationProp>();
  const [open, setOpen] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Advertisment Banner 1",
      description: "Protected savings and investment plans",
    },
    {
      id: 2,
      title: "Advertisment Banner 2",
      description: "Secure your wallet with smart finance tools",
    },
    {
      id: 3,
      title: "Advertisment Banner 3",
      description: "Earn rewards on every transaction",
    },
  ]);
  const [locationName, setLocationName] = useState("Getting location...");

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        setLocationName("Getting location...");

        // 1. Check if location services are enabled
        const servicesEnabled = await Location.hasServicesEnabledAsync();

        console.log("Location services enabled:", servicesEnabled);

        if (!servicesEnabled) {
          setLocationName("Turn on location");
          return;
        }

        // 2. Request permission
        const { status } = await Location.requestForegroundPermissionsAsync();

        console.log("Location permission:", status);

        if (status !== "granted") {
          setLocationName("Location permission denied");
          return;
        }

        // 3. Get last known location first
        const lastKnown = await Location.getLastKnownPositionAsync({
          maxAge: 60000,
          requiredAccuracy: 100,
        });

        console.log("Last known location:", lastKnown);

        // 4. Get current location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        console.log("Current location:", location);

        const { latitude, longitude } = location.coords;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // 5. Reverse geocode
        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        console.log("Reverse geocode:", address);

        if (address.length > 0) {
          const place = address[0];

          console.log("Place:", place);

          const locationParts = [
            place.name,
            place.street,
            place.district,
            place.city,
            place.region,
          ].filter(Boolean);

          const formattedLocation = locationParts.join(", ");

          setLocationName(formattedLocation || "Location unavailable");
        } else {
          setLocationName("Location unavailable");
        }
      } catch (error) {
        console.error("LOCATION ERROR:", error);
        setLocationName("Location unavailable");
      }
    };

    getCurrentLocation();
  }, []);

  const closeAd = (id: number) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };
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
              <Text style={{ color: "#151521", fontWeight: "700" }}>
                {Users?.firstName}
              </Text>
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
          <View style={styles.circle}>
            <Image
              source={require("../../../assets/png/notify.png")}
              // style={styles.stationImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <SearchBar
        placeholder="Search name/location"
        value={searchQuery}
        onSearch={setSearchQuery}
        onPress={() => setOpenFilterModal(true)}
      />

      <View style={{ marginTop: 25 }}>
        <View>
          <FundWallet />
        </View>
      </View>
      <View style={styles.stationsMap}>
        <View style={styles.station}>
          <Pressable onPress={() => tabNavigation.navigate("Stations")}>
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
                Users?.isVerified && styles.progressComplete,
              ]}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.verifyContinue,
            Users?.isVerified && styles.verifiedButton,
          ]}
          disabled={Users?.isVerified}
          onPress={() => setVerifyModal(true)}
        >
          <Text style={styles.continueText}>
            {Users?.isVerified ? "Verified" : "Continue"}
          </Text>

          {!Users?.isVerified && (
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
      {ads.map((ad) => (
        <View key={ad.id} style={styles.advertCard}>
          {/* Close button */}
          <View style={styles.closeIcon}>
            <Text onPress={() => closeAd(ad.id)}>✕</Text>
          </View>

          <View>
            <Text style={styles.advertTitle}>{ad.title}</Text>
            <Text style={styles.advertDescription}>{ad.description}</Text>
          </View>
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

  desc: {
    color: "#76777A",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "BricolageGrotesque",
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
    width: "35%",
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
    backgroundColor: "#665096",
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
});
