import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";
import BackArrow from "../../../components/back-arrow";
import FundWallet from "../wallet/fund-wallet";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { Feather } from "@expo/vector-icons";
import AppButton from "../../../components/button";

type BuyFuelRouteProp = RouteProp<RootStackParamList, "BuyFuel">;
export default function BuyFuel() {
  const route = useRoute<BuyFuelRouteProp>();
  const { selectedStation } = route.params;
  console.log("selectedStation", selectedStation);
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.fuelNav}>
            <BackArrow />
            <Text style={styles.fuelText}>Buy Fuel</Text>
          </View>
        </View>
        <View style={{ marginVertical: 35 }}>
          <FundWallet setStep={() => {}} />
        </View>
        <View>
          <View>
            <Image source={selectedStation.logo} style={styles.logo} />
          </View>
          <Text style={styles.text}>
            Reliable service with fast verification and seamless wallet
            payments.
          </Text>
          <View style={styles.divContainer}>
            <Text>Location</Text>
            <Text>{selectedStation?.distance}</Text>
          </View>
          <View style={styles.divContainer}>
            <Text>Status</Text>
            <Text>{selectedStation?.func}</Text>
          </View>
        </View>
        <hr style={styles.line} />

        <View style={styles.row}>
          <View style={styles.leftSection}>
            {/* <View style={styles.iconWrapper}>{item.icon}</View> */}
            <View>
              <Text style={styles.description}>Petrol (PMS)</Text>
              <Text style={styles.title}>{selectedStation?.petrol}</Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <Feather name="chevron-right" size={20} color="#111" />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.leftSection}>
            {/* <View style={styles.iconWrapper}>{item.icon}</View> */}
            <View>
              <Text style={styles.description}>Diesel (AGO)</Text>
              <Text style={styles.title}>{selectedStation?.Diesel}</Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <Feather name="chevron-right" size={20} color="#111" />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.leftSection}>
            {/* <View style={styles.iconWrapper}>{item.icon}</View> */}
            <View>
              <Text style={styles.description}>Gas </Text>
              <Text style={styles.title}>{selectedStation?.Gas}</Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <Feather name="chevron-right" size={20} color="#111" />
          </View>
        </View>
        <hr style={styles.line} />
       <View style={{marginTop:30}}>
         <AppButton
          title="Purchase"
          variant="filled"
          backgroundColor="#540863"
          // style={styles.btnHalf}
          onPress={() => {}}
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
    paddingTop: 27,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  fuelNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  fuelText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
    color: "#151521",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  divContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    color: "#515255",
    fontSize: 12,
    marginVertical: 10,
    fontWeight: 500,
  },
  line: {
    color: "#F0F0F4",
    // borderWidth: 2,
    width: "100%",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    // marginTop: 33,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconWrapper: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#222",
    fontFamily: "BricolageGrotesque",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rightText: {
    fontSize: 15,
    fontWeight: "500",
  },
  description: {
    color: "#595959",
    fontSize: 12,
  },
});
