import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useState } from "react";

import BackArrow from "../../../components/back-arrow";
import SearchBar from "../../../components/search-bar";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import FileterModal from "../dashboard/filter-moda";
import SelectInput from "../../../components/select-input";

import TransactionItem from "./transaction-items";
import TransactionView from "./trans-view";
import { usePurchases } from "../../../hooks/queries/purchases";

const Filtered = ["Successful", "Unsuccessful", "Cancelled", "Progress"];

export default function TransactionHistory() {
  const { data } = usePurchases();
  console.log("purchase", data);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [selectionHis, setSelectionHis] = useState<object>({});

  const [step, setStep] = useState(1);

  const [transactionFilter, setTransactionFilter] =
    useState("All transactions");

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && (
          <>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.transactionHis}>
                <BackArrow />

                <Text style={styles.transaction}>Transaction History</Text>
              </View>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
              <SearchBar
                placeholder="Search name/location"
                searchIcon={true}
                onPress={() => setOpenFilterModal(true)}
              />
            </View>

            {/* Transaction filter */}
            <SelectInput
              label="Transaction category"
              value={transactionFilter}
              onChange={setTransactionFilter}
              options={["All transactions", ...Filtered]}
            />

            {/* Transactions */}
            <TransactionItem
              setStep={setStep}
              setSelectionHis={setSelectionHis}
              transactionFilter={transactionFilter}
              data={data}
            />
          </>
        )}

        {/* Transaction details */}
        {step === 2 && (
          <TransactionView setStep={setStep} selectionHis={selectionHis} />
        )}
      </ScrollView>

      {/* Filter Modal */}
      <ReuseableBottomModal
        visible={openFilterModal}
        title="Filter"
        onClose={() => setOpenFilterModal(false)}
      >
        <FileterModal setOpenFilterModal={setOpenFilterModal} />
      </ReuseableBottomModal>
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

  transactionHis: {
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

  searchContainer: {
    marginVertical: 25,
  },
});
