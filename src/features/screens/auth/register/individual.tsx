import { View, Text, StyleSheet, ScrollView } from "react-native";
import BackArrow from "../../../../components/back-arrow";
import TextInputField from "../../../../components/textInputField";
import AppButton from "../../../../components/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import Privacy from "../../../../components/privacy";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "login">;

export default function Individual() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <BackArrow />
        <View style={{ marginTop: 27, gap: 7 }}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.desc}>Which category best describes you?</Text>
        </View>
        <View style={{ marginTop: 30, gap: 10 }}>
          <TextInputField
            label="Enter your full name"
            placeholder="Full name"
          />
          <TextInputField
            label="Enter your email address"
            placeholder="Email address"
          />
          <TextInputField
            label="Enter your phone number"
            placeholder="Phone number"
          />
          <TextInputField
            label="Referral code (optional)"
            placeholder="Referral code"
          />
          <TextInputField label="Password" isPassword placeholder="Password" />
          <TextInputField
            label="Confirm Password"
            isPassword
            placeholder="Confirm Password"
          />

          <Privacy />
          <View style={styles.footer}>
            <AppButton
              backgroundColor="#909194"
              textColor="#fff"
              title="Sign up for free"
              onPress={() => {navigation.navigate("verify")}}
            />
            <Text style={{ textAlign: "center", marginTop: 17.5 }}>
              Already have an account?
              <Text
                style={styles.signUpText}
                onPress={() => navigation.navigate("login")}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "BricolageGrotesque",
    fontWeight: "bold",
  },

  cardDesc: {
    fontSize: 12,
    color: "#232323",
    fontWeight: "medium",
    textAlign: "center",
  },
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
  signUpText: {
    color: "#151B23",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    padding: 20,
    // borderTopWidth: 0.5,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
});
