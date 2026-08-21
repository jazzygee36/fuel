import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TransProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSelectionHis: React.Dispatch<React.SetStateAction<object>>;
  transactionFilter: string;
  data: TransactionType[];
}

type TransactionType = {
  ref: string;
  amount: string;
  status: "Successful" | "Unsuccessful" | "Cancelled" | "Progress";
  date: string;
  type: "credit" | "debit";
  qty: string;
  RetailStation: string;
  verificationCode: any;
  totalAmount: any;
  createdAt: any;
};

type Props = {
  data: TransactionType;
  onPress?: () => void;
};

function TransactionItem({ data, onPress }: Props) {
  console.log("dataaaa", data);
  const isSuccess = data.status === "Successful";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
          <Text style={styles.ref}>{data?.verificationCode}</Text>
          <Text style={styles.amount}>{data?.totalAmount}</Text>
        </View>
      </View>

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
            {data?.status}
          </Text>
        </View>

        <Text style={styles.date}>
          {data?.createdAt
            ? new Date(data.createdAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })
            : ""}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#111" />
    </TouchableOpacity>
  );
}

export default function TransactionsList({
  setStep,
  setSelectionHis,
  transactionFilter,
  data,
}: TransProps) {
  console.log("TransProps", data);
  const filteredTransactions =
    transactionFilter === "All transactions"
      ? data
      : data.filter(
          (item) =>
            item?.status.toLowerCase() === transactionFilter.toLowerCase(),
        );

  if (filteredTransactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons name="receipt-outline" size={32} color="#540863" />
        </View>

        <Text style={styles.emptyTitle}>No transactions found</Text>

        <Text style={styles.emptyText}>
          You don't have any{" "}
          {transactionFilter === "All transactions"
            ? ""
            : transactionFilter.toLowerCase() + " "}
          transactions yet.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {filteredTransactions.map((item) => (
        <TransactionItem
          key={item.ref}
          data={item}
          onPress={() => {
            console.log(item);
            setStep(2);
            setSelectionHis(item);
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

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 80,
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F4EAF7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151521",
    textAlign: "center",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#8E8E93",
    textAlign: "center",
  },
});
