import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  btn?: React.ReactNode;
  children?: React.ReactNode;
}
type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function BottomModal({
  visible,
  onClose,
  title,
  description,
  btn,
  children,
}: BottomModalProps) {
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

          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{description}</Text>
          {/* <AppButton
            backgroundColor={"#540863"}
            textColor="#fff"
            title="Confirm code"
            // disabled={!isOtpComplete}
            onPress={() => {
              (onClose(), navigation.navigate("login"));
            }}
          /> */}
          {btn}
          <View>{children}</View>
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
    // minHeight: 250,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 15,
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: "#D9D9D9",
    borderRadius: 999,
    alignSelf: "center",
    marginBottom: 20,
  },
  closeBtn: {
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    // textAlign: "center",
    marginBottom: 10,
    fontFamily: "BricolageGrotesque",
  },
  description: {
    // textAlign: "center",
    color: "#666",
    marginBottom: 32,
  },
});
