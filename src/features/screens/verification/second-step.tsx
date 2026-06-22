import { View, StyleSheet, Image } from "react-native";
import VerifyHeader from "./verify-header";

const PasswordImage = [
  { image: require("../../../assets/png/passport1-cutoff.png") },
  { image: require("../../../assets/png/password2-blur.png") },
  { image: require("../../../assets/png/password3-glare.png") },
  { image: require("../../../assets/png/passwordgood.png") },
];

export default function SecondStepVerification() {
  return (
    <View style={styles.container}>
      <VerifyHeader
        title={"Mistakes to avoid"}
        description={"Scans and photocopies are not accepted"}
      />

      <View style={styles.grid}>
        {PasswordImage.map((pwd, index) => (
          <View key={index} style={styles.item}>
            <Image
              source={pwd.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },

  item: {
    width: "50%",
    marginBottom: 16,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: 120,
  },
});
