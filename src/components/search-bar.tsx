import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";

interface Props {
  searchIcon?: boolean;
  placeholder: string;
  value?: string;
  onPress?: () => void;
  onSearch?: (text: string) => void;
}

export default function SearchBar({
  searchIcon = true,
  placeholder,
  value = "",
  onPress,
  onSearch,
}: Props) {
  return (
    <View style={[styles.flexDiv, styles.searchRow]}>
      <View style={styles.searchInputWrap}>
        <TextInput
          value={value}
          onChangeText={onSearch}
          placeholder={placeholder}
          placeholderTextColor="#999"
          style={[
            styles.input,
            Platform.OS === "web"
              ? ({
                  outlineStyle: "none",
                  outlineWidth: 0,
                } as any)
              : null,
          ]}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      {searchIcon && (
        <TouchableOpacity
          style={styles.searchIconCircle}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/png/settingIcon.png")}
            resizeMode="contain"
            style={styles.icon}
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
    gap: 8,
  },

  searchInputWrap: {
    flex: 1,
    height: 50,
    backgroundColor: "#F0F0F4",
    borderRadius: 50,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    paddingVertical: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
  },

  searchIconCircle: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#F0F0F4",
  },

  icon: {
    width: 20,
    height: 20,
  },
});