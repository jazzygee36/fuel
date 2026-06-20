import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import SettingsHeader from "./header";

export default function ReferralSettings() {
  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <SettingsHeader title={"Referral"} />
        </View>

        <View style={styles.banner}>
          <View style={styles.textWrapper}>
            <Text style={styles.bannerText}>
              🎁 You earn ₦1,000{"\n"}
              and your friend gets ₦500 when they use your code
            </Text>
          </View>

          <Image
            source={require("../../../assets/png/referralpix.png")}
            style={styles.image}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    paddingVertical: 27,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  banner: {
    backgroundColor: "#540863",
    paddingVertical: 30,
    paddingHorizontal: 23,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },

  textWrapper: {
    flex: 1,
    paddingRight: 10,
    width: "100%",
  },

  bannerText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    width: "100%",
    fontFamily: " BricolageGrotesque",
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: "#C6C6C9",
  },
  image: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
