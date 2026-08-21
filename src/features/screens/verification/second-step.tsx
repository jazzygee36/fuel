import { View, StyleSheet, Image } from "react-native";
import VerifyHeader from "./verify-header";
import AppButton from "../../../components/button";

const PassportImage = [
  {
    image: require("../../../assets/png/passport1-cutoff.png"),
  },
  {
    image: require("../../../assets/png/password2-blur.png"),
  },
  {
    image: require("../../../assets/png/password3-glare.png"),
  },
  {
    image: require("../../../assets/png/passwordgood.png"),
  },
];

interface Props {
  documentType: string | null;
  onNext: () => void;
  onBack: () => void;
}

export default function SecondStepVerification({
  documentType,
  onNext,
  onBack,
}: Props) {
  return (
    <View style={styles.container}>
      <VerifyHeader
        title="Mistakes to avoid"
        description="Scans and photocopies are not accepted"
      />

      <View style={styles.grid}>
        {PassportImage.map((pwd, index) => (
          <View key={index} style={styles.item}>
            <Image
              source={pwd.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.footer}>
        <AppButton
          title="Continue"
          backgroundColor="#540863"
          textColor="#fff"
          onPress={onNext}
        />

        <AppButton
          title="Back"
          backgroundColor="transparent"
          textColor="#000"
          onPress={onBack}
        />
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

  footer: {
    marginTop: 20,
    gap: 5,
  },
});