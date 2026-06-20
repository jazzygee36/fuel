import React, { useRef } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ButtonProps } from "../utils/types";

const AppButton = ({
  title,
  onPress,
  backgroundColor = "#6C4AB6",
  textColor = "#fff",
  style,
  textStyle,
  disabled = false,
  variant = "filled",
}: ButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[{ width: "100%" }, style]}
    >
      <Animated.View
        style={[
          styles.button,
          variant === "outlined"
            ? {
                backgroundColor: "transparent",
                borderWidth: 1.5,
                borderColor: "#000",
              }
            : { backgroundColor: disabled ? "#ccc" : backgroundColor },

          { transform: [{ scale: scaleValue }] },
          textStyle,
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: variant === "outlined" ? "#000" : textColor,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
