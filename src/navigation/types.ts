import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Station = {
  id: number;
  name: string;
  distance: string;
  status: string;
  logo: any;
  favorite?: boolean;
  func?: string;
  petrol?: string;
  Diesel?: string;
  Gas?: string;
};

export type RootStackParamList = {
  home: undefined;
  login: undefined;
  register: undefined;
  individual: undefined;
  policy: undefined;
  terms: undefined;
  verify: undefined;
  forgot: undefined;
  newpassword: undefined;
  Stations: undefined;
  app: undefined;
  Support: undefined;
  Verification: undefined;
  TransactionHistory: undefined;
  VehicleSettings: undefined;
  AddVehicle: undefined;
  Settings:undefined;
  Wallet:undefined;

  BuyFuel: {
    selectedStation: Station;
  };
};

export type AppTabParamList = {
  Dashboard: undefined;
  Stations: undefined;
  Wallet: undefined;
  Insure: undefined;
  Settings: undefined;
  // AddVehicle: undefined;
};

export type StationsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, "Stations">,
  NativeStackNavigationProp<RootStackParamList>
>;
