import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FundWallet({ setStep }: Props) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.balanceCard}>
      <View>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₦25,000</Text>
      </View>

      <Pressable
        onPress={() => {
          setStep(2);
        }}
      >
        <Text style={styles.fundWallet}>Fund Wallet</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  balanceCard: {
    width: "100%",
    backgroundColor: "#1A1C1E",
    paddingVertical: 16,
    paddingHorizontal: 18,
  
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    marginBottom: 4,
  },

  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "BricolageGrotesque",
  },

  fundWallet: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "#8167BA",
    paddingVertical: 4,
    paddingHorizontal: 11,
    borderRadius: 50,
    cursor: "pointer",
  },
});
