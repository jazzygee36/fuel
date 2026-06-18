import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types"; // adjust path

import Home from "../features/screens/home";
import Login from "../features/screens/auth/login";
import Dashboard from "../features/screens/dashboard";
import Register from "../features/screens/auth/register/index";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}