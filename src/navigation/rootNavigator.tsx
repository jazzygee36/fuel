import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../providers/AuthProvider";

import Home from "../features/screens/home";
import Login from "../features/screens/auth/login";
import Register from "../features/screens/auth/register";
import ForgotPassword from "../features/screens/auth/forgot-password";
import VerifyEmail from "../features/screens/auth/verify-email";
import Individual from "../features/screens/auth/register/individual";
import Policy from "../features/screens/policy";
import Terms from "../features/screens/terms";
import NewPassword from "../features/screens/new-password";

import AppTabs from "./AppTabs";
import BuyFuel from "../features/screens/buy-fuel";
import TransactionHistory from "../features/screens/transaction-history";
import VehicleSettings from "../features/screens/settings/my-vehicle";
import Verification from "../features/screens/verification";
import AddVehicle from "../features/screens/add-vehicle.tsx";
// import AddVehicle from "../features/screens/add-vehicle";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#540863" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="verify" component={VerifyEmail} />
          <Stack.Screen name="forgot" component={ForgotPassword} />
          <Stack.Screen name="newpassword" component={NewPassword} />
          <Stack.Screen name="individual" component={Individual} />
          <Stack.Screen name="policy" component={Policy} />
          <Stack.Screen name="terms" component={Terms} />
        </>
      ) : (
        <>
          <Stack.Screen name="app" component={AppTabs} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistory}
          />
          <Stack.Screen name="VehicleSettings" component={VehicleSettings} />
          <Stack.Screen name="AddVehicle" component={AddVehicle} />
          {/* <Stack.Screen name="AddVehicle" component={AddVehicle} /> */}
          <Stack.Screen name="BuyFuel" component={BuyFuel} />
        </>
      )}
    </Stack.Navigator>
  );
}
