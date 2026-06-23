import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import BarcodeModal from "../../../components/barcode";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
interface TransProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectionHis: any;
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TransactionView({ setStep, selectionHis }: TransProps) {
  const navigation = useNavigation<NavigationProp>();
  const [scanCode, setScanCode] = useState(false);
  console.log("selectionHis", selectionHis);

  const barcodeValue = JSON.stringify({
    userId: "12345",
    amount: 5000,
    transactionRef: "FN-908776",
    fuelType: "Petrol",
  });

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
        <Image source={require("../../../assets/png/trans-logo.png")} />
        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Amount per litre</Text>{" "}
          <Text style={styles.textItems}>{selectionHis?.amount}</Text>
        </View>
        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Quantity</Text>{" "}
          <Text style={styles.textItems}>{selectionHis?.qty}</Text>
        </View>
        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}> Transaction date</Text>{" "}
          <Text style={styles.textItems}>{selectionHis?.date}</Text>
        </View>
        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}> Retail Station</Text>{" "}
          <Text style={styles.textItems}>{selectionHis?.RetailStation}</Text>
        </View>
        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}> Payment method</Text>
          <Text style={styles.textItems}>{selectionHis?.type}</Text>
        </View>
        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Transaction status</Text>
          <Text style={styles.textItems}>{selectionHis?.status}</Text>
        </View>
        <hr style={styles.line} />
        <View style={styles.selectionDetails}>
          <Text>Total Amount</Text>
          <Text style={{ fontWeight: "bold" }}>₦68,000</Text>
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
          <Pressable onPress={() => navigation.navigate("HelpSupport")}>
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
  line: {
    color: "#F0F0F4",
    // borderWidth: 2,
    width: "100%",
  },
  scanCode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 20,
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
});
