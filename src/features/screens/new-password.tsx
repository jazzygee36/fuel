import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import BackArrow from "../../components/back-arrow";
import TextInputField from "../../components/textInputField";
import AppButton from "../../components/button";

// import { Image } from "react-native-svg";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "login">;

export default function NewPassword() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <BackArrow />

        <View style={{ marginTop: 27, gap: 7 }}>
          <Text style={styles.title}>Set a new password</Text>
          <Text style={styles.desc}>Now enter a password you’ll remember</Text>
        </View>

        <View style={{ marginTop: 30, gap: 10 }}>
          <TextInputField label="Password" placeholder="password" isPassword />
          <TextInputField
            label="Confirm password"
            isPassword
            placeholder="confirm password"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          backgroundColor="#909194"
          textColor="#fff"
          title="Save new Password"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#000",
    fontFamily: "BricolageGrotesque",
    fontWeight: "bold",
  },

  desc: {
    fontSize: 14,
    color: "#776F69",
    fontWeight: "medium",
  },

  page: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    paddingVertical: 27,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  footer: {
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
});
