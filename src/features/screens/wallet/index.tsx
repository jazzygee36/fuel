import { View, StyleSheet, Text, ScrollView } from "react-native";
import BackArrow from "../../../components/back-arrow";
import FundWallet from "./fund-wallet";
import { useState } from "react";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";
import { useFundWallet } from "../../../hooks/mutations/wallet";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FundWalletForm, fundWalletSchema } from "../../../utils/validation";
import { Alert, Linking } from "react-native";

export default function Wallet() {
  const [step, setStep] = useState<number>(2);
  const { mutate, isPending } = useFundWallet();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FundWalletForm>({
    resolver: zodResolver(fundWalletSchema),
    defaultValues: {
      amount: '',
    },
  });

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const onSubmit = (data: FundWalletForm) => {
    mutate(
      {
        amount: Number(data.amount),
        paymentMethod: "card",
        callbackUrl: `${API_URL}wallet/fund/callback`,
      },
      {
        onSuccess: async (response) => {
          if (!response.paymentUrl) {
            Alert.alert(
              "Payment Error",
              "Unable to get the Paystack payment link.",
            );
            return;
          }

          try {
            await Linking.openURL(response.paymentUrl);
          } catch {
            Alert.alert(
              "Payment Error",
              "Could not open the Paystack payment page.",
            );
          }
        },
        onError: () => {
          Alert.alert(
            "Funding Failed",
            "Unable to initiate wallet funding. Please try again.",
          );
        },
      },
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.wallet}>
          <BackArrow />

          <Text style={styles.walletText}>
            {step === 1 ? "Wallet" : "Fund wallet"}
          </Text>
        </View>

        {/* STEP 1 - WALLET */}
        {step === 1 && (
          <View>
            <View style={{ marginTop: 25 }}>
              <FundWallet route="Wallet" setStep={setStep} />
            </View>

            <View style={styles.virtualAccount}>
              <View>
                <Text style={styles.virtualLabel}>
                  Fund wallet with your{"\n"}
                  virtual account number
                </Text>
              </View>

              <View>
                <Text style={styles.virtualLabel}>
                  Paystack-Titan{"\n"}
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#540863",
                    }}
                  >
                    6294063927
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* STEP 2 - FUND WALLET */}
        {step === 2 && (
          <View>
            <Text style={styles.amountText}>
              How much would you like to fund?
            </Text>

            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputField
                  label="Amount"
                  placeholder="Amount"
                  value={String(value)}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.amount?.message}
                />
              )}
            />

            <View style={styles.footer}>
              <AppButton
                backgroundColor="#540863"
                textColor="#fff"
                title={isPending ? "Processing..." : "Continue"}
                onPress={handleSubmit(onSubmit)}
                disabled={isPending}
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
    marginBottom: 30,
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
