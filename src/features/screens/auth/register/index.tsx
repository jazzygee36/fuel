import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import BackArrow from "../../../../components/back-arrow";

// import { Image } from "react-native-svg";

export default function Register() {
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
      </ScrollView>
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
});
