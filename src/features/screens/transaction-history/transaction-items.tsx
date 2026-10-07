import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TransProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSelectionHis: React.Dispatch<React.SetStateAction<object>>;
  transactionFilter: string;
  data: TransactionType[];
  isLoading?: boolean;
}

type TransactionType = {
  ref: string;
  amount: string;
  status: "COMPLETED" | "PENDING" | "CANCELLED" | "PROGRESS";
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

const ITEMS_PER_PAGE = 10;

const getStatusStyles = (status: TransactionType["status"]) => {
  switch (status.toUpperCase()) {
    case "COMPLETED":
      return {
        badge: styles.completedBadge,
        text: styles.completedText,
      };

    case "PENDING":
      return {
        badge: styles.pendingBadge,
        text: styles.pendingText,
      };

    case "CANCELLED":
      return {
        badge: styles.cancelledBadge,
        text: styles.cancelledText,
      };

    case "PROGRESS":
      return {
        badge: styles.progressBadge,
        text: styles.progressText,
      };

    default:
      return {
        badge: styles.defaultBadge,
        text: styles.defaultText,
      };
  }
};

function TransactionItem({ data, onPress }: Props) {
  const statusStyles = getStatusStyles(data.status);

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

          <Text style={styles.amount}>
            ₦{data?.totalAmount?.toLocaleString("en-NG")}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <View style={[styles.badge, statusStyles.badge]}>
          <Text style={[styles.badgeText, statusStyles.text]}>
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
  isLoading = false,
}: TransProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions =
    transactionFilter === "All transactions"
      ? data
      : data.filter(
          (item) =>
            item?.status.toLowerCase() === transactionFilter.toLowerCase(),
        );

  /**
   * Reset pagination whenever the filter changes.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [transactionFilter]);

  /**
   * Don't show "No transactions found" while
   * the API request is still loading.
   */
  if (isLoading) {
    return null;
  }

  /**
   * Only show "No transactions found" after
   * the request has finished and there is actually
   * no transaction to display.
   */
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

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex,
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <View>
      {paginatedTransactions.map((item, index) => (
        <TransactionItem
          key={index}
          data={item}
          onPress={() => {
            setStep(2);
            setSelectionHis(item);
          }}
        />
      ))}

      {totalPages > 1 && (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.disabledButton,
            ]}
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={currentPage === 1 ? "#BDBDBD" : "#540863"}
            />
          </TouchableOpacity>

          <Text style={styles.pageText}>
            Page {currentPage} of {totalPages}
          </Text>

          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === totalPages && styles.disabledButton,
            ]}
            onPress={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <Ionicons
              name="chevron-forward"
              size={18}
              color={currentPage === totalPages ? "#BDBDBD" : "#540863"}
            />
          </TouchableOpacity>
        </View>
      )}
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

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  completedBadge: {
    backgroundColor: "#DCFCE7",
  },

  completedText: {
    color: "#16A34A",
  },

  pendingBadge: {
    backgroundColor: "#FEF3C7",
  },

  pendingText: {
    color: "#D97706",
  },

  cancelledBadge: {
    backgroundColor: "#FEE2E2",
  },

  cancelledText: {
    color: "#EF4444",
  },

  progressBadge: {
    backgroundColor: "#DBEAFE",
  },

  progressText: {
    color: "#2563EB",
  },

  defaultBadge: {
    backgroundColor: "#F3F4F6",
  },

  defaultText: {
    color: "#6B7280",
  },

  date: {
    fontSize: 11,
    color: "#6B7280",
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    gap: 16,
  },

  paginationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F4EAF7",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    backgroundColor: "#F3F4F6",
  },

  pageText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#540863",
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
