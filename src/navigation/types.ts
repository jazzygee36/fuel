import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Station = {
  operatingHours(operatingHours: any): unknown;
  address: string;
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
  products?: string;
  label?: string;
  pricePerLitre?: string;
};

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
  // BuyFuel: undefined;
  app: undefined;
  Support: undefined;
  Verification: undefined;
  TransactionHistory: undefined;
  VehicleSettings: undefined;
  AddVehicle: undefined;
  Settings: undefined;
  Wallet: undefined;
  Home: undefined;
  SelfieVerification:undefined;

  BuyFuel: {
    selectedStation: Station;
  };
};

export type AppTabParamList = {
  Home: undefined;
  BuyFuel: undefined;
  Wallet: undefined;
  Insurance: undefined;
  Settings: undefined;
  // AddVehicle: undefined;
};

export type StationsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, "BuyFuel">,
  NativeStackNavigationProp<RootStackParamList>
>;
