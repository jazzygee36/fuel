import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types"; // adjust path

import Home from "../features/screens/home";
import Login from "../features/screens/auth/login";
import Dashboard from "../features/screens/dashboard";
import Register from "../features/screens/auth/register/index";
import Individual from "../features/screens/auth/register/individual";
import Policy from "../features/screens/policy";
import Terms from "../features/screens/terms";
import VerifyEmail from "../features/screens/auth/verify-email";
import ForgotPassword from "../features/screens/auth/forgot-password";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="verify" component={VerifyEmail} />
      <Stack.Screen name="forgot" component={ForgotPassword} />
      <Stack.Screen name="individual" component={Individual} />
      <Stack.Screen name="policy" component={Policy} />
      <Stack.Screen name="terms" component={Terms} />
      <Stack.Screen name="dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
