import { View, StyleSheet, Text } from "react-native";
import BackArrow from "../../../components/back-arrow";
interface Props {
  title: string;
}

export default function SettingsHeader({ title }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.settings}>
        <BackArrow />
        <Text style={styles.settingsText}>{title}</Text>
      </View>

      {/* <Image
                   source={require("../../../assets/png/notification-bing.png")}
                   style={styles.notificationIcon}
                 /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 33,
  },

  settings: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  settingsText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
    color: "#151521",
  },
});
