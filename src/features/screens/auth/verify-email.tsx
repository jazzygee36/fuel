import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from "react-native";
import { RootStackParamList } from "../../../navigation/types";
import BackArrow from "../../../components/back-arrow";
import AppButton from "../../../components/button";
import { useRef, useState } from "react";
import BottomModal from "../../../components/bottom-modal";
type NavProp = NativeStackNavigationProp<RootStackParamList>;
interface OtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export default function VerifyEmail({ length = 4, onComplete }: OtpInputProps) {
  const navigation = useNavigation<NavProp>();
  const [otp, setOtp] = useState(Array(length).fill(""));
  const isOtpComplete = otp.every((digit) => digit !== "");
  const inputs = useRef<TextInput[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (text: string, index: number) => {
    // Handle paste
    if (text.length > 1) {
      const pasted = text.slice(0, length).split("");
      const newOtp = [...otp];

      pasted.forEach((digit, i) => {
        newOtp[i] = digit;
      });

      setOtp(newOtp);

      if (pasted.length === length) {
        onComplete?.(newOtp.join(""));
      }

      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    const code = newOtp.join("");

    if (code.length === length && !newOtp.includes("")) {
      onComplete?.(code);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };
  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <BackArrow />
        <View style={{ marginTop: 27, gap: 7 }}>
          <Text style={styles.title}>Let’s Verify Your Email</Text>
          <Text style={styles.desc}>
            We’ve sent a code to your email address
          </Text>
        </View>
        <View style={styles.otpText}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.input}
              textAlign="center"
            />
          ))}
        </View>
        <Text style={{ textAlign: "center", marginTop: 17.5 }}>
          Didn’t receive code?
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("register" as never)}
          >
            Request again in 10:12s
          </Text>
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          backgroundColor={isOtpComplete ? "#540863" : "#909194"}
          textColor="#fff"
          title="Confirm code"
          disabled={!isOtpComplete}
          onPress={() => {
            if (!isOtpComplete) return;
            setShowModal(true);
            const code = otp.join("");
            console.log(code);
          }}
        />
        <Text style={{ textAlign: "center", marginTop: 17.5 }}>
          Didn’t receive the code?
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("register" as never)}
          >
            Request code
          </Text>
        </Text>
      </View>
      <BottomModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title={"Email Confirmed"}
        description={
          "We’ve been able to successfully confirm your email address"
        }
        btn={
          <AppButton
            backgroundColor={"#540863"}
            textColor="#fff"
            title="Confirm code"
            // disabled={!isOtpComplete}
            onPress={() => {}}
          />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  otpText: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 60,
    marginBottom: 60,
  },
  input: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 16,
    fontSize: 24,
    fontWeight: "600",
    backgroundColor: "#fff",
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
  signUpText: {
    color: "#151B23",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
});
