import {  ViewStyle, TextStyle } from "react-native";
export type ButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};