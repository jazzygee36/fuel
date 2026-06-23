import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TransProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSelectionHis: React.Dispatch<React.SetStateAction<object>>;
}

type TransactionType = {
  ref: string;
  amount: string;
  status: "Successful" | "Unsuccessful";
  date: string;
  type: "credit" | "debit";
  qty: string;
};

type Props = {
  data: TransactionType;
  onPress?: () => void;
};
function TransactionItem({ data, onPress }: Props) {
  const isSuccess = data.status === "Successful";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* LEFT */}
      <View style={styles.left}>
        <View
          style={[
            styles.iconBox,
            data.type === "credit" ? styles.creditBg : styles.debitBg,
          ]}
        >
          <Ionicons
            name={
              data.type === "credit" ? "document-text" : "document-text-outline"
            }
            size={20}
            color="#7C3AED"
          />
        </View>

        <View>
          <Text style={styles.ref}>{data.ref}</Text>
          <Text style={styles.amount}>{data.amount}</Text>
        </View>
      </View>

      {/* RIGHT */}
      <View style={styles.right}>
        <View
          style={[
            styles.badge,
            isSuccess ? styles.successBadge : styles.failedBadge,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              isSuccess ? styles.successText : styles.failedText,
            ]}
          >
            {data.status}
          </Text>
        </View>

        <Text style={styles.date}>{data.date}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#111" />
    </TouchableOpacity>
  );
}

export default function TransactionsList({
  setStep,
  setSelectionHis,
}: TransProps) {
  const transactions: TransactionType[] = [
    {
      ref: "FN-5678905",
      amount: "₦25,900",
      status: "Successful",
      date: "9:13 PM, 19 Feb. 2026",
      type: "credit",
      qty: "20 litres",
    },
    {
      ref: "FN-9876543",
      amount: "₦10,000",
      status: "Unsuccessful",
      date: "10:45 AM, 20 Feb. 2026",
      type: "debit",
      qty: "25 litres",
    },
  ];

  return (
    <View>
      {transactions.map((item, index) => (
        <TransactionItem
          key={index}
          data={item}
          onPress={() => {
            (console.log(item), (setStep(2), setSelectionHis(item)));
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  creditBg: {
    backgroundColor: "#F3F0FF",
  },

  debitBg: {
    backgroundColor: "#F1F5F9",
  },

  ref: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  amount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginTop: 2,
  },

  right: {
    alignItems: "flex-end",
    marginRight: 10,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 4,
  },

  successBadge: {
    backgroundColor: "#DCFCE7",
  },

  failedBadge: {
    backgroundColor: "#FEE2E2",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  successText: {
    color: "#16A34A",
  },

  failedText: {
    color: "#EF4444",
  },

  date: {
    fontSize: 11,
    color: "#6B7280",
  },
});
