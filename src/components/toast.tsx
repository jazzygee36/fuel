import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type ToastType = "success" | "error" | "warning" | "info";

interface AppToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export default function AppToast({
  visible,
  message,
  type = "success",
  duration = 3000,
  onClose,
}: AppToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          onClose?.();
        });
      }, duration);

      return () => clearTimeout(timer);
    }

    translateY.setValue(-100);
  }, [visible]);

  if (!visible) return null;

  const config = {
    success: {
      icon: "check-circle",
      color: "#027A48",
      backgroundColor: "#ECFDF3",
      title: "Success",
    },
    error: {
      icon: "error",
      color: "#D92D20",
      backgroundColor: "#FEF3F2",
      title: "Error",
    },
    warning: {
      icon: "warning",
      color: "#DC6803",
      backgroundColor: "#FFFAEB",
      title: "Warning",
    },
    info: {
      icon: "info",
      color: "#1570EF",
      backgroundColor: "#EFF8FF",
      title: "Info",
    },
  };

  const current = config[type];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor: current.backgroundColor,
        },
      ]}
    >
      <View style={styles.content}>
        <MaterialIcons
          name={current.icon as any}
          size={24}
          color={current.color}
        />

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: current.color }]}>
            {current.title}
          </Text>

          <Text style={styles.message}>{message}</Text>
        </View>

        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="close" size={20} color="#667085" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
    elevation: 10,

    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },

  message: {
    fontSize: 13,
    color: "#475467",
  },
});