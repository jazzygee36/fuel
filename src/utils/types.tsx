import { ReactNode } from "react";
import { ViewStyle, TextStyle } from "react-native";
export type ButtonProps = {
  title: ReactNode;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  variant?: "filled" | "outlined";
};

export interface LoginDto {
  email: string;
  password: string;
}

export type SignUpDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type VerificationProps = {
  documentType: string;
  documentFrontUrl: string;
  documentBackUrl: string;
  
};

export interface VehicleDto {
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  fuelType: string;
  capacity: number;
}

export interface FuelProps {
  stationId: string;
  vehicleId: string;
  productType: string;
  quantityLitres: number;
  paymentSource: "WALLET";
  // cardId: string;
  // saveCard: true;
  pricePerLitre: number;
  totalPrice: number;
}
