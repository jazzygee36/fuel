import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import TextInputField from "../../../components/textInputField";
import { SetStateAction, useState } from "react";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import AppButton from "../../../components/button";
import FundWallet from "../wallet/fund-wallet";
import SearchBar from "../../../components/search-bar";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
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
          <View style={styles.circle}>
            <Image
              source={require("../../../assets/png/message.png")}
              // style={styles.stationImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.circle}>
            <Image
              source={require("../../../assets/png/notify.png")}
              // style={styles.stationImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <SearchBar />

      <FundWallet setStep={() => {}} />
      <View style={styles.stationsMap}>
        <View style={styles.station}>
          <Image
            source={require("../../../assets/png/fuelStation.png")}
            // style={styles.stationImage}
            resizeMode="cover"
          />

          <Image
            source={require("../../../assets/png/trans.png")}
            // style={styles.stationImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.station}>
          <Image
            source={require("../../../assets/png/vehicle.png")}
            // style={styles.stationImage}
            resizeMode="cover"
          />
          <Image
            source={require("../../../assets/png/fuelStation.png")}
            // style={styles.stationImage}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.verifyIdentity}>
        <View>
          <Text style={styles.verifyText}>Verify your identity</Text>
        </View>
        <TouchableOpacity
          style={styles.verifyContinue}
          onPress={() => setOpen(true)}
        >
          <Text style={styles.verifyText}>Continue</Text>
          <View style={styles.continueArrow}></View>
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
        <TextInputField placeholder="State" label="State" />
        <TextInputField placeholder="City" label="City" />
        <View style={styles.btnGroup}>
          <AppButton
            title="Cancel"
            variant="outlined"
            style={styles.btnHalf}
            onPress={() => setOpen(false)}
          />

          <AppButton
            title="Save"
            variant="filled"
            backgroundColor="#540863"
            style={styles.btnHalf}
            onPress={() => {}}
          />
        </View>
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
    justifyContent: "space-between",
    gap: 13,
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
  btnGroup: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginTop: 20,
  },
  btnHalf: {
    flex: 1,
  },
});
