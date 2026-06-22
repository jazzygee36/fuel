import { View, StyleSheet, Text, ScrollView } from "react-native";
import BackArrow from "../../../components/back-arrow";
import FundWallet from "./fund-wallet";
import { useState } from "react";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";

export default function Wallet() {
  const [step, setStep] = useState<number>(1);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wallet}>
          <BackArrow />
          <Text style={styles.walletText}>
            {step === 1 ? "Wallet" : "Fund wallet"}
          </Text>
        </View>

        {step === 1 && (
          <View>
            <FundWallet setStep={setStep} />

            <View style={styles.virtualAccount}>
              <View>
                <Text style={styles.virtualLabel}>
                  Fund wallet with your {"\n"}virtual account number
                </Text>
              </View>

              <View>
                <Text style={styles.virtualLabel}>
                  Paystack-Titan {"\n"}
                  <Text style={{ fontWeight: "bold" }}>6294063927</Text>
                </Text>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.amountText}>
              How much would you like to fund?
            </Text>
            <TextInputField placeholder="Enter amount" />
            <View style={styles.footer}>
              <AppButton
                backgroundColor="#540863"
                textColor="#fff"
                title="Continue"
                onPress={() => {}}
              />
            </View>
          </View>
        )}
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

  wallet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom:30
  },

  walletText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
  },

  virtualAccount: {
    width: "100%",
    backgroundColor: "#F5F2FC",
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginTop: 15,
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  virtualLabel: {
    color: "#45474A",
    fontSize: 13,
  },

  amountText: {
    textAlign: "center",
    marginVertical: 75,
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
  },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
});
