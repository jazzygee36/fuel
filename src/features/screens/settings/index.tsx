import { View, ScrollView, StyleSheet, Text } from "react-native";
import BackArrow from "../../../components/back-arrow";

export default function Settings() {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settings}>
          <BackArrow />
          <Text style={styles.settingsText}>Settings</Text>
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

  settings: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  settingsText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
  },
});
