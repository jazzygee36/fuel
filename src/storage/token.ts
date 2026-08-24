import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return AsyncStorage.getItem(key);
    }

    return SecureStore.getItemAsync(key);
  },

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
      return;
    }

    await SecureStore.setItemAsync(key, value);
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
      return;
    }

    await SecureStore.deleteItemAsync(key);
  },
};

export const token = {
  // Access token
  async getAccessToken() {
    return storage.getItem(ACCESS_TOKEN_KEY);
  },

  async setAccessToken(accessToken: string) {
    return storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  async removeAccessToken() {
    return storage.removeItem(ACCESS_TOKEN_KEY);
  },

  // Refresh token
  async getRefreshToken() {
    return storage.getItem(REFRESH_TOKEN_KEY);
  },

  async setRefreshToken(refreshToken: string) {
    return storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  async removeRefreshToken() {
    return storage.removeItem(REFRESH_TOKEN_KEY);
  },

  // Clear everything
  async clearTokens() {
    await Promise.all([
      storage.removeItem(ACCESS_TOKEN_KEY),
      storage.removeItem(REFRESH_TOKEN_KEY),
    ]);
  },
};