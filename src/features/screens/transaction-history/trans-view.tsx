import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import BarcodeModal from "../../../components/barcode";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import AppButton from "../../../components/button";
import { MaterialIcons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
interface TransProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectionHistory: any;
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TransactionView({
  setStep,
  selectionHistory,
}: TransProps) {
  const navigation = useNavigation<NavigationProp>();
  const [scanCode, setScanCode] = useState(false);
  console.log("selectionHis", selectionHistory);

  const barcodeValue = JSON.stringify({
    verificationCode: selectionHistory?.verificationCode,
    productType: selectionHistory?.productType,
    quantityLitres: selectionHistory?.quantityLitres,
    pricePerLitre: selectionHistory?.pricePerLitre,
    totalAmount: selectionHistory?.totalAmount,
  });

  const handleDownloadReceipt = async () => {
    if (!selectionHistory) {
      Alert.alert("Error", "Transaction details are unavailable.");
      return;
    }

    try {
      const transactionDate = selectionHistory?.createdAt
        ? new Date(selectionHistory.createdAt).toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })
        : "";

      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #151521;
            }

            .header {
              text-align: center;
              margin-bottom: 30px;
            }

            .title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }

            .subtitle {
              font-size: 14px;
              color: #76777A;
            }

            .token {
              background: #E8F8F0;
              padding: 15px;
              border-radius: 10px;
              text-align: center;
              margin-bottom: 25px;
            }

            .token-label {
              font-size: 12px;
              color: #76777A;
            }

            .token-value {
              font-size: 22px;
              font-weight: bold;
              color: #027A48;
              margin-top: 5px;
            }

            .row {
              display: flex;
              justify-content: space-between;
              padding: 14px 0;
              border-bottom: 1px solid #F0F0F4;
            }

            .label {
              color: #76777A;
              font-size: 13px;
            }

            .value {
              font-size: 13px;
              font-weight: bold;
            }

            .total {
              display: flex;
              justify-content: space-between;
              padding: 20px 0;
              font-size: 18px;
              font-weight: bold;
            }

            .footer {
              margin-top: 40px;
              text-align: center;
              color: #76777A;
              font-size: 12px;
            }
          </style>
        </head>

        <body>

          <div class="header">
            <div class="title">FuelNetix</div>
            <div class="subtitle">Transaction Receipt</div>
          </div>

          <div class="token">
            <div class="token-label">Transaction Token</div>
            <div class="token-value">
              ${selectionHistory?.verificationCode ?? "-"}
            </div>
          </div>

          <div class="row">
            <span class="label">Fuel Type</span>
            <span class="value">
              ${selectionHistory?.productType ?? "-"}
            </span>
          </div>

          <div class="row">
            <span class="label">Amount per litre</span>
            <span class="value">
              ₦${Number(
                selectionHistory?.pricePerLitre ?? 0,
              ).toLocaleString()}/L
            </span>
          </div>

          <div class="row">
            <span class="label">Quantity</span>
            <span class="value">
              ${selectionHistory?.quantityLitres ?? 0} Litres
            </span>
          </div>

          <div class="row">
            <span class="label">Transaction Date</span>
            <span class="value">
              ${transactionDate}
            </span>
          </div>

          <div class="row">
            <span class="label">Payment Method</span>
            <span class="value">
              ${selectionHistory?.paymentSource ?? "-"}
            </span>
          </div>

          <div class="row">
            <span class="label">Transaction Status</span>
            <span class="value">
              ${selectionHistory?.status ?? "-"}
            </span>
          </div>

          <div class="total">
            <span>Total Amount</span>
            <span>
              ₦${Number(selectionHistory?.totalAmount ?? 0).toLocaleString()}
            </span>
          </div>

          <div class="footer">
            Thank you for using FuelNetix.
          </div>

        </body>
      </html>
    `;

      const { uri } = await Print.printToFileAsync({
        html,
      });

      const canShare = await Sharing.isAvailableAsync();

      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Download receipt",
          UTI: "com.adobe.pdf",
        });
      } else {
        Alert.alert(
          "Receipt generated",
          "Your receipt has been generated successfully.",
        );
      }
    } catch (error) {
      console.error("Receipt generation error:", error);

      Alert.alert("Error", "Unable to generate the receipt. Please try again.");
    }
  };

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.transactionBack}>
          <Pressable
            onPress={() => {
              setStep(1);
            }}
          >
            <Image
              source={require("../../../assets/png/Elements.png")}
              style={{ width: 24, height: 24 }}
            />
          </Pressable>
          <Text style={styles.transaction}>Receipt</Text>
        </View>
      </View>
      <View style={{ marginVertical: 30, gap: 20 }}>
        {selectionHistory?.logo ? (
          <Image source={{ uri: selectionHistory.logo }} style={styles.logo} />
        ) : (
          <View style={styles.ReceiptHeader}>
            <View style={styles.logoPlaceholder}>
              <MaterialIcons
                name="local-gas-station"
                size={25}
                color="#540863"
              />
            </View>
            <Text>{selectionHistory?.productType}</Text>
          </View>
        )}

        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Token</Text>
          <Text style={styles.tokenText}>
            {selectionHistory?.verificationCode}
          </Text>
        </View>

        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Fuel Type</Text>
          <Text style={styles.textItems}>{selectionHistory?.productType}</Text>
        </View>

        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Amount per litre</Text>
          <Text style={styles.textItems}>
            ₦{Number(selectionHistory?.pricePerLitre ?? 0).toLocaleString()}/L
          </Text>
        </View>

        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Quantity</Text>
          <Text style={styles.textItems}>
            {selectionHistory?.quantityLitres} Litres
          </Text>
        </View>

        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Transaction date</Text>
          <Text style={styles.textItems}>
            {selectionHistory?.createdAt
              ? new Date(selectionHistory.createdAt).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })
              : ""}
          </Text>
        </View>

        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Payment method</Text>
          <Text style={styles.textItems}>
            {selectionHistory?.paymentSource}
          </Text>
        </View>

        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Transaction status</Text>
          <Text style={styles.textItems}>{selectionHistory?.status}</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Total Amount</Text>

          <Text style={styles.totalAmount}>
            ₦{Number(selectionHistory?.totalAmount ?? 0).toLocaleString()}
          </Text>
        </View>

        <Pressable style={styles.scanCode} onPress={() => setScanCode(true)}>
          <Image source={require("../../../assets/png/scan.png")} />
          <Text>Tap to scan code</Text>
        </Pressable>
      </View>
      <View style={styles.virtualAccount}>
        <Text style={styles.virtualLabel}>
          If there are any issues surrounding this transaction, kindly reach out
          to the{" "}
          <Pressable onPress={() => navigation.navigate("Support")}>
            support group
          </Pressable>{" "}
          to treat as urgent
        </Text>
      </View>
      <BarcodeModal
        visible={scanCode}
        onClose={() => setScanCode(false)}
        value={barcodeValue}
        title={"Scan Code"}
      />
      <View style={styles.footer}>
        <AppButton
          title={"Download receipt"}
          backgroundColor="#540863"
          textColor="#fff"
          onPress={handleDownloadReceipt}
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
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  transactionBack: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  transaction: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
    color: "#151521",
  },
  selectionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textDesc: {
    fontSize: 12,
    color: "#76777A",
  },
  textItems: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
  },
  tokenText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#027A48",
  },
  scanCode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 20,
  },
  ReceiptHeader: {
    fontWeight: 700,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  virtualAccount: {
    width: "100%",
    backgroundColor: "#F5F2FC",
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  virtualLabel: {
    color: "#000000",
    fontSize: 13,
    textAlign: "center",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#F0F0F4",
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },

  logoPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#F5F2FC",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
});
