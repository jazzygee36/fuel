import { ScrollView, Text, StyleSheet, View, Pressable } from "react-native";
import BackArrow from "../../../../components/back-arrow";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const account = [
  {
    title: "Individual",
    desc: "For personal fueling and everyday driving",
    color: "#F7E8F0",
    path: "individual",
  },
  {
    title: "Corporate",
    desc: "For managing company vehicles and fuel expenses",
    color: "#FFE2B3",
    path: "corporate",
  },
  {
    title: "Insurance",
    desc: "For managing company vehicles and fuel expenses",
    color: "#B3FAFF",
    path: "register/insurance",
  },
];

export default function Register() {
  const navigation = useNavigation<NavProp>();
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

        <View style={{ marginTop: 30, gap: 20 }}>
          {account.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(item.path as never)}
              style={({ pressed }) => [
                {
                  padding: 37,
                  backgroundColor: item.color,
                  borderRadius: 12,
                  alignItems: "center",
                  gap: 5,

                  // shadow
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 10,
                  elevation: 4,

                  // press effect
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </Pressable>
          ))}
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
});
