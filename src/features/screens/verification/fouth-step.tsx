import { View, StyleSheet, Image } from "react-native";
import { useState } from "react";
import BackArrow from "../../../components/back-arrow";
import VerifyHeader from "./verify-header";
import { Ionicons } from "@expo/vector-icons";

const PasswordImage = [
  { image: require("../../../assets/png/backpassport.png") },
];
export default function ForthStepVerification() {
  return (
    <View>
      <View>
        <VerifyHeader
          title={"Back of passport"}
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
  },
});
