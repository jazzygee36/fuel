import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from "react-native";
import BackArrow from "../../../components/back-arrow";
import { Ionicons } from "@expo/vector-icons";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";
import { useState } from "react";
import SettingsHeader from "./header";

const data = [
  { id: 1, label: "Driver’s Licence" },
  { id: 2, label: "Passport Photography" },
];

export default function AccountSettings() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleEdit = () => {
    console.log("Edit profile image clicked");
    // open image picker or navigate to edit screen
  };
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title={"Account Settings"} />
        <View style={styles.imageContainer}>
          {/* Profile Image */}
          <Image
            source={require("../../../assets/png/avatar.png")}
            style={styles.avatar}
          />

          {/* Edit Button */}
          <Pressable style={styles.editBtn} onPress={handleEdit}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </Pressable>
        </View>
        <View>
          <TextInputField label="Full name" placeholder="Name" />
          <TextInputField label=" Email address" placeholder="Email" />
          <TextInputField label="Phone number" placeholder="Phone number" />
          <AppButton
            title={"Delete Account"}
            backgroundColor="#FFEEF1"
            textColor="#F31E45"
            onPress={() => {}}
          />
        </View>
        <View style={{ marginVertical: 26 }}>
          <Text style={styles.verification}> Means of Verification</Text>
          {data.map((item) => {
            const isSelected = selectedId === item.id;

            return (
              <Pressable
                key={item.id}
                style={styles.row}
                onPress={() => setSelectedId(item.id)}
              >
                {/* Checkbox */}
                <Ionicons
                  name={isSelected ? "radio-button-on" : "radio-button-off"}
                  size={22}
                  color={isSelected ? "#6C4AB6" : "#999"}
                />

                {/* Label */}
                <Text style={styles.text}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <View>
          <AppButton
            title={"Edit Profile"}
            backgroundColor="#540863"
            textColor="#fff"
            onPress={() => {}}
          />
          <AppButton
            title={"Cancel"}
            backgroundColor="transparent"
            textColor="#000000"
            onPress={() => {}}
          />
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
    paddingTop: 27,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  notificationIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  imageContainer: {
    width: 100,
    height: 100,
    position: "relative",
    marginVertical: 29,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4.4,
    borderColor: "#C6C6C9",
  },

  editBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#540863",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#C6C6C9",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
  },
  text: {
    fontSize: 12,
    color: "#515255",
    fontWeight: "semibold",
  },
  verification: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
