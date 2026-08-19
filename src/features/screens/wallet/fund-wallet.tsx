import { View, Text, StyleSheet, Pressable } from "react-native";
import { useWallet } from "../../../hooks/queries/wallet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";

interface Props {
  route?: string;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  onAddFunds?: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FundWallet({
  route,
  setStep,
  onAddFunds,
}: Props) {
  const navigation = useNavigation<NavigationProp>();
  const { data: wallet } = useWallet();

  const handleFundWallet = () => {
    if (setStep ) {
      setStep(1);
    }
    navigation.navigate("Wallet");
  };

  const handleAddFunds = () => {
    if (onAddFunds) {
      onAddFunds();
      return;
    }

    if (setStep) {
      setStep(2);
    }
  };

  return (
    <View style={styles.balanceCard}>
      <View>
        <Text style={styles.balanceLabel}>Total Balance</Text>

        <Text style={styles.balanceAmount}>
          ₦{Number(wallet?.balance ?? 0).toLocaleString()}
        </Text>
      </View>

      <View style={styles.actions}>
        {/* Show Fund Wallet only when NOT already on Wallet */}
        {route !== "Wallet" && (
          <Pressable onPress={handleFundWallet}>
            <Text style={styles.fundWallet}>Fund Wallet</Text>
          </Pressable>
        )}

        {/* Add Funds */}
        {route === "Wallet" && (
          <Pressable onPress={handleAddFunds}>
            <Text style={styles.fundWallet}>Add Funds</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    width: "100%",
    backgroundColor: "#1A1C1E",
    paddingVertical: 22,
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

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  fundWallet: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "#8167BA",
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 50,
  },
});