import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Linking,
  Modal,
  Pressable,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import BackArrow from "../../../components/back-arrow";
import FundWallet from "./fund-wallet";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";
import { useFundWallet } from "../../../hooks/mutations/wallet";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FundWalletForm, fundWalletSchema } from "../../../utils/validation";

type PaymentError = {
  title: string;
  message: string;
};

export default function Wallet() {
  const [step, setStep] = useState<number>(2);
  const [paymentError, setPaymentError] = useState<PaymentError | null>(null);

  const { mutate, isPending } = useFundWallet();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FundWalletForm>({
    resolver: zodResolver(fundWalletSchema),
    defaultValues: {
      amount: "",
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
            setPaymentError({
              title: "Payment Error",
              message: "Unable to get the Paystack payment link.",
            });
            return;
          }

          try {
            await Linking.openURL(response.paymentUrl);
          } catch {
            setPaymentError({
              title: "Payment Error",
              message: "Could not open the Paystack payment page.",
            });
          }
        },

        onError: () => {
          setPaymentError({
            title: "Funding Failed",
            message: "Unable to initiate wallet funding. Please try again.",
          });
        },
      },
    );
  };

  const retryPayment = () => {
    setPaymentError(null);
    handleSubmit(onSubmit)();
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
                  <Text style={styles.accountNumber}>6294063927</Text>
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
                  value={String(value).toLocaleLowerCase()}
                  keyboardType="numeric"
                  onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
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

      {/* CUSTOM PAYMENT ERROR MODAL */}
      <Modal
        visible={!!paymentError}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setPaymentError(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.errorCard}>
            {/* Error illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.illustrationCircle}>
                <MaterialIcons name="credit-card" size={90} color="#540863" />

                <View style={styles.errorIcon}>
                  <MaterialIcons name="close" size={37} color="#fff" />
                </View>
              </View>
            </View>

            <Text style={styles.errorTitle}>
              {paymentError?.title ?? "Payment Error"}
            </Text>

            <Text style={styles.errorMessage}>
              {paymentError?.message ??
                "Could not open the Paystack payment page."}
            </Text>

            {/* Retry button */}
            <Pressable
              style={[styles.retryButton, isPending && styles.disabledButton]}
              onPress={retryPayment}
              disabled={isPending}
              accessibilityRole="button"
              accessibilityLabel="Try payment again"
            >
              <Text style={styles.retryButtonText}>
                {isPending ? "Processing..." : "Try Again"}
              </Text>
            </Pressable>

            {/* Go back button */}
            <Pressable
              style={styles.backButton}
              onPress={() => setPaymentError(null)}
              accessibilityRole="button"
              accessibilityLabel="Close payment error"
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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

  accountNumber: {
    fontWeight: "bold",
    color: "#540863",
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

  // Error modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(20, 10, 25, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },

  errorCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 30,
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },

  illustrationContainer: {
    width: 180,
    height: 155,
    borderRadius: 85,
    backgroundColor: "#F8EFF9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },

  illustrationCircle: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  errorIcon: {
    position: "absolute",
    right: -15,
    bottom: -5,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0445A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  errorTitle: {
    fontSize: 27,
    fontWeight: "700",
    color: "#350044",
    textAlign: "center",
    marginBottom: 14,
    fontFamily: "BricolageGrotesqueBold",
  },

  errorMessage: {
    fontSize: 16,
    lineHeight: 25,
    color: "#656176",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 4,
    fontFamily: "BricolageGrotesque",
  },

  retryButton: {
    width: "100%",
    minHeight: 58,
    borderRadius: 17,
    backgroundColor: "#540863",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  disabledButton: {
    opacity: 0.65,
  },

  retryButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "BricolageGrotesqueBold",
  },

  backButton: {
    width: "100%",
    minHeight: 58,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#540863",
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#540863",
    fontFamily: "BricolageGrotesqueBold",
  },
});
