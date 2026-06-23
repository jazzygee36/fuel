import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import AppButton from "../../../components/button";
interface TransProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectionHis: any;
}
export default function TransactionView({ setStep, selectionHis }: TransProps) {
  console.log("selectionHis", selectionHis);
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
          <Text style={styles.textDesc}> Payment method</Text>{" "}
          <Text style={styles.textItems}>{selectionHis?.type}</Text>
        </View>
        <View style={styles.selectionDetails}>
          <Text style={styles.textDesc}>Transaction status</Text>{" "}
          <Text style={styles.textItems}>{selectionHis?.status}</Text>
        </View>
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
});
