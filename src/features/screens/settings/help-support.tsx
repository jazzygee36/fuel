import { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import SettingsHeader from "./header";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";

const supportContact = [
  { title: " 📩 support@Carvora.com" },
  { title: " 📞 +234 123 456 7890" },
  { title: " 🌐 www.Carvora.com" },
];

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState<"contact" | "privacy">("contact");

  const handleCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied", "Copied successfully");
  };
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title="Help & Support" />

        {/* TAB SWITCHER */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "contact" && styles.activeTab]}
            onPress={() => setActiveTab("contact")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "contact" && styles.activeTabText,
              ]}
            >
              Contact Us
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "privacy" && styles.activeTab]}
            onPress={() => setActiveTab("privacy")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "privacy" && styles.activeTabText,
              ]}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        {/* CONTENT SWITCH */}
        <View style={{ marginTop: 20 }}>
          {activeTab === "contact" ? (
            <View>
              {supportContact.map((support, index) => (
                <View key={index} style={styles.supportStyle}>
                  <Text style={{ color: "#000000", fontWeight: 500 }}>
                    {support?.title}
                  </Text>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() => handleCopy(support.title)}
                  >
                    <Ionicons name="copy" size={18} color="#292D32F" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Text style={{ fontWeight: "700" }}>1. Introduction</Text>
              <Text style={{ marginTop: 6 }}>
                Carvora (“we”, “our”, “us”) is committed to protecting your
                privacy...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    paddingVertical: 27,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 30,
    padding: 5,
    marginTop: 20,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#540863",
  },

  tabText: {
    color: "#111",
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
  },

  activeTabText: {
    color: "#fff",
  },
  supportStyle: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    padding: 24,
    borderRadius: 5,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  copyButton: {
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  copyButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
