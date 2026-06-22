import { View, StyleSheet, Image } from "react-native";
import { useState } from "react";
import BackArrow from "../../../components/back-arrow";
import VerifyHeader from "./verify-header";
import { Ionicons } from "@expo/vector-icons";



const PasswordImage = [
    
  { image: require("../../../assets/png/fontPassport.png") },
];

export default function ThirdStepVerification() {
  return (
    <View>
      <View>
        <VerifyHeader
          title={"Front of passport"}
          description={"Scans and photocopies are not accepted"}
        />
      </View>
      <View style={styles.fontPwd}>
        {PasswordImage.map((pwd, index) => (
          <View key={index}>
            <Image source={pwd.image} resizeMode="contain" />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fontPwd: {
    marginTop: 25,
  },
});
