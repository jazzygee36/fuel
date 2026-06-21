import { View, StyleSheet, Image } from "react-native";
import TextInputField from "./textInputField";

export default function SearchBar() {
  return (
    <View style={[styles.flexDiv, styles.searchRow]}>
      <View style={styles.searchInputWrap}>
        <TextInputField
          placeholder="Search name/location"
          height={50}
          borderWidth={0}
        />
      </View>
      <View style={styles.searchIconCircle}>
        <Image
          source={require("../assets/png/settingIcon.png")}
          // style={styles.stationImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  searchRow: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  searchInputWrap: {
    flex: 1,
    height: 50,
    backgroundColor: "#F0F0F4",
    borderRadius: 50,
  },

  searchIconCircle: {
    width: 50,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#F0F0F4",
    cursor: "pointer",
  },
});
