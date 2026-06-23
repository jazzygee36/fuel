// SettingsStack.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../features/screens/settings";
import AccountSettings from "../features/screens/settings/account";
import VehicleSettings from "../features/screens/settings/my-vehicle";
import SecuritySettings from "../features/screens/settings/security";
import UpdateTransactionPin from "../features/screens/settings/update-transaction-pin";
import ChangePasswordPin from "../features/screens/settings/change-login-pin";
import ReferralSettings from "../features/screens/settings/referral";
import FavouriteSettings from "../features/screens/settings/favourites";
import Verification from "../features/screens/verification";
import HelpSupport from "../features/screens/settings/help-support";



const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsHome" component={Settings} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="VehicleSettings" component={VehicleSettings} />
      <Stack.Screen name="SecuritySettings" component={SecuritySettings} />
      <Stack.Screen
        name="UpdateTransactionPin"
        component={UpdateTransactionPin}
      />
      <Stack.Screen name="ChangePasswordPin" component={ChangePasswordPin} />
      <Stack.Screen name="ReferralSettings" component={ReferralSettings} />
      <Stack.Screen name="FavouriteSettings" component={FavouriteSettings} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
    </Stack.Navigator>
  );
}
