import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import BackArrow from "../../../components/back-arrow";
import VerifyHeader from "./verify-header";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../../../components/button";
import SecondStepVerification from "./second-step";
import ThirdStepVerification from "./third-step";
import ForthStepVerification from "./fouth-step";
import FifthStepVerification from "./fifth-step";

const settingsData = [
  {
    title: "Passport",
    description: "Photo page",
    icon: <Ionicons name="wallet" size={20} color="#4CD080" />,
    rightText: "",
    rightTextColor: "#8B8B8B",
    // route: "Wallet",
  },
  {
    title: "NIN",
    description: "Front and back",
    icon: <Ionicons name="car-sport" size={20} color="#8B5CF6" />,
    // route: "VehicleSettings",
  },
  {
    title: "Driver’s license",
    description: "Front and back",
    icon: <Ionicons name="bookmark" size={20} color="#58B9E8" />,
    // route: "FavouriteSettings",
  },
];

export default function Verification() {
  const [step, setStep] = useState<number>(1);

  const handleStep = () => {
    setStep((prev) => {
      if (prev >= 5) return prev;
      return prev + 1;
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && (
          <View>
            <VerifyHeader
              title={"Pick a document to verify your identity"}
              description={"Step 1 of 3"}
            />

            {settingsData.map((item, index) => (
              <Pressable key={index} style={styles.row}>
                <View style={styles.leftSection}>
                  <View style={styles.iconWrapper}>{item.icon}</View>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                </View>

                <View style={styles.rightSection}>
                  {item.rightText ? (
                    <Text
                      style={[
                        styles.rightText,
                        { color: item.rightTextColor || "#8B8B8B" },
                      ]}
                    >
                      {item.rightText}
                    </Text>
                  ) : null}
                  <Feather name="chevron-right" size={20} color="#111" />
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {step === 2 && <SecondStepVerification />}
        {step === 3 && <ThirdStepVerification />}
        {step === 4 && <ForthStepVerification />}
        {step === 5 && <FifthStepVerification />}
      </ScrollView>

      {/* 👇 Sticky Footer */}
      <View style={styles.footer}>
        <AppButton
          title={"Continue"}
          backgroundColor="#540863"
          textColor="#fff"
          onPress={handleStep}
        />
        <AppButton
          title={"Cancel"}
          backgroundColor="transparent"
          textColor="#000000"
          onPress={() => {
            setStep(1);
          }}
        />
      </View>
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

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F4",
    marginTop: 20,
    borderRadius: 14,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconWrapper: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    fontFamily: "BricolageGrotesque",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rightText: {
    fontSize: 15,
    fontWeight: "500",
  },
  description: {
    color: "#1E1E24",
    marginTop: 4,
  },
});
