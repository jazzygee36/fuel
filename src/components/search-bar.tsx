import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import TextInputField from "./textInputField";

interface Props {
  searchIcon?: boolean;
  placeholder: string;
  onPress?: () => void;
}

export default function SearchBar({
  searchIcon = true,
  placeholder,
  onPress,
}: Props) {
  return (
    <View style={[styles.flexDiv, styles.searchRow]}>
      <View style={styles.searchInputWrap}>
        <TextInputField
          placeholder={placeholder}
          height={50}
          borderWidth={0}
        />
      </View>

      {searchIcon && (
        <TouchableOpacity style={styles.searchIconCircle} onPress={onPress}>
          <Image
            source={require("../assets/png/settingIcon.png")}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
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
    marginVertical: 0,
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#F0F0F4",
  },
});