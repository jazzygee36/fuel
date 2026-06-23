import { ScrollView, View, Text, StyleSheet } from "react-native";
import BackArrow from "../../../components/back-arrow";
import SearchBar from "../../../components/search-bar";
import { useState } from "react";
import ReuseableBottomModal from "../../../components/reuseable-bottom-modal";
import FileterModal from "../dashboard/filter-moda";
import SelectInput from "../../../components/select-input";
import TransactionItem from "./transaction-items";
import TransactionView from "./trans-view";
import AppButton from "../../../components/button";

export default function TransactionHistory() {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectionHis, setSelectionHis] = useState({});
  const [step, setStep] = useState(1);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && (
          <>
            <View style={styles.header}>
              <View style={styles.transactionHis}>
                <BackArrow />
                <Text style={styles.transaction}>Transaction History</Text>
              </View>
            </View>

            <View style={{ marginVertical: 25 }}>
              <SearchBar
                placeholder={"Search name/location"}
                searchIcon={true}
                onPress={() => setOpenFilterModal(true)}
              />
            </View>
            <SelectInput
              label=" Transaction category"
              value={"All transactions"}
            />
            <TransactionItem
              setStep={setStep}
              setSelectionHis={setSelectionHis}
            />
          </>
        )}

        {step === 2 && (
          <TransactionView setStep={setStep} selectionHis={selectionHis} />
        )}
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          title={"Download receipt"}
          backgroundColor="#540863"
          textColor="#fff"
          // onPress={handleStep}
        />
      </View>
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
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
});
