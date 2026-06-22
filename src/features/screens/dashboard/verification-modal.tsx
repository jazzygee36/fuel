import { View, StyleSheet, Text } from "react-native";
import AppButton from "../../../components/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";

interface Props {
  setVerifyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function VerificationModal({ setVerifyModal }: Props) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View>
      <View>
        <Text style={styles.heading}>
          To protect your wallet and enable fuel purchases, we need to confirm
          your identity. Here are the things we need:
        </Text>

        <View style={styles.listContainer}>
          <Text style={styles.listItem}>
            1. Gov. ID (NIN, Int’l passport, Driver’s licence etc)
          </Text>
          <Text style={styles.listItem}>2. Vehicle Information</Text>
          <Text style={styles.listItem}>3. Selfie of yourself</Text>
        </View>
      </View>
      <View style={styles.btnGroup}>
        <AppButton
          title="Cancel"
          variant="outlined"
          style={styles.btnHalf}
          onPress={() => setVerifyModal(false)}
        />

        <AppButton
          title="Continue"
          variant="filled"
          backgroundColor="#540863"
          style={styles.btnHalf}
          onPress={() => {
            (setVerifyModal(false), navigation.navigate("Verification"));
          }}
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
  heading: {
    fontSize: 14,
    color: "#5B167A", // purple
    fontWeight: "400",
    marginBottom: 22,
  },

  listContainer: {
    paddingLeft: 8,
  },

  listItem: {
    fontSize: 16,
    lineHeight: 25,
    color: "#666666",
    fontWeight: "400",
  },
});
