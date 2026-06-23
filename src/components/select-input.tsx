import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SelectInputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  error?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  rightIcon?: React.ReactNode;
}

export default function SelectInput({
  label,
  value,
  placeholder = "Select option",
  onPress,
  error,
  disabled = false,
  containerStyle,
  inputStyle,
  labelStyle,
  valueStyle,
  placeholderStyle,
  rightIcon,
}: SelectInputProps) {
  const hasValue = !!value;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.inputContainer,
          disabled && styles.disabledInput,
          error && styles.errorBorder,
          inputStyle,
        ]}
      >
        <Text
          style={[
            styles.valueText,
            !hasValue && styles.placeholderText,
            hasValue ? valueStyle : placeholderStyle,
          ]}
        >
          {hasValue ? value : placeholder}
        </Text>

        {rightIcon ?? (
          <Ionicons name="chevron-down" size={18} color="#667085" />
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#101928",
    marginBottom: 8,
  },
  inputContainer: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  valueText: {
    fontSize: 15,
    color: "#101828",
    flex: 1,
  },
  placeholderText: {
    color: "#98A2B3",
  },
  disabledInput: {
    backgroundColor: "#F9FAFB",
    opacity: 0.7,
  },
  errorBorder: {
    borderColor: "#F04438",
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#F04438",
  },
});
