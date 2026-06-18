import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AppButton from "./button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
}
type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function BottomModal({ visible, onClose }: BottomModalProps) {
  const navigation = useNavigation<NavProp>();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.content}>
          <View style={styles.handle} />

          <Text style={styles.title}>Email Confirmed</Text>

          <Text style={styles.description}>
            We’ve been able to successfully confirm your email address
          </Text>
          <AppButton
            backgroundColor={"#540863"}
            textColor="#fff"
            title="Confirm code"
            // disabled={!isOtpComplete}
            onPress={() => {
              (onClose(), navigation.navigate("login"));
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 250,
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: "#D9D9D9",
    borderRadius: 999,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    // textAlign: "center",
    marginBottom: 10,
  },
  description: {
    // textAlign: "center",
    color: "#666",
    marginBottom: 32,
  },
});
