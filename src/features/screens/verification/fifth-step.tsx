import { View, StyleSheet, Image } from "react-native";
import VerifyHeader from "./verify-header";
import { Ionicons } from "@expo/vector-icons";

const PasswordImage = [
  { image: require("../../../assets/png/fontPassport.png") },

  { image: require("../../../assets/png/backpassport.png") },
];

export default function FifthStepVerification() {
  return (
    <View>
      <View>
        <VerifyHeader
          title={"Passport View"}
          description={"Scans and photocopies are not accepted"}
        />
        <View style={styles.fontPwd}>
          {PasswordImage.map((pwd, index) => (
            <View key={index}>
              <Image source={pwd.image} resizeMode="contain" />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fontPwd: {
    marginTop: 25,
    gap: 17,
  },
});
