import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Privacy() {
  const navigation = useNavigation<NavProp>();
  return (
    <View
      style={{
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        width: "75%",
        alignSelf: "center",
        marginBottom: 15,
      }}
    >
      <Text style={{ textAlign: "center", marginTop: 17.5 }}>
        By continuing, you agree to our{" "}
        <Text style={{ color: "#540863", fontWeight: "bold" }} onPress={() => {navigation.navigate("policy")}}>
          Privacy Policy
        </Text>{" "}
        and{" "}
        <Text style={{ color: "#540863", fontWeight: "bold" }} onPress={() => {navigation.navigate("terms")}}>
          Terms of Service
        </Text>
        .
      </Text>
    </View>
  );
}
