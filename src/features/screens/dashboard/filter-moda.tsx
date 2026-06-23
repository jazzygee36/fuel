import { View, StyleSheet, Text } from "react-native";
import AppButton from "../../../components/button";

interface Props {
  setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortBy = [
  { title: "All" },
  { title: "Petrol (PMS)" },
  { title: "Diesel (AGO)" },
  { title: "Gas (LPG)" },
  { title: "Engine Oil" },
  { title: "CNG" },
  { title: "Charge car" },
  { title: "Open Now" },
  { title: "Accepts Wallet" },
];

export default function FileterModal({ setOpenFilterModal }: Props) {
  return (
    <View>
      <View>
        <Text style={styles.heading}>Sort by</Text>

        <View style={styles.sortContainer}>
          {SortBy.map((sort, index) => (
            <View key={index} style={styles.sortDiv}>
              <Text style={styles.sortText}>{sort.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.btnGroup}>
        <AppButton
          title="Cancel"
          variant="outlined"
          style={styles.btnHalf}
          onPress={() => setOpenFilterModal(false)}
        />

        <AppButton
          title="Filter"
          variant="filled"
          backgroundColor="#540863"
          style={styles.btnHalf}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  sortContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  sortDiv: {
    width: "31.5%",
    borderColor: "#EEF2F6",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },

  sortText: {
    textAlign: "center",
    fontSize: 13,
  },

  btnGroup: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginTop: 24,
  },

  btnHalf: {
    flex: 1,
  },
});