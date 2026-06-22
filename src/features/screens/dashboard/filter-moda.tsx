import { View, StyleSheet, Text } from "react-native";

import AppButton from "../../../components/button";

interface Props {
  setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FileterModal({ setOpenFilterModal }: Props) {
  return (
    <View style={{ marginTop: 27 }}>
      <View>
        <Text>Sort</Text>
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
  btnGroup: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginTop: 20,
  },
  btnHalf: {
    flex: 1,
  },
});
