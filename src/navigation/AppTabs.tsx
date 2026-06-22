import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Dashboard from "../features/screens/dashboard";
import { Ionicons } from "@expo/vector-icons";
import Wallet from "../features/screens/wallet";
import Settings from "../features/screens/settings";
import SettingsStack from "./settings-stack";
import Stations from "../features/screens/stations";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#eee",
        },

        tabBarShowLabel: true,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },

        tabBarActiveTintColor: "#540863",
        tabBarInactiveTintColor: "#000000",

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Stations") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "Wallet") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Insure") {
            iconName = focused ? "shield" : "shield-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Stations" component={Stations} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Insure" component={Dashboard} />
      <Tab.Screen name="Settings" component={SettingsStack} />
      
    </Tab.Navigator>
  );
}
