import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Station = Record<string, any>;

export type RootStackParamList = {
  home: undefined;
  login: undefined;
  register: undefined;
  individual: undefined;
  corporate: undefined;
  policy: undefined;
  terms: undefined;
  verify: undefined;
  forgot: undefined;
  newpassword: undefined;

  // Updated for nested tab navigation
  app: NavigatorScreenParams<AppTabParamList>;

  BuyFuel: {
    selectedStation: Station;
  };
  Support: undefined;
  Verification: undefined;
  TransactionHistory: undefined;
  VehicleSettings: undefined;
  AddVehicle: undefined;
  Settings: undefined;
  Wallet: undefined;
  Home: undefined;
  SelfieVerification: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Station: undefined;
  Wallet: undefined;
  Insurance: undefined;
  Settings: undefined;
};

export type StationsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, "Station">,
  NativeStackNavigationProp<RootStackParamList>
>;