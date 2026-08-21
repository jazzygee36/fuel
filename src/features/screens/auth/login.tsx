import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";
import BackArrow from "../../../components/back-arrow";
import Loading from "../../../components/loading";
import AppToast from "../../../components/toast";

import { useLogin } from "../../../hooks/mutations/auth";
import { LoginForm, loginSchema } from "../../../utils/validation";

import { RootStackParamList } from "../../../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const navigation = useNavigation<NavigationProp>();

  const { mutate, isPending } = useLogin();

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
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

  const onSubmit = (data: LoginForm) => {
    mutate(data, {
      onSuccess: () => {
        showToast("Login successful!", "success");
      },

      onError: (error: any) => {
        console.log("Login error:", error?.response?.data);

        showToast(
          error?.response?.data?.message || "Login failed. Please try again.",
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
      >
        <BackArrow />

        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.desc}>Input your details to get started</Text>
        </View>

        <View style={styles.form}>
          {/* Email */}
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
                error={errors.email?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Password"
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                isPassword
                error={errors.password?.message}
              />
            )}
          />

          {/* Forgot Password */}
          <Text
            style={styles.forgetPwd}
            onPress={() => navigation.navigate("forgot")}
          >
            Forgot password?
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <AppButton
          backgroundColor="#540863"
          textColor="#fff"
          title={isPending ? <Loading /> : "Login"}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />

        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("register")}
          >
            Sign up
          </Text>
        </Text>
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
    paddingVertical: 27,
    paddingHorizontal: 20,
    paddingBottom: 120,
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
    fontWeight: "500",
  },

  form: {
    marginTop: 30,
  },

  forgetPwd: {
    color: "#151B23",
    fontWeight: "bold",
    textAlign: "right",
    marginTop: -5,
    textDecorationLine: "underline",
  },

  footer: {
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },

  registerText: {
    textAlign: "center",
    marginTop: 17.5,
    color: "#151521",
  },

  signUpText: {
    color: "#151B23",
    fontWeight: "bold",
  },
});
