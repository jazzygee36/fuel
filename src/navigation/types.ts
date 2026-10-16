import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Station = {
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
  operatingHours?: any;
  products?: {
    label: string;
    pricePerLitre: number;
    type: string;
  }[];
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
  app: undefined;
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
