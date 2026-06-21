import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import SettingsHeader from "./header";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import BottomModal from "../../../components/bottom-modal";

const steps = [
  {
    id: 1,
    title: "Share your code",
    description:
      "And earn ₦1,000 for every friend who completes their first fuel purchase",
  },
  {
    id: 2,
    title: "They sign up",
    description: "They sign up using your code",
  },
  {
    id: 3,
    title: "You both earn rewards",
    description: "You both earn rewards after their first fuel purchase",
  },
];

export default function ReferralSettings() {
  const [referralHistoryModal, setReferralHistoryModal] = useState(false);
  const referralCode = "FN67EZYM";

  const handleCopy = async () => {
    await Clipboard.setStringAsync(referralCode);
    Alert.alert("Copied", "Referral code copied successfully");
  };
  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <SettingsHeader title={"Referral"} />
        </View>

        <View style={styles.banner}>
          <View style={styles.textWrapper}>
            <Text style={styles.bannerText}>
              🎁 You earn ₦1,000{"\n"}
              and your friend gets ₦500 when they use your code
            </Text>
          </View>

          <Image
            source={require("../../../assets/png/referralpix.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((step) => (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>{step.id}</Text>
              </View>

              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.codeCard}>
          <Text style={styles.codeText}>{referralCode}</Text>

          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Text style={styles.copyButtonText}>Copy Code</Text>
            <Ionicons name="copy-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Referral History */}
        <TouchableOpacity style={styles.historyRow}>
          <Text
            style={styles.historyText}
            onPress={() => setReferralHistoryModal(true)}
          >
            VIEW REFERRAL HISTORY
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#111" />
        </TouchableOpacity>
      </ScrollView>
      <BottomModal
        visible={referralHistoryModal}
        onClose={() => setReferralHistoryModal(false)}
        title={"Referral History"}
        // description={""}
      >
        <View style={styles.modalContainer}>
          <View>
            <Text>Total Invites:</Text>
            <Text style={styles.inviteText}>12</Text>
          </View>
          <View>
            <Text>Successful Referrals:</Text>
            <Text style={styles.inviteText}>12</Text>
          </View>
          <View>
            <Text>Total Earned:</Text>
            <Text style={styles.inviteText}>₦80,000</Text>
          </View>
        </View>
      </BottomModal>
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

  banner: {
    backgroundColor: "#540863",
    paddingVertical: 30,
    paddingHorizontal: 23,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },

  textWrapper: {
    flex: 1,
    paddingRight: 10,
    width: "100%",
  },

  bannerText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    width: "100%",
    fontFamily: " BricolageGrotesque",
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: "#C6C6C9",
  },
  image: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  stepsContainer: {
    gap: 24,
    marginVertical: 40,
    paddingHorizontal: 27,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ECE9F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  circleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    fontFamily: "BricolageGrotesque",
  },

  stepTextContainer: {
    flex: 1,
  },

  stepTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
    fontFamily: "BricolageGrotesque",
  },

  stepDescription: {
    fontSize: 15,
    lineHeight: 24,
    color: "#333",
  },

  codeCard: {
    backgroundColor: "#ECECEF",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    marginHorizontal: 27,
  },

  codeText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    letterSpacing: 0.5,
    fontFamily: " BricolageGrotesque",
  },

  copyButton: {
    backgroundColor: "#8E63D9",
    paddingVertical: 12,
    paddingHorizontal: 18,
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

  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 27,
    marginBottom: 30,
  },

  historyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },
  inviteText: {
    fontFamily: "BricolageGrotesque",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalContainer: {
    gap: 20,
  },
});
