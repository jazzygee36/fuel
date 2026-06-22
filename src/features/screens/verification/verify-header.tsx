import { View, Text, StyleSheet } from "react-native";
import BackArrow from "../../../components/back-arrow";

interface Props {
  title: string;
  description: string;
}

export default function VerifyHeader({ title, description }: Props) {
  return (
    <View>
      <View style={styles.navigationArrow}>
        <BackArrow />
      </View>
      <View style={{ gap: 4 }}>
        <Text style={styles.identity}>{title}</Text>
        <Text style={{ color: "#1A1C1E" }}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationArrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 30,
  },
  identity: {
    fontSize: 24,
    color: "#0A0A0A",
    fontFamily: "BricolageGrotesque",
    fontWeight: "bold",
  },
});
