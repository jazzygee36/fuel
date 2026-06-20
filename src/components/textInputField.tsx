import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props extends TextInputProps {
  label?: string;
  isPassword?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  height?: number;
}

export default function TextInputField({
  label,
  isPassword = false,
  inputStyle,
  placeholder,
  height = 60,
  ...props
}: Props) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.inputWrapper, { height }]}>
        <TextInput
          style={[styles.input, inputStyle]}
          secureTextEntry={isPassword ? hidePassword : false}
          placeholder={placeholder}
          placeholderTextColor="#999"
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.icon}
          >
            <Ionicons
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#000",
    outlineColor: "transparent",
  },
  icon: {
    paddingLeft: 10,
  },
});