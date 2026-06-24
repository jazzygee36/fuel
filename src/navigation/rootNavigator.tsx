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
import NewPassword from "../features/screens/new-password";
import AppTabs from "./AppTabs";
import Verification from "../features/screens/verification";
import Stations from "../features/screens/stations";
import VehicleSettings from "../features/screens/settings/my-vehicle";
import TransactionHistory from "../features/screens/transaction-history";
import AddVehicle from "../features/screens/add-vehicle.tsx";

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
      {/* AUTH SCREENS */}
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="verify" component={VerifyEmail} />
      <Stack.Screen name="forgot" component={ForgotPassword} />
      <Stack.Screen name="newpassword" component={NewPassword} />
      <Stack.Screen name="individual" component={Individual} />
      <Stack.Screen name="policy" component={Policy} />
      <Stack.Screen name="terms" component={Terms} />

      {/* APP (BOTTOM NAV BAR) */}
      <Stack.Screen
        name="app"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="Stations" component={Stations} />
      <Stack.Screen name="VehicleSettings" component={VehicleSettings} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      <Stack.Screen name="AddVehicle" component={AddVehicle} />
      
    </Stack.Navigator>
  );
}
