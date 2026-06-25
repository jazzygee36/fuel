export type Station = {
  id: number;
  name: string;
  distance: string;
  status: string;
  logo: any;
  favorite?: boolean;
  func?: string;
  petrol?:string;
  Diesel?:string
  Gas?:string

};
export type RootStackParamList = {
  home: undefined;
  login: undefined;
  dashboard: undefined;
  register: undefined;
  individual: undefined;
  policy: undefined;
  terms: undefined;
  verify: undefined;
  forgot: undefined;
  newpassword: undefined;
  app: undefined;
  Wallet: undefined;
  Settings: undefined;
  AccountSettings: undefined;
  VehicleSettings: undefined;
  Favourites: undefined;
  Referral: undefined;
  SecuritySettings: undefined;
  UpdateTransactionPin: undefined;
  ChangePasswordPin: undefined;
  ReferralSettings: undefined;
  FavouriteSettings: undefined;
  Verification: undefined;
  Stations: undefined;
  TransactionHistory: undefined;
  AddVehicle: undefined;
  HelpSupport: undefined;
  BuyFuel: { selectedStation: Station };
};
