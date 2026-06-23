import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  value: string;
  title: string;
};

export default function BarcodeModal({
  visible,
  onClose,
  value,
  title,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.qrContainer}>
          <QRCode value={value} size={220} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    // alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151521",
  },
  desc: {
    marginTop: 8,
    fontSize: 14,
    color: "#76777A",
    textAlign: "center",
  },
  qrContainer: {
    marginTop: 24,
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  //   closeBtn: {
  //     backgroundColor: "#540863",
  //     paddingVertical: 12,
  //     paddingHorizontal: 24,
  //     borderRadius: 999,
  //   },
  closeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
