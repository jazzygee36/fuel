import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";

import BackArrow from "../../../components/back-arrow";
import AppButton from "../../../components/button";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/types";
import { useCurrentUser } from "../../../hooks/queries/useCurrentUser";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SelfieDetails = [
  {
    description: "Face forward and make sure your eyes are clearly visible",
  },
  {
    description: "Remove anything that covers your face. Eyeglasses are okay",
  },
];

export default function SelfieVerification() {
  const navigation = useNavigation<NavigationProp>();

  const { data: user } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const handleTakeSelfie = async () => {
    if (!user?.id) {
      Alert.alert(
        "Unable to verify",
        "We could not identify your account. Please try again.",
      );
      return;
    }

    try {
      setIsLoading(true);
    } catch (error) {
      console.error("SMILE ID ERROR:", error);

      Alert.alert(
        "Verification error",
        "Something went wrong while starting verification.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <BackArrow />

          <Text style={styles.backArrowText}>Take a quick selfie</Text>
        </View>

        <Text style={styles.step}>Step 2 of 3</Text>

        <View style={styles.selfieDescription}>
          {SelfieDetails.map((item, index) => (
            <View key={index} style={styles.descriptionItem}>
              <View style={styles.bullet}>
                <Text style={styles.bulletText}>•</Text>
              </View>

              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title={isLoading ? "Opening..." : "Take a selfie"}
          backgroundColor="#540863"
          textColor="#fff"
          onPress={handleTakeSelfie}
          disabled={isLoading}
        />

        <AppButton
          title="Cancel"
          backgroundColor="transparent"
          textColor="#000"
          onPress={() => navigation.goBack()}
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
    paddingTop: 27,
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },

  header: {
    flexDirection: "column",
    gap: 16,
  },

  backArrowText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
    color: "#151521",
  },

  step: {
    marginTop: 5,
    fontSize: 14,
    color: "#515255",
  },

  selfieDescription: {
    marginTop: 30,
    gap: 20,
  },

  descriptionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  bullet: {
    width: 20,
  },

  bulletText: {
    fontSize: 18,
    color: "#540863",
  },

  descriptionText: {
    flex: 1,
    fontSize: 12,
    color: "#515255",
    fontWeight: "500",
    lineHeight: 18,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
    gap: 5,
    backgroundColor: "#fff",
  },
});
