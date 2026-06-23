import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import AppButton from "../../../components/button";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import Privacy from "../../../components/privacy";

const slides = [
  {
    title: "Find fuel stations around you instantly",
    desc: "Browse nearby stations, compare prices, and choose where to fuel",
    image: require("../../../assets/png/fuelPump.png"),
  },
  {
    title: "Pay for fuel from your phone",
    desc: "Fund your wallet and purchase petrol, diesel, gas, and more without cash or card stress.",
    image: require("../../../assets/png/mainContainer.png"),
  },
  {
    title: "For individuals and businesses",
    desc: "Manage personal fueling or control company fuel expenses in one secure app.",
    image: require("../../../assets/png/thirs.png"),
  },
];

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<NavProp>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const interval = setInterval(() => {
      if (!isMounted) return;

      setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.skipBar,
                  activeIndex === index && styles.activeBar,
                ]}
              />
            ))}
          </View>
        </View>
        <Text
          style={styles.skipText}
          onPress={() => navigation.replace("login")}
        >
          Skip
        </Text>
      </View>

      <View
        key={activeIndex}
        style={{
          backgroundColor: "#D7CBF2",
          height: 307.82,
          marginTop: 55,
          borderRadius: 30,
          width: "80%",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={slides[activeIndex].image}
          style={{
            width: "70%",
            height: "70%",
            resizeMode: "contain",
          }}
          fadeDuration={0}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 66,
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>{slides[activeIndex].title}</Text>

        <Text style={styles.desc}>{slides[activeIndex].desc}</Text>
      </View>
      <AppButton
        backgroundColor={"#540863"}
        textColor={"#fff"}
        title={"Sign up for free"}
        onPress={() => navigation.navigate("register")}
      />

      <Text style={{ textAlign: "center", marginTop: 17.5 }}>
        Already have an account?{" "}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("login")}
        >
          Login
        </Text>
      </Text>

      <Privacy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 27,
    paddingHorizontal: 35,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipBar: {
    width: 24,
    borderRadius: 5,
    height: 6,
    backgroundColor: "#D7CBF2",
  },
  activeBar: {
    backgroundColor: "#540863",
    width: 30,
  },

  skipText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    color: "#000",
    textAlign: "center",
    fontFamily: "BricolageGrotesque",
    fontWeight: "bold",
  },

  desc: {
    fontSize: 14,
    color: "#5E5E5E",
    textAlign: "center",
    width: 250,
    marginVertical: 14,
  },
  loginText: {
    color: "#540863",
    fontWeight: "bold",
    cursor: "pointer",
  },
});
