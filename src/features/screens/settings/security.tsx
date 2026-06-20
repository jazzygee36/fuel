import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from "react-native";
import BackArrow from "../../../components/back-arrow";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import SettingsHeader from "./header";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const settingsData = [
  {
    title: "Biometric Login",
    description: "Use fingerprints instead",
    rightText: "NGN",
    rightTextColor: "#8B8B8B",
  },
  {
    title: "Transaction Pin",
    description: "Setup your transaction pin",
    rightText: "NGN",
    rightTextColor: "#8B8B8B",
    route: "UpdateTransactionPin",
  },
  {
    title: "Change Login Password",
    description: "Update your login password",
    rightText: "NGN",
    rightTextColor: "#8B8B8B",
    route: "ChangePasswordPin",
  },
];
export default function SecuritySettings() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title={"Security"} />
        {settingsData.map((item, index) => (
          <Pressable
            key={index}
            style={styles.row}
            onPress={() =>
              navigation.navigate(item.route as keyof RootStackParamList)
            }
          >
            <View style={styles.leftSection}>
              {/* <View style={styles.iconWrapper}>{item.icon}</View> */}
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>

            <View style={styles.rightSection}>
              {item.rightText ? (
                <Text
                  style={[
                    styles.rightText,
                    { color: item.rightTextColor || "#8B8B8B" },
                  ]}
                >
                  {/* {item.rightText} */}
                </Text>
              ) : null}
              <Feather name="chevron-right" size={20} color="#111" />
            </View>
          </Pressable>
        ))}
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

  notificationIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
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
    fontSize: 16,
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
