import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image } from "react-native";

export default function BackArrow() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../assets/png/Elements.png")}
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
}
