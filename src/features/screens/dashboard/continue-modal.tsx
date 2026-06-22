import { View, StyleSheet } from "react-native";
import SearchBar from "../../../components/search-bar";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContinueModal({ setOpen }: Props) {
  return (
    <View>
     <View style={{marginVertical:25}}>
       <SearchBar searchIcon={false} placeholder="Find location automatically" />
     </View>
      <TextInputField placeholder="State" label="State" />
      <TextInputField placeholder="City" label="City" />
      <View style={styles.btnGroup}>
        <AppButton
          title="Cancel"
          variant="outlined"
          style={styles.btnHalf}
          onPress={() => setOpen(false)}
        />

        <AppButton
          title="Save"
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
