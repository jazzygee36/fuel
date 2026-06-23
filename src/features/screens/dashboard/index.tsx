import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import TextInputField from "../../../components/textInputField";
import { SetStateAction, useState } from "react";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import AppButton from "../../../components/button";
import FundWallet from "../wallet/fund-wallet";
import SearchBar from "../../../components/search-bar";
import ContinueModal from "./continue-modal";
import FileterModal from "./filter-moda";
import VerificationModal from "./verification-modal";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Dashboard() {
  const navigation = useNavigation<NavigationProp>();

  const [open, setOpen] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
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
          {/* <View style={styles.circle}> */}
          <Image
            source={require("../../../assets/png/avatar.png")}
            // style={styles.stationImage}
            resizeMode="cover"
          />
          {/* </View> */}
          <View>
            <Text style={styles.userName}>Hello, Smart!</Text>
            <Text style={styles.desc}>Victoria Island, Lagos</Text>
          </View>
        </View>

        <View style={styles.flexCircle}>
          <Pressable style={styles.circle}>
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
        onPress={() => setOpenFilterModal(true)}
      />

      <View style={{ marginTop: 25 }}>
        <FundWallet setStep={() => {}} />
      </View>
      <View style={styles.stationsMap}>
        <View style={styles.station}>
          <Pressable onPress={() => navigation.navigate("Stations")}>
            <Image
              source={require("../../../assets/png/fuelStation.png")}
              // style={styles.stationImage}
              // resizeMode="cover"
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("TransactionHistory")}>
            <Image
              source={require("../../../assets/png/trans.png")}
              // style={styles.stationImage}
              // resizeMode="cover"
            />
          </Pressable>
        </View>
        <View style={styles.station}>
          <Pressable onPress={() => navigation.navigate("VehicleSettings")}>
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
        <View>
          <Text style={styles.verifyText}>Verify your identity</Text>
        </View>
        <TouchableOpacity
          style={styles.verifyContinue}
          onPress={() => setVerifyModal(true)}
        >
          <Text style={styles.verifyText}>Continue</Text>
          <Image
            source={require("../../../assets/png/continue.png")}
            // style={styles.stationImage}
            resizeMode="cover"
          />
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
    color: "#151521",
    fontSize: 16,
    fontWeight: "700",
  },

  desc: {
    color: "#76777A",
    fontSize: 12,
    fontWeight: "600",
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
  },
  verifyText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#3A3B3E",
    cursor: "pointer",
  },
  verifyContinue: {
    backgroundColor: "#E1D8F5",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 50,
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
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
});
