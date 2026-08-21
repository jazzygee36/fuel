import { View, Text, StyleSheet, ScrollView } from "react-native";
import BackArrow from "../../../../components/back-arrow";
import TextInputField from "../../../../components/textInputField";
import AppButton from "../../../../components/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import Privacy from "../../../../components/privacy";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpForm, signUpSchema } from "../../../../utils/validation";
import { SignUpDto } from "../../../../utils/types";
import { useRegistration } from "../../../../hooks/mutations/auth";
import AppToast from "../../../../components/toast";
import { useState } from "react";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "login">;

export default function Individual() {
  const navigation = useNavigation<NavigationProp>();
  const { mutate: registerUser, isPending } = useRegistration();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      confirmPassword: "",
    },
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
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

  const onSubmit = (data: SignUpForm) => {
    const payload: SignUpDto = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    registerUser(payload, {
      onSuccess: () => {
        showToast("Registration successful!", "success");

        setTimeout(() => {
          navigation.navigate("login");
        }, 1500);
      },

      onError: (error: any) => {
        console.log("Registration error:", error?.response?.data);

        showToast(
          error?.response?.data?.message ||
            "Registration failed. Please try again.",
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
        <View style={{ marginTop: 27, gap: 7 }}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.desc}>Which category best describes you?</Text>
        </View>
        <View style={{ marginTop: 30, gap: 10 }}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Enter your firstname"
                placeholder="First name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.firstName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Enter your lastName"
                placeholder="Last name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.lastName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Enter your email"
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Enter your phone number"
                placeholder="Phone number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Enter your password"
                placeholder="Enter password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                isPassword
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
                isPassword
                error={errors.confirmPassword?.message}
              />
            )}
          />
          <Privacy />
          <View style={styles.footer}>
            <AppButton
              backgroundColor="#540863"
              textColor="#fff"
              title={isPending ? "Creating account..." : "Sign up for free"}
              onPress={handleSubmit(onSubmit)}
            />
            <Text style={{ textAlign: "center", marginTop: 17.5 }}>
              Already have an account? {''}
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
