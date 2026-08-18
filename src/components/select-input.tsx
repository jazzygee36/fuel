import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SelectInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  rightIcon?: React.ReactNode;
  options: string[];
}

export default function SelectInput({
  label,
  value,
  placeholder = "Select option",
  onChange,
  error,
  disabled = false,
  containerStyle,
  inputStyle,
  labelStyle,
  valueStyle,
  placeholderStyle,
  rightIcon,
  options,
}: SelectInputProps) {
  const [visible, setVisible] = useState(false);

  const hasValue = !!value;

  const handleSelect = (option: string) => {
    onChange(option);
    setVisible(false);
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
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
          <Ionicons
            name="chevron-down"
            size={18}
            color="#667085"
          />
        )}
      </TouchableOpacity>

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <Pressable style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>
              {label}
            </Text>

            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleSelect(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    value === option && styles.selectedOption,
                  ]}
                >
                  {option}
                </Text>

                {value === option && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color="#540863"
                  />
                )}
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  optionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 10,
    overflow: "hidden",
  },

  optionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#151521",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EAECF0",
  },

  option: {
    minHeight: 52,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },

  optionText: {
    fontSize: 15,
    color: "#344054",
  },

  selectedOption: {
    color: "#540863",
    fontWeight: "600",
  },
});