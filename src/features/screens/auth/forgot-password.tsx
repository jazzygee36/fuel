import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from "react-native";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";

import BackArrow from "../../../components/back-arrow";
import AppButton from "../../../components/button";
import TextInputField from "../../../components/textInputField";

import {
  ForgetPasswordForm,
  forgetPasswordSchema,
} from "../../../utils/validation";

import {
  useForgotPwd,
  useResetPassword,
  useVerifyCode,
} from "../../../hooks/mutations/auth";
import Loading from "../../../components/loading";
import AppToast from "../../../components/toast";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ForgotPasswordProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export default function ForgotPassword({
  length = 4,
  onComplete,
}: ForgotPasswordProps) {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const { mutate, isPending } = useForgotPwd();

  const { mutate: verifyCode, isPending: isVerifyingCode } = useVerifyCode();
  // const { mutate: resetPassword } = useResetPassword();
  const { mutate: resetPassword, isPending: isResettingPassword } =
    useResetPassword();

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [resetToken, setResetToken] = useState("");
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  });

  const inputs = useRef<TextInput[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ForgetPasswordForm>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
      password: "",
    },
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "success",
  ) => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  const email = watch("email");

  const isOtpComplete = otp.every((digit) => digit !== "");

  const isEmailValid = email.trim().length > 0 && !errors.email;

  /**
   * Handle OTP input
   */
  const handleChange = (text: string, index: number) => {
    // Handle paste
    if (text.length > 1) {
      const pasted = text.replace(/\D/g, "").slice(0, length).split("");

      const newOtp = Array(length).fill("");

      pasted.forEach((digit, i) => {
        newOtp[i] = digit;
      });

      setOtp(newOtp);

      if (pasted.length === length) {
        inputs.current[length - 1]?.focus();

        const code = newOtp.join("");

        onComplete?.(code);
      } else {
        inputs.current[pasted.length]?.focus();
      }

      return;
    }

    // Only allow numbers
    if (text && !/^\d$/.test(text)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = text;

    setOtp(newOtp);

    // Move to next input
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    const code = newOtp.join("");

    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(code);
    }
  };

  /**
   * Handle OTP backspace
   */
  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleEmailSubmit = async () => {
    const isValid = await trigger("email");

    if (!isValid) {
      return;
    }

    const currentEmail = email.trim();

    mutate(currentEmail, {
      onSuccess: () => {
        setStep(2);
        showToast("Code has been sent to your email!", "success");

        setTimeout(() => {
          inputs.current[0]?.focus();
        }, 100);
      },
      onError: (error: any) => {
        showToast(
          error?.response?.data?.message || "Email not found.",
          "error",
        );
      },
    });
  };

  const handleOtpSubmit = () => {
    if (!isOtpComplete) {
      return;
    }

    const resetCode = otp.join("");

    verifyCode(
      {
        email,
        resetCode,
      },
      {
        onSuccess: (data) => {
          setResetToken(data?.resetToken);

          showToast("Code verified successfully!", "success");

          setTimeout(() => {
            setStep(3);
          }, 500);
        },

        onError: (error: any) => {
          showToast(
            error?.response?.data?.message ||
              "Invalid or expired verification code.",
            "error",
          );
        },
      },
    );
  };

  /**
   * Request another OTP
   */
  const handleRequestCode = () => {
    if (!email) {
      return;
    }

    mutate(email, {
      onSuccess: () => {
        setOtp(Array(length).fill(""));

        setTimeout(() => {
          inputs.current[0]?.focus();
        }, 100);
      },

      onError: (error) => {
        console.error("Request code failed:", error);
      },
    });
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isPasswordValid =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    !errors.password &&
    !errors.confirmPassword;

  const handleResetPassword = async () => {
    const isValid = await trigger(["password", "confirmPassword"]);

    if (!isValid) {
      showToast(
        "Please enter a valid password and confirm it correctly.",
        "error",
      );
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    const payload = {
      token: resetToken,
      newPassword: password,
      confirmPassword,
      password,
    };

    resetPassword(payload, {
      onSuccess: () => {
        showToast("Password reset successfully!", "success");

        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
          });
        }, 2000);
      },

      onError: (error: any) => {
        showToast(
          error?.response?.data?.message ||
            "Unable to reset password. Please try again.",
          "error",
        );
      },
    });
  };

  return (
    <View style={styles.page}>
      <AppToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            visible: false,
          }))
        }
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <BackArrow />

        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>

          <Text style={styles.desc}>
            {step === 1
              ? "Enter your email address to receive a reset code"
              : "We’ve sent a code to your email address"}
          </Text>
        </View>

        {step === 1 && (
          <View style={styles.emailContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputField
                  label="Email address"
                  placeholder="Email address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  error={errors.email?.message}
                />
              )}
            />
          </View>
        )}

        {step === 2 && (
          <View>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) {
                      inputs.current[index] = ref;
                    }
                  }}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(event) => handleKeyPress(event, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={[styles.otpInput, digit && styles.otpInputActive]}
                  textAlign="center"
                  selectTextOnFocus
                />
              ))}
            </View>

            <View style={styles.requestCodeContainer}>
              <Text style={styles.requestCodeText}>
                Didn’t receive the code?{" "}
              </Text>

              <Text
                style={styles.requestCodeButton}
                onPress={handleRequestCode}
              >
                Request code
              </Text>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.emailContainer}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputField
                  label="Password"
                  placeholder="New password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  // keyboardType="password"
                  autoCorrect={false}
                  error={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputField
                  label="Confirm password"
                  placeholder="Confirm password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </View>
        )}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <AppButton
          backgroundColor={
            (step === 1 && email.trim().length > 0) ||
            (step === 2 && isOtpComplete) ||
            (step === 3 && isPasswordValid)
              ? "#540863"
              : "#909194"
          }
          textColor="#fff"
          title={
            step === 1 ? (
              isPending ? (
                <Loading />
              ) : (
                "Verify"
              )
            ) : step === 2 ? (
              isVerifyingCode ? (
                <Loading />
              ) : (
                "Confirm code"
              )
            ) : isResettingPassword ? (
              <Loading />
            ) : (
              "Reset Password"
            )
          }
          disabled={
            step === 1
              ? !email.trim() || isPending
              : step === 2
                ? !isOtpComplete || isVerifyingCode
                : !isPasswordValid || isResettingPassword
          }
          onPress={
            step === 1
              ? handleEmailSubmit
              : step === 2
                ? handleOtpSubmit
                : handleResetPassword
          }
        />
      </View>
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
    paddingBottom: 30,
  },

  header: {
    marginTop: 27,
    gap: 7,
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
    fontWeight: "400",
  },

  emailContainer: {
    marginTop: 40,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 60,
    marginBottom: 40,
  },

  otpInput: {
    flex: 1,
    maxWidth: 65,
    height: 65,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 16,
    fontSize: 24,
    fontWeight: "600",
    backgroundColor: "#fff",
    textAlign: "center",
    color: "#151B23",
  },

  otpInputActive: {
    borderColor: "#540863",
  },

  requestCodeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  requestCodeText: {
    color: "#151B23",
    fontSize: 14,
  },

  requestCodeButton: {
    color: "#151B23",
    fontSize: 14,
    fontWeight: "bold",
  },

  footer: {
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
});
