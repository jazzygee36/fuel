import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Modal,
  Pressable,
  TextInput,
  FlatList,
  Keyboard,
  Platform,
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
  options: any[];
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
  options = [],
}: SelectInputProps) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  // Normalize API options into strings to prevent runtime errors.
  const safeOptions = useMemo(() => {
    if (!Array.isArray(options)) {
      return [];
    }

    const normalized = options
      .map((option: any) => {
        if (typeof option === "string") {
          return option;
        }

        if (typeof option === "number") {
          return String(option);
        }

        if (option && typeof option === "object") {
          const name =
            option.Make_Name ??
            option.makeName ??
            option.make ??
            option.Model_Name ??
            option.model ??
            option.name ??
            option.label;

          return typeof name === "string" || typeof name === "number"
            ? String(name)
            : "";
        }

        return "";
      })
      .filter((option: string) => option.trim().length > 0);

    // Remove duplicates while preserving order.
    return [...new Set(normalized)];
  }, [options]);

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (query.length < 2) {
      return safeOptions;
    }

    return safeOptions.filter((option) => option.toLowerCase().includes(query));
  }, [safeOptions, search]);

  const closeModal = useCallback(() => {
    Keyboard.dismiss();
    setVisible(false);
    setSearch("");
  }, []);

  const openModal = useCallback(() => {
    if (disabled) return;

    setSearch("");
    setVisible(true);
  }, [disabled]);

  const handleSelect = useCallback(
    (option: string) => {
      onChange(option);
      closeModal();
    },
    [onChange, closeModal],
  );

  const renderOption = useCallback(
    ({ item }: { item: string }) => {
      const isSelected = value === item;

      return (
        <TouchableOpacity
          style={styles.option}
          activeOpacity={0.7}
          onPress={() => handleSelect(item)}
        >
          <Text
            style={[styles.optionText, isSelected && styles.selectedOption]}
            numberOfLines={2}
          >
            {item}
          </Text>

          {isSelected && (
            <Ionicons name="checkmark" size={20} color="#540863" />
          )}
        </TouchableOpacity>
      );
    },
    [value, handleSelect],
  );

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openModal}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        style={[
          styles.inputContainer,
          disabled && styles.disabledInput,
          error && styles.errorBorder,
          inputStyle,
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.valueText,
            !value && styles.placeholderText,
            value ? valueStyle : placeholderStyle,
          ]}
        >
          {value || placeholder}
        </Text>

        {rightIcon ?? (
          <Ionicons name="chevron-down" size={18} color="#667085" />
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeModal}
            accessibilityLabel="Close selection"
          />

          <View style={styles.optionsContainer}>
            {/* Modal header */}
            <View style={styles.header}>
              <Text style={styles.optionsTitle} numberOfLines={1}>
                {label}
              </Text>

              <TouchableOpacity
                onPress={closeModal}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Ionicons name="close" size={22} color="#667085" />
              </TouchableOpacity>
            </View>

            {/* Search input */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#667085" />

              <TextInput
                style={styles.searchInput}
                placeholder="Type at least 2 letters to search"
                placeholderTextColor="#98A2B3"
                value={search}
                onChangeText={setSearch}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                clearButtonMode={
                  Platform.OS === "ios" ? "while-editing" : "never"
                }
              />

              {Platform.OS === "android" && search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color="#98A2B3" />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={filteredOptions}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={renderOption}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator
              initialNumToRender={15}
              maxToRenderPerBatch={20}
              windowSize={7}
              style={styles.optionsList}
              contentContainerStyle={
                filteredOptions.length === 0
                  ? styles.emptyListContent
                  : undefined
              }
              ListEmptyComponent={
                <Text style={styles.emptyText}>No matching options found.</Text>
              }
            />
          </View>
        </View>
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
    alignItems: "center",
    paddingHorizontal: 20,
  },

  optionsContainer: {
    width: "100%",
    maxWidth: 500,
    height: "75%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingTop: 10,
    paddingBottom: 8,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EAECF0",
  },

  optionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#151521",
    flex: 1,
    marginRight: 12,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 14,
    marginTop: 12,
    paddingHorizontal: 12,
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 8,
    fontSize: 14,
    color: "#101828",
    borderColor: 'none'
  },

  resultCount: {
    fontSize: 12,
    color: "#667085",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 4,
  },

  optionsList: {
    flex: 1,
  },

  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  option: {
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },

  optionText: {
    fontSize: 15,
    color: "#344054",
    flex: 1,
    marginRight: 12,
  },

  selectedOption: {
    color: "#540863",
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    color: "#667085",
    paddingVertical: 24,
    paddingHorizontal: 18,
    fontSize: 14,
  },
});
