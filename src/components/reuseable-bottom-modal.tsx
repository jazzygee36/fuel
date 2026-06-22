import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BottomModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  description?: string;
}

export default function ReuseableBottomModal({
  visible,
  title,
  onClose,
  children,
  description,
}: BottomModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      {/* Background overlay */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* Modal content */}
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{description}</Text>

        {/* Body */}
        <View style={styles.body}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "85%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    fontFamily: "BricolageGrotesque",
  },

  closeBtn: {
    padding: 5,
  },

  body: {
    paddingBottom: 20,
  },
  description: {
    // textAlign: "center",
    color: "#000000",
    marginBottom: 32,
  },
});
