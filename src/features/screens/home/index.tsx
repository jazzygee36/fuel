import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import AppButton from "../../../components/button";
import Slide1 from "../../../assets/png/fuelPump.png";
import Slide2 from "../../../assets/png/mainContainer.png";
import Slide3 from "../../../assets/png/thirs.png";

const slides = [
  {
    title: "Find fuel stations around you instantly",
    desc: "Browse nearby stations, compare prices, and choose where to fuel",
    image: Slide1,
  },
  {
    title: "Pay for fuel from your phone",
    desc: "Fund your wallet and purchase petrol, diesel, gas, and more without cash or card stress.",
    image: Slide2,
  },
  {
    title: "For individuals and businesses",
    desc: "Manage personal fueling or control company fuel expenses in one secure app.",
    image: Slide3,
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
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
        <Text style={styles.skipText}>Skip</Text>
      </View>

      <View
        style={{
          backgroundColor: "#D7CBF2",
          height: 307.82,
          marginTop: 55,
          borderRadius: 30,
          width: "80%",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center", // 👈 important
        }}
      >
        <Image
          source={slides[activeIndex].image}
          style={{
            width: "70%",
            height: "70%",
            resizeMode: "contain",
          }}
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
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <Text style={{ textAlign: "center", marginTop: 17.5 }}>
        Already have an account? <Text style={styles.loginText}>Login</Text>
      </Text>

      <View
        style={{
          marginTop: 50,
          alignItems: "center",
          justifyContent: "center",
          width: "60%",
          alignSelf: "center",
        }}
      >
        <Text style={{ textAlign: "center", marginTop: 17.5 }}>
          By continuing, you agree to our{" "}
          <Text style={{ color: "#540863", fontWeight: "bold" }}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={{ color: "#540863", fontWeight: "bold" }}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 27,
    paddingHorizontal: 20,
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
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },

  desc: {
    fontSize: 14,
    color: "#5E5E5E",
    textAlign: "center",
    width: 300,
    marginVertical: 14,
  },
  loginText: {
    color: "#540863",
    fontWeight: "bold",
    cursor: "pointer",
  },
});
