import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import BackArrow from "../../../components/back-arrow";
import { useLogin } from "../../../hooks/mutations/useLogin";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginSchema } from "../../../utils/validation";
import { LoginDto } from "../../../utils/types";
import Loading from "../../../components/loading";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const { mutate, isPending } = useLogin();
  const navigation = useNavigation<NavigationProp>();

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

  const onSubmit = (data: LoginDto) => {
    const payload: LoginDto = {
      email: data.email,
      password: data.password,
    };

    mutate(payload);
  };

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <BackArrow />

        <View style={{ marginTop: 27, gap: 7 }}>
          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.desc}>Input your details to get started</Text>
        </View>

        <View style={{ marginTop: 30, gap: 10 }}>
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
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Password"
                isPassword
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />
        </View>

        <Text
          style={styles.forgetPwd}
          onPress={() => {
            navigation.navigate("forgot");
          }}
        >
          Forgot password?
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          backgroundColor={"#540863"}
          textColor="#fff"
          title={isPending ? <Loading /> : "Login"}
          onPress={handleSubmit(onSubmit)}
        />

        <Text style={{ textAlign: "center", marginTop: 17.5 }}>
          Don't have an account?
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("register" as never)}
          >
            Sign up
          </Text>
        </Text>
      </View>
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

  signUpText: {
    color: "#151B23",
    fontWeight: "bold",
    cursor: "pointer",
  },

  forgetPwd: {
    color: "#151B23",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "right",
    marginTop: 10,
    textDecorationLine: "underline",
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

  footer: {
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
});
