import { ScrollView, View, Text, StyleSheet } from "react-native";
import BackArrow from "../../components/back-arrow";

export default function Terms() {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <BackArrow />
        <View style={{ marginTop: 27, gap: 7 }}>
          <Text style={styles.title}>Terms of Service</Text>
          <Text style={styles.desc}>Last updated January 1, 2024</Text>
        </View>

        <Text style={{ fontSize: 14,  marginBottom: 15 }}>
          This is the privacy policy for our app. We take your privacy seriously
          and are committed to protecting your personal information. We collect
          only the necessary information to provide you with the best experience
          possible. We do not share your information with third parties without
          your consent. If you have any questions about our privacy policy,
          please contact us at
        </Text>
      </View>
    </ScrollView>
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
